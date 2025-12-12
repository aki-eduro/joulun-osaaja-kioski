import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [badgeId, setBadgeId] = useState("");
  const [proxyUrl, setProxyUrl] = useState("");

  useEffect(() => {
    // Load saved settings from localStorage
    const savedBadgeId = localStorage.getItem("OBF_BADGE_ID") || "";
    const savedProxyUrl = localStorage.getItem("OBF_PROXY_URL") || "https://joulun-osaaja-obf-proxy.aki-oksala.workers.dev";
    setBadgeId(savedBadgeId);
    setProxyUrl(savedProxyUrl);
  }, [open]);

  const handleSave = () => {
    localStorage.setItem("OBF_BADGE_ID", badgeId.trim());
    localStorage.setItem("OBF_PROXY_URL", proxyUrl.trim());
    toast({
      title: "Asetukset tallennettu",
      description: "OBF-asetukset on tallennettu.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">OBF-asetukset</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Open Badge Factory -osaamismerkin asetukset. Nämä tallennetaan selaimen muistiin.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="badge-id" className="text-sm font-medium text-foreground">
              OBF Badge ID
            </label>
            <input
              id="badge-id"
              type="text"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              placeholder="esim. 5a1b2c3d4e5f6g7h8i9j0k"
              className="kiosk-input text-base py-3"
            />
            <p className="text-xs text-muted-foreground">
              Osaamismerkin tunnus Open Badge Factoryssa
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="proxy-url" className="text-sm font-medium text-foreground">
              OBF Proxy URL
            </label>
            <input
              id="proxy-url"
              type="url"
              value={proxyUrl}
              onChange={(e) => setProxyUrl(e.target.value)}
              placeholder="https://joulun-osaaja-obf-proxy.aki-oksala.workers.dev"
              className="kiosk-input text-base py-3"
            />
            <p className="text-xs text-muted-foreground">
              Cloudflare Worker -proxyn osoite OBF-kutsuille
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Peruuta
          </Button>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Tallenna
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
