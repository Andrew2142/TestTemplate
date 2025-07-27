const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './src/assets/images';

// Read all files in the directory
fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);

  // Skip non-image files
  if (!/\.(jpe?g|png)$/i.test(file)) {
    console.log(`⚠️ Skipped (not an image): ${file}`);
    return;
  }

  const outputPath = inputPath.replace(/\.[^.]+$/, '.webp'); // Replace extension with .webp

  sharp(inputPath)
    .rotate()
    .webp({ quality: 50 }) // Compress to ~50% quality
    .toFile(outputPath)
    .then(() => {
      fs.unlinkSync(inputPath); // Remove the original image
      fs.renameSync(outputPath, inputPath); // Rename the webp back to the original name
      console.log(`✅ Compressed & replaced: ${file}`);
    })
    .catch(err => {
      console.error(`❌ Failed to compress: ${file}`, err);
    });
});
