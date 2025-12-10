import { useState } from "react";
import { KioskLayout } from "@/components/KioskLayout";
import { WelcomeView } from "@/components/views/WelcomeView";
import { QuizView } from "@/components/views/QuizView";
import { CameraView } from "@/components/views/CameraView";
import { LoadingView } from "@/components/views/LoadingView";
import { ResultView } from "@/components/views/ResultView";
import { CertificateView } from "@/components/views/CertificateView";
import { InfoView } from "@/components/views/InfoView";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { WizardStep, ElfData } from "@/types/elf";

const Index = () => {
  const [step, setStep] = useState<WizardStep>("welcome");
  const [elfData, setElfData] = useState<ElfData>({
    name: "",
    email: "",
    quizAnswer: "",
  });
  const [recordId, setRecordId] = useState<string>("");

  const handleWelcomeNext = (name: string, email: string) => {
    setElfData((prev) => ({ ...prev, name, email }));
    setStep("quiz");
  };

  const handleQuizNext = (answer: string) => {
    setElfData((prev) => ({ ...prev, quizAnswer: answer }));
    setStep("camera");
  };

  const handleCapture = async (imageBase64: string) => {
    setElfData((prev) => ({ ...prev, capturedImage: imageBase64 }));
    setStep("loading");

    try {
      const { data, error } = await supabase.functions.invoke("elf-image", {
        body: {
          name: elfData.name,
          email: elfData.email,
          quiz_answer: elfData.quizAnswer,
          image_base64: imageBase64,
        },
      });

      if (error) throw error;

      if (data?.success && data?.image_url) {
        setElfData((prev) => ({ ...prev, elfImageUrl: data.image_url }));
        setRecordId(data.id);
        setStep("result");
      } else {
        throw new Error("Kuvan generointi epäonnistui");
      }
    } catch (error) {
      console.error("Error generating elf image:", error);
      toast({
        title: "Virhe",
        description: "Tonttukuvan luominen epäonnistui. Yritä uudelleen.",
        variant: "destructive",
      });
      setStep("camera");
    }
  };

  const handleRestart = () => {
    setElfData({ name: "", email: "", quizAnswer: "" });
    setRecordId("");
    setStep("welcome");
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeView onNext={handleWelcomeNext} />;
      case "quiz":
        return (
          <QuizView
            name={elfData.name}
            onNext={handleQuizNext}
            onBack={() => setStep("welcome")}
          />
        );
      case "camera":
        return (
          <CameraView
            onCapture={handleCapture}
            onBack={() => setStep("quiz")}
          />
        );
      case "loading":
        return <LoadingView />;
      case "result":
        return (
          <ResultView
            name={elfData.name}
            email={elfData.email}
            elfImageUrl={elfData.elfImageUrl || ""}
            recordId={recordId}
            onViewCertificate={() => setStep("certificate")}
            onRestart={handleRestart}
          />
        );
      case "certificate":
        return (
          <CertificateView
            name={elfData.name}
            elfImageUrl={elfData.elfImageUrl || ""}
            onBack={() => setStep("result")}
          />
        );
      case "info":
        return <InfoView onBack={handleRestart} />;
      default:
        return <WelcomeView onNext={handleWelcomeNext} />;
    }
  };

  return (
    <KioskLayout showSnowfall={step !== "certificate"}>
      {renderStep()}
      
      {/* Info button - always visible except during loading and certificate */}
      {step !== "loading" && step !== "certificate" && step !== "info" && (
        <div className="fixed bottom-6 right-6 z-50 no-print">
          <Button
            onClick={() => setStep("info")}
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full bg-muted/80 hover:bg-muted border border-border"
          >
            <Info className="w-6 h-6" />
          </Button>
        </div>
      )}
    </KioskLayout>
  );
};

export default Index;
