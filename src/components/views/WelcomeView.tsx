import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeViewProps {
  onStart: () => void;
}

export const WelcomeView = ({ onStart }: WelcomeViewProps) => {
  return (
    <div className="kiosk-card fade-in relative text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>
      <h1 className="kiosk-title font-display">Joulun Osaaja</h1>
      <p className="text-2xl md:text-3xl text-primary font-display mb-4">AI Tonttukioski</p>
      <p className="kiosk-subtitle max-w-2xl mx-auto">
        Muuta itsesi tontuksi tekoälyn avulla ja saat oman Joulun Osaaja -todistuksesi. Ei kirjautumista, ei sähköpostia – vain juhlaa!
      </p>

      <div className="mt-10 flex justify-center">
        <Button
          type="button"
          variant="kiosk"
          size="kiosk"
          className="max-w-sm"
          onClick={onStart}
        >
          Aloita
        </Button>
      </div>
    </div>
  );
};
