import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";

interface QuizViewProps {
  name: string;
  onNext: (answer: string) => void;
  onBack: () => void;
}

export const QuizView = ({ name, onNext, onBack }: QuizViewProps) => {
  const [answer, setAnswer] = useState("");
  const maxLength = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onNext(answer.trim());
    }
  };

  return (
    <div className="kiosk-card fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-accent-foreground" />
          </div>
        </div>
        <h1 className="kiosk-title font-display text-3xl md:text-4xl">
          Hei {name}! 👋
        </h1>
        <p className="kiosk-subtitle mt-4">
          Yksi kysymys sinulle ennen tonttukuvaa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label htmlFor="quiz" className="block text-xl font-medium text-foreground text-center">
            Kerro lyhyesti, miten toivoisit tekoälyn auttavan sinua joulun aikaan?
          </label>
          <textarea
            id="quiz"
            value={answer}
            onChange={(e) => setAnswer(e.target.value.slice(0, maxLength))}
            placeholder="Esimerkiksi: Toivoisin tekoälyn auttavan lahjaostoksissa..."
            className="kiosk-input min-h-[160px] resize-none"
            rows={5}
          />
          <div className="text-right text-muted-foreground">
            {answer.length} / {maxLength} merkkiä
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Button
            type="submit"
            variant="kiosk"
            size="kiosk"
            disabled={!answer.trim()}
          >
            Jatka kameraan
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
          
          <Button
            type="button"
            variant="kioskOutline"
            onClick={onBack}
          >
            Takaisin
          </Button>
        </div>
      </form>
    </div>
  );
};
