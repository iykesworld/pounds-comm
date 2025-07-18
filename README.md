# Pounds Communication - Phone Accessories Store

A modern phone accessories e-commerce platform built with Next.js 15, Express.js, and Redux Toolkit.

## 🚀 Features

- **Modern UI**: Next.js 15 with App Router, TypeScript, and Tailwind CSS 4+
- **State Management**: Redux Toolkit with persistent cart and authentication
- **Backend API**: Express.js with MongoDB, JWT authentication, and Cloudinary uploads
- **Admin Dashboard**: Full CRUD operations for products, orders, and users
- **Shopping Cart**: Persistent cart with checkout functionality
- **Role-based Access**: Admin and user roles with appropriate redirects
- **Responsive Design**: Mobile-first approach with dark mode support

## 📁 Project Structure

```
pounds-comm-ltd/
├── backend/                 # Express.js API server
│   ├── config/             # Database and Cloudinary config
│   ├── controllers/        # API route handlers
│   ├── middleware/         # Authentication and validation
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # Next.js 15 frontend
│   ├── app/              # App Router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── cart/         # Shopping cart
│   │   ├── login/        # Authentication
│   │   └── orders/       # Order management
│   ├── components/       # Reusable components
│   ├── redux/           # Redux store and slices
│   └── styles/          # Global styles
├── start-backend.ps1     # PowerShell script for backend
├── start-frontend.ps1    # PowerShell script for frontend
└── .gitignore           # Git ignore rules
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Cloudinary account
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```powershell
   cd backend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Create environment file:**
   Create `backend/.env` with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

4. **Start the server:**
   ```powershell
   # Option 1: Use PowerShell script (recommended)
   ..\start-backend.ps1
   
   # Option 2: Manual commands
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```powershell
   cd frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Start development server:**
   ```powershell
   # Option 1: Use PowerShell script (recommended)
   ..\start-frontend.ps1
   
   # Option 2: Manual commands
   npm run dev
   ```

## 🔧 Troubleshooting

### Terminal Issues

**Problem**: Git commands hang or show pager
**Solution**: Git pager has been configured to use `cat` instead of interactive pager

**Problem**: PowerShell `&&` syntax error
**Solution**: Use the provided PowerShell scripts or separate commands

**Problem**: Cursor AI terminal hanging
**Solution**: 
- Use `git status --porcelain` for clean output
- Commands have timeout settings in `.cursor/settings.json`
- Disable shell integration if needed

### Common Issues

**Backend won't start:**
- Check MongoDB connection string in `.env`
- Ensure all dependencies are installed
- Verify port 5000 is available

**Frontend won't start:**
- Check if backend is running on port 5000
- Ensure all dependencies are installed
- Clear `.next` cache if needed

**Authentication issues:**
- Verify JWT_SECRET in backend `.env`
- Check browser localStorage for auth tokens
- Clear browser cache if needed

**Image upload issues:**
- Verify Cloudinary credentials in backend `.env`
- Check file size limits
- Ensure proper file formats

## 🚀 Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or DigitalOcean
- Set environment variables in deployment platform
- Ensure MongoDB connection is accessible

### Frontend Deployment
- Deploy to Vercel, Netlify, or similar platforms
- Update API base URL in production
- Configure environment variables

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/admin` - Get all orders (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `PUT /api/users/:id` - Update user (admin)

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/pounds-comm
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
NODE_ENV=development
```

## 📱 Features Overview

### User Features
- Browse products by category (Smartphones, Tablets, Smartwatches, Accessories)
- Add items to cart with quantity selection
- Secure checkout process
- Order history and tracking
- User profile management

### Admin Features
- Dashboard with sales analytics
- Product management (CRUD operations)
- Order management and status updates
- User management
- Image upload via Cloudinary

### Technical Features
- JWT-based authentication
- Role-based access control
- Redux state management
- Persistent cart storage
- Responsive design
- Dark mode support
- TypeScript for type safety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check browser console for errors
4. Verify environment variables
5. Ensure all dependencies are installed

---

**Pounds Communication** - Your trusted source for premium phone accessories! 📱✨ 