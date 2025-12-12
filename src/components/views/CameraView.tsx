import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCw, Wand2 } from "lucide-react";

interface CameraViewProps {
  onCapture: (imageBase64: string) => void;
  onBack: () => void;
}

export const CameraView = ({ onCapture, onBack }: CameraViewProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Kameran käynnistys epäonnistui. Tarkista selaimen oikeudet.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw mirrored image
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);
    stopCamera();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  return (
    <div className="kiosk-card fade-in">
      <div className="text-center mb-6">
        <h1 className="kiosk-title font-display text-3xl md:text-4xl">
          Kamera – ota alkuperäinen kuva 📸
        </h1>
        <p className="kiosk-subtitle mt-2">
          Asetu kameran eteen ja hymyile! Kuvaa ei rajata pois tai korvata – se toimii sellaisenaan AI-muunnoksen pohjana.
        </p>
      </div>

      <div className="relative mx-auto max-w-lg">
        <div className="elf-portrait bg-muted overflow-hidden rounded-2xl border-4 border-primary/30">
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <p className="text-destructive">{error}</p>
            </div>
          ) : capturedImage ? (
            <img
              src={capturedImage}
              alt="Otettu kuva"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                </div>
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
                onLoadedData={() => setIsLoading(false)}
              />
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        {!capturedImage ? (
          <>
            <Button
              onClick={capturePhoto}
              variant="kiosk"
              size="kiosk"
              disabled={!stream || isLoading}
            >
              <Camera className="w-8 h-8 mr-3" />
              Ota kuva
            </Button>
          </>
        ) : (
          <>
          <Button
            onClick={handleConfirm}
            variant="kiosk"
            size="kiosk"
          >
            <Wand2 className="w-8 h-8 mr-3" />
            Käynnistä AI-muunnos ✨
          </Button>
            <Button
              onClick={retakePhoto}
              variant="kioskSecondary"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Ota uusi kuva
            </Button>
          </>
        )}
        
        <Button
          onClick={onBack}
          variant="kioskOutline"
        >
          Takaisin
        </Button>
      </div>
    </div>
  );
};
