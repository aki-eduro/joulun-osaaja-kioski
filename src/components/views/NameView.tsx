import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface NameViewProps {
  onNext: (name: string) => void;
  onBack: () => void;
}

export const NameView = ({ onNext, onBack }: NameViewProps) => {
  const [name, setName] = useState("");
  const isValid = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onNext(name.trim());
  };

  return (
    <div className="kiosk-card fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="kiosk-title font-display text-3xl md:text-4xl">Nimi</h1>
        <p className="kiosk-subtitle mt-2 max-w-2xl mx-auto">
          Kirjoita nimesi. Se näkyy todistuksessa juuri näin, joten varmista vähintään kaksi merkkiä.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-medium text-foreground">
            Nimesi <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kirjoita nimesi..."
            className="kiosk-input"
            autoComplete="off"
            minLength={2}
            required
          />
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" variant="kiosk" size="kiosk" disabled={!isValid}>
            Jatka lahjatoiveeseen
          </Button>
          <Button type="button" variant="kioskOutline" onClick={onBack}>
            Takaisin
          </Button>
        </div>
      </form>
    </div>
  );
};
