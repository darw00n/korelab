const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/product-images');
const outputDir = path.join(__dirname, '../public/product-images-optimized');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all images
const files = fs.readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

async function optimizeImages() {
  console.log(`Optimizing ${files.length} images...\n`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    const inputStats = fs.statSync(inputPath);
    const inputSizeKB = (inputStats.size / 1024).toFixed(2);
    
    await sharp(inputPath)
      .resize(800, 800, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const outputStats = fs.statSync(outputPath);
    const outputSizeKB = (outputStats.size / 1024).toFixed(2);
    const reduction = (100 - (outputStats.size / inputStats.size * 100)).toFixed(1);
    
    console.log(`${file}: ${inputSizeKB}KB → ${outputSizeKB}KB (-${reduction}%)`);
  }
  
  console.log('\n✅ Done! Optimized images in public/product-images-optimized/');
}

optimizeImages().catch(console.error);
