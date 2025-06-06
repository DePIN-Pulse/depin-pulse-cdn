import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const publicDir = path.join(process.cwd(), 'public');
    const logosDir = path.join(publicDir, 'logos');
    
    // Read all files from the logos directory
    const files = fs.readdirSync(logosDir);
    
    // Filter for image files and create URLs
    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
      })
      .map(file => ({
        name: file,
        url: `/logos/${file}`,
        path: `/logos/${file}`
      }));

    return res.status(200).json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Error listing images:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to list images' 
    });
  }
} 