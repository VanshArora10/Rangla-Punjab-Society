#!/bin/bash

echo "🚀 Starting deployment process..."

# Navigate to frontend directory and build
echo "📦 Building frontend..."
cd Frontend
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend built successfully!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Go back to root
cd ..

echo "🎉 Deployment preparation complete!"
echo "📁 Frontend build is in: Frontend/dist/"
echo "🌐 Server will serve static files from this directory"
echo ""
echo "To start the server:"
echo "  cd Backend"
echo "  npm start"
echo ""
echo "The server will now serve both API and frontend from the same domain!"
