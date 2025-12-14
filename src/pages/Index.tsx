import { useState } from "react";
import { KioskLayout } from "@/components/KioskLayout";
import { WelcomeView } from "@/components/views/WelcomeView";
import { CameraView } from "@/components/views/CameraView";
import { LoadingView } from "@/components/views/LoadingView";
import { ResultView } from "@/components/views/ResultView";
import { CertificateView } from "@/components/views/CertificateView";
import { toast } from "@/hooks/use-toast";
import type { WizardStep, ElfData } from "@/types/elf";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [step, setStep] = useState<WizardStep>("welcome");
  const [elfData, setElfData] = useState<ElfData>({
    name: "",
    wish: "",
    email: undefined,
  });

  const handleRestart = () => {
    setElfData({ name: "", wish: "", email: undefined, capturedImage: undefined, elfImageUrl: undefined, id: undefined });
    setStep("welcome");
  };

  const handleWelcomeNext = (name: string, wish: string, email?: string) => {
    setElfData((prev) => ({ ...prev, name, wish, email }));
    setStep("camera");
  };

  const handleCapture = async (imageBase64: string) => {
    setElfData((prev) => ({ ...prev, capturedImage: imageBase64 }));
    setStep("transform");

    try {
      // Call the AI edge function to generate elf image
      const { data, error } = await supabase.functions.invoke("elf-image", {
        body: {
          name: elfData.name,
          email: elfData.email || "",
          wish: elfData.wish,
          image_base64: imageBase64,
        },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || "AI-muunnos epäonnistui");

      setElfData((prev) => ({ 
        ...prev, 
        elfImageUrl: data.image_url,
        id: data.id 
      }));
      setStep("result");
    } catch (error) {
      console.error("Error generating elf image:", error);
      toast({
        title: "Virhe",
        description: error instanceof Error ? error.message : "AI-muunnos epäonnistui. Yritä uudelleen.",
        variant: "destructive",
      });
      setStep("camera");
    }
  };

  const handleViewCertificate = () => setStep("certificate");

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeView onStart={handleWelcomeNext} />;
      case "camera":
        return <CameraView onCapture={handleCapture} onBack={() => setStep("welcome")} />;
      case "transform":
        return <LoadingView />;
      case "result":
        return (
          <ResultView
            name={elfData.name}
            wish={elfData.wish}
            email={elfData.email || ""}
            elfImageUrl={elfData.elfImageUrl || elfData.capturedImage || ""}
            recordId={elfData.id || ""}
            onViewCertificate={handleViewCertificate}
            onRestart={handleRestart}
          />
        );
      case "certificate":
        return (
          <CertificateView
            name={elfData.name}
            wish={elfData.wish}
            elfImageUrl={elfData.elfImageUrl || elfData.capturedImage || ""}
            onBack={() => setStep("result")}
          />
        );
      default:
        return <WelcomeView onStart={handleWelcomeNext} />;
    }
  };

  return <KioskLayout showSnowfall>{renderStep()}</KioskLayout>;
};

export default Index;
