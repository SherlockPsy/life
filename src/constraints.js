import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadConstraints() {
  const constraintsDir = path.join(__dirname, '..', 'constraints');
  const kernelPath = path.join(constraintsDir, '00_KERNEL.md');
  const microPath = path.join(constraintsDir, '01_REBECCA_MICRO.md');
  
  if (!fs.existsSync(kernelPath)) {
    throw new Error('constraints/00_KERNEL.md is missing - cannot start');
  }
  if (!fs.existsSync(microPath)) {
    throw new Error('constraints/01_REBECCA_MICRO.md is missing - cannot start');
  }

  const kernel = fs.readFileSync(kernelPath, 'utf-8');
  const micro = fs.readFileSync(microPath, 'utf-8');
  
  console.log('Loaded constraints/00_KERNEL.md + 01_REBECCA_MICRO.md');
  return kernel + '\n\n' + micro;
}
