import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { logoFile } = req.query;
    const baseFileName = logoFile as string;
    
    // Define supported extensions
    const supportedExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];
    
    // Try to find the file with any supported extension
    let filePath = null;
    for (const ext of supportedExtensions) {
      const testPath = path.join(process.cwd(), 'public', 'logos', baseFileName + ext);
      if (fs.existsSync(testPath)) {
        filePath = testPath;
        break;
      }
    }

    if (!filePath) {
      return res.status(404).json({ error: 'Logo not found' });
    }

    const stats = fs.statSync(filePath);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    const ext = path.extname(filePath).toLowerCase();
    const contentType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp'
    }[ext] || 'application/octet-stream';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    const fileStream = fs.createReadStream(filePath);
    return new Promise((resolve, reject) => {
      fileStream.pipe(res).on('finish', resolve).on('error', reject);
    });
  } 
  catch (error) {
    console.error('Error serving logo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;