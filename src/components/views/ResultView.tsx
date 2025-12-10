import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Award, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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

  const handleSendBadge = async () => {
    setIsSendingBadge(true);
    try {
      const { data, error } = await supabase.functions.invoke("award-badge", {
        body: { name, email, recordId },
      });

      if (error) throw error;

      setBadgeSent(true);
      toast({
        title: "Osaamismerkki lähetetty!",
        description: `Merkki on lähetetty osoitteeseen ${email}`,
      });
    } catch (error) {
      console.error("Badge error:", error);
      toast({
        title: "Virhe",
        description: "Osaamismerkin lähetys epäonnistui. Yritä uudelleen.",
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
