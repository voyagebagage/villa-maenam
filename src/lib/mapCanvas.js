/**
 * Map Canvas Drawing Functions
 */

export function drawMapCanvas(canvas) {
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Sea background
  const seaG = ctx.createLinearGradient(0, 0, W, H);
  seaG.addColorStop(0, '#1A4A5A'); seaG.addColorStop(1, '#0D2A38');
  ctx.fillStyle = seaG; ctx.fillRect(0, 0, W, H);

  // Grid lines
  ctx.save(); ctx.globalAlpha = 0.08;
  ctx.strokeStyle = '#80C0D0'; ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  ctx.restore();

  // Koh Samui island shape
  const cx = W * 0.5, cy = H * 0.5;
  ctx.save();
  ctx.fillStyle = '#2A5030';
  ctx.beginPath();
  ctx.ellipse(cx, cy, W * 0.38, H * 0.42, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#3A6A3A';
  ctx.beginPath();
  ctx.ellipse(cx, cy, W * 0.3, H * 0.33, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#4A7A48';
  ctx.beginPath();
  ctx.ellipse(cx * 0.95, cy * 1.05, W * 0.18, H * 0.2, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Coastline highlight
  ctx.save();
  ctx.globalAlpha = 0.2;
  const coastG = ctx.createRadialGradient(cx, cy, W*0.35, cx, cy, W*0.45);
  coastG.addColorStop(0, 'transparent');
  coastG.addColorStop(0.7, '#80D0A0');
  coastG.addColorStop(1, 'transparent');
  ctx.fillStyle = coastG;
  ctx.fillRect(0, 0, W, H);
  ctx.restore();

  // Roads
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = '#C8A840'; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(cx, cy, W * 0.28, H * 0.3, -0.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Villa location dot
  const vx = cx - W * 0.05, vy = cy - H * 0.32;
  ctx.beginPath();
  ctx.arc(vx, vy, 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(196, 144, 58, 0.3)';
  ctx.fill();

  // Compass rose
  drawCompassRose(ctx, W * 0.88, H * 0.12, 28);
}

function drawCompassRose(ctx, x, y, r) {
  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(196, 144, 58, 0.5)'; ctx.lineWidth = 1; ctx.stroke();

  ctx.fillStyle = '#C4903A';
  ctx.beginPath(); ctx.moveTo(0, -r * 0.8); ctx.lineTo(-5, 0); ctx.lineTo(5, 0); ctx.closePath(); ctx.fill();

  ctx.fillStyle = 'rgba(196, 144, 58, 0.4)';
  ctx.beginPath(); ctx.moveTo(0, r * 0.8); ctx.lineTo(-5, 0); ctx.lineTo(5, 0); ctx.closePath(); ctx.fill();

  ctx.fillStyle = '#C4903A';
  ctx.font = '9px Jost'; ctx.textAlign = 'center';
  ctx.fillText('N', 0, -r - 4);

  ctx.restore();
}
