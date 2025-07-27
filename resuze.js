const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';
const outputDir = './src/assets/optimized';

fs.mkdirSync(outputDir, { recursive: true });

const fixedWidth = 400; // fixed width for all images

// Heights range to simulate masonry variability
const minHeight = 300;
const maxHeight = 600;

function getRandomHeight() {
  return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.[^.]+$/, '.webp'));

  const height = getRandomHeight();

  sharp(inputPath)
    .rotate()
    .resize(fixedWidth, height, { fit: 'cover' })
    .webp({ quality: 100 })
    .toFile(outputPath)
    .then(() => console.log(`✅ Optimized: ${file} resized to ${fixedWidth}x${height}`))
    .catch(err => console.error(`❌ Failed: ${file}`, err));
});
