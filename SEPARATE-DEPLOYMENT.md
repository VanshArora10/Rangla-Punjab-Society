# Separate Frontend/Backend Deployment Guide

This guide is for deploying the frontend and backend separately on different services.

## 🚀 Backend Deployment (Render)

### 1. **Deploy Backend to Render**

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### 2. **Set Environment Variables**
- `MONGO_URI`: Your MongoDB connection string
- `NODE_ENV`: production
- `PORT`: 10000 (or let Render set it)
- `FRONTEND_URL`: Your frontend domain (e.g., `https://your-frontend.netlify.app`)

### 3. **Update CORS in Backend**
In `Backend/Server.js`, update the CORS origins:
```javascript
const corsOptions = {
    origin: [
        'https://your-frontend-domain.com', // Replace with your actual frontend URL
        'http://localhost:3000',
        'http://localhost:5173'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};
```

## 🌐 Frontend Deployment

### 1. **Update API Base URL**
In `Frontend/src/utils/api.js`, update the production URL:
```javascript
const getBaseUrl = () => {
    if (import.meta.env.PROD) {
        return 'https://your-backend-url.onrender.com'; // Replace with your actual backend URL
    }
    return 'http://localhost:5000';
};
```

### 2. **Build and Deploy Frontend**
```bash
cd Frontend
npm run build
# Deploy the dist/ folder to your hosting service (Netlify, Vercel, etc.)
```

## 🔧 Troubleshooting

### **"Failed to execute 'json' on 'Response': Unexpected end of JSON input"**

This error occurs when:
1. **Backend is not deployed or not accessible**
2. **CORS is blocking the request**
3. **Backend is returning HTML instead of JSON**

**Solutions:**
1. **Check backend URL** - Make sure the URL in `api.js` is correct
2. **Check CORS** - Ensure your frontend domain is in the CORS origins
3. **Check backend logs** - Look for errors in Render logs
4. **Test API directly** - Try calling your backend URL directly in browser

### **Backend Deployment Issues**

If backend deployment fails:
1. **Check Root Directory** - Make sure it's set to `Backend`
2. **Check Build Command** - Should be `npm install`
3. **Check Start Command** - Should be `npm start`
4. **Check Environment Variables** - Ensure `MONGO_URI` is set

## 📝 Example Configuration

### Render Backend Settings:
- **Name**: rangla-punjab-society-backend
- **Root Directory**: Backend
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `MONGO_URI`: `mongodb+srv://...`
  - `NODE_ENV`: `production`
  - `FRONTEND_URL`: `https://your-frontend.netlify.app`

### Frontend API Configuration:
```javascript
// Frontend/src/utils/api.js
const getBaseUrl = () => {
    if (import.meta.env.PROD) {
        return 'https://rangla-punjab-society-backend.onrender.com';
    }
    return 'http://localhost:5000';
};
```

## ✅ Testing

1. **Test Backend**: Visit `https://your-backend.onrender.com/api/health`
2. **Test Frontend**: Visit your frontend URL and try submitting a form
3. **Check Network Tab**: Look for API calls in browser dev tools
