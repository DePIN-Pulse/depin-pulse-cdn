/** @type {import('next').Config} */
const config = {
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  
  // Optimize output
  poweredByHeader: false,
  
  // Add any CDN-specific settings
  output: 'standalone',

  eslint: {
    // This disables ESLint during build
    ignoreDuringBuilds: true,
  },
};

module.exports = config; 