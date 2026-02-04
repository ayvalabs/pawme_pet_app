const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../assets');

// First create the SVG files
const createLogoSVG = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#FFF5F7"/>
  <g transform="translate(512, 512)">
    <circle cx="0" cy="0" r="420" fill="#EC4899"/>
    <path d="M 80 -280 Q 200 -340 280 -200 Q 320 -80 240 0" fill="none" stroke="white" stroke-width="16" stroke-linecap="round"/>
    <circle cx="-180" cy="-160" r="28" fill="white"/>
    <circle cx="-60" cy="-160" r="28" fill="white"/>
    <ellipse cx="-120" cy="-60" rx="22" ry="16" fill="white" opacity="0.9"/>
    <path d="M -160 -20 Q -120 20 -80 -20" fill="none" stroke="white" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="40" cy="160" rx="220" ry="200" fill="white"/>
    <path d="M -140 20 L -100 -60 L -60 20 Z" fill="white"/>
    <path d="M 80 20 L 120 -60 L 160 20 Z" fill="white"/>
    <circle cx="-40" cy="120" r="22" fill="#EC4899"/>
    <circle cx="100" cy="120" r="22" fill="#EC4899"/>
    <ellipse cx="30" cy="180" rx="14" ry="10" fill="#EC4899"/>
    <path d="M 0 200 Q 30 230 60 200" fill="none" stroke="#EC4899" stroke-width="8" stroke-linecap="round"/>
  </g>
</svg>`;

const createSplashSVG = () => `<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
  <rect width="2048" height="2048" fill="#FFF5F7"/>
  <g transform="translate(1024, 1024)">
    <circle cx="0" cy="0" r="300" fill="#EC4899"/>
    <path d="M 60 -200 Q 140 -240 200 -140 Q 230 -60 170 0" fill="none" stroke="white" stroke-width="12" stroke-linecap="round"/>
    <circle cx="-130" cy="-115" r="20" fill="white"/>
    <circle cx="-45" cy="-115" r="20" fill="white"/>
    <ellipse cx="-85" cy="-45" rx="16" ry="12" fill="white" opacity="0.9"/>
    <path d="M -115 -15 Q -85 15 -55 -15" fill="none" stroke="white" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="30" cy="115" rx="160" ry="145" fill="white"/>
    <path d="M -100 15 L -70 -45 L -40 15 Z" fill="white"/>
    <path d="M 60 15 L 90 -45 L 120 15 Z" fill="white"/>
    <circle cx="-30" cy="85" r="16" fill="#EC4899"/>
    <circle cx="75" cy="85" r="16" fill="#EC4899"/>
    <ellipse cx="22" cy="130" rx="10" ry="8" fill="#EC4899"/>
    <path d="M 0 145 Q 22 165 44 145" fill="none" stroke="#EC4899" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

// Save SVG files
console.log('Creating SVG files...');
fs.writeFileSync(path.join(ASSETS_DIR, 'icon.svg'), createLogoSVG(1024));
fs.writeFileSync(path.join(ASSETS_DIR, 'splash.svg'), createSplashSVG());
console.log('✓ SVG files created');

// Use qlmanage (macOS) to convert SVG to PNG
const convertSvgToPng = (svgPath, pngPath, size) => {
  try {
    // Use rsvg-convert if available, otherwise try other methods
    try {
      execSync(`rsvg-convert -w ${size} -h ${size} "${svgPath}" -o "${pngPath}"`, { stdio: 'pipe' });
      return true;
    } catch (e) {
      // Try using sips with a temporary approach
      // sips doesn't directly support SVG, so we'll use a different method
    }
    
    // Try using ImageMagick's convert if available
    try {
      execSync(`convert -background none -resize ${size}x${size} "${svgPath}" "${pngPath}"`, { stdio: 'pipe' });
      return true;
    } catch (e) {
      // ImageMagick not available
    }

    return false;
  } catch (error) {
    return false;
  }
};

// Try to convert
const iconSvg = path.join(ASSETS_DIR, 'icon.svg');
const splashSvg = path.join(ASSETS_DIR, 'splash.svg');

const conversions = [
  { svg: iconSvg, png: path.join(ASSETS_DIR, 'icon.png'), size: 1024 },
  { svg: iconSvg, png: path.join(ASSETS_DIR, 'adaptive-icon.png'), size: 1024 },
  { svg: iconSvg, png: path.join(ASSETS_DIR, 'favicon.png'), size: 48 },
  { svg: iconSvg, png: path.join(ASSETS_DIR, 'splash-icon.png'), size: 512 },
  { svg: splashSvg, png: path.join(ASSETS_DIR, 'splash.png'), size: 2048 },
];

let converted = 0;
conversions.forEach(({ svg, png, size }) => {
  if (convertSvgToPng(svg, png, size)) {
    console.log(`✓ Converted to ${path.basename(png)} (${size}x${size})`);
    converted++;
  }
});

if (converted === 0) {
  console.log('\n⚠️  Could not auto-convert SVG to PNG.');
  console.log('Please install one of these tools:');
  console.log('  brew install librsvg    # for rsvg-convert');
  console.log('  brew install imagemagick # for convert');
  console.log('\nOr manually convert the SVG files in assets/ to PNG.');
  console.log('\nAlternatively, you can use an online tool like:');
  console.log('  https://cloudconvert.com/svg-to-png');
}

console.log('\nDone!');
