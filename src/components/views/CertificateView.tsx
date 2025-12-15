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

export const CertificateView = ({ name, elfImageUrl, onBack }: CertificateViewProps) => {
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
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const element = certificateRef.current;
      if (!element) throw new Error("Certificate element not found");

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const margin = 0;
      const availableWidth = pageWidth - (margin * 2);
      const availableHeight = pageHeight - (margin * 2);
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
      
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      
      const x = (pageWidth - finalWidth) / 2;
      const y = (pageHeight - finalHeight) / 2;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", x, y, finalWidth, finalHeight);

      pdf.save(`Joulun_Osaaja_${name.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* Control buttons */}
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
          className="certificate-page bg-white overflow-hidden relative"
          style={{ 
            width: "210mm", 
            height: "297mm",
            maxWidth: "100%",
          }}
        >
          {/* Christmas border - pine branches */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top border */}
            <div className="absolute top-0 left-0 right-0 h-16 flex justify-center items-start">
              <svg viewBox="0 0 400 40" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
                <defs>
                  <linearGradient id="pineGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#2d5a27" />
                    <stop offset="100%" stopColor="#1a3d18" />
                  </linearGradient>
                </defs>
                {/* Pine branches pattern */}
                {[...Array(20)].map((_, i) => (
                  <g key={i} transform={`translate(${i * 20}, 0)`}>
                    <path d="M10 0 L5 15 L8 12 L3 25 L7 20 L2 35 L10 20 L18 35 L13 20 L17 25 L12 12 L15 15 Z" fill="url(#pineGreen)" />
                    {i % 3 === 0 && <circle cx="10" cy="18" r="3" fill="#c41e3a" />}
                    {i % 4 === 1 && <circle cx="6" cy="25" r="2" fill="#ffd700" />}
                  </g>
                ))}
              </svg>
            </div>
            {/* Bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-16 flex justify-center items-end rotate-180">
              <svg viewBox="0 0 400 40" className="w-full h-full" preserveAspectRatio="xMidYMin slice">
                {[...Array(20)].map((_, i) => (
                  <g key={i} transform={`translate(${i * 20}, 0)`}>
                    <path d="M10 0 L5 15 L8 12 L3 25 L7 20 L2 35 L10 20 L18 35 L13 20 L17 25 L12 12 L15 15 Z" fill="#2d5a27" />
                    {i % 3 === 1 && <circle cx="10" cy="18" r="3" fill="#c41e3a" />}
                    {i % 4 === 2 && <circle cx="14" cy="25" r="2" fill="#ffd700" />}
                  </g>
                ))}
              </svg>
            </div>
            {/* Left border */}
            <div className="absolute left-0 top-16 bottom-16 w-12">
              <svg viewBox="0 0 30 400" className="w-full h-full" preserveAspectRatio="xMinYMid slice">
                {[...Array(15)].map((_, i) => (
                  <g key={i} transform={`translate(0, ${i * 26}) rotate(-90, 15, 15)`}>
                    <path d="M15 0 L10 12 L13 10 L8 20 L12 16 L7 28 L15 16 L23 28 L18 16 L22 20 L17 10 L20 12 Z" fill="#2d5a27" />
                    {i % 3 === 0 && <circle cx="15" cy="14" r="2.5" fill="#c41e3a" />}
                  </g>
                ))}
              </svg>
            </div>
            {/* Right border */}
            <div className="absolute right-0 top-16 bottom-16 w-12">
              <svg viewBox="0 0 30 400" className="w-full h-full" preserveAspectRatio="xMaxYMid slice">
                {[...Array(15)].map((_, i) => (
                  <g key={i} transform={`translate(0, ${i * 26}) rotate(90, 15, 15)`}>
                    <path d="M15 0 L10 12 L13 10 L8 20 L12 16 L7 28 L15 16 L23 28 L18 16 L22 20 L17 10 L20 12 Z" fill="#2d5a27" />
                    {i % 3 === 1 && <circle cx="15" cy="14" r="2.5" fill="#ffd700" />}
                  </g>
                ))}
              </svg>
            </div>
            {/* Corner decorations */}
            {[
              "top-2 left-2",
              "top-2 right-2",
              "bottom-2 left-2",
              "bottom-2 right-2",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-14 h-14`}>
                <svg viewBox="0 0 50 50" className="w-full h-full">
                  <circle cx="25" cy="25" r="20" fill="#2d5a27" />
                  <circle cx="25" cy="25" r="12" fill="#c41e3a" />
                  <circle cx="25" cy="25" r="6" fill="#ffd700" />
                </svg>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 p-20 flex flex-col h-full">
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="text-5xl font-bold text-gray-900 mb-2" style={{ fontFamily: "serif" }}>
                Joulun Osaaja
              </h1>
              <p className="text-xl text-red-700" style={{ fontFamily: "serif" }}>
                AI-tonttukioski • Todistus
              </p>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
              <span className="text-amber-600 text-3xl">❄</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent" />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center text-center">
              {/* Name and date */}
              <div className="mb-6">
                <p className="text-lg text-gray-600 mb-2">Todistus myönnetty</p>
                <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "serif" }}>
                  {name}
                </h2>
                <p className="text-gray-500">{today}</p>
              </div>

              {/* Elf Image - LARGE and centered, fixed aspect ratio */}
              <div 
                className="rounded-xl overflow-hidden border-4 border-amber-500 shadow-2xl mb-6"
                style={{ width: "220px", height: "280px" }}
              >
                <img 
                  src={elfImageUrl} 
                  alt="AI-tonttukuva" 
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Description */}
              <p className="max-w-md text-gray-600 leading-relaxed text-base mb-6">
                {name} on osallistunut Joulun Osaaja -tehtävään ja luonut oman 
                tonttuversionsa tekoälyn avulla. Tämä todistaa rohkeutta kokeilla 
                uutta teknologiaa ja tutustua tekoälyn mahdollisuuksiin.
              </p>

              {/* Badge */}
              <div className="mb-4">
                <img 
                  src={badgeImage} 
                  alt="Joulun Osaaja -osaamismerkki" 
                  className="w-16 h-16 object-contain mx-auto"
                />
              </div>

              {/* Santa's signature */}
              <div className="mt-auto pt-4">
                <div className="inline-block">
                  <p 
                    className="text-3xl text-red-800 mb-1"
                    style={{ fontFamily: "cursive", fontStyle: "italic" }}
                  >
                    Joulupukki
                  </p>
                  <div className="h-px w-32 mx-auto bg-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">Korvatunturi</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-amber-300 text-center mt-4">
              <p className="text-gray-500 text-sm">
                Eduro-säätiö • {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print-only version */}
      <div className="hidden print:block print-only">
        <div className="certificate-print-page p-12 relative">
          {/* Simplified border for print */}
          <div className="absolute inset-4 border-4 border-green-800 rounded-lg" />
          <div className="absolute inset-6 border-2 border-amber-500 rounded" />
          
          <div className="relative z-10">
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-black mb-1">Joulun Osaaja</h1>
              <p className="text-base text-red-700">AI-tonttukioski – Todistus</p>
            </div>

            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 bg-amber-500" />
              <span className="text-amber-600 text-lg">❄</span>
              <div className="h-px flex-1 bg-amber-500" />
            </div>

            <p className="text-center text-sm text-gray-600 mb-2">Todistus myönnetty</p>
            <h2 className="text-center text-2xl font-bold text-black mb-1">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-4">{today}</p>

            <div className="w-[6cm] h-[7.5cm] rounded-lg overflow-hidden border-3 border-amber-400 mx-auto mb-4">
              <img src={elfImageUrl} alt="Tonttukuva" className="w-full h-full object-cover" />
            </div>

            <p className="max-w-md mx-auto text-center text-sm text-gray-600 leading-relaxed mb-4">
              {name} on osallistunut Joulun Osaaja -tehtävään ja luonut oman tonttuversionsa tekoälyn avulla.
            </p>

            <div className="flex justify-center mb-4">
              <img src={badgeImage} alt="Osaamismerkki" className="w-[1.5cm] h-[1.5cm] object-contain" />
            </div>

            <div className="text-center mb-4">
              <p className="text-2xl text-red-800" style={{ fontFamily: "cursive" }}>Joulupukki</p>
              <div className="h-px w-24 mx-auto bg-gray-400" />
              <p className="text-xs text-gray-500">Korvatunturi</p>
            </div>

            <div className="pt-3 border-t border-amber-200 text-center text-xs text-gray-500">
              Eduro-säätiö • {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
