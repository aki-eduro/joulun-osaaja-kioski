import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Settings } from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";

interface WelcomeViewProps {
  onNext: (name: string, email: string) => void;
}

export const WelcomeView = ({ onNext }: WelcomeViewProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  // Name required (min 2 chars), email optional
  const isValid = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(name.trim(), email.trim());
    }
  };

  return (
    <div className="kiosk-card fade-in relative">
      {/* Settings button */}
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        aria-label="Asetukset"
      >
        <Settings className="w-5 h-5" />
      </button>

      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="kiosk-title font-display">
          Joulun Osaaja
        </h1>
        <p className="text-2xl md:text-3xl text-primary font-display mb-2">
          AI Tonttukioski
        </p>
        <p className="kiosk-subtitle">
          Tervetuloa! Muutu tontuksi tekoälyn avulla ja saa oma osaamismerkkisi.
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
            autoComplete="name"
            minLength={2}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-medium text-foreground">
            Sähköpostiosoitteesi <span className="text-muted-foreground text-sm">(vapaaehtoinen)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nimi@esimerkki.fi"
            className="kiosk-input"
            autoComplete="email"
          />
        </div>

        <p className="text-sm text-muted-foreground p-4 rounded-xl bg-muted/50">
          Sähköposti on vapaaehtoinen. Sitä käytetään vain osaamismerkin lähettämiseen.
        </p>

        <Button
          type="submit"
          variant="kiosk"
          size="kiosk"
          disabled={!isValid}
          className="mt-8"
        >
          Aloita seikkailu ✨
        </Button>
      </form>

      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
};
