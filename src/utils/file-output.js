/**
 * File Output Utility — Saves generated outlines and master prompts to disk
 */

import { promises as fs } from 'fs';
import { join } from 'path';

/**
 * Save outline and master prompt to the output directory
 */
export async function saveOutline({ outline, masterPrompt, metadata, outputDir = './output' }) {
  // Create output directory
  await fs.mkdir(outputDir, { recursive: true });
  
  // Generate safe filename from title
  const safeTitle = sanitizeFilename(metadata.title);
  const timestamp = new Date().toISOString().split('T')[0];
  const baseFilename = `${safeTitle}_${timestamp}`;
  
  // Create book-specific subdirectory
  const bookDir = join(outputDir, baseFilename);
  await fs.mkdir(bookDir, { recursive: true });
  
  // Save outline
  const outlinePath = join(bookDir, `${safeTitle}_Outline.md`);
  await fs.writeFile(outlinePath, outline, 'utf-8');
  
  // Save master prompt
  const promptPath = join(bookDir, `${safeTitle}_Master_Prompt.md`);
  await fs.writeFile(promptPath, masterPrompt, 'utf-8');
  
  // Save metadata
  const metaPath = join(bookDir, 'metadata.json');
  await fs.writeFile(metaPath, JSON.stringify(metadata, null, 2), 'utf-8');
  
  console.log(`\n📁 Files saved to: ${bookDir}`);
  console.log(`   📄 ${safeTitle}_Outline.md`);
  console.log(`   📄 ${safeTitle}_Master_Prompt.md`);
  console.log(`   📋 metadata.json`);
  
  return {
    directory: bookDir,
    outlinePath,
    promptPath,
    metaPath
  };
}

function sanitizeFilename(name) {
  return name
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .substring(0, 80)
    .replace(/_$/, '');
}
