const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './src/assets/optimized';

fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, '.webp'));

  sharp(inputPath)
    .rotate() // <-- This auto-corrects orientation based on EXIF metadata
    .resize(768, 512, { fit: 'cover' })
    .webp({ quality: 70 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Optimized: ${file}`))
    .catch(err => console.error(`❌ Failed: ${file}`, err));
});
