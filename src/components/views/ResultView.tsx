import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Award, RefreshCw, Loader2, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResultViewProps {
  name: string;
  email: string;
  elfImageUrl: string;
  recordId: string;
  onViewCertificate: () => void;
  onRestart: () => void;
}

export const ResultView = ({
  name,
  email,
  elfImageUrl,
  recordId,
  onViewCertificate,
  onRestart,
}: ResultViewProps) => {
  const [isSendingBadge, setIsSendingBadge] = useState(false);
  const [badgeSent, setBadgeSent] = useState(false);
  const [credentialUrl, setCredentialUrl] = useState<string | null>(null);

  const hasEmail = email && email.trim().length > 0 && email.includes("@");

  const handleSendBadge = async () => {
    if (!hasEmail) return;

    // Confirm before sending
    const confirmed = window.confirm(
      `Lähetetäänkö Joulun Osaaja -osaamismerkki osoitteeseen ${email}?`
    );
    if (!confirmed) return;

    setIsSendingBadge(true);
    try {
      // Get proxy URL and badge ID from localStorage
      const proxyUrl = localStorage.getItem("OBF_PROXY_URL") || "https://joulun-osaaja-obf-proxy.aki-oksala.workers.dev";
      const badgeId = localStorage.getItem("OBF_BADGE_ID") || "";

      if (!badgeId) {
        toast({
          title: "Asetukset puuttuvat",
          description: "OBF Badge ID puuttuu. Avaa asetukset aloitussivulta ja lisää Badge ID.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient_email: email,
          recipient_name: name,
          badge_id: badgeId,
          record_id: recordId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBadgeSent(true);
        if (data.credential_url) {
          setCredentialUrl(data.credential_url);
        }
        toast({
          title: "Osaamismerkki lähetetty! ✅",
          description: `Merkki on lähetetty osoitteeseen ${email}`,
        });
      } else {
        throw new Error(data.message || data.error || "Lähetys epäonnistui");
      }
    } catch (error) {
      console.error("Badge error:", error);
      toast({
        title: "Lähetys epäonnistui",
        description: error instanceof Error ? error.message : "Kokeile uudelleen hetken kuluttua.",
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
          <h1 className="kiosk-title font-display text-3xl md:text-4xl">
            Hienoa, {name}! 🎉
          </h1>
          <p className="kiosk-subtitle mt-2">
            Olet suorittanut Joulun Osaaja -tehtävän. Tässä on tonttuversiosi!
          </p>
        </div>

        <div className="max-w-sm mx-auto mb-8">
          <div className="elf-portrait rounded-2xl overflow-hidden border-4 border-primary/50 shadow-[0_0_60px_hsl(var(--christmas-gold)/0.3)]">
            <img
              src={elfImageUrl}
              alt="Sinun tonttukuvasi"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={onViewCertificate}
            variant="kiosk"
            size="kiosk"
          >
            <FileText className="w-7 h-7 mr-3" />
            Tulosta Joulun Osaaja -todistus
          </Button>

          {/* Badge button - only show if email provided */}
          {hasEmail && (
            <Button
              onClick={handleSendBadge}
              variant="kioskSecondary"
              disabled={isSendingBadge || badgeSent}
            >
              {isSendingBadge ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Lähetetään...
                </>
              ) : badgeSent ? (
                <>
                  <Award className="w-5 h-5 mr-2" />
                  Merkki lähetetty! ✓
                </>
              ) : (
                <>
                  <Award className="w-5 h-5 mr-2" />
                  Lähetä osaamismerkki sähköpostiini
                </>
              )}
            </Button>
          )}

          {/* Show credential URL link if available */}
          {credentialUrl && (
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Avaa osaamismerkki
            </a>
          )}

          <Button
            onClick={onRestart}
            variant="kioskOutline"
            className="mt-4"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Aloita alusta
          </Button>
        </div>
      </div>
    </div>
  );
};
