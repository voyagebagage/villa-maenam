/**
 * Hero Canvas — Animated tropical sunset scene
 */
export function initHeroCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  let W, H;
  let animId;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function drawHero(t) {
    ctx.clearRect(0, 0, W, H);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
    sky.addColorStop(0, '#0D1F2D');
    sky.addColorStop(0.3, '#1A3A4A');
    sky.addColorStop(0.7, '#C4603A');
    sky.addColorStop(1, '#8B2020');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H * 0.65);

    // Sun glow
    const sunX = W * 0.65, sunY = H * 0.28;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * 0.4);
    sunGlow.addColorStop(0, 'rgba(230, 160, 40, 0.5)');
    sunGlow.addColorStop(0.3, 'rgba(220, 100, 30, 0.2)');
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, W, H);

    // Sun
    ctx.beginPath();
    ctx.arc(sunX, sunY, 40, 0, Math.PI * 2);
    const sunG = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 40);
    sunG.addColorStop(0, '#FFE0A0');
    sunG.addColorStop(0.5, '#F4A030');
    sunG.addColorStop(1, 'rgba(220,80,20,0.3)');
    ctx.fillStyle = sunG;
    ctx.fill();

    // Sea
    const sea = ctx.createLinearGradient(0, H * 0.55, 0, H);
    sea.addColorStop(0, '#1A4A5A');
    sea.addColorStop(0.3, '#0D3040');
    sea.addColorStop(1, '#071A28');
    ctx.fillStyle = sea;
    ctx.fillRect(0, H * 0.55, W, H * 0.45);

    // Sea shimmer
    ctx.save();
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 8; i++) {
      const y = H * 0.58 + i * 28 + Math.sin(t * 0.001 + i) * 6;
      const shimmerG = ctx.createLinearGradient(0, y, W, y);
      shimmerG.addColorStop(0, 'transparent');
      shimmerG.addColorStop(0.3, 'rgba(220,160,60,0.8)');
      shimmerG.addColorStop(0.7, 'rgba(220,160,60,0.8)');
      shimmerG.addColorStop(1, 'transparent');
      ctx.fillStyle = shimmerG;
      ctx.fillRect(0, y, W, 1.5);
    }
    ctx.restore();

    // Distant islands
    for (let i = 0; i < 3; i++) {
      const ix = W * (0.05 + i * 0.3), iy = H * 0.52;
      const iw = 80 + i * 40, ih = 20 + i * 10;
      const islandG = ctx.createLinearGradient(ix, iy - ih, ix, iy);
      islandG.addColorStop(0, '#1A3028');
      islandG.addColorStop(1, '#0D2018');
      ctx.fillStyle = islandG;
      ctx.beginPath();
      ctx.ellipse(ix, iy, iw, ih, 0, Math.PI, 0, true);
      ctx.fill();
    }

    // Foreground jungle silhouette
    ctx.fillStyle = '#0A1A10';
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W * 0.35; x += 20) {
      const y = H * 0.62 + Math.sin(x * 0.02 + 1) * 30 - Math.max(0, (W * 0.2 - x) * 0.5);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W * 0.35, H);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(W * 0.55, H);
    for (let x = W * 0.55; x <= W; x += 20) {
      const y = H * 0.6 + Math.sin(x * 0.015) * 35 - Math.max(0, (x - W * 0.8) * 0.4);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    ctx.fill();

    // Palm trees
    drawPalm(ctx, W * 0.12, H * 0.7, H * 0.28, t);
    drawPalm(ctx, W * 0.88, H * 0.68, H * 0.25, t);
    drawPalm(ctx, W * 0.05, H * 0.82, H * 0.2, t);

    // Villa silhouette
    drawVillaSilhouette(ctx, W * 0.38, H * 0.52, t);

    // Stars
    ctx.save();
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 80; i++) {
      const sx = (Math.sin(i * 2.3) * 0.5 + 0.5) * W;
      const sy = (Math.sin(i * 1.7) * 0.5 + 0.5) * H * 0.4;
      const sr = 0.5 + Math.sin(t * 0.002 + i) * 0.3;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(0.2, sr), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,240,200,0.8)';
      ctx.fill();
    }
    ctx.restore();
  }

  function animate(t) {
    drawHero(t);
    animId = requestAnimationFrame(animate);
  }
  animId = requestAnimationFrame(animate);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
  };
}

function drawPalm(ctx, x, y, h, t) {
  const sway = Math.sin(t * 0.001) * 0.06;
  ctx.save();
  ctx.translate(x, y);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(h * sway * 2, -h * 0.5, h * sway * 3, -h);
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#1A2010';
  ctx.stroke();

  const tipX = h * sway * 3, tipY = -h;
  ctx.lineWidth = 2;
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + sway;
    const fl = h * 0.4;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    const fx = tipX + Math.cos(angle) * fl;
    const fy = tipY + Math.sin(angle) * fl * 0.5;
    ctx.quadraticCurveTo(
      tipX + Math.cos(angle) * fl * 0.5,
      tipY + Math.sin(angle) * fl * 0.3 - 20,
      fx, fy
    );
    ctx.strokeStyle = '#1A3010';
    ctx.stroke();
  }
  ctx.restore();
}

function drawVillaSilhouette(ctx, x, y) {
  ctx.save();
  ctx.fillStyle = '#0C1A0E';

  ctx.beginPath();
  ctx.moveTo(x - 120, y + 20);
  ctx.lineTo(x - 80, y - 30);
  ctx.quadraticCurveTo(x, y - 60, x + 80, y - 30);
  ctx.lineTo(x + 120, y + 20);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y - 60);
  ctx.lineTo(x - 5, y - 90);
  ctx.lineTo(x, y - 85);
  ctx.lineTo(x + 5, y - 90);
  ctx.closePath();
  ctx.fill();

  ctx.fillRect(x - 90, y + 20, 180, 50);

  for (let i = -3; i <= 3; i++) {
    ctx.fillRect(x + i * 24 - 3, y - 10, 6, 30);
  }

  ctx.fillStyle = 'rgba(255, 180, 60, 0.5)';
  for (let i = -2; i <= 2; i++) {
    ctx.fillRect(x + i * 28 - 6, y + 28, 12, 16);
  }
  ctx.restore();
}
