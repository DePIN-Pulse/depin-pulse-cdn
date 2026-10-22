import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import logoFiles from '../../src/logo-manifest.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Filter for image files and create URLs
  const images = logoFiles
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
}
