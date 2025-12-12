import { useState } from "react";
import { KioskLayout } from "@/components/KioskLayout";
import { WelcomeView } from "@/components/views/WelcomeView";
import { NameView } from "@/components/views/NameView";
import { WishView } from "@/components/views/WishView";
import { CameraView } from "@/components/views/CameraView";
import { LoadingView } from "@/components/views/LoadingView";
import { CertificateView } from "@/components/views/CertificateView";
import { toast } from "@/hooks/use-toast";
import type { WizardStep, ElfData } from "@/types/elf";
import { createElfPortrait } from "@/utils/elfImageGenerator";

const Index = () => {
  const [step, setStep] = useState<WizardStep>("welcome");
  const [elfData, setElfData] = useState<ElfData>({
    name: "",
    wish: "",
    badgeImage: undefined,
  });

  const handleRestart = () => {
    setElfData({ name: "", wish: "", badgeImage: undefined, capturedImage: undefined, elfImageUrl: undefined });
    setStep("welcome");
  };

  const handleWelcomeNext = () => setStep("name");

  const handleNameNext = (name: string) => {
    setElfData((prev) => ({ ...prev, name }));
    setStep("wish");
  };

  const handleWishNext = (wish: string, badgeImage?: string) => {
    setElfData((prev) => ({ ...prev, wish, badgeImage }));
    setStep("camera");
  };

  const handleCapture = async (imageBase64: string) => {
    setElfData((prev) => ({ ...prev, capturedImage: imageBase64 }));
    setStep("transform");

    try {
      const elfified = await createElfPortrait(imageBase64, elfData.wish, elfData.name);
      setElfData((prev) => ({ ...prev, elfImageUrl: elfified }));
      setStep("certificate");
    } catch (error) {
      console.error("Error generating elf image:", error);
      toast({
        title: "Virhe",
        description: "AI-muunnos epäonnistui. Yritä uudelleen.",
        variant: "destructive",
      });
      setStep("camera");
    }
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeView onStart={handleWelcomeNext} />;
      case "name":
        return <NameView onNext={handleNameNext} onBack={handleRestart} />;
      case "wish":
        return (
          <WishView
            onNext={handleWishNext}
            onBack={() => setStep("name")}
            initialBadge={elfData.badgeImage}
          />
        );
      case "camera":
        return <CameraView onCapture={handleCapture} onBack={() => setStep("wish")} />;
      case "transform":
        return <LoadingView />;
      case "certificate":
        return (
          <CertificateView
            name={elfData.name}
            elfImageUrl={elfData.elfImageUrl || elfData.capturedImage || ""}
            badgeImage={elfData.badgeImage}
            onBack={handleRestart}
          />
        );
      default:
        return <WelcomeView onStart={handleWelcomeNext} />;
    }
  };

  return <KioskLayout showSnowfall>{renderStep()}</KioskLayout>;
};

export default Index;
