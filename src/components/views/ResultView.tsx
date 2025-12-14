import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Award, RotateCcw, Loader2, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ResultViewProps {
  name: string;
  wish: string;
  email: string;
  elfImageUrl: string;
  recordId: string;
  onViewCertificate: () => void;
  onRestart: () => void;
}

export const ResultView = ({
  name,
  wish,
  email,
  elfImageUrl,
  recordId,
  onViewCertificate,
  onRestart,
}: ResultViewProps) => {
  const [isSendingBadge, setIsSendingBadge] = useState(false);
  const [badgeSent, setBadgeSent] = useState(false);

  const hasEmail = email && email.includes("@");

  const handleSendBadge = async () => {
    if (!hasEmail) return;

    const confirmed = window.confirm(
      `Lähetetäänkö Joulun Osaaja -osaamismerkki osoitteeseen ${email}?`
    );
    if (!confirmed) return;

    setIsSendingBadge(true);

    try {
      const { data, error } = await supabase.functions.invoke("award-badge", {
        body: { name, email, recordId },
      });

      if (error) throw error;
      if (!data.success) {
        throw new Error(data.message || "Osaamismerkin lähetys epäonnistui");
      }

      setBadgeSent(true);
      toast({
        title: "Osaamismerkki lähetetty! ✅",
        description: `Tarkista sähköpostisi: ${email}`,
      });
    } catch (error) {
      console.error("Badge sending error:", error);
      toast({
        title: "Virhe",
        description: error instanceof Error ? error.message : "Osaamismerkin lähetys epäonnistui. Kokeile uudelleen.",
        variant: "destructive",
      });
    } finally {
      setIsSendingBadge(false);
    }
  };

  return (
    <div className="kiosk-card fade-in relative overflow-hidden">
      {/* Blurred background */}
      <div
        className="absolute inset-0 opacity-20 blur-2xl scale-110"
        style={{
          backgroundImage: `url(${elfImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h1 className="kiosk-title font-display text-3xl md:text-4xl lg:text-5xl">
            Hienoa, {name}! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-primary font-display mt-2">
            Joulun Osaaja 2025
          </p>
        </div>

        {/* Elf Image */}
        <div className="max-w-sm mx-auto mb-6">
          <div className="elf-portrait rounded-2xl overflow-hidden border-4 border-primary/50 shadow-[0_0_60px_hsl(var(--christmas-gold)/0.3)]">
            <img
              src={elfImageUrl}
              alt={`${name} tonttuna`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Wish display */}
        {wish && (
          <p className="text-center text-lg text-muted-foreground mb-8 italic max-w-md mx-auto">
            Lahjatoive: "{wish}"
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={onViewCertificate}
            variant="kiosk"
            size="kiosk"
          >
            <FileDown className="w-6 h-6 mr-2" />
            Lataa A4 PDF
          </Button>

          {hasEmail && !badgeSent && (
            <Button
              onClick={handleSendBadge}
              variant="kioskSecondary"
              disabled={isSendingBadge}
            >
              {isSendingBadge ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Lähetetään...
                </>
              ) : (
                <>
                  <Award className="w-5 h-5 mr-2" />
                  Lähetä osaamismerkki
                </>
              )}
            </Button>
          )}

          {badgeSent && (
            <div className="text-center py-4 px-6 rounded-xl bg-accent/20 border border-accent/40">
              <p className="text-accent font-medium flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Osaamismerkki lähetetty sähköpostiisi!
              </p>
            </div>
          )}

          <Button
            onClick={onRestart}
            variant="kioskOutline"
            className="mt-2"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Aloita alusta
          </Button>
        </div>
      </div>
    </div>
  );
};
