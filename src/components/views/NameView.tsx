import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Mail } from "lucide-react";

interface NameViewProps {
  onNext: (name: string, email?: string) => void;
  onBack: () => void;
}

export const NameView = ({ onNext, onBack }: NameViewProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isValid = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onNext(name.trim(), email.trim() || undefined);
  };

  return (
    <div className="kiosk-card fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="kiosk-title font-display text-3xl md:text-4xl">Kuka olet?</h1>
        <p className="kiosk-subtitle mt-2 max-w-2xl mx-auto">
          Kirjoita nimesi todistusta varten. Sähköposti on vapaaehtoinen – sitä käytetään vain osaamismerkin lähettämiseen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-medium text-foreground">
            Nimesi <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Kirjoita nimesi..."
              className="kiosk-input pl-12"
              autoComplete="off"
              minLength={2}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-medium text-foreground">
            Sähköposti <span className="text-muted-foreground text-base font-normal">(vapaaehtoinen)</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nimi@esimerkki.fi"
              className="kiosk-input pl-12"
              autoComplete="off"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Sähköpostia käytetään vain osaamismerkin lähettämiseen Open Badge Factory -palvelun kautta.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <Button type="submit" variant="kiosk" size="kiosk" disabled={!isValid}>
            Jatka lahjatoiveeseen ✨
          </Button>
          <Button type="button" variant="kioskOutline" onClick={onBack}>
            Takaisin
          </Button>
        </div>
      </form>
    </div>
  );
};
