#!/bin/bash

echo "🚀 Starting build and deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "Frontend" ] || [ ! -d "Backend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Build Frontend
echo "📦 Building frontend..."
cd Frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend npm install failed!"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi
echo "✅ Frontend built successfully!"

# Install Backend dependencies
echo "📦 Installing backend dependencies..."
cd ../Backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend npm install failed!"
    exit 1
fi
echo "✅ Backend dependencies installed!"

# Go back to root
cd ..

echo "🎉 Build process completed successfully!"
echo ""
echo "📁 Frontend build is in: Frontend/dist/"
echo "🌐 Server will serve both API and frontend from the same domain"
echo ""
echo "To start the server:"
echo "  cd Backend"
echo "  npm start"
echo ""
echo "For production deployment:"
echo "  1. Deploy this entire project to your hosting service"
echo "  2. Set environment variables (MONGO_URI, NODE_ENV=production)"
echo "  3. Use start command: cd Backend && npm start"
