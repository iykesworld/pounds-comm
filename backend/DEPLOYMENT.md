# Backend Deployment Guide - Pounds Communication Ltd

## 🚀 Quick Deploy Options

### 1. Railway (Recommended)
```bash
# Connect your GitHub repository
# Railway will auto-detect Node.js and deploy
# Set environment variables in Railway dashboard
```

### 2. Render
```bash
# Build Command: npm install
# Start Command: npm start
# Set environment variables in Render dashboard
```

### 3. Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login and deploy
heroku login
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

### 4. DigitalOcean App Platform
- Connect GitHub repository
- Select Node.js environment
- Set environment variables
- Deploy

## 🔧 Environment Variables

Set these in your deployment platform:

### Required Variables
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pounds-comm-ltd?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=30d
```

### Optional Variables
```env
FRONTEND_URL=https://your-frontend-domain.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
BCRYPT_ROUNDS=12
LOG_LEVEL=info
```

## 📦 Manual Build & Deploy

### 1. Build for Production
```bash
# Install dependencies
npm install

# Set environment variables
export NODE_ENV=production
export MONGO_URI=your-mongodb-uri
export JWT_SECRET=your-jwt-secret

# Start production server
npm start
```

### 2. Docker Deployment
```bash
# Build Docker image
docker build -t pounds-comm-backend .

# Run container
docker run -p 5000:5000 \
  -e NODE_ENV=production \
  -e MONGO_URI=your-mongodb-uri \
  -e JWT_SECRET=your-jwt-secret \
  pounds-comm-backend
```

### 3. PM2 Deployment (VPS)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start server.js --name "pounds-comm-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. Create MongoDB Atlas account
2. Create new cluster
3. Create database user
4. Get connection string
5. Add IP whitelist (0.0.0.0/0 for all IPs)

### Local MongoDB (Development)
```bash
# Install MongoDB locally
# Connection string: mongodb://localhost:27017/pounds-comm-ltd
```

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] JWT secret is strong and unique
- [ ] CORS configured for production
- [ ] Helmet security headers enabled
- [ ] Rate limiting implemented (optional)
- [ ] Input validation enabled
- [ ] Error handling configured

## 📊 Performance Optimization

- [ ] Compression enabled
- [ ] Database connection pooling
- [ ] Graceful shutdown implemented
- [ ] Health check endpoint
- [ ] Proper logging configured
- [ ] Memory usage optimized

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### Runtime Errors
- Check environment variables
- Verify database connection
- Check logs for specific errors
- Ensure all required services are running

### Database Connection Issues
- Verify MONGO_URI format
- Check network connectivity
- Ensure database user has proper permissions
- Check IP whitelist in MongoDB Atlas

## 📈 Monitoring

### Health Check
```bash
# Test health endpoint
curl https://your-backend-domain.com/health
```

### Logs
```bash
# View application logs
# Platform-specific commands:
# Railway: railway logs
# Heroku: heroku logs --tail
# PM2: pm2 logs
```

### Recommended Tools
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- Database monitoring
- Uptime monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy Backend
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
      - run: npm audit
      # Add deployment step here
```

## 🚨 Important Notes

1. **Database**: Use MongoDB Atlas for production
2. **Secrets**: Never commit environment variables to git
3. **CORS**: Update FRONTEND_URL for your production frontend
4. **SSL**: Ensure HTTPS is enabled in production
5. **Backup**: Set up database backups
6. **Monitoring**: Implement proper logging and monitoring

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review environment variables
3. Verify database connectivity
4. Check deployment platform logs
5. Ensure all required services are configured 