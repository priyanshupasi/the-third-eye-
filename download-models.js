import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, 'node_modules', '@vladmandic', 'face-api', 'model');
const DEST_DIR = path.join(__dirname, 'public', 'models');

const files = [
  'ssd_mobilenetv1_model-weights_manifest.json',
  'ssd_mobilenetv1_model.bin',
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model.bin',
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model.bin'
];

// Ensure destination directory exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

console.log('Copying face-api.js models from node_modules...');

try {
  if (!fs.existsSync(SOURCE_DIR)) {
    throw new Error(`Source models directory not found at: ${SOURCE_DIR}. Did you run npm install?`);
  }

  for (const file of files) {
    const srcPath = path.join(SOURCE_DIR, file);
    const destPath = path.join(DEST_DIR, file);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Copied ${file}`);
    } else {
      throw new Error(`Source model file not found: ${file}`);
    }
  }
  console.log('All models copied successfully!');
} catch (error) {
  console.error('Error copying models:', error.message);
  process.exit(1);
}
