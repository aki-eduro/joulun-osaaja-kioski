import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";

interface CertificateViewProps {
  name: string;
  elfImageUrl: string;
  quizAnswer?: string;
  onBack: () => void;
}

export const CertificateView = ({ name, elfImageUrl, quizAnswer, onBack }: CertificateViewProps) => {
  const today = new Date().toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  // Truncate wish to 160 chars for display
  const displayWish = quizAnswer && quizAnswer.trim() 
    ? quizAnswer.trim().length > 160 
      ? quizAnswer.trim().slice(0, 160) + "…" 
      : quizAnswer.trim()
    : null;

  return (
    <>
      {/* Print controls - hidden when printing */}
      <div className="no-print kiosk-card fade-in mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button onClick={handlePrint} variant="kiosk" size="kiosk" className="md:max-w-xs">
            <Printer className="w-6 h-6 mr-2" />
            Tulosta todistus
          </Button>
          <Button onClick={onBack} variant="kioskSecondary" className="md:max-w-xs">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Takaisin
          </Button>
        </div>
      </div>

      {/* Certificate - optimized for A4 printing */}
      <div className="certificate-page bg-christmas-snow print:bg-white rounded-2xl no-print:shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12 print:p-[20mm] min-h-[297mm] flex flex-col">
          {/* Header */}
          <div className="text-center mb-8 print:mb-12">
            <div className="inline-block px-6 py-2 bg-christmas-red/10 rounded-full mb-4">
              <span className="text-christmas-red font-medium text-sm uppercase tracking-wider">
                Todistus
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl print:text-5xl font-bold font-display text-christmas-navy mb-2">
              Joulun Osaaja
            </h1>
            <p className="text-xl text-christmas-red font-display">
              AI Tonttukioski
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8 print:mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
            <span className="text-christmas-gold text-2xl">❄</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-christmas-gold to-transparent" />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-lg text-christmas-navy/70 mb-4">
              Tämä todistus myönnetään
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-christmas-navy mb-8">
              {name}
            </h2>

            {/* Elf image */}
            <div className="mx-auto mb-8 print:mb-10">
              <div 
                className="w-[180px] h-[240px] md:w-[200px] md:h-[267px] print:w-[8cm] print:h-[10cm] rounded-xl overflow-hidden border-4 border-christmas-gold/30 shadow-lg mx-auto"
              >
                <img
                  src={elfImageUrl}
                  alt="Tonttukuva"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <p className="max-w-lg text-christmas-navy/80 leading-relaxed mb-6 print:text-base">
              Henkilö on osoittanut heittäytymiskykyä ja tutustunut tekoälyn mahdollisuuksiin 
              Joulun Osaaja -pajassa. Todistus on myönnetty tunnustuksena rohkeudesta 
              kokeilla uutta teknologiaa luovalla tavalla.
            </p>

            {/* Gift wish */}
            {displayWish && (
              <div className="max-w-lg mb-6 p-4 rounded-lg bg-christmas-gold/10 border border-christmas-gold/20">
                <p className="text-sm text-christmas-navy/60 mb-1">Tontun lahjatoive:</p>
                <p className="text-christmas-navy/90 italic">"{displayWish}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 print:pt-12 border-t border-christmas-gold/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-christmas-navy/60 mb-1">Päivämäärä</p>
                <p className="font-medium text-christmas-navy">{today}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-christmas-navy/60 mb-1">Paikka</p>
                <p className="font-medium text-christmas-navy">Lapland AI Lab</p>
              </div>
              
              <div className="text-center md:text-right">
                <div className="w-32 h-12 border-b-2 border-christmas-navy/30 mb-1" />
                <p className="text-sm text-christmas-navy/60">Allekirjoitus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only version */}
      <div className="hidden print:block certificate-page">
        <div className="p-[20mm] min-h-[297mm] flex flex-col bg-white">
          {/* Same content as above but optimized for print */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-display text-black mb-2">
              Joulun Osaaja
            </h1>
            <p className="text-xl text-red-700 font-display">
              AI Tonttukioski – Todistus
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <span className="text-amber-500 text-2xl">❄</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-lg text-gray-600 mb-4">
              Tämä todistus myönnetään
            </p>
            <h2 className="text-4xl font-bold font-display text-black mb-10">
              {name}
            </h2>

            <div className="w-[8cm] h-[10cm] rounded-xl overflow-hidden border-4 border-amber-300 mx-auto mb-10">
              <img
                src={elfImageUrl}
                alt="Tonttukuva"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="max-w-lg text-gray-700 leading-relaxed mb-6">
              Henkilö on osoittanut heittäytymiskykyä ja tutustunut tekoälyn mahdollisuuksiin 
              Joulun Osaaja -pajassa. Todistus on myönnetty tunnustuksena rohkeudesta 
              kokeilla uutta teknologiaa luovalla tavalla.
            </p>

            {/* Gift wish - print version */}
            {displayWish && (
              <div className="max-w-lg mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm text-gray-500 mb-1">Tontun lahjatoive:</p>
                <p className="text-gray-800 italic">"{displayWish}"</p>
              </div>
            )}
          </div>

          <div className="mt-auto pt-12 border-t border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Päivämäärä</p>
                <p className="font-medium text-black">{today}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Paikka</p>
                <p className="font-medium text-black">Lapland AI Lab</p>
              </div>
              
              <div className="text-right">
                <div className="w-32 h-12 border-b-2 border-gray-400 mb-1" />
                <p className="text-sm text-gray-500">Allekirjoitus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
