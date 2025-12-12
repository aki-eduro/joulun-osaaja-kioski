import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import badgeFallback from "@/assets/joulu-osaaja-badge.png";

interface CertificateViewProps {
  name: string;
  elfImageUrl: string;
  badgeImage?: string;
  onBack: () => void;
}

export const CertificateView = ({ name, elfImageUrl, badgeImage, onBack }: CertificateViewProps) => {
  const today = new Date().toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => window.print();
  const badgeSrc = badgeImage || badgeFallback;

  return (
    <>
      <div className="no-print kiosk-card fade-in mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button onClick={handlePrint} variant="kiosk" size="kiosk" className="md:max-w-xs">
            <Printer className="w-6 h-6 mr-2" /> Tulosta
          </Button>
          <Button onClick={onBack} variant="kioskSecondary" className="md:max-w-xs">
            <ArrowLeft className="w-5 h-5 mr-2" /> Aloita alusta
          </Button>
        </div>
      </div>

      <div className="certificate-container no-print">
        <div className="certificate-page bg-christmas-snow rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col gap-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-christmas-red">Todistus</p>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-christmas-navy mb-2">Joulun Osaaja</h1>
              <p className="text-xl text-christmas-red font-display">AI Tonttukioski</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
              <span className="text-christmas-gold text-2xl">❄</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
            </div>

            <div className="flex flex-col items-center text-center gap-6">
              <p className="text-lg text-christmas-navy/70">Tämä todistus myönnetään henkilölle</p>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-christmas-navy">{name}</h2>

              <div className="w-[180px] h-[240px] md:w-[200px] md:h-[267px] rounded-xl overflow-hidden border-4 border-christmas-gold/30 shadow-lg">
                <img src={elfImageUrl} alt="AI-muokattu tonttukuva" className="w-full h-full object-cover" />
              </div>

              <p className="max-w-2xl text-christmas-navy/80 leading-relaxed">
                Tämä todistus myönnetään henkilölle {name}, joka on suorittanut Joulun Osaaja -tehtävän ja luonut oman tonttiversionsa tekoälyn avulla.
              </p>
            </div>

            <div className="flex justify-center">
              <img src={badgeSrc} alt="Liitetty osaamismerkki" className="w-24 h-24 md:w-28 md:h-28 object-contain" />
            </div>

            <div className="pt-4 border-t border-christmas-gold/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div>
                <p className="text-sm text-christmas-navy/60">Päivämäärä</p>
                <p className="font-medium text-christmas-navy">{today}</p>
              </div>
              <div className="md:text-center">
                <p className="text-sm text-christmas-navy/60">Myöntäjä</p>
                <p className="font-medium text-christmas-navy">Joulun Osaaja – AI Tonttukioski</p>
              </div>
              <div className="md:text-right">
                <p className="text-sm text-christmas-navy/60">Allekirjoitus</p>
                <div className="w-full h-12 border-b-2 border-christmas-navy/30" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden print:block">
        <div className="certificate-print-page">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold font-display text-black mb-2">Joulun Osaaja</h1>
            <p className="text-lg text-red-700 font-display">AI Tonttukioski – Todistus</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <span className="text-amber-500 text-2xl">❄</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <p className="text-center text-base text-gray-700 mb-3">Tämä todistus myönnetään henkilölle</p>
          <h2 className="text-center text-3xl font-bold font-display text-black mb-6">{name}</h2>

          <div className="w-[7cm] h-[9cm] rounded-xl overflow-hidden border-4 border-amber-300 mx-auto mb-6">
            <img src={elfImageUrl} alt="Tonttukuva" className="w-full h-full object-cover" />
          </div>

          <p className="max-w-2xl mx-auto text-center text-gray-700 leading-relaxed mb-4">
            Tämä todistus myönnetään henkilölle {name}, joka on suorittanut Joulun Osaaja -tehtävän ja luonut oman tonttiversionsa tekoälyn avulla.
          </p>

          <div className="flex justify-center mb-4">
            <img src={badgeSrc} alt="Liitetty osaamismerkki" className="w-[3cm] h-[3cm] object-contain" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-200 text-sm text-gray-700">
            <div>
              <p className="text-gray-500">Päivämäärä</p>
              <p className="font-medium">{today}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Myöntäjä</p>
              <p className="font-medium">Joulun Osaaja – AI Tonttukioski</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Allekirjoitus</p>
              <div className="w-full h-10 border-b-2 border-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
