import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, recordId } = await req.json();

    console.log("Processing badge award for:", email);

    if (!name || !email) {
      throw new Error("Missing required fields: name or email");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get OBF credentials
    const OBF_CLIENT_ID = Deno.env.get("OBF_CLIENT_ID");
    const OBF_CLIENT_SECRET = Deno.env.get("OBF_CLIENT_SECRET");
    const OBF_BADGE_ID = Deno.env.get("OBF_BADGE_ID");

    // Check if OBF is configured
    if (!OBF_CLIENT_ID || !OBF_CLIENT_SECRET || !OBF_BADGE_ID) {
      console.error("OBF not configured - missing env vars:", {
        hasClientId: !!OBF_CLIENT_ID,
        hasClientSecret: !!OBF_CLIENT_SECRET,
        hasBadgeId: !!OBF_BADGE_ID,
      });
      
      return new Response(
        JSON.stringify({
          success: false,
          error: "OBF_NOT_CONFIGURED",
          message: "Open Badge Factory -asetukset puuttuvat",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("OBF credentials found, attempting to issue badge...");

    let obfResponse = null;

    try {
      // Get OBF Access Token
      console.log("Fetching OBF access token...");
      const tokenResponse = await fetch("https://openbadgefactory.com/v1/client/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: OBF_CLIENT_ID,
          client_secret: OBF_CLIENT_SECRET,
        }),
      });

      if (!tokenResponse.ok) {
        const tokenError = await tokenResponse.text();
        console.error("OBF token error:", tokenResponse.status, tokenError);
        throw new Error(`OBF token request failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;
      console.log("OBF access token received");

      // Issue the badge
      console.log("Issuing badge to:", email);
      const issueResponse = await fetch(
        `https://openbadgefactory.com/v1/${OBF_CLIENT_ID}/badge/${OBF_BADGE_ID}/issue`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient: [email],
            issued_on: Math.floor(Date.now() / 1000),
            email_subject: "Onneksi olkoon! Olet ansainnut Joulun Osaaja -osaamismerkin!",
            email_body: `Hei ${name}!\n\nOlet suorittanut Joulun Osaaja -tehtävän ja ansainnut digitaalisen osaamismerkin.\n\nOsaamismerkki todistaa rohkeutesi kokeilla uutta teknologiaa ja tutustua tekoälyn mahdollisuuksiin.\n\nOnnea ja iloista joulunaikaa!\n\nLapland AI Lab`,
            email_link_text: "Näytä osaamismerkki",
          }),
        }
      );

      if (!issueResponse.ok) {
        const issueError = await issueResponse.text();
        console.error("OBF issue error:", issueResponse.status, issueError);
        throw new Error(`OBF badge issue failed: ${issueResponse.status}`);
      }

      obfResponse = await issueResponse.json();
      console.log("Badge issued successfully:", obfResponse);

    } catch (obfError) {
      console.error("OBF request failed:", obfError);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: "OBF_REQUEST_FAILED",
          message: "Osaamismerkin lähetys epäonnistui",
          details: obfError instanceof Error ? obfError.message : "Unknown OBF error",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Update the database record
    if (recordId) {
      const { error: updateError } = await supabase
        .from("elf_badges")
        .update({
          badge_issued: true,
          badge_issued_at: new Date().toISOString(),
          obf_response: obfResponse,
        })
        .eq("id", recordId);

      if (updateError) {
        console.error("Database update error:", updateError);
        // Don't fail the whole request for DB update error
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Osaamismerkki lähetetty sähköpostiisi!",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in award-badge function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "UNKNOWN_ERROR",
        message: error instanceof Error ? error.message : "Tuntematon virhe",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
