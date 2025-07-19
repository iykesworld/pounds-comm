# 🚀 Render Deployment Guide

## 🔧 Render Configuration

### Environment Variables (Set in Render Dashboard)
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
NODE_VERSION=18.20.4
```

### Build Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18.x (specified in .nvmrc)

## 🐛 Troubleshooting Express Router Error

If you encounter `Cannot find module './router'` error:

### Solution 1: Use Simple Server (Recommended)
Change the start command in Render to:
```bash
npm run start:simple
```

### Solution 2: Force Node.js Version
Add this environment variable in Render:
```env
NODE_VERSION=18.20.4
```

### Solution 3: Clear Build Cache
1. Go to Render Dashboard
2. Select your service
3. Go to Settings → Build & Deploy
4. Click "Clear build cache"
5. Redeploy

## 📁 Files for Render Deployment

- ✅ `package.json` - Specifies Node.js 18.x and Express 4.18.2
- ✅ `.nvmrc` - Specifies Node.js version 18.20.4
- ✅ `render.yaml` - Render configuration
- ✅ `server-simple.js` - Fallback server without complex routes
- ✅ `server.js` - Main server with all routes

## 🔄 Deployment Steps

1. **Set Environment Variables** in Render Dashboard
2. **Set Build Command**: `npm install`
3. **Set Start Command**: `npm start` (or `npm run start:simple` if issues persist)
4. **Deploy**

## 🧪 Testing Deployment

### Health Check
```bash
curl https://your-app.onrender.com/health
```

### API Test
```bash
curl https://your-app.onrender.com/api/test
```

## 🚨 Common Issues

### Issue: Express Router Error
**Error**: `Cannot find module './router'`
**Solution**: Use `npm run start:simple` as start command

### Issue: Node.js Version Mismatch
**Error**: Version compatibility issues
**Solution**: Set `NODE_VERSION=18.20.4` in environment variables

### Issue: Build Cache
**Error**: Old dependencies
**Solution**: Clear build cache in Render dashboard

## 📞 Support

If deployment still fails:
1. Check Render logs for specific errors
2. Try the simple server: `npm run start:simple`
3. Verify environment variables are set
4. Clear build cache and redeploy 