import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import badgeImage from "@/assets/joulu-osaaja-badge.png";

interface CertificateViewProps {
  name: string;
  wish: string;
  elfImageUrl: string;
  onBack: () => void;
}

export const CertificateView = ({ name, wish, elfImageUrl, onBack }: CertificateViewProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString("fi-FI", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      // Dynamic import of html2canvas and jspdf
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const element = certificateRef.current;
      if (!element) throw new Error("Certificate element not found");

      // Create canvas from the certificate element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // A4 dimensions in mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit A4 with margins
      const margin = 10;
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
      
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      
      // Center the image
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

      pdf.save(`Joulun_Osaaja_${name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      // Fallback to print
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Control buttons - hidden in print */}
      <div className="no-print kiosk-card fade-in mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            onClick={handleDownloadPDF} 
            variant="kiosk" 
            size="kiosk" 
            className="md:max-w-xs"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="w-6 h-6 mr-2 animate-spin" />
            ) : (
              <Download className="w-6 h-6 mr-2" />
            )}
            {isGenerating ? "Luodaan PDF..." : "Lataa A4 PDF"}
          </Button>
          <Button onClick={onBack} variant="kioskSecondary" className="md:max-w-xs">
            <ArrowLeft className="w-5 h-5 mr-2" /> Takaisin
          </Button>
        </div>
      </div>

      {/* Certificate for PDF generation */}
      <div className="certificate-container no-print">
        <div 
          ref={certificateRef}
          className="certificate-page bg-white rounded-2xl shadow-2xl overflow-hidden"
          style={{ 
            width: "210mm", 
            minHeight: "297mm",
            maxWidth: "100%",
            aspectRatio: "210 / 297",
          }}
        >
          <div className="p-8 md:p-12 flex flex-col h-full" style={{ minHeight: "297mm" }}>
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-2">
                Joulun Osaaja
              </h1>
              <p className="text-xl text-red-700 font-display">AI-tonttukioski</p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              <span className="text-amber-500 text-2xl">❄</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center text-center gap-6">
              {/* Name and date */}
              <div>
                <p className="text-lg text-gray-600 mb-2">Todistus myönnetty</p>
                <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
                  {name}
                </h2>
                <p className="text-gray-500">{today}</p>
              </div>

              {/* Elf Image - fixed aspect ratio */}
              <div 
                className="rounded-xl overflow-hidden border-4 border-amber-400/50 shadow-lg"
                style={{ width: "180px", height: "240px" }}
              >
                <img 
                  src={elfImageUrl} 
                  alt="AI-tonttukuva" 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Gift Wish */}
              {wish && (
                <div className="max-w-lg">
                  <p className="text-lg text-gray-700">
                    <span className="font-medium">Lahjatoive:</span>{" "}
                    <span className="italic">"{wish}"</span>
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="max-w-lg text-gray-600 leading-relaxed">
                {name} on osallistunut Joulun Osaaja -tehtävään ja luonut oman 
                tonttuversionsa tekoälyn avulla. Tämä todistaa rohkeutta kokeilla 
                uutta teknologiaa ja tutustua tekoälyn mahdollisuuksiin.
              </p>
            </div>

            {/* Badge Image */}
            <div className="flex justify-center my-6">
              <img 
                src={badgeImage} 
                alt="Joulun Osaaja -osaamismerkki" 
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-amber-200 text-center">
              <p className="text-gray-500 text-sm">
                Eduro-säätiö • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only version */}
      <div className="hidden print:block print-only">
        <div className="certificate-print-page p-8">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold font-display text-black mb-1">Joulun Osaaja</h1>
            <p className="text-base text-red-700 font-display">AI-tonttukioski – Todistus</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
            <span className="text-amber-500 text-lg">❄</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          </div>

          <p className="text-center text-sm text-gray-600 mb-2">Todistus myönnetty</p>
          <h2 className="text-center text-2xl font-bold font-display text-black mb-1">{name}</h2>
          <p className="text-center text-gray-500 text-sm mb-4">{today}</p>

          <div className="w-[5cm] h-[6.67cm] rounded-lg overflow-hidden border-2 border-amber-300 mx-auto mb-4">
            <img src={elfImageUrl} alt="Tonttukuva" className="w-full h-full object-cover" />
          </div>

          {wish && (
            <p className="text-center text-sm text-gray-700 mb-4">
              <span className="font-medium">Lahjatoive:</span> "{wish}"
            </p>
          )}

          <p className="max-w-md mx-auto text-center text-sm text-gray-600 leading-relaxed mb-4">
            {name} on osallistunut Joulun Osaaja -tehtävään ja luonut oman tonttuversionsa tekoälyn avulla.
          </p>

          <div className="flex justify-center mb-4">
            <img src={badgeImage} alt="Osaamismerkki" className="w-[2cm] h-[2cm] object-contain" />
          </div>

          <div className="pt-3 border-t border-amber-200 text-center text-xs text-gray-500">
            Eduro-säätiö • {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};
