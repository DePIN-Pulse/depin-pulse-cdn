import path from 'path';
import logoFiles from '../../logo-manifest.json';

export function GET() {
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

  return Response.json({
    success: true,
    data: images
  });
}
