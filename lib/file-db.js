// lib/file-db.js
import { promises as fs } from 'fs';
import path from 'path';

// Helper to ensure the /data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');

export async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// Get the full path for a data file
const getDataPath = (filename) => path.join(DATA_DIR, filename);

// Read content from a specific JSON file
export async function readData(filename) {
  const filePath = getDataPath(filename);
  await ensureDataDir();
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    // Simple check to ensure content is valid JSON before parsing
    if (!fileContents.trim()) {
      return [];
    }
    return JSON.parse(fileContents);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []; 
    }
    throw error;
  }
}

// Write content to a specific JSON file
export async function writeData(filename, data) {
  const filePath = getDataPath(filename);
  await ensureDataDir();
  // Using null, 2 for readable JSON formatting
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}