const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const connectDB = require("./config/db");
const donationRoutes = require("./routes/donationRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' })); // Parse JSON body
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL encoded data

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(helmet()); // Secure HTTP headers
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per window
        message: 'Too many requests from this IP, please try again later.'
    })
);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);

// Check if frontend build exists
const frontendDistPath = path.join(__dirname, '../Frontend/dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

// Serve static files from the React app build directory (if it exists)
if (require('fs').existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    
    // Handle React Router - send index.html for all non-API routes
    app.get('*', (req, res) => {
        // Don't serve index.html for API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({
                success: false,
                message: 'API endpoint not found',
                error: 'The requested API endpoint does not exist',
                path: req.path
            });
        }
        
        // Serve index.html for all other routes (React Router)
        res.sendFile(frontendIndexPath);
    });
} else {
    // Frontend not built - serve API only
    console.log('⚠️  Frontend build not found. Serving API only.');
    
    app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({
                success: false,
                message: 'API endpoint not found',
                error: 'The requested API endpoint does not exist',
                path: req.path
            });
        }
        
        // Return a simple message for non-API routes
        res.status(404).json({
            success: false,
            message: 'Frontend not built. Please build the frontend first.',
            error: 'The frontend application has not been built yet.',
            instructions: 'Run "cd Frontend && npm run build" to build the frontend.'
        });
    });
}

// Global error handler
app.use((error, req, res, next) => {
    console.error('Global error:', error);
    
    // Don't send error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: isDevelopment ? error.message : 'Something went wrong on our end. Please try again later.',
        ...(isDevelopment && { stack: error.stack })
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🗄️  Database: ${process.env.MONGO_URI ? 'Connected' : 'Not configured'}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
