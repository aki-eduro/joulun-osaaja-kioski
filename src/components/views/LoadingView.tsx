import { Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const christmasFacts = [
  "Tiesitkö? Tontut työskentelevät 364 päivää vuodessa – jouluaatto on vapaapäivä! 🎄",
  "Joulupukin paja sijaitsee Korvatunturilla, jossa on aina sopivasti pakkasta! ❄️",
  "Porot pystyvät näkemään ultraviolettivaloa – siksi ne löytävät tien pimeässä! 🦌",
  "Ensimmäinen sähköinen jouluvalo syttyi vuonna 1882! 💡",
  "Tontut pitävät glögin lämpimänä erityisellä tonttutaikuudella! ☕",
  "Joulupukki lukee kaikki kirjeet – myös sähköpostit nykyään! 📧",
  "Korvatunturin pajalla on wifi – miten muuten lahjalistat päivittyisivät? 📶",
  "Tontut käyttävät AI:ta lahjojen pakkaamisessa – he ovat edistyksellisiä! 🤖",
  "Porojen lempiruoka on jäkälä, mutta ne tykkäävät myös porkkanoista! 🥕",
  "Joulupukin parta on kasvanut jo yli 400 vuotta! 🎅",
];

export const LoadingView = () => {
  const [factIndex, setFactIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setFactIndex((prev) => (prev + 1) % christmasFacts.length);
        setFadeIn(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="kiosk-card fade-in">
      <div className="text-center py-12">
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-primary animate-bounce" />
          </div>
        </div>

        <h1 className="kiosk-title font-display text-3xl md:text-4xl mb-4">
          Tonttumagia käynnissä...
        </h1>

        <p className="kiosk-subtitle text-lg mb-8">
          Lisätään tonttulakki, korvat ja jouluinen tunnelma!
        </p>
        
        {/* Christmas fact with fade transition */}
        <div 
          className={`bg-card/50 border border-primary/30 rounded-xl p-6 max-w-md mx-auto mb-8 transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-foreground text-lg leading-relaxed">
            {christmasFacts[factIndex]}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      </div>
    </div>
  );
};
