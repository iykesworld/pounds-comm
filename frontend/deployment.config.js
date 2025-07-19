// Deployment Configuration for Pounds Communication Ltd Frontend

const deploymentConfig = {
  // Build configuration
  build: {
    command: 'npm run build',
    output: '.next',
    environment: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-domain.com/api'
    }
  },

  // Runtime configuration
  runtime: {
    command: 'npm start',
    port: process.env.PORT || 3000,
    environment: {
      NODE_ENV: 'production'
    }
  },

  // Performance settings
  performance: {
    // Enable compression
    compress: true,
    // Enable gzip
    gzip: true,
    // Cache static assets
    cacheStaticAssets: true,
    // Cache duration in seconds
    cacheDuration: 31536000 // 1 year
  },

  // Security settings
  security: {
    // Enable HTTPS redirect
    httpsRedirect: true,
    // Security headers
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }
};

module.exports = deploymentConfig; 