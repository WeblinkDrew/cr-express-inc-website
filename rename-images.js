const fs = require('fs');
const path = require('path');

const imagesDir = './public/images/blog-post';

// Get all image files
const files = fs.readdirSync(imagesDir);

console.log('Renaming image files to be URL-friendly...\n');

files.forEach(file => {
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);

  // Convert to URL-friendly name
  let newBaseName = baseName
    .replace(/[\s–—]+/g, '-')  // Replace spaces and em/en dashes with hyphens
    .replace(/['']/g, '')       // Remove curly apostrophes
    .replace(/:/g, '')          // Remove colons
    .replace(/[^\w\-\.]/g, '-') // Replace other special chars with hyphens
    .replace(/-+/g, '-')        // Collapse multiple hyphens
    .replace(/^-|-$/g, '');     // Remove leading/trailing hyphens

  const newFile = newBaseName + ext;

  if (file !== newFile) {
    const oldPath = path.join(imagesDir, file);
    const newPath = path.join(imagesDir, newFile);

    fs.renameSync(oldPath, newPath);
    console.log(`✓ ${file} -> ${newFile}`);
  }
});

console.log('\nDone!');
