/**
 * Gallery Canvas Drawing Functions
 */

export function drawGallery() {
  const galleryItems = [
    { id: 'gc1', draw: drawGalleryPool },
    { id: 'gc2', draw: drawGallerySuite },
    { id: 'gc3', draw: drawGalleryGarden },
    { id: 'gc4', draw: drawGalleryDining },
    { id: 'gc5', draw: drawGallerySunrise },
  ];

  galleryItems.forEach(item => {
    const canvas = document.getElementById(item.id);
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.offsetWidth * 2;
    canvas.height = parent.offsetHeight * 2;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    item.draw(canvas.getContext('2d'), canvas.width, canvas.height);
  });
}

function drawGalleryPool(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0A2840');
  bg.addColorStop(0.4, '#0D4060');
  bg.addColorStop(0.6, '#1A7090');
  bg.addColorStop(1, '#0A3050');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const glow = ctx.createLinearGradient(0, H * 0.35, 0, H * 0.55);
  glow.addColorStop(0, 'rgba(255,150,50,0.4)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  const pool = ctx.createLinearGradient(0, H * 0.5, 0, H);
  pool.addColorStop(0, '#1A8AAA');
  pool.addColorStop(1, '#0A4060');
  ctx.fillStyle = pool; ctx.fillRect(0, H * 0.5, W, H * 0.5);

  ctx.save(); ctx.globalAlpha = 0.3;
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(0, H * 0.55 + i * 20);
    for (let x = 0; x < W; x += 30) {
      ctx.quadraticCurveTo(x + 15, H * 0.55 + i * 20 + Math.sin(x*0.1)*8, x+30, H * 0.55 + i * 20);
    }
    ctx.strokeStyle = '#80D8F0'; ctx.lineWidth = 1; ctx.stroke();
  }
  ctx.restore();

  const sunG = ctx.createRadialGradient(W*0.7, H*0.38, 0, W*0.7, H*0.38, 60);
  sunG.addColorStop(0, '#FFE080'); sunG.addColorStop(0.3, '#FF8030'); sunG.addColorStop(1, 'transparent');
  ctx.fillStyle = sunG; ctx.fillRect(0, 0, W, H);
}

function drawGallerySuite(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#F8F0E0'); bg.addColorStop(1, '#C8B898');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const light = ctx.createRadialGradient(W*0.3, H*0.2, 0, W*0.3, H*0.2, W*0.6);
  light.addColorStop(0, 'rgba(255,200,80,0.3)'); light.addColorStop(1, 'transparent');
  ctx.fillStyle = light; ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#8A6840'; ctx.fillRect(0, H*0.6, W, H*0.4);
  ctx.fillStyle = '#A07850';
  for(let i=0;i<W;i+=40){ctx.fillRect(i,H*0.6,20,H*0.4);}

  ctx.fillStyle = '#2A1808';
  ctx.fillRect(W*0.2, H*0.3, W*0.6, H*0.1);
  ctx.fillRect(W*0.22, H*0.1, 8, H*0.2);
  ctx.fillRect(W*0.76, H*0.1, 8, H*0.2);
  ctx.fillRect(W*0.2, H*0.05, W*0.6, 6);

  ctx.save(); ctx.globalAlpha = 0.15;
  for(let x=W*0.2;x<W*0.8;x+=30){
    const wg=ctx.createLinearGradient(x,0,x+20,0);
    wg.addColorStop(0,'transparent'); wg.addColorStop(0.5,'#FFF8E8'); wg.addColorStop(1,'transparent');
    ctx.fillStyle=wg; ctx.fillRect(x,H*0.05,20,H*0.55);
  }
  ctx.restore();
}

function drawGalleryGarden(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#4A8A30'); bg.addColorStop(0.5, '#2A5A18'); bg.addColorStop(1, '#1A3A10');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  ctx.save(); ctx.globalAlpha = 0.2;
  for(let i=0;i<20;i++){
    const lx=(Math.sin(i*1.7)*0.4+0.5)*W, ly=(Math.cos(i*1.3)*0.4+0.5)*H;
    const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,50);
    lg.addColorStop(0,'#D0FF80'); lg.addColorStop(1,'transparent');
    ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
  }
  ctx.restore();

  ctx.save();
  for(let i=0;i<40;i++){
    const fx=(Math.sin(i*2.1)*0.45+0.5)*W, fy=(Math.sin(i*1.8)*0.45+0.5)*H;
    const fr=15+Math.abs(Math.cos(i))*35;
    const g=ctx.createRadialGradient(fx,fy,0,fx,fy,fr);
    g.addColorStop(0,'rgba(80,160,40,0.8)'); g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(fx,fy,fr,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();

  ctx.fillStyle='rgba(180,160,120,0.4)';
  ctx.beginPath();
  ctx.moveTo(W*0.4,H); ctx.quadraticCurveTo(W*0.5,H*0.6,W*0.55,0);
  ctx.lineTo(W*0.65,0); ctx.quadraticCurveTo(W*0.6,H*0.6,W*0.6,H);
  ctx.fill();
}

function drawGalleryDining(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#0A0818'); bg.addColorStop(0.3, '#1A1430'); bg.addColorStop(1, '#0A0A18');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  ctx.save(); ctx.globalAlpha = 0.8;
  for(let i=0;i<100;i++){
    const sx=(Math.sin(i*2.3)*0.5+0.5)*W, sy=(Math.sin(i*1.7)*0.5+0.5)*H*0.5;
    ctx.beginPath(); ctx.arc(sx,sy,0.5+(i%3)*0.5,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,240,200,${0.4+Math.sin(i)*0.4})`; ctx.fill();
  }
  ctx.restore();

  for(let i=0;i<4;i++){
    const cx=W*(0.15+i*0.23), cy=H*0.65;
    const flG=ctx.createRadialGradient(cx,cy,0,cx,cy,80);
    flG.addColorStop(0,'rgba(255,180,40,0.5)'); flG.addColorStop(1,'transparent');
    ctx.fillStyle=flG; ctx.fillRect(cx-80,cy-80,160,160);
  }

  ctx.fillStyle='#1A0A04';
  ctx.fillRect(W*0.1,H*0.6,W*0.8,6);
  ctx.fillRect(W*0.1,H*0.62,W*0.8,H*0.1);
}

function drawGallerySunrise(ctx, W, H) {
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#1A0A20'); bg.addColorStop(0.3, '#6A2030');
  bg.addColorStop(0.6, '#E05030'); bg.addColorStop(0.8, '#F0A030');
  bg.addColorStop(1, '#F8C060');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  const hG=ctx.createRadialGradient(W*0.5,H*0.55,0,W*0.5,H*0.55,W*0.6);
  hG.addColorStop(0,'rgba(255,200,80,0.4)'); hG.addColorStop(1,'transparent');
  ctx.fillStyle=hG; ctx.fillRect(0,0,W,H);

  const sea=ctx.createLinearGradient(0,H*0.55,0,H);
  sea.addColorStop(0,'#204060'); sea.addColorStop(1,'#102030');
  ctx.fillStyle=sea; ctx.fillRect(0,H*0.55,W,H*0.45);

  ctx.fillStyle='rgba(20,10,5,0.7)';
  ctx.fillRect(0,H*0.75,W,4);
  for(let x=0;x<W;x+=30){ ctx.fillRect(x+12,H*0.55,3,H*0.2); }
}
