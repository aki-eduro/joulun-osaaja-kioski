import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Settings } from "lucide-react";
import { SettingsModal } from "@/components/SettingsModal";

interface WelcomeViewProps {
  onStart: (name: string, wish: string, email?: string) => void;
}

export const WelcomeView = ({ onStart }: WelcomeViewProps) => {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [email, setEmail] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const maxWishLength = 80;

  const isValid = name.trim().length >= 2 && wish.trim().length >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onStart(name.trim(), wish.trim(), email.trim() || undefined);
    }
  };

  return (
    <div className="kiosk-card fade-in relative">
      {/* Settings Button */}
      <button
        type="button"
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
        aria-label="Asetukset"
      >
        <Settings className="w-5 h-5" />
      </button>

      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center pulse-glow">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="kiosk-title font-display">Joulun Osaaja</h1>
        <p className="text-2xl md:text-3xl text-primary font-display mb-4">AI Tonttukioski</p>
        <p className="kiosk-subtitle max-w-2xl mx-auto">
          Muuta itsesi tontuksi tekoälyn avulla ja saat oman Joulun Osaaja -todistuksesi!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        {/* Name Input */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-medium text-foreground">
            Nimi <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kirjoita nimesi"
            className="kiosk-input"
            required
            autoComplete="name"
          />
        </div>

        {/* Wish Input */}
        <div className="space-y-2">
          <label htmlFor="wish" className="block text-lg font-medium text-foreground">
            Lahjatoive <span className="text-destructive">*</span>
          </label>
          <input
            id="wish"
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value.slice(0, maxWishLength))}
            placeholder="Esim. moottorikelkka, suklaa, Lego, uusi läppäri…"
            className="kiosk-input"
            maxLength={maxWishLength}
            required
          />
          <div className="text-right text-sm text-muted-foreground">
            <span className={wish.length >= maxWishLength ? "text-destructive" : ""}>{wish.length}</span> / {maxWishLength}
          </div>
        </div>

        {/* Email Input (Optional) */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-medium text-foreground">
            Sähköposti <span className="text-muted-foreground font-normal">(vapaaehtoinen)</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="anna@esimerkki.fi"
            className="kiosk-input"
            autoComplete="email"
          />
          <p className="text-sm text-muted-foreground">
            Sähköpostia käytetään vain osaamismerkin lähettämiseen.
          </p>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="kiosk"
            size="kiosk"
            className="w-full"
            disabled={!isValid}
          >
            Jatka ✨
          </Button>
        </div>
      </form>

      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
};
