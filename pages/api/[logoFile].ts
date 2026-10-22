import { NextApiRequest, NextApiResponse } from 'next';
import logoFiles from '../../src/logo-manifest.json';

// Define supported extensions
const supportedExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { logoFile } = req.query;
  const baseFileName = logoFile as string;

  // Try to find the file with any supported extension
  const fileName = supportedExtensions
    .map(ext => baseFileName + ext)
    .find(name => logoFiles.includes(name));

  if (!fileName) {
    return res.status(404).json({ error: 'Logo not found' });
  }

  // Redirect to the static asset, which is served directly from the edge
  res.setHeader('Cache-Control', 'public, max-age=86400');
  return res.redirect(302, `/logos/${encodeURIComponent(fileName)}`);
};

export default handler;
