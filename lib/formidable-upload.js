// lib/formidable-upload.js
import { IncomingForm } from 'formidable';
import path from 'path';
import { promises as fs } from 'fs';

// Configuration for upload directory
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

// Helper to ensure the upload directory exists
async function ensureUploadDir(subDir) {
  const dir = path.join(UPLOAD_DIR, subDir);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser for formidable
  },
};

export async function uploadFile(req, targetSubDir) {
  const uploadPath = await ensureUploadDir(targetSubDir);
  
  const form = new IncomingForm({
    uploadDir: uploadPath,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      const uploadedFiles = [];

      for (const key in files) {
        const fileArray = Array.isArray(files[key]) ? files[key] : [files[key]];
        
        for (const file of fileArray) {
          // Construct the new public path relative to the /public folder
          const publicPath = `/uploads/${targetSubDir}/${path.basename(file.filepath)}`;
          
          uploadedFiles.push({
            name: file.originalFilename,
            path: publicPath,
            size: file.size,
            mimetype: file.mimetype,
          });
        }
      }
      
      // Convert fields arrays to single strings if not expecting multiple values for a key
      const parsedFields = Object.keys(fields).reduce((acc, key) => {
          acc[key] = Array.isArray(fields[key]) ? fields[key][0] : fields[key];
          return acc;
      }, {});

      resolve({ fields: parsedFields, files: uploadedFiles });
    });
  });
}