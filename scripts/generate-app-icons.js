const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets');

// SVG logo with paw prints on pink rounded square (matching the app screenshots)
const createLogoSVG = (size) => Buffer.from(`<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#FFF5F7"/>
  
  <!-- Pink rounded square background -->
  <rect x="212" y="212" width="600" height="600" rx="120" ry="120" fill="#EC4899"/>
  
  <!-- Two paw prints -->
  <g transform="translate(350, 420)">
    <!-- First paw (top-left) -->
    <g transform="translate(0, 0) rotate(-15)">
      <!-- Main pad -->
      <ellipse cx="60" cy="100" rx="45" ry="40" fill="#1a1a1a"/>
      <!-- Toe pads -->
      <ellipse cx="25" cy="45" rx="22" ry="25" fill="#1a1a1a"/>
      <ellipse cx="70" cy="30" rx="22" ry="25" fill="#1a1a1a"/>
      <ellipse cx="115" cy="45" rx="22" ry="25" fill="#1a1a1a"/>
    </g>
    
    <!-- Second paw (bottom-right) -->
    <g transform="translate(120, 80) rotate(-15)">
      <!-- Main pad -->
      <ellipse cx="60" cy="100" rx="45" ry="40" fill="#1a1a1a"/>
      <!-- Toe pads -->
      <ellipse cx="25" cy="45" rx="22" ry="25" fill="#1a1a1a"/>
      <ellipse cx="70" cy="30" rx="22" ry="25" fill="#1a1a1a"/>
      <ellipse cx="115" cy="45" rx="22" ry="25" fill="#1a1a1a"/>
    </g>
  </g>
</svg>`);

// Splash screen SVG with paw prints icon (matching the loading screen design)
const createSplashSVG = () => Buffer.from(`<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="2048" fill="#FFF5F7"/>
  
  <!-- Rounded square with pink border and white fill -->
  <rect x="724" y="724" width="600" height="600" rx="80" ry="80" fill="white" stroke="#FBCFE8" stroke-width="8"/>
  
  <!-- Pink arc at top -->
  <path d="M 780 780 Q 1024 700 1268 780" fill="none" stroke="#EC4899" stroke-width="12" stroke-linecap="round"/>
  
  <!-- Two paw prints -->
  <g transform="translate(870, 920)">
    <!-- First paw (top-left) -->
    <g transform="translate(0, 0) rotate(-20)">
      <!-- Main pad -->
      <ellipse cx="50" cy="85" rx="38" ry="34" fill="#1a1a1a"/>
      <!-- Toe pads -->
      <ellipse cx="20" cy="38" rx="18" ry="22" fill="#1a1a1a"/>
      <ellipse cx="58" cy="25" rx="18" ry="22" fill="#1a1a1a"/>
      <ellipse cx="96" cy="38" rx="18" ry="22" fill="#1a1a1a"/>
    </g>
    
    <!-- Second paw (bottom-right) -->
    <g transform="translate(100, 70) rotate(-20)">
      <!-- Main pad -->
      <ellipse cx="50" cy="85" rx="38" ry="34" fill="#1a1a1a"/>
      <!-- Toe pads -->
      <ellipse cx="20" cy="38" rx="18" ry="22" fill="#1a1a1a"/>
      <ellipse cx="58" cy="25" rx="18" ry="22" fill="#1a1a1a"/>
      <ellipse cx="96" cy="38" rx="18" ry="22" fill="#1a1a1a"/>
    </g>
  </g>
</svg>`);

async function generateIcons() {
  console.log('Generating app icons...\n');

  const iconConfigs = [
    { name: 'icon.png', size: 1024, svg: createLogoSVG(1024) },
    { name: 'adaptive-icon.png', size: 1024, svg: createLogoSVG(1024) },
    { name: 'favicon.png', size: 48, svg: createLogoSVG(48) },
    { name: 'splash-icon.png', size: 512, svg: createLogoSVG(512) },
  ];

  for (const config of iconConfigs) {
    try {
      await sharp(config.svg)
        .resize(config.size, config.size)
        .png()
        .toFile(path.join(ASSETS_DIR, config.name));
      console.log(`✓ ${config.name} (${config.size}x${config.size})`);
    } catch (error) {
      console.error(`✗ ${config.name}: ${error.message}`);
    }
  }

  // Generate splash screen
  try {
    await sharp(createSplashSVG())
      .resize(2048, 2048)
      .png()
      .toFile(path.join(ASSETS_DIR, 'splash.png'));
    console.log('✓ splash.png (2048x2048)');
  } catch (error) {
    console.error(`✗ splash.png: ${error.message}`);
  }

  console.log('\n✅ All icons generated in assets/');
}

generateIcons().catch(console.error);
