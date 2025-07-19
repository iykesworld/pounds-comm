# Deployment Guide - Pounds Communication Ltd Frontend

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### 2. Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Set environment variables in Netlify dashboard
```

### 3. Railway
```bash
# Connect your GitHub repository
# Railway will auto-detect Next.js and deploy
# Set environment variables in Railway dashboard
```

## 🔧 Environment Variables

Create a `.env.production` file or set in your deployment platform:

```env
# Required
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api

# Optional
NEXT_PUBLIC_APP_NAME=Pounds Communication Ltd
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

## 📦 Manual Build & Deploy

### 1. Build for Production
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Start production server
npm start
```

### 2. Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 3. Static Export (Optional)
```bash
# Add to next.config.ts
output: 'export'

# Build static files
npm run build
```

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] API URL uses HTTPS
- [ ] Environment variables secured
- [ ] No sensitive data in client code

## 📊 Performance Optimization

- [ ] Images optimized with Next.js Image component
- [ ] Code splitting enabled
- [ ] Static generation where possible
- [ ] CDN configured for static assets
- [ ] Compression enabled

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Runtime Errors
- Check environment variables
- Verify API endpoint accessibility
- Check browser console for errors

### Performance Issues
- Enable compression
- Optimize images
- Use CDN for static assets
- Monitor Core Web Vitals

## 📈 Monitoring

### Recommended Tools
- Vercel Analytics
- Google Analytics
- Sentry for error tracking
- Lighthouse for performance

### Health Checks
```bash
# Check if app is running
curl https://your-domain.com/api/health

# Check build status
npm run build
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      # Add deployment step here
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review environment variables
3. Verify API connectivity
4. Check deployment platform logs 