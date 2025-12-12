import { Loader2, Sparkles } from "lucide-react";

export const LoadingView = () => {
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
          Muokataan tonttukuvaasi...
        </h1>

        <p className="kiosk-subtitle text-lg">
          Lisätään tonttulakki, korvat, asu ja jouluinen miljöö – omilla kasvonpiirteilläsi.
        </p>
        
        <div className="flex justify-center mt-8">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
        
        <p className="text-muted-foreground mt-6">
          Tämä voi kestää hetken...
        </p>
      </div>
    </div>
  );
};
