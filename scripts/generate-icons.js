const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_IMAGE = path.join(__dirname, '../assets/logo-source.png');
const ASSETS_DIR = path.join(__dirname, '../assets');

// Icon sizes needed for Expo
const iconSizes = {
  'icon.png': 1024,           // Main app icon
  'adaptive-icon.png': 1024,  // Android adaptive icon foreground
  'favicon.png': 48,          // Web favicon
  'splash-icon.png': 512,     // Splash screen icon
};

async function generateIcons() {
  // Check if source image exists
  if (!fs.existsSync(SOURCE_IMAGE)) {
    console.error('Source image not found at:', SOURCE_IMAGE);
    console.log('Please save the logo image as assets/logo-source.png');
    process.exit(1);
  }

  console.log('Generating icons from:', SOURCE_IMAGE);

  for (const [filename, size] of Object.entries(iconSizes)) {
    const outputPath = path.join(ASSETS_DIR, filename);
    
    try {
      await sharp(SOURCE_IMAGE)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 245, b: 247, alpha: 1 } // #FFF5F7 - app background color
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✓ Generated ${filename} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${filename}:`, error.message);
    }
  }

  // Generate splash screen with centered logo on pink background
  const splashPath = path.join(ASSETS_DIR, 'splash.png');
  try {
    // Create a 2048x2048 splash screen with centered logo
    const logoBuffer = await sharp(SOURCE_IMAGE)
      .resize(600, 600, { fit: 'contain', background: { r: 255, g: 245, b: 247, alpha: 1 } })
      .toBuffer();

    await sharp({
      create: {
        width: 2048,
        height: 2048,
        channels: 4,
        background: { r: 255, g: 245, b: 247, alpha: 1 } // #FFF5F7
      }
    })
    .composite([{
      input: logoBuffer,
      gravity: 'center'
    }])
    .png()
    .toFile(splashPath);
    
    console.log('✓ Generated splash.png (2048x2048)');
  } catch (error) {
    console.error('✗ Failed to generate splash.png:', error.message);
  }

  console.log('\nDone! Icons generated in assets/');
}

generateIcons().catch(console.error);
