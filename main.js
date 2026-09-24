// ============================================
// FUTURISTIC SCI-FI PRELOADER ENGINE
// ============================================
function initSitePreloaderEngine() {
  const preloader = document.getElementById('site-preloader');
  const fill = document.getElementById('preloader-fill');
  const percentText = document.getElementById('preloader-percent');
  const statusText = document.getElementById('preloader-status-text');

  if (!preloader || !fill || !percentText) return;

  let progress = 0;
  const statusMessages = [
    { at: 15, msg: "INITIALIZING VIPER CORE SYSTEM..." },
    { at: 45, msg: "CONNECTING CLOUD ARCHITECTURE..." },
    { at: 75, msg: "ENGAGING 3D AI ASSISTANT (ALEX)..." },
    { at: 95, msg: "SYSTEM READY." }
  ];

  const startTime = performance.now();
  const duration = 2200; // 2.2s smooth loading experience

  function updatePreloader(now) {
    const elapsed = now - startTime;
    progress = Math.min(Math.floor((elapsed / duration) * 100), 100);

    fill.style.width = `${progress}%`;
    percentText.textContent = `${progress}%`;

    for (let i = statusMessages.length - 1; i >= 0; i--) {
      if (progress >= statusMessages[i].at) {
        statusText.textContent = statusMessages[i].msg;
        break;
      }
    }

    if (progress < 100) {
      requestAnimationFrame(updatePreloader);
    } else {
      setTimeout(() => {
        playSciFiBeep('chirp');
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 750);
      }, 300);
    }
  }

  requestAnimationFrame(updatePreloader);
}

// ============================================
// AI ROBOT GUIDE SPEECH MESSAGES BY SECTION
// ============================================
const ROBOT_GUIDE_SPEECH = [
  {
    range: [0, 0.20],
    message: "👋 Welcome to Viper Intelligence! I am VIPER BOT (Alex), your AI companion. Type any question in the chat box or click topic buttons to talk with me!",
    eyeState: 'happy'
  },
  {
    range: [0.20, 0.45],
    message: "💡 We build high-speed web apps, native mobile applications, & cloud infrastructure tailored for growth.",
    eyeState: 'smart'
  },
  {
    range: [0.45, 0.70],
    message: "🚀 Check out our live client platforms: Master IELTS AI, Specialty Coffee Cafe, & Angel Family Dentistry!",
    eyeState: 'star'
  },
  {
    range: [0.70, 0.88],
    message: "⚡ Need Web Dev, Mobile App, or Branding? Click any service card to inspect full capabilities!",
    eyeState: 'love'
  },
  {
    range: [0.88, 1.0],
    message: "📩 Ready to elevate your business online? Fill out our contact inquiry form below for direct WhatsApp response from Subash!",
    eyeState: 'happy'
  }
];

const TOPIC_VOICE_RESPONSES = {
  services: {
    message: "⚡ We offer custom web development, native iOS & Android app development, cloud hosting, and branding design systems! Click any card to explore!",
    eyeState: 'smart'
  },
  projects: {
    message: "🚀 Explore our live production deliverables: Master IELTS AI, Specialty Coffee Cafe, and Angel Family Dentistry! Click visit project to open live sites!",
    eyeState: 'star'
  },
  pricing: {
    message: "💎 We offer flexible pricing tiers: Startup Launch at Rs 10,000, Scale & Business at Rs 30,000, and Enterprise Custom at Rs 50,000+!",
    eyeState: 'love'
  },
  contact: {
    message: "📩 Ready to launch your project online? Fill out our inquiry form or click send message to chat directly with Subash Bhandari on WhatsApp at +977 9763876490!",
    eyeState: 'happy'
  },
  whatsapp: {
    message: "💬 Launching direct WhatsApp connection with Lead Architect Subash Bhandari (+977 9763876490). You can book your project directly!",
    eyeState: 'happy'
  }
};

const ROBOT_VOICE_QUOTES = [
  "Hello there! I am VIPER BOT (Alex), your AI companion! Welcome to Viper Intelligence founded by Subash Bhandari and Rohan Aacharya!",
  "Beep boop! All systems operating at peak performance! You can type any question in our live chat box above!",
  "Need custom branding or interactive 3D web graphics? Viper Intelligence has got you covered! Let's build something extraordinary together!",
  "Ready to go online with your business? Contact Subash Bhandari directly on WhatsApp at +977 9763876490!"
];

// Web Audio API Sci-Fi Sound Effects
function playSciFiBeep(type = 'chirp') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'chirp') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'talk') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.08);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.18);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    }
  } catch (e) {}
}

// Web Speech Synthesis Voice Helper (Strips emojis so browser doesn't speak emoji names)
function speakRobotMessage(text) {
  playSciFiBeep('talk');
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop ongoing speech
    
    // Clean emojis from spoken text so speech engine reads clean sentences
    const cleanSpeechText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}]/gu, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.pitch = 1.35; // Cute sci-fi robot voice pitch
    utterance.rate = 1.05;  // Energetic robotic rhythm
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

// Helper to draw rounded rectangles on HTML Canvas
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Draw Pure Canvas Vector Trident Emblem (100% WebGL CORS Safe on file://)
function drawVectorTridentLogo(ctx, cx, cy, scale, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = color;
  ctx.shadowBlur = 25;

  // Center Spear Tip
  ctx.beginPath();
  ctx.moveTo(0, -85);
  ctx.lineTo(-16, -40);
  ctx.lineTo(-7, -40);
  ctx.lineTo(-7, 45);
  ctx.lineTo(7, 45);
  ctx.lineTo(7, -40);
  ctx.lineTo(16, -40);
  ctx.closePath();
  ctx.fill();

  // Left Curved Wing Prong
  ctx.beginPath();
  ctx.moveTo(-7, 10);
  ctx.bezierCurveTo(-45, 10, -50, -25, -50, -55);
  ctx.lineTo(-58, -35);
  ctx.lineTo(-42, -35);
  ctx.lineTo(-50, -55);
  ctx.stroke();

  // Right Curved Wing Prong
  ctx.beginPath();
  ctx.moveTo(7, 10);
  ctx.bezierCurveTo(45, 10, 50, -25, 50, -55);
  ctx.lineTo(58, -35);
  ctx.lineTo(42, -35);
  ctx.lineTo(50, -55);
  ctx.stroke();

  // Base Shaft
  ctx.beginPath();
  ctx.moveTo(0, 45);
  ctx.lineTo(0, 85);
  ctx.stroke();

  ctx.restore();
}

// ============================================
// 1. VIPER INTELLIGENCE BRANDED CYBER MATRIX GRID
// ============================================
function initMatrixGridCanvas() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const fontPx = 13;
  const colSpacing = 22;
  const rowSpacing = 20;

  let cols = Math.floor(width / colSpacing);
  let rows = Math.floor(height / rowSpacing);

  const PHRASE = "VIPER INTELLIGENCE ";

  let grid = [];
  function createGrid() {
    cols = Math.floor(width / colSpacing);
    rows = Math.floor(height / rowSpacing);
    grid = [];
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        // Sequentially spell out VIPER INTELLIGENCE across the entire grid
        const charIdx = (r * 7 + c) % PHRASE.length;
        const letter = PHRASE[charIdx] === ' ' ? '·' : PHRASE[charIdx];
        row.push({
          val: letter,
          bright: Math.random() < 0.08 ? 0.95 : (Math.random() < 0.22 ? 0.4 : 0.12),
          isViper: (letter === 'V' || letter === 'I' || letter === 'P' || letter === 'E' || letter === 'R')
        });
      }
      grid.push(row);
    }
  }

  createGrid();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createGrid();
  });

  let waveOffset = 0;

  function renderGrid() {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `bold ${fontPx}px "JetBrains Mono", monospace`;

    waveOffset += 0.035;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = grid[r][c];

        // Random subtle pulse
        if (Math.random() < 0.008) {
          cell.bright = Math.random() < 0.12 ? 0.95 : 0.2;
        }

        const x = c * colSpacing + 10;
        const y = r * rowSpacing + 16;

        // Diagonal cyber energy wave flowing through the letters
        const wave = Math.sin((r * 0.25) - waveOffset + (c * 0.08));
        const finalBright = Math.min(1, Math.max(0.12, cell.bright + (wave > 0.72 ? 0.6 : 0)));

        if (finalBright > 0.65) {
          if (cell.isViper) {
            ctx.fillStyle = `rgba(255, 107, 0, ${finalBright})`; // Glowing Orange for VIPER
            ctx.shadowColor = '#ff6b00';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = `rgba(16, 185, 129, ${finalBright})`; // Glowing Emerald
            ctx.shadowColor = '#10b981';
            ctx.shadowBlur = 8;
          }
        } else if (finalBright > 0.25) {
          ctx.fillStyle = `rgba(56, 189, 248, ${finalBright})`; // Electric Cyan
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${finalBright * 0.4})`; // Muted Ambient
          ctx.shadowBlur = 0;
        }

        ctx.fillText(cell.val, x, y);
      }
    }
    ctx.shadowBlur = 0;

    requestAnimationFrame(renderGrid);
  }

  renderGrid();
}

// ============================================
// 2. 6-SIDED HOLOGRAPHIC SERVICE MATRIX CUBE (3D ENGINE - CRISP HD TYPOGRAPHY)
// ============================================

// Base Panel Renderer for 1024x1024 Glass Display Tiles (Razor-Sharp Contrast)
function drawPanelBase(ctx, titleBadge, primaryColor, secondaryColor) {
  // 1. Deep Obsidian Sapphire Glass Background with Radial Vignette
  const bgGrad = ctx.createRadialGradient(512, 512, 60, 512, 512, 620);
  bgGrad.addColorStop(0, '#040a14');
  bgGrad.addColorStop(0.65, '#02060d');
  bgGrad.addColorStop(1, '#010308');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Micro Cyber Grid (Subtle high-tech backdrop without text interference)
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 48;
  for (let x = gridSize; x < 1024; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x, 984);
    ctx.stroke();
  }
  for (let y = gridSize; y < 1024; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(984, y);
    ctx.stroke();
  }

  // 3. Outer 45-Degree Chamfered Glass Bezel
  const pad = 36, w = 1024 - pad * 2, h = 1024 - pad * 2, cut = 64;
  ctx.beginPath();
  ctx.moveTo(pad + cut, pad);
  ctx.lineTo(pad + w - cut, pad);
  ctx.lineTo(pad + w, pad + cut);
  ctx.lineTo(pad + w, pad + h - cut);
  ctx.lineTo(pad + w - cut, pad + h);
  ctx.lineTo(pad + cut, pad + h);
  ctx.lineTo(pad, pad + h - cut);
  ctx.lineTo(pad, pad + cut);
  ctx.closePath();

  const borderGrad = ctx.createLinearGradient(pad, pad, pad + w, pad + h);
  borderGrad.addColorStop(0, primaryColor);
  borderGrad.addColorStop(0.5, '#ffffff');
  borderGrad.addColorStop(1, secondaryColor);

  ctx.lineWidth = 4;
  ctx.strokeStyle = borderGrad;
  ctx.shadowColor = primaryColor;
  ctx.shadowBlur = 14;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 4. Inner Hairline Accent Frame
  ctx.beginPath();
  const iPad = pad + 16, iW = w - 32, iH = h - 32, iCut = cut - 10;
  ctx.moveTo(iPad + iCut, iPad);
  ctx.lineTo(iPad + iW - iCut, iPad);
  ctx.lineTo(iPad + iW, iPad + iCut);
  ctx.lineTo(iPad + iW, iPad + iH - iCut);
  ctx.lineTo(iPad + iW - iCut, iPad + iH);
  ctx.lineTo(iPad + iCut, iPad + iH);
  ctx.lineTo(iPad, iPad + iH - iCut);
  ctx.lineTo(iPad, iPad + iCut);
  ctx.closePath();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.stroke();

  // 5. Corner L-Brackets & Solder Vias
  const cArm = 32;
  const corners = [
    { x: pad + 40, y: pad + 40, dx: 1, dy: 1 },
    { x: pad + w - 40, y: pad + 40, dx: -1, dy: 1 },
    { x: pad + 40, y: pad + h - 40, dx: 1, dy: -1 },
    { x: pad + w - 40, y: pad + h - 40, dx: -1, dy: -1 }
  ];
  corners.forEach(c => {
    ctx.beginPath();
    ctx.moveTo(c.x, c.y + c.dy * cArm);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(c.x + c.dx * cArm, c.y);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = secondaryColor;
    ctx.shadowColor = secondaryColor;
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Micro Solder Via
    ctx.beginPath();
    ctx.arc(c.x + c.dx * 10, c.y + c.dy * 10, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  });

  // 6. Top Service Telemetry Badge
  if (titleBadge) {
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillStyle = primaryColor;
    ctx.textAlign = 'center';
    ctx.fillText(titleBadge, 512, pad + 44);
  }
}

// Dual-Pass Razor Sharp Title Renderer (Crisp White Core + Ambient Backdrop Glow)
function drawCrispTitle(ctx, line1, line2, y1, y2, glowColor) {
  ctx.font = '900 52px Orbitron, Outfit, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '3px';

  // Pass 1: Subtle Backdrop Neon Glow
  ctx.shadowColor = glowColor;
  ctx.shadowBlur = 8;
  ctx.fillStyle = glowColor;
  ctx.fillText(line1, 512, y1);
  if (line2) ctx.fillText(line2, 512, y2);

  // Pass 2: 100% Razor-Sharp White Core (Zero Blur Halo Overlap)
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(line1, 512, y1);
  if (line2) ctx.fillText(line2, 512, y2);
}

// High-Legibility Subtitle Renderer
function drawCrispSubtext(ctx, line1, line2, y1, y2) {
  ctx.font = '600 30px Outfit, Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.5px';
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#f1f5f9'; // Bright optical white/silver for instant readability
  ctx.fillText(line1, 512, y1);
  if (line2) ctx.fillText(line2, 512, y2);
}

// ----------------------------------------------------
// FACE 0 (FRONT): VIPER BRAND IDENTITY
// ----------------------------------------------------
function createFrontBrandFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  drawPanelBase(ctx, '// VIPER ARCH-CORE // IDENTITY', '#10b981', '#00f0ff');

  const cx = 512, cy = 370;

  // Luminous Radial Aura
  const aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, 200);
  aura.addColorStop(0, 'rgba(16, 185, 129, 0.40)');
  aura.addColorStop(0.5, 'rgba(0, 240, 255, 0.18)');
  aura.addColorStop(1, 'transparent');
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(cx, cy, 200, 0, Math.PI * 2);
  ctx.fill();

  // Left Wing of 'V'
  ctx.beginPath();
  ctx.moveTo(cx - 120, cy - 90);
  ctx.lineTo(cx - 55, cy - 90);
  ctx.lineTo(cx, cy + 105);
  ctx.lineTo(cx - 26, cy + 105);
  ctx.closePath();
  const vLeftGrad = ctx.createLinearGradient(cx - 120, cy - 90, cx, cy + 105);
  vLeftGrad.addColorStop(0, '#34d399');
  vLeftGrad.addColorStop(0.6, '#10b981');
  vLeftGrad.addColorStop(1, '#047857');
  ctx.fillStyle = vLeftGrad;
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Right Wing of 'V'
  ctx.beginPath();
  ctx.moveTo(cx + 120, cy - 90);
  ctx.lineTo(cx + 55, cy - 90);
  ctx.lineTo(cx, cy + 105);
  ctx.lineTo(cx + 26, cy + 105);
  ctx.closePath();
  const vRightGrad = ctx.createLinearGradient(cx + 120, cy - 90, cx, cy + 105);
  vRightGrad.addColorStop(0, '#00f0ff');
  vRightGrad.addColorStop(0.6, '#0ea5e9');
  vRightGrad.addColorStop(1, '#0369a1');
  ctx.fillStyle = vRightGrad;
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Center Diamond Crystal Shard
  ctx.beginPath();
  ctx.moveTo(cx, cy - 140);
  ctx.lineTo(cx + 30, cy - 50);
  ctx.lineTo(cx, cy + 25);
  ctx.lineTo(cx - 30, cy - 50);
  ctx.closePath();
  const shardGrad = ctx.createLinearGradient(cx, cy - 140, cx, cy + 25);
  shardGrad.addColorStop(0, '#ffffff');
  shardGrad.addColorStop(0.35, '#a5f3fc');
  shardGrad.addColorStop(0.7, '#38bdf8');
  shardGrad.addColorStop(1, '#00f0ff');
  ctx.fillStyle = shardGrad;
  ctx.shadowColor = '#ffffff';
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.shadowBlur = 0;

  // Central Shard Ridge Line
  ctx.beginPath();
  ctx.moveTo(cx, cy - 140);
  ctx.lineTo(cx, cy + 25);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // "VIPER" Typography - Dual Pass Razor Sharp
  ctx.font = '900 84px Orbitron, Outfit, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '8px';
  // Glow pass
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 10;
  ctx.fillStyle = '#00f0ff';
  ctx.fillText('VIPER', 512, 620);
  // Sharp core
  ctx.shadowBlur = 0;
  ctx.fillStyle = '#ffffff';
  ctx.fillText('VIPER', 512, 620);

  // "INTELLIGENCE"
  ctx.font = '800 28px Orbitron, "JetBrains Mono", sans-serif';
  ctx.letterSpacing = '7px';
  ctx.fillStyle = '#00f0ff';
  ctx.fillText('INTELLIGENCE', 512, 672);

  // Separator Line
  const lineGrad = ctx.createLinearGradient(260, 715, 764, 715);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.5, '#10b981');
  lineGrad.addColorStop(1, 'transparent');
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = lineGrad;
  ctx.beginPath();
  ctx.moveTo(260, 715);
  ctx.lineTo(764, 715);
  ctx.stroke();

  // Subtitle Motto
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('TURNING IDEAS INTO INTELLIGENT SOLUTIONS', 512, 765);

  // Founders Tag
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#34d399';
  ctx.fillText('FOUNDED BY SUBASH BHANDARI & ROHAN AACHARYA', 512, 820);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ----------------------------------------------------
// FACE 1 (TOP): SOFTWARE DEVELOPMENT
// ----------------------------------------------------
function createSoftwareDevFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  drawPanelBase(ctx, '// CORE SERVICE • 01', '#00f0ff', '#10b981');

  const cx = 512, cy = 330;

  // Glowing </> Code Icon
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#00f0ff';
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 18;

  // Left Bracket <
  ctx.beginPath();
  ctx.moveTo(cx - 75, cy - 65);
  ctx.lineTo(cx - 140, cy);
  ctx.lineTo(cx - 75, cy + 65);
  ctx.stroke();

  // Slash /
  ctx.beginPath();
  ctx.moveTo(cx + 25, cy - 80);
  ctx.lineTo(cx - 25, cy + 80);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Right Bracket >
  ctx.beginPath();
  ctx.moveTo(cx + 75, cy - 65);
  ctx.lineTo(cx + 140, cy);
  ctx.lineTo(cx + 75, cy + 65);
  ctx.strokeStyle = '#00f0ff';
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Title - Crisp Dual Pass
  drawCrispTitle(ctx, 'SOFTWARE', 'DEVELOPMENT', 525, 585, '#00f0ff');

  // Description - High Legibility
  drawCrispSubtext(ctx, 'Custom software. Scalable', 'web & mobile applications.', 660, 700);

  // Tech Badges
  const badges = ['REACT / NEXT.JS', 'FASTAPI', 'IOS & ANDROID'];
  ctx.font = '700 15px "JetBrains Mono", monospace';
  const startX = 230, gap = 188;
  badges.forEach((b, i) => {
    const bx = startX + i * gap;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
    ctx.beginPath();
    ctx.roundRect(bx - 85, 775, 170, 42, 21);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(b, bx, 802);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ----------------------------------------------------
// FACE 2 (RIGHT): TECHNOLOGY CONSULTING
// ----------------------------------------------------
function createTechConsultingFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  drawPanelBase(ctx, '// CORE SERVICE • 02', '#00f0ff', '#38bdf8');

  const cx = 512, cy = 320;

  // AI Brain Icon
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#00f0ff';
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 16;

  // Left Hemisphere Lobes
  ctx.beginPath();
  ctx.arc(cx - 45, cy - 35, 30, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(cx - 30, cy - 65, 25, Math.PI * 0.8, Math.PI * 1.8);
  ctx.arc(cx - 10, cy - 70, 20, Math.PI * 0.9, Math.PI * 1.9);
  ctx.arc(cx - 50, cy + 15, 26, Math.PI * 0.7, Math.PI * 1.7);
  ctx.arc(cx - 35, cy + 50, 24, Math.PI * 0.6, Math.PI * 1.6);
  ctx.stroke();

  // Right Hemisphere Lobes
  ctx.beginPath();
  ctx.arc(cx + 45, cy - 35, 30, -Math.PI * 0.5, Math.PI * 0.5);
  ctx.arc(cx + 30, cy - 65, 25, -Math.PI * 0.8, Math.PI * 0.2);
  ctx.arc(cx + 10, cy - 70, 20, -Math.PI * 0.9, Math.PI * 0.1);
  ctx.arc(cx + 50, cy + 15, 26, -Math.PI * 0.7, Math.PI * 0.3);
  ctx.arc(cx + 35, cy + 50, 24, -Math.PI * 0.6, Math.PI * 0.4);
  ctx.stroke();

  // Central Synaptic Ridge
  ctx.beginPath();
  ctx.moveTo(cx, cy - 75);
  ctx.lineTo(cx, cy + 70);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Synaptic Nodes (Dots)
  const nodes = [
    [cx - 35, cy - 40], [cx + 35, cy - 40],
    [cx - 45, cy + 10], [cx + 45, cy + 10],
    [cx - 20, cy + 45], [cx + 20, cy + 45]
  ];
  ctx.fillStyle = '#ffffff';
  nodes.forEach(([nx, ny]) => {
    ctx.beginPath();
    ctx.arc(nx, ny, 4.5, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;

  // Title - Crisp Dual Pass
  drawCrispTitle(ctx, 'TECHNOLOGY', 'CONSULTING', 520, 580, '#00f0ff');

  // Description - High Legibility
  drawCrispSubtext(ctx, 'Strategic guidance for', 'a smarter tomorrow.', 655, 695);

  // 4-Bar Ascending Growth Chart
  const chartX = 512 - 80, chartY = 820;
  const barHeights = [26, 46, 68, 96];
  barHeights.forEach((bh, i) => {
    const bx = chartX + i * 44;
    const by = chartY - bh;
    const bGrad = ctx.createLinearGradient(bx, by, bx, chartY);
    bGrad.addColorStop(0, '#00f0ff');
    bGrad.addColorStop(1, '#0284c7');
    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.roundRect(bx, by, 28, bh, [5, 5, 0, 0]);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ----------------------------------------------------
// FACE 3 (LEFT): IT SERVICES
// ----------------------------------------------------
function createITServicesFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  drawPanelBase(ctx, '// CORE SERVICE • 03', '#10b981', '#34d399');

  const cx = 512, cy = 320;

  // Laptop Icon
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#10b981';
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 16;

  // Screen Bezel
  ctx.beginPath();
  ctx.roundRect(cx - 90, cy - 75, 180, 115, 8);
  ctx.fillStyle = '#061727';
  ctx.fill();
  ctx.stroke();

  // Screen display </> prompt
  ctx.font = '700 28px "JetBrains Mono", monospace';
  ctx.fillStyle = '#34d399';
  ctx.textAlign = 'center';
  ctx.fillText('</>', cx, cy - 5);

  // Laptop Base
  ctx.beginPath();
  ctx.moveTo(cx - 115, cy + 40);
  ctx.lineTo(cx + 115, cy + 40);
  ctx.lineTo(cx + 100, cy + 55);
  ctx.lineTo(cx - 100, cy + 55);
  ctx.closePath();
  ctx.fillStyle = '#10b981';
  ctx.fill();
  ctx.shadowBlur = 0;

  // Title - Crisp Dual Pass
  drawCrispTitle(ctx, 'IT SERVICES', null, 540, null, '#10b981');

  // Description - High Legibility
  drawCrispSubtext(ctx, 'Network, cloud, support', '& system management.', 635, 675);

  // Bottom Cloud & Server Rack Icons
  // Left: Cloud Icon
  const cX = 390, cY = 780;
  ctx.beginPath();
  ctx.arc(cX - 16, cY, 20, Math.PI * 0.7, Math.PI * 1.8);
  ctx.arc(cX + 10, cY - 14, 25, Math.PI * 0.9, Math.PI * 2.0);
  ctx.arc(cX + 34, cY, 18, Math.PI * 1.3, Math.PI * 2.4);
  ctx.closePath();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Right: 3-tier Server Rack
  const sX = 570, sY = 740;
  for (let r = 0; r < 3; r++) {
    const ry = sY + r * 25;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(sX, ry, 80, 18, 4);
    ctx.stroke();

    // LED dots
    ctx.fillStyle = r === 1 ? '#00f0ff' : '#10b981';
    ctx.beginPath();
    ctx.arc(sX + 12, ry + 9, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(sX + 24, ry + 9, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ----------------------------------------------------
// FACE 4 (BACK): SECURITY & DATA PROTECTION
// ----------------------------------------------------
function createSecurityFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  drawPanelBase(ctx, '// SECURITY CORE • 04', '#00f0ff', '#10b981');

  const cx = 512, cy = 320;

  // Security Shield with Padlock
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#00f0ff';
  ctx.shadowColor = '#00f0ff';
  ctx.shadowBlur = 18;

  // Shield Outline
  ctx.beginPath();
  ctx.moveTo(cx, cy - 85);
  ctx.lineTo(cx + 70, cy - 65);
  ctx.lineTo(cx + 70, cy + 10);
  ctx.bezierCurveTo(cx + 70, cy + 65, cx, cy + 100, cx, cy + 110);
  ctx.bezierCurveTo(cx, cy + 100, cx - 70, cy + 65, cx - 70, cy + 10);
  ctx.lineTo(cx - 70, cy - 65);
  ctx.closePath();
  ctx.stroke();

  // Padlock Shackle
  ctx.beginPath();
  ctx.arc(cx, cy - 10, 20, Math.PI, 0);
  ctx.lineWidth = 4.5;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Padlock Body
  ctx.beginPath();
  ctx.roundRect(cx - 26, cy - 10, 52, 42, 6);
  ctx.fillStyle = '#00f0ff';
  ctx.fill();
  ctx.shadowBlur = 0;

  // Keyhole
  ctx.fillStyle = '#061727';
  ctx.beginPath();
  ctx.arc(cx, cy + 7, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(cx - 2.5, cy + 7, 5, 10);

  // Title - Crisp Dual Pass
  drawCrispTitle(ctx, 'SECURITY &', 'DATA PROTECTION', 515, 575, '#00f0ff');

  // Description - High Legibility
  drawCrispSubtext(ctx, 'Your data. Our priority.', null, 660, null);

  // Telemetry tags
  ctx.font = '700 17px "JetBrains Mono", monospace';
  ctx.fillStyle = '#10b981';
  ctx.fillText('ZERO-TRUST ARCHITECTURE // 256-BIT ENCRYPTION', 512, 765);
  ctx.fillStyle = '#f8fafc';
  ctx.fillText('100% GIT IP RIGHTS HANDOVER', 512, 805);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ----------------------------------------------------
// FACE 5 (BOTTOM): PARTNERSHIP & SUPPORT
// ----------------------------------------------------
function createPartnershipFaceTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  drawPanelBase(ctx, '// ALLIANCE • 05', '#10b981', '#00f0ff');

  const cx = 512, cy = 330;

  // Handshake Icon
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#10b981';
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 18;

  // Left Cuff
  ctx.beginPath();
  ctx.moveTo(cx - 100, cy - 35);
  ctx.lineTo(cx - 68, cy - 10);
  ctx.lineTo(cx - 85, cy + 15);
  ctx.stroke();

  // Right Cuff
  ctx.beginPath();
  ctx.moveTo(cx + 100, cy - 35);
  ctx.lineTo(cx + 68, cy - 10);
  ctx.lineTo(cx + 85, cy + 15);
  ctx.strokeStyle = '#00f0ff';
  ctx.stroke();

  // Clasping Hands
  ctx.beginPath();
  ctx.moveTo(cx - 68, cy - 10);
  ctx.lineTo(cx - 20, cy + 25);
  ctx.lineTo(cx + 20, cy + 25);
  ctx.lineTo(cx + 68, cy - 10);
  ctx.lineTo(cx + 42, cy - 35);
  ctx.lineTo(cx - 42, cy - 35);
  ctx.closePath();
  ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
  ctx.fill();
  ctx.strokeStyle = '#34d399';
  ctx.stroke();

  // Interlocking fingers
  ctx.beginPath();
  ctx.moveTo(cx - 16, cy - 20); ctx.lineTo(cx - 6, cy + 6);
  ctx.moveTo(cx + 6, cy - 20); ctx.lineTo(cx + 16, cy + 6);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Title - Crisp Dual Pass
  drawCrispTitle(ctx, 'PARTNERSHIP', '& SUPPORT', 515, 575, '#10b981');

  // Description - High Legibility
  drawCrispSubtext(ctx, 'Your success is our priority.', null, 660, null);

  // Direct founder contact
  ctx.font = '700 17px "JetBrains Mono", monospace';
  ctx.fillStyle = '#00f0ff';
  ctx.fillText('DIRECT ARCHITECT ACCESS: SUBASH BHANDARI', 512, 765);
  ctx.fillStyle = '#34d399';
  ctx.fillText('WHATSAPP: +977 9763876490', 512, 805);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ============================================
// 3. 3D EXPLODED HOLOGRAPHIC SERVICE CUBE ENGINE
// ============================================
function init3DTechCubeEngine() {
  const container = document.getElementById('hero-cube-container');
  if (!container || typeof THREE === 'undefined') return;

  const cubeScene = new THREE.Scene();
  const cubeCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);

  const cubeRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  cubeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (THREE.ACESFilmicToneMapping) {
    cubeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    cubeRenderer.toneMappingExposure = 1.25;
  }

  container.innerHTML = '';
  container.appendChild(cubeRenderer.domElement);

  function updateResponsiveDimensions() {
    const parent = container.parentElement;
    const parentWidth = parent ? parent.clientWidth : window.innerWidth;
    const maxAllowedWidth = Math.max(260, Math.min(window.innerWidth - 24, parentWidth || (window.innerWidth - 24)));
    const w = container.clientWidth > 0 ? Math.min(container.clientWidth, maxAllowedWidth) : maxAllowedWidth;
    const h = window.innerWidth <= 360 ? 280 : (window.innerWidth < 480 ? 310 : (window.innerWidth < 768 ? 350 : 440));
    cubeCamera.aspect = w / h;
    
    // Balanced optical distance: maximizes text clarity without any corner clipping during 3D rotation
    if (w <= 360 || window.innerWidth <= 360) {
      cubeCamera.position.set(0, 0, 4.85);
    } else if (w < 480 || window.innerWidth < 480) {
      cubeCamera.position.set(0, 0, 4.85);
    } else if (w < 768 || window.innerWidth < 768) {
      cubeCamera.position.set(0, 0, 4.95);
    } else {
      cubeCamera.position.set(0, 0, 5.1);
    }
    cubeCamera.updateProjectionMatrix();
    cubeRenderer.setSize(w, h);
    if (cubeRenderer.domElement) {
      cubeRenderer.domElement.style.maxWidth = '100%';
      cubeRenderer.domElement.style.height = 'auto';
      cubeRenderer.domElement.style.display = 'block';
    }
  }

  updateResponsiveDimensions();

  // Master Group for Hover, Parallax & Drag Physics
  const cubeGroup = new THREE.Group();
  cubeScene.add(cubeGroup);

  // Maximum Anisotropy for Razor-Sharp Angled Textures
  const maxAnisotropy = cubeRenderer.capabilities.getMaxAnisotropy();

  // 6 Exploded Floating Glass Service Panels
  const panelConfigs = [
    {
      name: 'front',
      texture: createFrontBrandFaceTexture(),
      pos: [0, 0, 1.20],
      rot: [0, 0, 0],
      edgeColor: 0x10b981
    },
    {
      name: 'top',
      texture: createSoftwareDevFaceTexture(),
      pos: [0, 1.20, 0],
      rot: [-Math.PI / 2, 0, 0],
      edgeColor: 0x00f0ff
    },
    {
      name: 'right',
      texture: createTechConsultingFaceTexture(),
      pos: [1.20, 0, 0],
      rot: [0, Math.PI / 2, 0],
      edgeColor: 0x00f0ff
    },
    {
      name: 'left',
      texture: createITServicesFaceTexture(),
      pos: [-1.20, 0, 0],
      rot: [0, -Math.PI / 2, 0],
      edgeColor: 0x10b981
    },
    {
      name: 'back',
      texture: createSecurityFaceTexture(),
      pos: [0, 0, -1.20],
      rot: [0, Math.PI, 0],
      edgeColor: 0x00f0ff
    },
    {
      name: 'bottom',
      texture: createPartnershipFaceTexture(),
      pos: [0, -1.20, 0],
      rot: [Math.PI / 2, 0, 0],
      edgeColor: 0x10b981
    }
  ];

  const panelGeo = new THREE.BoxGeometry(2.18, 2.18, 0.05);

  panelConfigs.forEach(cfg => {
    // Enable Anisotropic Filtering on Every Texture
    cfg.texture.anisotropy = maxAnisotropy;
    cfg.texture.generateMipmaps = true;
    cfg.texture.minFilter = THREE.LinearMipmapLinearFilter;
    cfg.texture.magFilter = THREE.LinearFilter;
    cfg.texture.needsUpdate = true;

    // Dark sleek titanium for sides & back
    const sideMat = new THREE.MeshStandardMaterial({
      color: 0x060e1b,
      metalness: 0.95,
      roughness: 0.2
    });

    // Emissive/Self-Illuminating Front Face: Never washed out by scene glare!
    const frontFaceMat = new THREE.MeshBasicMaterial({
      map: cfg.texture,
      transparent: true,
      opacity: 0.98
    });

    const materials = [sideMat, sideMat, sideMat, sideMat, frontFaceMat, sideMat];
    const panelMesh = new THREE.Mesh(panelGeo, materials);

    panelMesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
    panelMesh.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);

    // Outer Precision Chamfer Bezel Wireframe
    const edgesGeo = new THREE.EdgesGeometry(panelGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: cfg.edgeColor,
      transparent: true,
      opacity: 0.65
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    panelMesh.add(edgesMesh);

    cubeGroup.add(panelMesh);
  });

  // Central Glowing Quantum Plasma Core
  const coreGeo = new THREE.OctahedronGeometry(0.78, 0);
  const coreMat = new THREE.MeshPhysicalMaterial({
    color: 0x00f0ff,
    emissive: 0x10b981,
    emissiveIntensity: 0.7,
    roughness: 0.08,
    metalness: 0.85,
    clearcoat: 1.0,
    flatShading: true
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  cubeGroup.add(coreMesh);

  // Internal Point Light Radiating from the Core Through the Panel Gaps
  const innerLight = new THREE.PointLight(0x00f0ff, 4.5, 6.0);
  cubeGroup.add(innerLight);

  // Metallic Connector Struts from Core to Panel Vertices
  const strutGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.45, 8);
  const strutMat = new THREE.MeshStandardMaterial({
    color: 0x0a1628,
    metalness: 0.95,
    roughness: 0.2
  });
  const strutOffsets = [
    [0.7, 0.7, 0.7], [-0.7, 0.7, 0.7], [0.7, -0.7, 0.7], [-0.7, -0.7, 0.7],
    [0.7, 0.7, -0.7], [-0.7, 0.7, -0.7], [0.7, -0.7, -0.7], [-0.7, -0.7, -0.7]
  ];
  strutOffsets.forEach(([sx, sy, sz]) => {
    const strut = new THREE.Mesh(strutGeo, strutMat);
    strut.position.set(sx * 0.7, sy * 0.7, sz * 0.7);
    strut.lookAt(0, 0, 0);
    cubeGroup.add(strut);
  });

  // Ambient Quantum Stardust (40 glowing motes)
  const particleCount = 40;
  const pGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(particleCount * 3);
  const pColors = new Float32Array(particleCount * 3);
  const pPalette = [new THREE.Color(0x10b981), new THREE.Color(0x00f0ff), new THREE.Color(0xffffff)];

  for (let i = 0; i < particleCount; i++) {
    const r = 0.9 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPositions[i * 3 + 2] = r * Math.cos(phi);

    const c = pPalette[Math.floor(Math.random() * pPalette.length)];
    pColors[i * 3]     = c.r;
    pColors[i * 3 + 1] = c.g;
    pColors[i * 3 + 2] = c.b;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

  const pMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const quantumDust = new THREE.Points(pGeo, pMat);
  cubeScene.add(quantumDust);

  // Holographic Concentric Floor Projection Pedestal
  const projCanvas = document.createElement('canvas');
  projCanvas.width = 512;
  projCanvas.height = 512;
  const pCtx = projCanvas.getContext('2d');
  
  // Soft Drop Shadow
  const pShadow = pCtx.createRadialGradient(256, 256, 15, 256, 256, 230);
  pShadow.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  pShadow.addColorStop(0.35, 'rgba(16, 185, 129, 0.28)');
  pShadow.addColorStop(0.65, 'rgba(0, 240, 255, 0.10)');
  pShadow.addColorStop(1, 'transparent');
  pCtx.fillStyle = pShadow;
  pCtx.fillRect(0, 0, 512, 512);

  // Outer Glowing Ring
  pCtx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
  pCtx.lineWidth = 2.5;
  pCtx.shadowColor = '#10b981';
  pCtx.shadowBlur = 14;
  pCtx.beginPath();
  pCtx.arc(256, 256, 210, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.shadowBlur = 0;

  // Segmented Cyan Ring
  pCtx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
  pCtx.lineWidth = 1.5;
  pCtx.setLineDash([8, 14]);
  pCtx.beginPath();
  pCtx.arc(256, 256, 175, 0, Math.PI * 2);
  pCtx.stroke();
  pCtx.setLineDash([]);

  // Coordinates
  pCtx.font = '600 12px "JetBrains Mono", monospace';
  pCtx.fillStyle = 'rgba(16, 185, 129, 0.75)';
  pCtx.textAlign = 'center';
  pCtx.textBaseline = 'middle';
  pCtx.fillText('000°', 256, 38);
  pCtx.fillText('090°', 474, 256);
  pCtx.fillText('180°', 256, 474);
  pCtx.fillText('270°', 38, 256);

  const projTex = new THREE.CanvasTexture(projCanvas);
  const shadowGeo = new THREE.PlaneGeometry(3.8, 3.8);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: projTex,
    transparent: true,
    opacity: 0.85,
    depthWrite: false
  });
  const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
  contactShadow.rotation.x = -Math.PI / 2;
  contactShadow.position.y = -2.1;
  cubeScene.add(contactShadow);

  // Dynamic 3-Point Studio Lighting
  const ambLight = new THREE.AmbientLight(0xffffff, 1.4);
  cubeScene.add(ambLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(6, 8, 7);
  cubeScene.add(keyLight);

  const fillLightCyan = new THREE.PointLight(0x00f0ff, 2.5, 12);
  fillLightCyan.position.set(-5, 4, 4);
  cubeScene.add(fillLightCyan);

  const rimLightWarm = new THREE.PointLight(0x10b981, 2.2, 10);
  rimLightWarm.position.set(5, -4, 4);
  cubeScene.add(rimLightWarm);

  // Interactive Drag, Hover & Parallax Tilt
  let isDraggingCube = false;
  let isHovered = false;
  let prevPointer = { x: 0, y: 0 };
  let velocity = { x: 0, y: 0.0045 };
  let targetTilt = { x: 0, y: 0 };

  const domEl = cubeRenderer.domElement;
  domEl.style.touchAction = 'pan-y';

  domEl.addEventListener('pointerdown', (e) => {
    isDraggingCube = true;
    prevPointer = { x: e.clientX, y: e.clientY };
    velocity = { x: 0, y: 0 };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDraggingCube) return;
    const deltaX = e.clientX - prevPointer.x;
    const deltaY = e.clientY - prevPointer.y;

    velocity.y = deltaX * 0.0075;
    velocity.x = deltaY * 0.0075;

    cubeGroup.rotation.y += velocity.y;
    cubeGroup.rotation.x += velocity.x;

    prevPointer = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => {
    isDraggingCube = false;
  });

  window.addEventListener('pointercancel', () => {
    isDraggingCube = false;
  });

  // Slow down on container hover for comfortable reading of services
  container.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  container.addEventListener('mouseleave', () => {
    isHovered = false;
    targetTilt.x = 0;
    targetTilt.y = 0;
  });

  // Parallax Tilt (desktop only - ignored on touch)
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    targetTilt.y = nx * 0.22;
    targetTilt.x = -ny * 0.22;
  });

  window.addEventListener('resize', updateResponsiveDimensions);
  window.addEventListener('orientationchange', () => {
    setTimeout(updateResponsiveDimensions, 150);
  });

  // Cinematic Zero-G Levitation & Rotation Loop
  const clock = new THREE.Clock();
  function animateCube() {
    requestAnimationFrame(animateCube);
    const time = clock.getElapsedTime();

    // Zero-G Levitation
    const hoverY = Math.sin(time * 1.5) * 0.09;
    cubeGroup.position.y = hoverY;

    // Contact shadow sync
    contactShadow.scale.setScalar(1.0 - hoverY * 0.22);
    contactShadow.material.opacity = 0.85 - hoverY * 0.18;
    contactShadow.rotation.z = time * 0.05;

    // Smooth Glide Rotation
    if (!isDraggingCube) {
      const baseSpeed = isHovered ? 0.0008 : 0.0045; // Gentle reading speed on hover
      velocity.x *= 0.95;
      velocity.y = velocity.y * 0.95 + baseSpeed * 0.05;
      cubeGroup.rotation.y += velocity.y;
      cubeGroup.rotation.x += velocity.x + (targetTilt.x - cubeGroup.rotation.x) * 0.04;
      cubeGroup.rotation.z += (targetTilt.y - cubeGroup.rotation.z) * 0.04;
    }

    // Inner Quantum Diamond Core Spin & Breath
    coreMesh.rotation.x += 0.015;
    coreMesh.rotation.y += 0.020;
    innerLight.intensity = 3.8 + Math.sin(time * 2.8) * 0.8;

    // Quantum Dust Orbit
    quantumDust.rotation.y = time * 0.08;

    cubeRenderer.render(cubeScene, cubeCamera);
  }

  animateCube();
}

// ============================================
// 3. CANVAS TEXTURE GENERATOR FOR HIGH-RES EXPRESSIVE VISOR (VIPER BOT)
// ============================================
function createRobotVisorTexture(eyeState = 'happy') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createRadialGradient(256, 128, 10, 256, 128, 260);
  bgGrad.addColorStop(0, '#0f172a');
  bgGrad.addColorStop(1, '#020617');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 256; i += 8) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
  }

  ctx.shadowBlur = 24;

  if (eyeState === 'happy') {
    ctx.strokeStyle = '#10b981';
    ctx.shadowColor = '#10b981';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';

    ctx.beginPath(); ctx.arc(160, 135, 42, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
    ctx.beginPath(); ctx.arc(352, 135, 42, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();

    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(256, 175, 24, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
  } else if (eyeState === 'smart') {
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';

    ctx.beginPath(); ctx.ellipse(160, 120, 36, 45, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(352, 120, 36, 45, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(172, 108, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(364, 108, 12, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(256, 175, 20, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
  } else if (eyeState === 'star') {
    ctx.fillStyle = '#ff6b00';
    ctx.shadowColor = '#ff6b00';

    ctx.beginPath(); ctx.arc(160, 120, 42, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(352, 120, 42, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(175, 105, 14, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(367, 105, 14, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#ff6b00';
    ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(256, 170, 30, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
  } else if (eyeState === 'love') {
    ctx.fillStyle = '#ec4899';
    ctx.shadowColor = '#ec4899';

    ctx.beginPath(); ctx.arc(160, 120, 40, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(352, 120, 40, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(172, 108, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(364, 108, 12, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(256, 175, 22, 0.1 * Math.PI, 0.9 * Math.PI); ctx.stroke();
  } else {
    ctx.fillStyle = '#10b981';
    ctx.shadowColor = '#10b981';

    ctx.beginPath(); ctx.arc(160, 125, 40, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(352, 125, 40, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(174, 112, 12, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(366, 112, 12, 0, Math.PI * 2); ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function createChestLogoTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#060913';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#10b981';
  ctx.shadowColor = '#10b981';
  ctx.shadowBlur = 20;
  ctx.beginPath(); ctx.arc(128, 128, 110, 0, Math.PI * 2); ctx.fill();

  drawVectorTridentLogo(ctx, 128, 128, 0.8, '#ffffff');

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ============================================
// 4. ULTRA-ATTRACTIVE 3D SCI-FI AI ROBOT ("VIPER BOT")
// ============================================
let robotScene, robotCamera, robotRenderer, robotGroup;
let headGroup, armLeft, armRight, hoverRing1, hoverRing2, chestBadgeMat;
let visorMaterial, currentEyeState = 'happy';
let stickyViewportEl;

let targetRobotRot = new THREE.Euler(0, 0, 0);

let isDraggingRobot = false;
let previousPointerPos = { x: 0, y: 0 };
let manualRotation = { x: 0, y: 0 };
let armWaveTime = 0;

function init3DAIRobotEngine() {
  const container = document.getElementById('cube-canvas-container');
  stickyViewportEl = document.getElementById('sticky-3d-viewport');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 440;
  const height = container.clientHeight || 380;

  robotScene = new THREE.Scene();

  robotCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  robotCamera.position.set(0, 0, 7.5);

  robotRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  robotRenderer.setSize(width, height);
  robotRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  container.innerHTML = '';
  container.appendChild(robotRenderer.domElement);

  robotGroup = new THREE.Group();
  robotScene.add(robotGroup);

  const whiteArmorMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.35, roughness: 0.15, envMapIntensity: 1.5 });
  const darkChromeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.1 });
  const emeraldGlowMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8, roughness: 0.2, emissive: 0x10b981, emissiveIntensity: 0.8 });
  const orangeGlowMat = new THREE.MeshStandardMaterial({ color: 0xff6b00, metalness: 0.8, roughness: 0.2, emissive: 0xff6b00, emissiveIntensity: 0.8 });

  headGroup = new THREE.Group();
  headGroup.position.set(0, 1.05, 0);
  robotGroup.add(headGroup);

  const helmetGeo = new THREE.SphereGeometry(0.95, 32, 32);
  const helmetMesh = new THREE.Mesh(helmetGeo, whiteArmorMat);
  helmetMesh.scale.set(1.15, 0.95, 1.05);
  headGroup.add(helmetMesh);

  const visorCutGeo = new THREE.SphereGeometry(0.88, 32, 16, 0, Math.PI, 0.25, Math.PI * 0.55);
  visorMaterial = new THREE.MeshBasicMaterial({ map: createRobotVisorTexture('happy'), side: THREE.FrontSide });
  const visorMesh = new THREE.Mesh(visorCutGeo, visorMaterial);
  visorMesh.rotation.y = -Math.PI / 2;
  visorMesh.position.set(0, 0.05, 0.1);
  headGroup.add(visorMesh);

  const earWingGeo = new THREE.ConeGeometry(0.25, 0.65, 16);
  const earLeft = new THREE.Mesh(earWingGeo, whiteArmorMat);
  earLeft.rotation.z = Math.PI / 3;
  earLeft.position.set(-1.05, 0.35, 0);
  headGroup.add(earLeft);

  const earLeftTip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), emeraldGlowMat);
  earLeftTip.position.set(-1.25, 0.5, 0);
  headGroup.add(earLeftTip);

  const earRight = new THREE.Mesh(earWingGeo, whiteArmorMat);
  earRight.rotation.z = -Math.PI / 3;
  earRight.position.set(1.05, 0.35, 0);
  headGroup.add(earRight);

  const earRightTip = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), emeraldGlowMat);
  earRightTip.position.set(1.25, 0.5, 0);
  headGroup.add(earRightTip);

  const crownGeo = new THREE.TorusGeometry(0.4, 0.04, 16, 32);
  const crownMesh = new THREE.Mesh(crownGeo, emeraldGlowMat);
  crownMesh.rotation.x = Math.PI / 2;
  crownMesh.position.set(0, 1.05, 0);
  headGroup.add(crownMesh);

  const bodyGroup = new THREE.Group();
  bodyGroup.position.set(0, -0.25, 0);
  robotGroup.add(bodyGroup);

  const neckGeo = new THREE.CylinderGeometry(0.35, 0.45, 0.3, 16);
  const neckMesh = new THREE.Mesh(neckGeo, darkChromeMat);
  neckMesh.position.set(0, 0.8, 0);
  bodyGroup.add(neckMesh);

  const torsoGeo = new THREE.SphereGeometry(0.9, 32, 32);
  const torsoMesh = new THREE.Mesh(torsoGeo, whiteArmorMat);
  torsoMesh.scale.set(1.05, 1.25, 0.95);
  bodyGroup.add(torsoMesh);

  const chestBadgeGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 32);
  chestBadgeGeo.rotateX(Math.PI / 2);
  chestBadgeMat = new THREE.MeshBasicMaterial({ map: createChestLogoTexture(), side: THREE.DoubleSide });
  const chestBadgeMesh = new THREE.Mesh(chestBadgeGeo, chestBadgeMat);
  chestBadgeMesh.position.set(0, 0.2, 0.82);
  bodyGroup.add(chestBadgeMesh);

  const coreRingGeo = new THREE.TorusGeometry(0.42, 0.04, 16, 32);
  const coreRingMesh = new THREE.Mesh(coreRingGeo, orangeGlowMat);
  coreRingMesh.position.set(0, 0.2, 0.8);
  bodyGroup.add(coreRingMesh);

  const shoulderSphereGeo = new THREE.SphereGeometry(0.28, 20, 20);
  const handSphereGeo = new THREE.SphereGeometry(0.22, 20, 20);

  armLeft = new THREE.Group();
  armLeft.position.set(-1.25, 0.3, 0);
  bodyGroup.add(armLeft);

  const shLeft = new THREE.Mesh(shoulderSphereGeo, darkChromeMat);
  armLeft.add(shLeft);

  const handLeft = new THREE.Mesh(handSphereGeo, whiteArmorMat);
  handLeft.position.set(-0.25, -0.6, 0.2);
  armLeft.add(handLeft);

  const handLeftNode = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), emeraldGlowMat);
  handLeftNode.position.set(-0.25, -0.8, 0.2);
  armLeft.add(handLeftNode);

  armRight = new THREE.Group();
  armRight.position.set(1.25, 0.3, 0);
  bodyGroup.add(armRight);

  const shRight = new THREE.Mesh(shoulderSphereGeo, darkChromeMat);
  armRight.add(shRight);

  const handRight = new THREE.Mesh(handSphereGeo, whiteArmorMat);
  handRight.position.set(0.25, -0.6, 0.2);
  armRight.add(handRight);

  const handRightNode = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), emeraldGlowMat);
  handRightNode.position.set(0.25, -0.8, 0.2);
  armRight.add(handRightNode);

  const ring1Geo = new THREE.TorusGeometry(1.05, 0.06, 16, 48);
  hoverRing1 = new THREE.Mesh(ring1Geo, emeraldGlowMat);
  hoverRing1.rotation.x = Math.PI / 2;
  hoverRing1.position.set(0, -1.3, 0);
  robotGroup.add(hoverRing1);

  const ring2Geo = new THREE.TorusGeometry(1.3, 0.05, 16, 48);
  hoverRing2 = new THREE.Mesh(ring2Geo, orangeGlowMat);
  hoverRing2.rotation.x = Math.PI / 2;
  hoverRing2.position.set(0, -1.45, 0);
  robotGroup.add(hoverRing2);

  const pCount = 130;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  const pCols = new Float32Array(pCount * 3);

  const colors = [new THREE.Color(0x10b981), new THREE.Color(0xff6b00), new THREE.Color(0x38bdf8)];
  for (let i = 0; i < pCount; i++) {
    pPos[i * 3]     = (Math.random() - 0.5) * 5;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 4 - 0.5;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 4;

    const c = colors[Math.floor(Math.random() * colors.length)];
    pCols[i * 3]     = c.r;
    pCols[i * 3 + 1] = c.g;
    pCols[i * 3 + 2] = c.b;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

  const pMat = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending });
  const auraPoints = new THREE.Points(pGeo, pMat);
  robotScene.add(auraPoints);

  const ambLight = new THREE.AmbientLight(0xffffff, 2.0);
  robotScene.add(ambLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
  mainLight.position.set(5, 8, 5);
  robotScene.add(mainLight);

  const greenLight = new THREE.PointLight(0x10b981, 4, 10);
  greenLight.position.set(-3, 2, 3);
  robotScene.add(greenLight);

  const orangeLight = new THREE.PointLight(0xff6b00, 4, 10);
  orangeLight.position.set(3, -2, 3);
  robotScene.add(orangeLight);

  function updateScrollTransforms() {
    const scrollY = window.scrollY || 0;
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Keep docked in bottom-right corner cleanly via CSS. Only update subtle 3D robot rotation.
    if (progress < 0.20) {
      targetRobotRot.set(0, -0.2 + manualRotation.y, 0);
    } else if (progress < 0.45) {
      targetRobotRot.set(0.1, 0.3 + manualRotation.y, 0);
    } else if (progress < 0.70) {
      targetRobotRot.set(0, 0 + manualRotation.y, 0);
    } else if (progress < 0.88) {
      targetRobotRot.set(0.1, -0.3 + manualRotation.y, 0);
    } else {
      targetRobotRot.set(0, 0.2 + manualRotation.y, 0);
    }
  }

  window.addEventListener('scroll', updateScrollTransforms);
  updateScrollTransforms();

  const domEl = robotRenderer.domElement;
  domEl.addEventListener('pointerdown', (e) => {
    isDraggingRobot = true;
    previousPointerPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDraggingRobot) return;
    const deltaX = e.clientX - previousPointerPos.x;
    const deltaY = e.clientY - previousPointerPos.y;

    manualRotation.y += deltaX * 0.008;
    manualRotation.x += deltaY * 0.008;

    previousPointerPos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointerup', () => { isDraggingRobot = false; });

  // CLICK VIPER BOT: SPEAKS OUT LOUD!
  domEl.addEventListener('click', () => {
    armWaveTime = 3.0;
    playSciFiBeep('chirp');
    const randomQuote = ROBOT_VOICE_QUOTES[Math.floor(Math.random() * ROBOT_VOICE_QUOTES.length)];
    appendBotChatMessage(randomQuote);
    speakRobotMessage(randomQuote);

    visorMaterial.map = createRobotVisorTexture('star');
    visorMaterial.needsUpdate = true;

    setTimeout(() => {
      visorMaterial.map = createRobotVisorTexture(currentEyeState);
      visorMaterial.needsUpdate = true;
    }, 3500);
  });

  // QUICK ACTION BUTTONS
  const actionBtns = document.querySelectorAll('.bot-action-btn');
  actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playSciFiBeep('chirp');
      armWaveTime = 3.0;
      const actionKey = btn.getAttribute('data-action');
      const topicData = TOPIC_VOICE_RESPONSES[actionKey];

      if (topicData) {
        appendBotChatMessage(topicData.message);
        speakRobotMessage(topicData.message);

        visorMaterial.map = createRobotVisorTexture(topicData.eyeState);
        visorMaterial.needsUpdate = true;

        setTimeout(() => {
          visorMaterial.map = createRobotVisorTexture(currentEyeState);
          visorMaterial.needsUpdate = true;
        }, 4000);
      }

      if (actionKey === 'whatsapp') {
        setTimeout(() => {
          if (typeof window.openViperWhatsAppBookingModal === 'function') {
            window.openViperWhatsAppBookingModal();
          }
        }, 800);
      }
    });
  });

  window.addEventListener('resize', () => {
    const w = container.clientWidth || 440;
    const h = container.clientHeight || 380;
    robotCamera.aspect = w / h;
    robotCamera.updateProjectionMatrix();
    robotRenderer.setSize(w, h);
  });

  const clock = new THREE.Clock();
  function animateRobot() {
    requestAnimationFrame(animateRobot);
    const elapsedTime = clock.getElapsedTime();

    const hoverY = Math.sin(elapsedTime * 2.4) * 0.14;
    robotGroup.position.y += (hoverY - robotGroup.position.y) * 0.08;

    robotGroup.rotation.y += (targetRobotRot.y - robotGroup.rotation.y) * 0.08;
    robotGroup.rotation.x += (targetRobotRot.x + manualRotation.x - robotGroup.rotation.x) * 0.08;

    headGroup.rotation.y = Math.sin(elapsedTime * 1.4) * 0.18;
    headGroup.rotation.z = Math.cos(elapsedTime * 1.6) * 0.06;

    if (armWaveTime > 0) {
      armWaveTime -= 0.02;
      armRight.rotation.z = Math.sin(elapsedTime * 14) * 0.6 + 0.6;
      armLeft.rotation.z = -Math.sin(elapsedTime * 14) * 0.6 - 0.6;
    } else {
      armRight.rotation.z = Math.sin(elapsedTime * 2.2) * 0.12;
      armLeft.rotation.z = -Math.sin(elapsedTime * 2.2) * 0.12;
    }

    hoverRing1.rotation.z = elapsedTime * 1.8;
    hoverRing2.rotation.z = -elapsedTime * 2.0;

    auraPoints.rotation.y = elapsedTime * 0.18;

    robotRenderer.render(robotScene, robotCamera);
  }

  animateRobot();
}

// ============================================
// 5. INTERACTIVE LIVE CHATBOT ENGINE & CLOSE/REOPEN HANDLERS
// ============================================
function appendUserChatMessage(text) {
  const container = document.getElementById('bot-chat-messages');
  if (!container) return;
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg user-msg';
  msgEl.textContent = text;
  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
}

function appendBotChatMessage(text) {
  const container = document.getElementById('bot-chat-messages');
  if (!container) return;
  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg bot-msg';
  msgEl.textContent = text;
  container.appendChild(msgEl);
  container.scrollTop = container.scrollHeight;
}

function getBotAIResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('how much') || q.includes('package')) {
    return {
      text: "💎 Our pricing packages: Startup Launch at Rs 10,000, Scale & Business at Rs 30,000, and Enterprise Custom at Rs 50,000+! Need a custom quote?",
      eyeState: 'love'
    };
  } else if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('number') || q.includes('email') || q.includes('subash')) {
    return {
      text: "💬 You can contact Lead Architect Subash Bhandari directly on WhatsApp at +977 9763876490 or email viperintelligence1@gmail.com!",
      eyeState: 'smart'
    };
  } else if (q.includes('rohan') || q.includes('founder') || q.includes('team') || q.includes('who built')) {
    return {
      text: "👥 Viper Intelligence is founded by Subash Bhandari (Lead Architect) & Rohan Aacharya (Lead Engineer)! I am Alex, their AI companion!",
      eyeState: 'happy'
    };
  } else if (q.includes('service') || q.includes('web') || q.includes('app') || q.includes('hosting') || q.includes('brand') || q.includes('marketing')) {
    return {
      text: "⚡ We build custom Web Apps (React/Next.js), Mobile Apps (iOS/Android), Managed Cloud Hosting, Branding, and Digital Marketing funnels!",
      eyeState: 'smart'
    };
  } else if (q.includes('project') || q.includes('ielts') || q.includes('cafe') || q.includes('dental') || q.includes('work')) {
    return {
      text: "🚀 Check out our recent deliverables: Master IELTS AI (masterieltsai.com), Specialty Coffee Cafe, and Angel Family Dentistry!",
      eyeState: 'star'
    };
  } else if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('namaste')) {
    return {
      text: "👋 Namaste & Hello! I am VIPER BOT (Alex). How can I assist you with your software development goals today?",
      eyeState: 'happy'
    };
  } else {
    return {
      text: `🤖 Thanks for your question about "${query}"! Feel free to click our contact section or chat directly with Subash Bhandari on WhatsApp at +977 9763876490!`,
      eyeState: 'smart'
    };
  }
}

function initLiveChatbotEngine() {
  const chatForm = document.getElementById('bot-chat-form');
  const chatInput = document.getElementById('bot-chat-input');
  const closeBtn = document.getElementById('close-bot-bubble-btn');
  const reopenBtn = document.getElementById('reopen-bot-btn');
  const viewport = document.getElementById('sticky-3d-viewport');

  // Enforce minimized state on startup
  if (viewport && reopenBtn) {
    viewport.classList.add('minimized');
    reopenBtn.classList.remove('hidden');
  }

  // Close / Minimize Bot Bubble
  if (closeBtn && viewport && reopenBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playSciFiBeep('chirp');
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      viewport.classList.add('minimized');
      reopenBtn.classList.remove('hidden');
    });

    reopenBtn.addEventListener('click', () => {
      playSciFiBeep('chirp');
      viewport.classList.remove('minimized');
      reopenBtn.classList.add('hidden');
      // Quiet reopening without unsolicited text-to-speech
    });
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userText = chatInput.value.trim();
      if (!userText) return;

      appendUserChatMessage(userText);
      chatInput.value = '';
      playSciFiBeep('chirp');
      armWaveTime = 3.0;

      setTimeout(() => {
        const botReply = getBotAIResponse(userText);
        appendBotChatMessage(botReply.text);
        speakRobotMessage(botReply.text);

        if (visorMaterial) {
          visorMaterial.map = createRobotVisorTexture(botReply.eyeState);
          visorMaterial.needsUpdate = true;

          setTimeout(() => {
            visorMaterial.map = createRobotVisorTexture(currentEyeState);
            visorMaterial.needsUpdate = true;
          }, 3500);
        }
      }, 500);
    });
  }
}

// ============================================
// 6. INTERACTIVE 3D TILT & PARALLAX ENGINE FOR CARDS
// ============================================
function init3DCardParallaxEngine() {
  const cards = document.querySelectorAll('.service-card, .project-showcase-card, .pricing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', `${percentX}%`);
      card.style.setProperty('--glare-y', `${percentY}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// ============================================
// 7. SERVICE MODAL CONTROLLER
// ============================================
const SERVICES_MODAL_DATA = [
  {
    id: 0, title: 'Web Development', category: 'FULL-STACK ENGINEERING', icon: '⚡',
    desc: 'Custom high-performance web applications built with React, Next.js, and serverless edge architecture.',
    features: ['✓ Custom Single Page Applications', '✓ REST & GraphQL APIs', '✓ Sub-second edge deployment', '✓ Glassmorphic responsive UI'],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js']
  },
  {
    id: 1, title: 'Web Hosting & Cloud', category: 'CLOUD INFRASTRUCTURE', icon: '☁️',
    desc: 'Enterprise managed cloud hosting with automated SSL, DDoS prevention, and 99.99% uptime guarantee.',
    features: ['✓ Global Edge CDN', '✓ Daily Backups & Restore', '✓ Free SSL & DDoS Protection', '✓ 99.99% Availability SLA'],
    tech: ['Cloudflare', 'AWS', 'Docker', 'Kubernetes', 'Nginx']
  },
  {
    id: 2, title: 'Branding & Design System', category: 'BRAND ARCHITECTURE', icon: '🎨',
    desc: 'Complete brand identity packages, 3D assets, logo guidelines, and unified design token systems.',
    features: ['✓ Brand Identity & Guidelines', '✓ Modular Design Tokens', '✓ 3D WebGL Visual Assets', '✓ Marketing Collateral'],
    tech: ['Figma', 'Blender', 'Illustrator', 'Spline', 'Storybook']
  },
  {
    id: 3, title: 'App Development', category: 'MOBILE SUITE', icon: '📱',
    desc: 'Native iOS & Android mobile applications crafted with React Native & Flutter for fluid 60fps motion.',
    features: ['✓ Cross-platform iOS & Android', '✓ Offline Sync & Push Pipelines', '✓ Biometric Auth & Encryption', '✓ Store Publishing'],
    tech: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    id: 4, title: 'Digital Marketing & SEO', category: 'GROWTH ENGINE', icon: '📈',
    desc: 'Data-driven search engine optimization, Google Ads management, and social media growth strategies.',
    features: ['✓ Technical SEO Audit', '✓ High-Conversion PPC Ads', '✓ Social Media Strategy', '✓ Funnel Analytics'],
    tech: ['Google Analytics 4', 'SEMrush', 'Meta Ads', 'HubSpot']
  },
  {
    id: 5, title: 'UI/UX & Product Design', category: 'PRODUCT ARCHITECTURE', icon: '✨',
    desc: 'User-centric wireframing, interactive prototyping, and usability testing.',
    features: ['✓ User Research & Wireframes', '✓ Clickable Prototypes', '✓ WCAG 2.1 Accessibility', '✓ Micro-Animations'],
    tech: ['Figma', 'Protopie', 'Framer', 'Adobe XD']
  }
];

function openServiceModal(serviceIdx) {
  const modalBackdrop = document.getElementById('service-modal-backdrop');
  if (!modalBackdrop) return;

  const data = SERVICES_MODAL_DATA[serviceIdx] || SERVICES_MODAL_DATA[0];

  document.getElementById('modal-icon-badge').textContent = data.icon;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.desc;

  const listEl = document.getElementById('modal-features-list');
  listEl.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

  const pillsEl = document.getElementById('modal-tech-pills');
  pillsEl.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');

  const tabBtns = document.querySelectorAll('.modal-tab-item');
  tabBtns.forEach((btn, idx) => {
    if (idx === serviceIdx) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  modalBackdrop.classList.add('active');
}

function initModalHandlers() {
  const modalBackdrop = document.getElementById('service-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const tabBtns = document.querySelectorAll('.modal-tab-item');

  if (closeBtn && modalBackdrop) {
    closeBtn.addEventListener('click', () => { modalBackdrop.classList.remove('active'); });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modalBackdrop.classList.remove('active');
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-service'), 10);
      openServiceModal(idx);
    });
  });
}

// ============================================
// 8. STATS COUNT-UP ANIMATION
// ============================================
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  function runCounter(el) {
    if (el.getAttribute('data-active') === 'true') return;
    el.setAttribute('data-active', 'true');

    const target = parseInt(el.getAttribute('data-target'), 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);

      el.textContent = `${prefix}${current}${suffix}`;

      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = `${prefix}${target}${suffix}`;
    }

    requestAnimationFrame(update);
  }

  setTimeout(() => {
    statElements.forEach(el => runCounter(el));
  }, 200);
}

// ============================================
// 9. TYPEWRITER EFFECT FOR HERO SUBTITLE
// ============================================
function initTypewriter() {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const phrases = [
    "mobile & web applications",
    "cloud web hosting platforms",
    "custom enterprise software",
    "branding & graphic designs"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  type();
}

// ============================================
// 10. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHTER
// ============================================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });
}

// ============================================
// 11. DIRECT WHATSAPP DISPATCH FORM SUBMISSION HANDLER
// ============================================
function initFormHandlers() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value.trim();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Opening WhatsApp...</span>`;

      const waText = `*🔥 NEW INQUIRY - VIPER INTELLIGENCE*

*👤 Name:* ${name}
*📧 Email:* ${email}
*⚡ Interested Service:* ${service}
*💬 Message:* ${message}

----------------------------------------
Sent via Viper Intelligence Web Portal`;

      const whatsappUrl = `https://wa.me/9779763876490?text=${encodeURIComponent(waText)}`;

      playSciFiBeep('chirp');

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');

        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message to Subash on WhatsApp</span>`;
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✓ Inquiry prepared! WhatsApp has been opened to chat directly with Subash Bhandari.';
        }
        contactForm.reset();
      }, 800);
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for subscribing to Viper Intelligence updates!');
      newsletterForm.reset();
    });
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Auto-close drawer when any link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleBtn.classList.remove('active');
        navMenu.classList.remove('open');
      }
    });
  }
}

// ============================================
// INTERACTIVE PROJECT COST CALCULATOR (SERVICES.HTML)
// ============================================
function initCostCalculator() {
  const calcContainer = document.querySelector('.calculator-wrapper');
  const totalDisplay = document.getElementById('calc-total-display');
  const breakdownList = document.getElementById('calc-breakdown-list');
  const dispatchBtn = document.getElementById('btn-dispatch-calc-whatsapp');

  if (!calcContainer || !totalDisplay) return;

  function calculateAndRender() {
    // 1. Selected Platform
    const selectedPlatform = document.querySelector('input[name="calc-platform"]:checked');
    const basePrice = selectedPlatform ? parseInt(selectedPlatform.value, 10) : 15000;
    const platformName = selectedPlatform ? selectedPlatform.getAttribute('data-name') : 'Responsive Web Application';

    // Update active class on platform cards
    document.querySelectorAll('.calc-platform-card').forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 2. Selected Add-ons
    let addonsTotal = 0;
    const selectedAddons = [];
    document.querySelectorAll('.calc-addon-check:checked').forEach(check => {
      const price = parseInt(check.value, 10);
      const name = check.getAttribute('data-name');
      addonsTotal += price;
      selectedAddons.push({ name, price });
    });

    // Update active class on addon items
    document.querySelectorAll('.calc-addon-item').forEach(item => {
      const check = item.querySelector('.calc-addon-check');
      if (check && check.checked) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 3. Timeline Modifier
    const selectedSpeed = document.querySelector('input[name="calc-speed"]:checked');
    const speedMultiplier = selectedSpeed ? parseFloat(selectedSpeed.value) : 1.0;
    const speedName = selectedSpeed ? selectedSpeed.getAttribute('data-name') : 'Standard Sprint (3-4 Weeks)';

    // Update active class on speed cards
    document.querySelectorAll('.calc-speed-card').forEach(card => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.checked) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    // 4. Calculate Final Total
    const subtotal = Math.round((basePrice + addonsTotal) * speedMultiplier);
    totalDisplay.textContent = subtotal.toLocaleString();

    // 5. Render Breakdown
    if (breakdownList) {
      let breakdownHtml = `
        <div class="breakdown-row">
          <span>${platformName}</span>
          <span>Rs ${basePrice.toLocaleString()}</span>
        </div>
      `;

      selectedAddons.forEach(addon => {
        breakdownHtml += `
          <div class="breakdown-row">
            <span>+ ${addon.name}</span>
            <span>Rs ${addon.price.toLocaleString()}</span>
          </div>
        `;
      });

      if (speedMultiplier > 1.0) {
        const rushFee = Math.round((basePrice + addonsTotal) * (speedMultiplier - 1.0));
        breakdownHtml += `
          <div class="breakdown-row" style="color: #ff6b00;">
            <span>⚡ Expedited Delivery (+20%)</span>
            <span>Rs ${rushFee.toLocaleString()}</span>
          </div>
        `;
      }

      breakdownList.innerHTML = breakdownHtml;
    }
  }

  // Attach change listeners to all inputs
  calcContainer.addEventListener('change', calculateAndRender);

  // WhatsApp Dispatch Handler
  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedPlatform = document.querySelector('input[name="calc-platform"]:checked');
      const platformName = selectedPlatform ? selectedPlatform.getAttribute('data-name') : 'Responsive Web Application';
      const basePrice = selectedPlatform ? parseInt(selectedPlatform.value, 10) : 15000;

      const selectedAddons = [];
      document.querySelectorAll('.calc-addon-check:checked').forEach(check => {
        selectedAddons.push(check.getAttribute('data-name') + ' (Rs ' + parseInt(check.value, 10).toLocaleString() + ')');
      });

      const selectedSpeed = document.querySelector('input[name="calc-speed"]:checked');
      const speedName = selectedSpeed ? selectedSpeed.getAttribute('data-name') : 'Standard Sprint (3-4 Weeks)';
      const totalEstimated = totalDisplay.textContent;

      let msg = `*💎 CUSTOM PROJECT ESTIMATE - VIPER INTELLIGENCE*\n\n`;
      msg += `*Selected Platform:* ${platformName} (Base: Rs ${basePrice.toLocaleString()})\n\n`;
      msg += `*Selected Capabilities:*\n`;
      if (selectedAddons.length > 0) {
        selectedAddons.forEach(addon => {
          msg += `• ${addon}\n`;
        });
      } else {
        msg += `• Standard Architecture Package\n`;
      }
      msg += `\n*Target Timeline:* ${speedName}\n`;
      msg += `*Estimated Investment:* Rs ${totalEstimated}\n\n`;
      msg += `----------------------------------------\n`;
      msg += `Hi Subash! I calculated this project specification on the Viper Intelligence website and would like to proceed with a formal kickoff consultation.`;

      const waUrl = `https://wa.me/9779763876490?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // Initial calculation run
  calculateAndRender();
}

// ============================================
// PORTFOLIO FILTERING ENGINE (PROJECTS.HTML)
// ============================================
function initProjectFilter() {
  const filterBar = document.getElementById('project-filter-bar');
  if (!filterBar) return;

  const filterBtns = filterBar.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.filter-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase();
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden-filter');
        } else {
          card.classList.add('hidden-filter');
        }
      });

      playSciFiBeep('chirp');
    });
  });
}

// ============================================
// FAQ ACCORDION ENGINE (PRICING.HTML)
// ============================================
function initFaqAccordion() {
  const accordion = document.getElementById('faq-accordion');
  if (!accordion) return;

  const faqItems = accordion.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const toggleIcon = item.querySelector('.faq-toggle-icon');

    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(i => {
        i.classList.remove('active');
        const q = i.querySelector('.faq-question');
        const icon = i.querySelector('.faq-toggle-icon');
        if (q) q.setAttribute('aria-expanded', 'false');
        if (icon) icon.innerHTML = '&#43;';
      });

      // If clicked item was not active, open it
      if (!isActive) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        if (toggleIcon) toggleIcon.innerHTML = '&minus;';
      }

      playSciFiBeep('blip');
    });
  });
}

// ============================================
// CONSULTATION & DIRECT INQUIRY DISPATCH (CONTACT.HTML)
// ============================================
function initConsultationPortal() {
  const consultationForm = document.getElementById('consultation-project-form');
  const dispatchWaBtn = document.getElementById('btn-dispatch-whatsapp');
  const feedbackBox = document.getElementById('contact-form-feedback');

  // Handle URL query prefill (e.g. ?plan=startup)
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  if (planParam) {
    const budgetSelect = document.getElementById('contact-budget');
    const serviceSelect = document.getElementById('contact-service');

    if (planParam === 'startup') {
      if (budgetSelect) budgetSelect.value = 'Rs 10,000 - Rs 25,000';
      if (serviceSelect) serviceSelect.value = 'Startup MVP Rapid Build';
    } else if (planParam === 'scale') {
      if (budgetSelect) budgetSelect.value = 'Rs 25,000 - Rs 50,000';
      if (serviceSelect) serviceSelect.value = 'Full-Stack Web Application';
    } else if (planParam === 'enterprise') {
      if (budgetSelect) budgetSelect.value = 'Rs 50,000 - Rs 100,000';
      if (serviceSelect) serviceSelect.value = 'Enterprise Cloud & DevOps';
    }
  }

  if (!consultationForm) return;

  function buildInquiryMessage() {
    const name = (document.getElementById('contact-name')?.value || '').trim();
    const email = (document.getElementById('contact-email')?.value || '').trim();
    const phone = (document.getElementById('contact-phone')?.value || '').trim();
    const service = document.getElementById('contact-service')?.value || 'General Architecture Consultation';
    const budget = document.getElementById('contact-budget')?.value || 'Flexible';
    const timeline = document.getElementById('contact-timeline')?.value || '1 to 2 Weeks';
    const message = (document.getElementById('contact-message')?.value || '').trim();

    return {
      name, email, phone, service, budget, timeline, message,
      isValid: name.length > 0 && phone.length > 0 && message.length > 0
    };
  }

  // 1. WhatsApp Instant Dispatch Button
  if (dispatchWaBtn) {
    dispatchWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = buildInquiryMessage();

      if (!data.isValid) {
        alert('Please provide your Name, Phone Number, and Project Notes before dispatching via WhatsApp.');
        return;
      }

      let waText = `*🚀 VIPER INTELLIGENCE - PROJECT INTAKE*\n\n`;
      waText += `*👤 Name / Org:* ${data.name}\n`;
      waText += `*📧 Email:* ${data.email || 'N/A'}\n`;
      waText += `*📱 WhatsApp:* ${data.phone}\n`;
      waText += `*⚡ Service:* ${data.service}\n`;
      waText += `*💰 Budget Tier:* ${data.budget}\n`;
      waText += `*⏱ Target Launch:* ${data.timeline}\n`;
      waText += `*📝 Project Goals:* ${data.message}\n\n`;
      waText += `----------------------------------------\n`;
      waText += `Sent via Viper Intelligence Consultation Portal`;

      playSciFiBeep('chirp');
      const whatsappUrl = `https://wa.me/9779763876490?text=${encodeURIComponent(waText)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 2. Direct Architectural Inquiry Submit
  consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = buildInquiryMessage();

    const submitBtn = document.getElementById('btn-submit-direct');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Specification...</span>`;
    }

    playSciFiBeep('chirp');

    setTimeout(() => {
      if (feedbackBox) {
        feedbackBox.className = 'form-feedback-box success';
        feedbackBox.innerHTML = `
          <strong>✓ Specification Received Successfully!</strong><br>
          Lead Architect <strong>Subash Bhandari</strong> (+977 9763876490) and Rohan Aacharya have received your brief. We will review your parameters and respond within 2 hours.
        `;
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Architectural Inquiry &rarr;</span>`;
      }

      consultationForm.reset();
    }, 1000);
  });
}

// ============================================
// 15. INTERACTIVE DEVELOPER WORKBENCH & CLI ENGINE
// ============================================
function initDeveloperWorkbench() {
  const tabs = document.querySelectorAll('#terminal-tabs .t-tab');
  const panes = document.querySelectorAll('.terminal-tab-pane');
  const screen = document.getElementById('terminal-screen');
  const cmdBtns = document.querySelectorAll('.btn-cli-cmd');
  const logStream = document.getElementById('log-stream-box');

  if (!tabs.length || !panes.length) return;

  // 1. Terminal Tab Navigation
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');

      const targetTab = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // 2. Interactive CLI Command Execution Simulator
  let isExecuting = false;

  const CLI_COMMANDS = {
    deploy: {
      cmd: 'viper deploy --prod',
      lines: [
        { text: '✔ Initializing Next.js 15 Turbopack compilation...', cls: 't-success', delay: 180 },
        { text: '✔ Inlining Three.js WebGL GPU shaders & matrix physics...', cls: 't-success', delay: 350 },
        { text: '✔ Running automated test suite: 42/42 tests passed in 128ms.', cls: 't-success', delay: 520 },
        { text: '✔ Propagating release to 310+ Cloudflare Edge POPs globally.', cls: 't-success', delay: 700 },
        { text: '🚀 PRODUCTION RELEASE v4.2 DEPLOYED IN 0.38s (P99: 112ms)', cls: 't-cyan', delay: 850 }
      ]
    },
    benchmark: {
      cmd: 'viper benchmark --run-all',
      lines: [
        { text: '⚡ Running Google Lighthouse v11 Mobile Engine...', cls: 't-success', delay: 180 },
        { text: '   Performance: 100/100 | Accessibility: 100/100 | Best Practices: 100/100 | SEO: 100/100', cls: 't-cyan', delay: 350 },
        { text: '✔ Time To First Byte (TTFB): 38ms (Sub-second Edge Cache Hit)', cls: 't-success', delay: 500 },
        { text: '✔ Simulated Concurrency Load: 10,000 req/sec sustained with 0% dropped packets.', cls: 't-success', delay: 680 },
        { text: '📊 BENCHMARK VERDICT: 8.4x faster than standard agency WordPress/Webflow stacks.', cls: 't-cyan', delay: 850 }
      ]
    },
    stack: {
      cmd: 'viper stack --inspect',
      lines: [
        { text: '📦 FRONTEND: Next.js 15 (App Router, Server Actions, React 19)', cls: 't-cyan', delay: 150 },
        { text: '🎮 GRAPHICS: Three.js r128 WebGL + GLSL custom fragment shaders', cls: 't-cyan', delay: 300 },
        { text: '⚡ BACKEND: Cloudflare Workers + Node.js 22 LTS microservices', cls: 't-cyan', delay: 450 },
        { text: '🗄️ PERSISTENCE: Neon Serverless PostgreSQL + Redis Cache Cluster (Upstash)', cls: 't-cyan', delay: 600 },
        { text: '🛡️ SECURITY & WAF: Strict CSP Level 3 + TLS 1.3 + Zero-Trust DDOS shield', cls: 't-success', delay: 750 }
      ]
    },
    founders: {
      cmd: 'viper team --verify',
      lines: [
        { text: '👤 SUBASH BHANDARI — Lead System Architect & Full-Stack Engineer', cls: 't-cyan', delay: 180 },
        { text: '   Specialty: Distributed Edge Systems, Next.js Architecture, High-Concurrency APIs', delay: 320 },
        { text: '👤 ROHAN AACHARYA — Core Infrastructure Engineer & Graphics Specialist', cls: 't-cyan', delay: 460 },
        { text: '   Specialty: 3D Three.js WebGL Shaders, Cloud Reliability, Performance Optimization', delay: 600 },
        { text: '💬 Direct WhatsApp Engineering Dispatch: +977 9763876490 (Zero Junior Middlemen)', cls: 't-success', delay: 750 }
      ]
    }
  };

  cmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isExecuting || !screen) return;
      const cmdKey = btn.getAttribute('data-cmd');
      const data = CLI_COMMANDS[cmdKey];
      if (!data) return;

      isExecuting = true;
      playSciFiBeep('chirp');

      // Add user command to terminal screen
      const cmdPrompt = document.createElement('div');
      cmdPrompt.className = 'terminal-line prompt-line';
      cmdPrompt.innerHTML = `<span class="t-host">subash@viper-edge</span>:<span class="t-dir">~/production</span>$ <span class="t-cmd-active">${data.cmd}</span>`;
      screen.appendChild(cmdPrompt);

      let completedCount = 0;
      data.lines.forEach((item) => {
        setTimeout(() => {
          const lineEl = document.createElement('div');
          lineEl.className = `terminal-line ${item.cls ? 'highlight' : ''}`;
          if (item.cls) {
            lineEl.innerHTML = `<span class="${item.cls}">${item.text}</span>`;
          } else {
            lineEl.textContent = item.text;
          }
          screen.appendChild(lineEl);
          screen.scrollTop = screen.scrollHeight;

          completedCount++;
          if (completedCount === data.lines.length) {
            const nextPrompt = document.createElement('div');
            nextPrompt.className = 'terminal-line prompt-line blink-line';
            nextPrompt.innerHTML = `<span class="t-host">subash@viper-edge</span>:<span class="t-dir">~/production</span>$ <span class="terminal-cursor">█</span>`;
            screen.appendChild(nextPrompt);
            screen.scrollTop = screen.scrollHeight;
            isExecuting = false;
          }
        }, item.delay);
      });
    });
  });

  // 3. Live Edge Telemetry Log Stream Simulation
  if (logStream) {
    const SAMPLE_NODES = ['EDGE-SGP', 'EDGE-LHR', 'EDGE-NRT', 'EDGE-JFK', 'EDGE-FRA'];
    const SAMPLE_PATHS = ['/api/v1/telemetry', '/services/calculator', '/api/v1/benchmark', '/projects/masterielts', '/api/v1/healthz'];

    setInterval(() => {
      if (document.hidden) return;
      const node = SAMPLE_NODES[Math.floor(Math.random() * SAMPLE_NODES.length)];
      const path = SAMPLE_PATHS[Math.floor(Math.random() * SAMPLE_PATHS.length)];
      const ms = Math.floor(Math.random() * 35) + 18;
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML = `<span class="log-time">[${timeStr}]</span> <span class="log-tag tag-edge">${node}</span> 200 OK &mdash; GET ${path} (${ms}ms) &mdash; CDN CACHE HIT`;

      logStream.appendChild(entry);
      if (logStream.children.length > 9) {
        logStream.removeChild(logStream.firstElementChild);
      }
      logStream.scrollTop = logStream.scrollHeight;
    }, 4500);
  }
}

// ============================================
// 16. INTERACTIVE ARCHITECTURE STACK INSPECTOR
// ============================================
const ARCHITECTURE_DATA = {
  frontend: {
    category: 'CLIENT-SIDE PERFORMANCE',
    title: 'Serverless Edge SSR & Three.js Graphics',
    desc: 'We eliminate sluggish client bundles by pre-rendering dynamic routes on edge workers and running GPU-accelerated Three.js shaders on independent threads with zero render-blocking scripts.',
    metrics: [
      { label: 'Largest Contentful Paint', val: '< 0.45s' },
      { label: 'Rendering Frame Budget', val: '60 FPS Locked' },
      { label: 'Bundle Overhead', val: '< 45KB Gzipped' },
      { label: 'Lighthouse Score', val: '100 / 100' }
    ],
    code: `<span class="c-comment">// Edge-rendered high-speed route</span>
<span class="c-keyword">export const</span> runtime = <span class="c-str">'edge'</span>;
<span class="c-keyword">export const</span> revalidate = <span class="c-num">60</span>;

<span class="c-keyword">export default async function</span> <span class="c-func">Page</span>() {
  <span class="c-keyword">const</span> data = <span class="c-keyword">await</span> <span class="c-func">getEdgeCache</span>();
  <span class="c-keyword">return</span> &lt;<span class="c-type">QuantumRenderer</span> assets={data} /&gt;;
}`
  },
  backend: {
    category: 'DISTRIBUTED SYSTEMS',
    title: 'Ultra-High Concurrency Microservices',
    desc: 'Engineered in Go and Node.js with asynchronous I/O, horizontal autoscaling on container clusters, and distributed Redis caching capable of managing 100,000+ simultaneous visitors.',
    metrics: [
      { label: 'P99 Latency SLA', val: '< 18ms' },
      { label: 'Concurrent Capacity', val: '100,000+ Req/s' },
      { label: 'Database Connection Pooling', val: 'PGBouncer 10k Pool' },
      { label: 'Availability Guarantee', val: '99.99% Uptime' }
    ],
    code: `<span class="c-comment">// High-concurrency cluster worker</span>
<span class="c-keyword">import</span> { <span class="c-type">EdgeWorkerPool</span> } <span class="c-keyword">from</span> <span class="c-str">'@viper/concurrency'</span>;

<span class="c-keyword">export const</span> worker = <span class="c-keyword">new</span> <span class="c-type">EdgeWorkerPool</span>({
  concurrency: <span class="c-num">100000</span>,
  timeoutMs: <span class="c-num">150</span>,
  cacheLayer: <span class="c-str">'redis-cluster'</span>,
  onBurst: (req) => req.<span class="c-func">drain</span>()
});`
  },
  ai: {
    category: 'INTELLIGENT WORKFLOWS',
    title: 'Vector Pipelines & Autonomous AI Agents',
    desc: 'Embedding custom domain knowledge using pgvector, LangChain orchestration, and streaming sub-50ms token generation for production systems like Master IELTS AI.',
    metrics: [
      { label: 'Vector Query Time', val: '< 12ms' },
      { label: 'Streaming TTFT', val: '< 85ms' },
      { label: 'Embedding Dimensions', val: '1536 Cosine' },
      { label: 'Evaluation Accuracy', val: '99.4%' }
    ],
    code: `<span class="c-comment">// Semantic vector retrieval pipeline</span>
<span class="c-keyword">import</span> { <span class="c-type">VectorStore</span>, <span class="c-type">AIStream</span> } <span class="c-keyword">from</span> <span class="c-str">'@viper/ai'</span>;

<span class="c-keyword">export async function</span> <span class="c-func">POST</span>(req: <span class="c-type">Request</span>) {
  <span class="c-keyword">const</span> { query } = <span class="c-keyword">await</span> req.<span class="c-func">json</span>();
  <span class="c-keyword">const</span> context = <span class="c-keyword">await</span> <span class="c-type">VectorStore</span>.<span class="c-func">search</span>(query, { topK: <span class="c-num">5</span> });
  <span class="c-keyword">return</span> <span class="c-type">AIStream</span>.<span class="c-func">pipe</span>({ prompt: query, context });
}`
  },
  devops: {
    category: 'INFRASTRUCTURE & COMPLIANCE',
    title: 'Zero-Trust Cloud WAF & Git IP Handover',
    desc: 'Production infrastructure guarded by Cloudflare Enterprise WAF, rate limiting, and automated CI/CD pipelines. Every contract includes 100% full source code and infrastructure-as-code handover.',
    metrics: [
      { label: 'DDoS Mitigation Capacity', val: '172 Tbps' },
      { label: 'Deploy Pipeline Time', val: '< 45s' },
      { label: 'Client IP Ownership', val: '100% Full Git' },
      { label: 'Zero-Trust Firewall', val: 'TLS 1.3 Active' }
    ],
    code: `<span class="c-comment">// Infrastructure-As-Code (Terraform / Cloudflare)</span>
<span class="c-keyword">resource</span> <span class="c-str">"cloudflare_ruleset"</span> <span class="c-str">"viper_waf"</span> {
  zone_id     = <span class="c-func">var.zone_id</span>
  name        = <span class="c-str">"Viper Enterprise Threat Defense"</span>
  kind        = <span class="c-str">"zone"</span>
  phase       = <span class="c-str">"http_request_firewall_managed"</span>
  rules {
    action = <span class="c-str">"block"</span>
    expression = <span class="c-str">"(cf.threat_score gt 15)"</span>
  }
}`
  }
};

function initArchitectureInspector() {
  const btns = document.querySelectorAll('.arch-tab-btn');
  const catEl = document.getElementById('arch-card-category');
  const titleEl = document.getElementById('arch-card-title');
  const descEl = document.getElementById('arch-card-desc');
  const metricsEl = document.getElementById('arch-card-metrics');
  const codeEl = document.getElementById('arch-code-snippet');

  if (!btns.length || !catEl || !titleEl || !descEl || !metricsEl || !codeEl) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      playSciFiBeep('chirp');

      const discipline = btn.getAttribute('data-discipline');
      const data = ARCHITECTURE_DATA[discipline];
      if (!data) return;

      catEl.textContent = data.category;
      titleEl.textContent = data.title;
      descEl.textContent = data.desc;
      codeEl.innerHTML = data.code;

      metricsEl.innerHTML = data.metrics.map(m => `
        <div class="arch-metric-item">
          <span class="m-title">${m.label}</span>
          <span class="m-val">${m.val}</span>
        </div>
      `).join('');
    });
  });
}

// ============================================
// 17. UNIVERSAL 1-CLICK WHATSAPP BOOKING MODAL
// ============================================
function initWhatsAppBookingModal() {
  const modalOverlay = document.getElementById('whatsapp-booking-modal');
  const closeBtn = document.getElementById('whatsapp-modal-close');
  const bookingForm = document.getElementById('whatsapp-booking-form');
  const triggers = document.querySelectorAll('[data-open-booking-modal]');

  const clientNameInput = document.getElementById('wa-client-name');
  const serviceSelect = document.getElementById('wa-service-type');
  const budgetSelect = document.getElementById('wa-budget-tier');
  const timelineSelect = document.getElementById('wa-timeline');
  const notesTextarea = document.getElementById('wa-project-notes');

  function openModal(serviceVal, budgetVal) {
    if (!modalOverlay) return;

    if (serviceVal && serviceSelect) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].value.toLowerCase().includes(serviceVal.toLowerCase()) || 
            serviceVal.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (budgetVal && budgetSelect) {
      for (let i = 0; i < budgetSelect.options.length; i++) {
        if (budgetSelect.options[i].value.toLowerCase().includes(budgetVal.toLowerCase()) ||
            budgetVal.toLowerCase().includes(budgetSelect.options[i].value.toLowerCase())) {
          budgetSelect.selectedIndex = i;
          break;
        }
      }
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playSciFiBeep('chirp');

    setTimeout(() => {
      if (clientNameInput) clientNameInput.focus();
    }, 150);
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceVal = trigger.getAttribute('data-service') || '';
      const budgetVal = trigger.getAttribute('data-budget') || '';
      openModal(serviceVal, budgetVal);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = clientNameInput ? clientNameInput.value.trim() : 'Prospective Client';
      const service = serviceSelect ? serviceSelect.value : 'Custom Software Architecture';
      const budget = budgetSelect ? budgetSelect.value : 'Flexible';
      const timeline = timelineSelect ? timelineSelect.value : 'Standard Sprint';
      const notes = (notesTextarea && notesTextarea.value.trim()) ? notesTextarea.value.trim() : 'Ready to start immediately.';

      const textMessage = 
`🚀 *NEW PROJECT BOOKING — VIPER INTELLIGENCE*
━━━━━━━━━━━━━━━━━━━━
👤 *Client Name:* ${name}
💼 *Service Required:* ${service}
💰 *Budget Tier:* ${budget}
⏱️ *Target Timeline:* ${timeline}
📝 *Project Scope / Notes:*
${notes}
━━━━━━━━━━━━━━━━━━━━
📍 *Portal:* Viper Intelligence Web Platform (Kathmandu, Nepal)
👤 *Recipient:* Subash Bhandari (Lead Architect)
📞 *Direct WhatsApp:* +977 9763876490`;

      const waUrl = `https://wa.me/9779763876490?text=${encodeURIComponent(textMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      closeModal();
      bookingForm.reset();
    });
  }

  // Expose global helper
  window.openViperWhatsAppBookingModal = openModal;
}

// ============================================
// 19. LEGAL DOCUMENTATION SCROLLSPY
// ============================================
function initLegalNavigationSpy() {
  const cards = document.querySelectorAll('.legal-card[id]');
  const links = document.querySelectorAll('.legal-nav-link');
  if (!cards.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  cards.forEach(card => observer.observe(card));
}

// Initialize everything on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initSitePreloaderEngine();
  initMatrixGridCanvas();
  init3DTechCubeEngine();
  init3DAIRobotEngine();
  initLiveChatbotEngine();
  init3DCardParallaxEngine();
  initModalHandlers();
  initStatsCounter();
  initTypewriter();
  initNavbarScroll();
  initFormHandlers();
  initMobileMenu();
  initCostCalculator();
  initProjectFilter();
  initFaqAccordion();
  initConsultationPortal();
  initDeveloperWorkbench();
  initArchitectureInspector();
  initWhatsAppBookingModal();
  initLegalNavigationSpy();
});
