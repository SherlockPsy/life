import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConstraints() {
  const constraintsDir = path.join(__dirname, '..', 'constraints');
  
  if (!fs.existsSync(constraintsDir)) {
    console.log('No constraints directory found');
    return '';
  }

  const files = fs.readdirSync(constraintsDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('No constraint files found');
    return '';
  }

  const constraints = files.map(file => {
    const content = fs.readFileSync(path.join(constraintsDir, file), 'utf-8');
    return `=== ${file} ===\n${content}`;
  }).join('\n\n');

  console.log(`Loaded ${files.length} constraint file(s)`);
  return constraints;
}
