import logoFiles from '../../../logo-manifest.json';

// Define supported extensions
const supportedExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

export function GET(request: Request, { params }: { params: { logoFile: string } }) {
  // Try to find the file with any supported extension
  const fileName = supportedExtensions
    .map(ext => params.logoFile + ext)
    .find(name => logoFiles.includes(name));

  if (!fileName) {
    return Response.json({ error: 'Logo not found' }, { status: 404 });
  }

  // Redirect to the static asset, which is served directly from the edge
  return new Response(null, {
    status: 302,
    headers: {
      Location: new URL(`/logos/${encodeURIComponent(fileName)}`, request.url).toString(),
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
