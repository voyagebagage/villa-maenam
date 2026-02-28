/**
 * Three.js Panorama Viewer — 360° room tour
 */
import * as THREE from 'three';

export const rooms = [
  {
    num: '01 / 05',
    name: 'Welcome Pavilion',
    desc: 'The open-air arrival sala greets guests with lotus ponds, carved teak columns, and the scent of frangipani on the warm Gulf breeze.',
    img: '/pavilion_full.jpg',
    palette: {
      sky: ['#FF8C42','#E85D40','#C43A20','#1A1208'],
      floor: '#2A1E0E',
      accent: '#C4903A',
      walls: '#3D2A12'
    }
  },
  {
    num: '02 / 05',
    name: 'Master Suite',
    desc: 'Six private bedroom pavilions each feature four-poster beds draped in silk, open-air rain showers, and private garden terraces facing the Gulf.',
    palette: {
      sky: ['#F0E8D8','#D4C4A0','#A08060','#4A3020'],
      floor: '#3A2810',
      accent: '#E2B86A',
      walls: '#C4A878'
    }
  },
  {
    num: '03 / 05',
    name: 'Infinity Pool',
    desc: 'A 18-metre heated infinity pool suspended above the jungle canopy, appearing to flow seamlessly into the Gulf of Thailand at the horizon.',
    img: '/infinity_pool.jpg',
    palette: {
      sky: ['#0A3050','#0D4A6A','#1A7A9A','#5AC8E0'],
      floor: '#E8F4F8',
      accent: '#5AC8E0',
      walls: '#1A6080'
    }
  },
  {
    num: '04 / 05',
    name: 'Tropical Garden',
    desc: 'Wander 2.4 acres of manicured grounds where ancient frangipani trees, orchid-lined paths, and lotus ponds create a living tapestry.',
    palette: {
      sky: ['#0A2810','#1A4A28','#2A7A3A','#5AB050'],
      floor: '#1A3A18',
      accent: '#8AC840',
      walls: '#2A5A20'
    }
  },
  {
    num: '05 / 05',
    name: 'Dining Pavilion',
    desc: 'Dine beneath the stars in the open-air banquet sala where the private chef presents nightly five-course feasts of Thai and fusion cuisine.',
    palette: {
      sky: ['#0A0A18','#1A1A30','#0A0818','#0A0A18'],
      floor: '#2A1808',
      accent: '#FFD060',
      walls: '#1A1218'
    }
  }
];

export function initPanorama(canvas, getCurrentRoom, onRoomChange) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(80, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
  camera.position.set(0, 0, 0);

  // Sphere geometry (inside-out)
  const geo = new THREE.SphereGeometry(500, 60, 40);
  geo.scale(-1, 1, 1);

  const texture = generateRoomTexture(rooms[0].palette);
  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geo, mat);
  scene.add(sphere);

  // Load real image for first room if available
  if (rooms[0].img) {
    const loader = new THREE.TextureLoader();
    loader.load(rooms[0].img, (realTex) => {
      realTex.mapping = THREE.EquirectangularReflectionMapping;
      sphere.material.map = realTex;
      sphere.material.needsUpdate = true;
    });
  }

  // Drag interaction
  let isDown = false, lastX = 0, lastY = 0;
  let rotX = 0, rotY = 0;
  let velX = 0, velY = 0;

  const onMouseDown = (e) => { isDown = true; lastX = e.clientX; lastY = e.clientY; };
  const onTouchStart = (e) => { isDown = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY; };

  const onMouseMove = (e) => {
    if (!isDown) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    velX = dx * 0.005; velY = dy * 0.003;
    rotY += velX; rotX += velY;
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    lastX = e.clientX; lastY = e.clientY;
  };
  const onTouchMove = (e) => {
    if (!isDown) return;
    const dx = e.touches[0].clientX - lastX, dy = e.touches[0].clientY - lastY;
    velX = dx * 0.005; velY = dy * 0.003;
    rotY += velX; rotX += velY;
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
  };
  const onUp = () => { isDown = false; };

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('touchstart', onTouchStart);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('touchmove', onTouchMove);
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);

  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);
    if (!isDown) {
      velX *= 0.95; velY *= 0.95;
      rotY += velX; rotX += velY;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));
      rotY += 0.0008; // Auto-rotate
    }
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -rotY;
    camera.rotation.x = -rotX;
    renderer.render(scene, camera);
  }
  animate();

  const onResize = () => {
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);

  // Navigate to room
  function navigateToRoom(index) {
    const room = rooms[index];
    if (room.img) {
      const loader = new THREE.TextureLoader();
      loader.load(room.img, (realTex) => {
        realTex.mapping = THREE.EquirectangularReflectionMapping;
        sphere.material.map = realTex;
        sphere.material.needsUpdate = true;
      });
    } else {
      const newTex = generateRoomTexture(room.palette);
      sphere.material.map = newTex;
      sphere.material.needsUpdate = true;
    }
  }

  // Cleanup
  function cleanup() {
    cancelAnimationFrame(animId);
    canvas.removeEventListener('mousedown', onMouseDown);
    canvas.removeEventListener('touchstart', onTouchStart);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchend', onUp);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  }

  return { navigateToRoom, cleanup };
}

export function generateRoomTexture(palette) {
  const size = 2048;
  const c = document.createElement('canvas');
  c.width = size; c.height = size / 2;
  const ctx = c.getContext('2d');
  const W = c.width, H = c.height;

  // Sky / ceiling
  const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.45);
  palette.sky.forEach((col, i) => skyGrad.addColorStop(i / (palette.sky.length - 1), col));
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, H * 0.45);

  // Atmosphere glow
  const glow = ctx.createRadialGradient(W * 0.5, H * 0.15, 0, W * 0.5, H * 0.15, W * 0.4);
  glow.addColorStop(0, palette.accent + '60');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Horizon band
  const horiz = ctx.createLinearGradient(0, H * 0.4, 0, H * 0.55);
  horiz.addColorStop(0, palette.walls + 'AA');
  horiz.addColorStop(0.5, palette.walls);
  horiz.addColorStop(1, palette.floor + '88');
  ctx.fillStyle = horiz;
  ctx.fillRect(0, H * 0.4, W, H * 0.2);

  // Floor
  const floorGrad = ctx.createLinearGradient(0, H * 0.55, 0, H);
  floorGrad.addColorStop(0, palette.floor);
  floorGrad.addColorStop(1, darken(palette.floor, 0.5));
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, H * 0.55, W, H * 0.45);

  // Floor reflection
  const refl = ctx.createLinearGradient(0, H * 0.55, 0, H);
  refl.addColorStop(0, palette.accent + '20');
  refl.addColorStop(0.3, 'transparent');
  ctx.fillStyle = refl;
  ctx.fillRect(0, H * 0.55, W, H * 0.3);

  // Vertical pillars
  const pillarCount = 8;
  for (let i = 0; i < pillarCount; i++) {
    const px = (i / pillarCount) * W;
    const pillarG = ctx.createLinearGradient(px, H * 0.15, px + 20, H * 0.15);
    pillarG.addColorStop(0, palette.accent + '18');
    pillarG.addColorStop(0.5, palette.accent + '30');
    pillarG.addColorStop(1, palette.accent + '18');
    ctx.fillStyle = pillarG;
    ctx.fillRect(px, H * 0.1, 24, H * 0.5);
  }

  // Decorative elements
  drawRoomFeatures(ctx, W, H, palette);

  // Vignette
  const vigLeft = ctx.createLinearGradient(0, 0, W * 0.08, 0);
  vigLeft.addColorStop(0, 'rgba(0,0,0,0.5)');
  vigLeft.addColorStop(1, 'transparent');
  ctx.fillStyle = vigLeft;
  ctx.fillRect(0, 0, W * 0.08, H);

  const vigRight = ctx.createLinearGradient(W * 0.92, 0, W, 0);
  vigRight.addColorStop(0, 'transparent');
  vigRight.addColorStop(1, 'rgba(0,0,0,0.5)');
  ctx.fillStyle = vigRight;
  ctx.fillRect(W * 0.92, 0, W * 0.08, H);

  return new THREE.CanvasTexture(c);
}

function drawRoomFeatures(ctx, W, H, palette) {
  const isPool = palette.floor === '#E8F4F8';
  const isGarden = palette.sky[0] === '#0A2810';
  const isDining = palette.sky[0] === '#0A0A18';
  const isMaster = palette.walls === '#C4A878';

  if (isPool) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < 20; i++) {
      const cx = (Math.sin(i * 1.4) * 0.4 + 0.5) * W;
      const cy = H * 0.58 + (Math.cos(i * 1.7) * 0.1) * H;
      const r = 30 + i * 8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#5AC8E0';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.2;
    for (let y = H * 0.55; y < H * 0.7; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x < W; x += 40) {
        ctx.quadraticCurveTo(x + 20, y + Math.sin(x * 0.05) * 4, x + 40, y);
      }
      ctx.strokeStyle = '#80E0FF';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
  }

  if (isGarden) {
    ctx.save();
    for (let i = 0; i < 30; i++) {
      const gx = (Math.sin(i * 2.1) * 0.45 + 0.5) * W;
      const gy = H * 0.3 + Math.cos(i * 1.3) * H * 0.15;
      const gr = 20 + Math.abs(Math.sin(i)) * 40;
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
      g.addColorStop(0, '#3A7A28CC');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(gx, gy, gr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.15;
    for (let i = 0; i < 15; i++) {
      const lx = (Math.cos(i * 1.8) * 0.4 + 0.5) * W;
      const ly = H * 0.45 + Math.sin(i) * H * 0.1;
      const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 60);
      lg.addColorStop(0, '#D0FF80');
      lg.addColorStop(1, 'transparent');
      ctx.fillStyle = lg;
      ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();
  }

  if (isDining) {
    ctx.save();
    ctx.globalAlpha = 0.9;
    for (let i = 0; i < 200; i++) {
      const sx = (Math.sin(i * 2.3 + 0.1) * 0.5 + 0.5) * W;
      const sy = (Math.sin(i * 1.7 + 0.2) * 0.5 + 0.5) * H * 0.38;
      const sr = 0.5 + (i % 3) * 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,240,${180 + (i % 75)},${0.5 + (i % 50) * 0.01})`;
      ctx.fill();
    }
    for (let i = 0; i < 5; i++) {
      const cx = W * (0.1 + i * 0.2);
      const cy = H * 0.55;
      const flameG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
      flameG.addColorStop(0, 'rgba(255,200,80,0.5)');
      flameG.addColorStop(1, 'transparent');
      ctx.fillStyle = flameG;
      ctx.fillRect(cx - 80, cy - 80, 160, 160);
    }
    ctx.restore();
  }

  if (isMaster) {
    ctx.save();
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 6; i++) {
      const rx = W * (0.1 + i * 0.15);
      ctx.beginPath();
      ctx.moveTo(rx, 0);
      ctx.lineTo(rx - 60, H);
      ctx.lineTo(rx + 20, H);
      ctx.lineTo(rx + 80, 0);
      ctx.fillStyle = '#FFF0D0';
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.08;
    for (let x = 0; x < W; x += 80) {
      const wg = ctx.createLinearGradient(x, 0, x + 60, 0);
      wg.addColorStop(0, 'transparent');
      wg.addColorStop(0.5, '#FFFAE8');
      wg.addColorStop(1, 'transparent');
      ctx.fillStyle = wg;
      ctx.fillRect(x, H * 0.1, 60, H * 0.7);
    }
    ctx.restore();
  }

  // Atmospheric depth fog
  const fogGrad = ctx.createLinearGradient(0, H * 0.38, 0, H * 0.58);
  fogGrad.addColorStop(0, 'transparent');
  fogGrad.addColorStop(0.5, palette.walls + '40');
  fogGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, H * 0.38, W, H * 0.2);
}

function darken(hex, amount) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, ((num >> 16) & 255) * amount);
  const g = Math.max(0, ((num >> 8) & 255) * amount);
  const b = Math.max(0, (num & 255) * amount);
  return `rgb(${r},${g},${b})`;
}
