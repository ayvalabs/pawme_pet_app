const fs = require('fs');
const path = require('path');

// SVG of the PawMe logo (pink circle with dog and cat yin-yang style)
const createLogoSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#FFF5F7"/>
  <g transform="translate(62, 62)">
    <!-- Pink circle with outline -->
    <circle cx="450" cy="450" r="430" fill="#EC4899" stroke="#EC4899" stroke-width="20"/>
    
    <!-- Dog head (pink/negative space forming the shape) -->
    <!-- Dog ear -->
    <path d="M180 120 Q120 80 100 180 Q90 280 180 320" fill="#FFF5F7" stroke="none"/>
    
    <!-- Dog face outline creating the curved edge -->
    <ellipse cx="280" cy="340" rx="140" ry="120" fill="#EC4899"/>
    
    <!-- Dog eyes -->
    <circle cx="240" cy="280" r="25" fill="white"/>
    <circle cx="340" cy="280" r="25" fill="white"/>
    
    <!-- Dog nose -->
    <ellipse cx="290" cy="360" rx="20" ry="15" fill="#EC4899" stroke="white" stroke-width="8"/>
    
    <!-- Dog mouth/smile -->
    <path d="M260 390 Q290 420 320 390" fill="none" stroke="white" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Dog ear (right side, curved line) -->
    <path d="M520 180 Q620 140 680 280 Q700 380 620 420" fill="none" stroke="white" stroke-width="12"/>
    
    <!-- Cat (white shape) -->
    <ellipse cx="480" cy="580" rx="200" ry="180" fill="white"/>
    
    <!-- Cat ears -->
    <path d="M320 450 L360 520 L400 450 Z" fill="white"/>
    <path d="M500 450 L540 520 L580 450 Z" fill="white"/>
    
    <!-- Cat eyes -->
    <circle cx="400" cy="560" r="18" fill="#EC4899"/>
    <circle cx="520" cy="560" r="18" fill="#EC4899"/>
    
    <!-- Cat nose -->
    <ellipse cx="460" cy="610" rx="12" ry="10" fill="#EC4899"/>
    
    <!-- Cat mouth -->
    <path d="M440 630 Q460 650 480 630" fill="none" stroke="#EC4899" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>
`;

// Simplified logo that matches the provided image more closely
const createSimplifiedLogoSVG = (size, withBackground = true) => `
<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  ${withBackground ? '<rect width="1024" height="1024" fill="#FFF5F7"/>' : ''}
  <g transform="translate(512, 512)">
    <!-- Main pink circle -->
    <circle cx="0" cy="0" r="420" fill="#EC4899"/>
    
    <!-- Circle outline (left arc) -->
    <path d="M -420 0 A 420 420 0 0 1 0 -420" fill="none" stroke="#EC4899" stroke-width="24"/>
    
    <!-- Dog silhouette (negative space / pink) -->
    <!-- Dog ear left -->
    <path d="M -280 -320 Q -360 -380 -380 -280 Q -380 -180 -280 -140" fill="white" opacity="0.15"/>
    
    <!-- Dog ear right (white curved line) -->
    <path d="M 80 -280 Q 200 -340 280 -200 Q 320 -80 240 0" fill="none" stroke="white" stroke-width="16" stroke-linecap="round"/>
    
    <!-- Dog eyes (white dots) -->
    <circle cx="-180" cy="-160" r="28" fill="white"/>
    <circle cx="-60" cy="-160" r="28" fill="white"/>
    
    <!-- Dog nose -->
    <ellipse cx="-120" cy="-60" rx="22" ry="16" fill="white" opacity="0.9"/>
    
    <!-- Dog smile -->
    <path d="M -160 -20 Q -120 20 -80 -20" fill="none" stroke="white" stroke-width="10" stroke-linecap="round"/>
    
    <!-- Cat (white blob) -->
    <ellipse cx="40" cy="160" rx="220" ry="200" fill="white"/>
    
    <!-- Cat left ear -->
    <path d="M -140 20 L -100 -60 L -60 20 Z" fill="white"/>
    
    <!-- Cat right ear -->
    <path d="M 80 20 L 120 -60 L 160 20 Z" fill="white"/>
    
    <!-- Cat eyes (pink dots) -->
    <circle cx="-40" cy="120" r="22" fill="#EC4899"/>
    <circle cx="100" cy="120" r="22" fill="#EC4899"/>
    
    <!-- Cat nose (pink) -->
    <ellipse cx="30" cy="180" rx="14" ry="10" fill="#EC4899"/>
    
    <!-- Cat mouth -->
    <path d="M 0 200 Q 30 230 60 200" fill="none" stroke="#EC4899" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>
`;

const ASSETS_DIR = path.join(__dirname, '../assets');

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// Save SVG files that can be converted
const icons = [
  { name: 'icon.svg', size: 1024, background: true },
  { name: 'adaptive-icon.svg', size: 1024, background: false },
  { name: 'favicon.svg', size: 48, background: true },
  { name: 'splash-icon.svg', size: 512, background: true },
];

icons.forEach(({ name, size, background }) => {
  const svg = createSimplifiedLogoSVG(size, background);
  const outputPath = path.join(ASSETS_DIR, name);
  fs.writeFileSync(outputPath, svg);
  console.log(`✓ Created ${name}`);
});

// Create splash screen SVG
const splashSVG = `
<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="2048" fill="#FFF5F7"/>
  <g transform="translate(724, 724)">
    <!-- Main pink circle -->
    <circle cx="300" cy="300" r="280" fill="#EC4899"/>
    
    <!-- Dog ear right (white curved line) -->
    <path d="M 350 80 Q 420 40 480 120 Q 520 200 460 260" fill="none" stroke="white" stroke-width="12" stroke-linecap="round"/>
    
    <!-- Dog eyes (white dots) -->
    <circle cx="160" cy="180" r="20" fill="white"/>
    <circle cx="240" cy="180" r="20" fill="white"/>
    
    <!-- Dog nose -->
    <ellipse cx="200" cy="240" rx="16" ry="12" fill="white" opacity="0.9"/>
    
    <!-- Dog smile -->
    <path d="M 170 270 Q 200 300 230 270" fill="none" stroke="white" stroke-width="8" stroke-linecap="round"/>
    
    <!-- Cat (white blob) -->
    <ellipse cx="320" cy="380" rx="150" ry="140" fill="white"/>
    
    <!-- Cat left ear -->
    <path d="M 200 280 L 230 220 L 260 280 Z" fill="white"/>
    
    <!-- Cat right ear -->
    <path d="M 340 280 L 370 220 L 400 280 Z" fill="white"/>
    
    <!-- Cat eyes (pink dots) -->
    <circle cx="260" cy="360" r="16" fill="#EC4899"/>
    <circle cx="360" cy="360" r="16" fill="#EC4899"/>
    
    <!-- Cat nose (pink) -->
    <ellipse cx="310" cy="400" rx="10" ry="8" fill="#EC4899"/>
    
    <!-- Cat mouth -->
    <path d="M 290 420 Q 310 440 330 420" fill="none" stroke="#EC4899" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>
`;

fs.writeFileSync(path.join(ASSETS_DIR, 'splash.svg'), splashSVG);
console.log('✓ Created splash.svg');

console.log('\nSVG files created! Now converting to PNG...');
console.log('Run: node scripts/convert-svg-to-png.js');
