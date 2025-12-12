import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Image as ImageIcon } from "lucide-react";

interface WishViewProps {
  onNext: (wish: string, badgeImage?: string) => void;
  onBack: () => void;
  initialBadge?: string;
}

export const WishView = ({ onNext, onBack, initialBadge }: WishViewProps) => {
  const [wish, setWish] = useState("");
  const [badgePreview, setBadgePreview] = useState<string | undefined>(initialBadge);
  const maxLength = 160;

  useEffect(() => {
    if (initialBadge) {
      setBadgePreview(initialBadge);
    }
  }, [initialBadge]);

  const handleFile = (file?: File) => {
    if (!file) {
      setBadgePreview(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setBadgePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = wish.trim();
    if (!trimmed) return;
    onNext(trimmed, badgePreview);
  };

  return (
    <div className="kiosk-card fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Gift className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="kiosk-title font-display text-3xl md:text-4xl">Joulun supervoima & lahjatoive</h1>
        <p className="kiosk-subtitle mt-2 max-w-3xl mx-auto">
          Kerro joulun supervoimasi ja lahjatoiveesi. Tieto näkyy todistuksessa lainausmuodossa ja inspiroi taustaa AI-muunnoksessa.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="wish" className="block text-lg font-medium text-foreground">
            Toiveesi <span className="text-destructive">*</span>
          </label>
          <textarea
            id="wish"
            value={wish}
            onChange={(e) => setWish(e.target.value.slice(0, maxLength))}
            placeholder="Ystävällisyyttä maailmaan, uusia taitoja ja hyvää joulumieltä."
            className="kiosk-input min-h-[160px] resize-none"
            rows={5}
            maxLength={maxLength}
            required
          />
          <div className="text-right text-muted-foreground">
            <span className={wish.length >= maxLength ? "text-destructive" : ""}>{wish.length}</span> / {maxLength} merkkiä
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Liitä halutessasi oma PNG tai SVG -osaamismerkki. Se näytetään todistuksen alaosassa ilman ulkoisia kutsuja.
            </p>
            <label className="kiosk-button-secondary cursor-pointer flex items-center gap-3 justify-center">
              <ImageIcon className="w-5 h-5" />
              <span>{badgePreview ? "Vaihda osaamismerkki" : "Lisää osaamismerkki (PNG/SVG)"}</span>
              <input
                type="file"
                accept="image/png, image/svg+xml"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
            {badgePreview && (
              <button
                type="button"
                className="text-sm text-destructive underline"
                onClick={() => handleFile(undefined)}
              >
                Poista valittu merkki
              </button>
            )}
          </div>

          <div className="border border-border rounded-2xl bg-muted/40 p-4 w-full max-w-[180px] justify-self-end min-h-[160px] flex items-center justify-center">
            {badgePreview ? (
              <img src={badgePreview} alt="Oma osaamismerkki" className="max-h-32 max-w-full object-contain" />
            ) : (
              <div className="text-center text-muted-foreground text-sm">
                Ei merkkiä liitettynä
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button type="submit" variant="kiosk" size="kiosk" disabled={!wish.trim()}>
            Jatka kameraan
          </Button>
          <Button type="button" variant="kioskOutline" onClick={onBack}>
            Takaisin
          </Button>
        </div>
      </form>
    </div>
  );
};
