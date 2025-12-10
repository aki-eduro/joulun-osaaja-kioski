import { ReactNode } from "react";
import { Snowfall } from "./Snowfall";

interface KioskLayoutProps {
  children: ReactNode;
  showSnowfall?: boolean;
}

export const KioskLayout = ({ children, showSnowfall = true }: KioskLayoutProps) => {
  return (
    <div className="kiosk-container relative min-h-screen">
      {showSnowfall && <Snowfall />}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
