export const createElfPortrait = async (
  base64Image: string,
  wish: string,
  name: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const width = 900;
      const height = 1200;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0f1c3f");
      gradient.addColorStop(0.5, "#11294f");
      gradient.addColorStop(1, "#0b1633");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle snow dots
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw original image without cropping
      const maxW = width * 0.82;
      const maxH = height * 0.72;
      const scale = Math.min(maxW / image.width, maxH / image.height);
      const drawW = image.width * scale;
      const drawH = image.height * scale;
      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2 + 30;

      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(offsetX - 12, offsetY - 12, drawW + 24, drawH + 24);
      ctx.drawImage(image, offsetX, offsetY, drawW, drawH);
      ctx.restore();

      // Costume overlay
      ctx.fillStyle = "rgba(190, 24, 35, 0.55)";
      const jacketY = offsetY + drawH * 0.65;
      const jacketH = drawH * 0.35;
      const r = 18;
      ctx.beginPath();
      ctx.moveTo(offsetX + r, jacketY);
      ctx.lineTo(offsetX + drawW - r, jacketY);
      ctx.quadraticCurveTo(offsetX + drawW, jacketY, offsetX + drawW, jacketY + r);
      ctx.lineTo(offsetX + drawW, jacketY + jacketH - r);
      ctx.quadraticCurveTo(offsetX + drawW, jacketY + jacketH, offsetX + drawW - r, jacketY + jacketH);
      ctx.lineTo(offsetX + r, jacketY + jacketH);
      ctx.quadraticCurveTo(offsetX, jacketY + jacketH, offsetX, jacketY + jacketH - r);
      ctx.lineTo(offsetX, jacketY + r);
      ctx.quadraticCurveTo(offsetX, jacketY, offsetX + r, jacketY);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "rgba(250, 204, 21, 0.8)";
      ctx.fillRect(offsetX + drawW / 2 - 6, jacketY, 12, jacketH);

      // Ears
      const earY = offsetY + drawH * 0.35;
      const earSize = Math.min(drawW, drawH) * 0.12;
      ctx.fillStyle = "#f5d0c5";
      ctx.beginPath();
      ctx.ellipse(offsetX - earSize * 0.4, earY, earSize, earSize * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(offsetX + drawW + earSize * 0.4, earY, earSize, earSize * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Hat
      const hatWidth = drawW * 0.6;
      const hatHeight = drawH * 0.35;
      const hatX = width / 2 - hatWidth / 2;
      const hatY = offsetY - hatHeight * 0.3;
      ctx.fillStyle = "#b91c1c";
      ctx.beginPath();
      ctx.moveTo(hatX, hatY + hatHeight);
      ctx.lineTo(hatX + hatWidth / 2, hatY);
      ctx.lineTo(hatX + hatWidth, hatY + hatHeight);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fde68a";
      ctx.fillRect(hatX - 10, hatY + hatHeight - 18, hatWidth + 20, 26);
      ctx.fillStyle = "#facc15";
      ctx.beginPath();
      ctx.arc(hatX + hatWidth / 2, hatY - 8, 16, 0, Math.PI * 2);
      ctx.fill();

      // Festive accents
      ctx.strokeStyle = "rgba(250, 204, 21, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(offsetX - 8, offsetY - 8, drawW + 16, drawH + 16);

      // Light for wish
      ctx.fillStyle = "rgba(250, 204, 21, 0.08)";
      ctx.beginPath();
      ctx.ellipse(width / 2, height - 220, width * 0.75, 260, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wish overlay
      const maxWish = wish.length > 160 ? `${wish.slice(0, 157)}…` : wish;
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "24px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`“${maxWish}”`, width / 2, height - 120, width * 0.8);

      // Name watermark
      ctx.font = "700 32px 'Playfair Display', serif";
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.fillText(name, width / 2, offsetY + drawH + 80);

      const url = canvas.toDataURL("image/png", 0.9);
      resolve(url);
    };

    image.onerror = (err) => reject(err);
    image.src = base64Image;
  });
};
