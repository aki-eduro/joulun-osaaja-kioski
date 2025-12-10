import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Database, Cloud, Award } from "lucide-react";

interface InfoViewProps {
  onBack: () => void;
}

export const InfoView = ({ onBack }: InfoViewProps) => {
  return (
    <div className="kiosk-card fade-in">
      <div className="text-center mb-8">
        <h1 className="kiosk-title font-display text-3xl md:text-4xl">
          Tietoa sovelluksesta
        </h1>
        <p className="kiosk-subtitle mt-2">
          Joulun Osaaja – AI Tonttukioski
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="p-6 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Tekoäly</h3>
              <p className="text-muted-foreground">
                Käytämme Google Generative AI -teknologiaa muuttaaksemme valokuvasi 
                suloiseksi tonttukuvaksi. Tekoäly säilyttää tunnistettavuutesi 
                samalla kun lisää joulutaian!
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Tietojen tallennus</h3>
              <p className="text-muted-foreground">
                Sovellus käyttää Supabase-alustaa turvalliseen tietojen tallennukseen. 
                Kuvat ja tiedot säilytetään vain tapahtuman ajan ja poistetaan sen jälkeen.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Open Badge -osaamismerkki</h3>
              <p className="text-muted-foreground">
                Saat Open Badge Factory -yhteensopivan osaamismerkin sähköpostiisi. 
                Merkki todistaa osallistumisesi ja voit lisätä sen CV:hesi tai 
                digitaaliseen portfolioosi.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Cloud className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Lovable-alusta</h3>
              <p className="text-muted-foreground">
                Tämä sovellus on rakennettu Lovable-alustalla, joka mahdollistaa 
                nopean ja tehokkaan sovelluskehityksen tekoälyn avulla.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={onBack} variant="kioskSecondary" className="w-full">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Takaisin alkuun
      </Button>
    </div>
  );
};
