import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import badgeFallback from "@/assets/joulu-osaaja-badge.png";

interface CertificateViewProps {
  name: string;
  elfImageUrl: string;
  badgeImage?: string;
  quizAnswer?: string;
  onBack: () => void;
}

export const CertificateView = ({ name, elfImageUrl, badgeImage, quizAnswer, onBack }: CertificateViewProps) => {
  const today = new Date().toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => window.print();
  const badgeSrc = badgeImage || badgeFallback;
  const truncatedWish = quizAnswer && quizAnswer.length > 100 ? `${quizAnswer.slice(0, 97)}…` : quizAnswer;

  return (
    <>
      {/* Control buttons - hidden in print */}
      <div className="no-print kiosk-card fade-in mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button onClick={handlePrint} variant="kiosk" size="kiosk" className="md:max-w-xs">
            <Printer className="w-6 h-6 mr-2" /> Tulosta todistus
          </Button>
          <Button onClick={onBack} variant="kioskSecondary" className="md:max-w-xs">
            <ArrowLeft className="w-5 h-5 mr-2" /> Takaisin
          </Button>
        </div>
      </div>

      {/* Screen preview - hidden in print */}
      <div className="certificate-container no-print">
        <div className="certificate-page bg-christmas-snow rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-christmas-red">Todistus</p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-christmas-navy mb-1">Joulun Osaaja</h1>
              <p className="text-base text-christmas-red font-display">AI Tonttukioski</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
              <span className="text-christmas-gold text-lg">❄</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
            </div>

            <div className="flex flex-col items-center text-center gap-3">
              <p className="text-sm text-christmas-navy/70">Tämä todistus myönnetään henkilölle</p>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-christmas-navy">{name}</h2>

              <div className="w-[140px] h-[187px] md:w-[160px] md:h-[213px] rounded-lg overflow-hidden border-3 border-christmas-gold/30 shadow-lg">
                <img src={elfImageUrl} alt="AI-muokattu tonttukuva" className="w-full h-full object-cover" />
              </div>

              {truncatedWish && (
                <p className="italic text-sm text-christmas-navy/70 max-w-lg">"{truncatedWish}"</p>
              )}

              <p className="max-w-xl text-sm text-christmas-navy/80 leading-relaxed">
                {name} on suorittanut Joulun Osaaja -tehtävän ja luonut oman tonttiversionsa tekoälyn avulla.
              </p>
            </div>

            <div className="flex justify-center">
              <img src={badgeSrc} alt="Joulun Osaaja -osaamismerkki" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
            </div>

            <div className="pt-3 border-t border-christmas-gold/20 grid grid-cols-3 gap-4 text-center text-xs">
              <div>
                <p className="text-christmas-navy/50">Päivämäärä</p>
                <p className="font-medium text-christmas-navy">{today}</p>
              </div>
              <div>
                <p className="text-christmas-navy/50">Myöntäjä</p>
                <p className="font-medium text-christmas-navy">Eduro-säätiö</p>
              </div>
              <div>
                <p className="text-christmas-navy/50">Allekirjoitus</p>
                <div className="w-full h-6 border-b border-christmas-navy/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only version - compact A4 */}
      <div className="hidden print:block print-only">
        <div className="certificate-print-page">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold font-display text-black mb-1">Joulun Osaaja</h1>
            <p className="text-sm text-red-700 font-display">AI Tonttukioski – Todistus</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <span className="text-amber-500 text-lg">❄</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <p className="text-center text-sm text-gray-600 mb-2">Tämä todistus myönnetään henkilölle</p>
          <h2 className="text-center text-2xl font-bold font-display text-black mb-4">{name}</h2>

          <div className="w-[5cm] h-[6.67cm] rounded-lg overflow-hidden border-2 border-amber-300 mx-auto mb-3">
            <img src={elfImageUrl} alt="Tonttukuva" className="w-full h-full object-cover" />
          </div>

          {truncatedWish && (
            <p className="text-center italic text-sm text-gray-600 mb-3 max-w-md mx-auto">"{truncatedWish}"</p>
          )}

          <p className="max-w-lg mx-auto text-center text-sm text-gray-700 leading-relaxed mb-3">
            {name} on suorittanut Joulun Osaaja -tehtävän ja luonut oman tonttiversionsa tekoälyn avulla.
          </p>

          <div className="flex justify-center mb-3">
            <img src={badgeSrc} alt="Osaamismerkki" className="w-[2cm] h-[2cm] object-contain" />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-amber-200 text-xs text-gray-600">
            <div>
              <p className="text-gray-400">Päivämäärä</p>
              <p className="font-medium text-gray-800">{today}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Myöntäjä</p>
              <p className="font-medium text-gray-800">Eduro-säätiö</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400">Allekirjoitus</p>
              <div className="w-full h-6 border-b border-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
