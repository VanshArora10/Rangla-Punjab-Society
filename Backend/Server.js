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

// CORS configuration for separate frontend/backend deployment
const allowedOrigins = [
    ...((process.env.FRONTEND_URL || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)),
    'http://localhost:3000',
    'http://localhost:5173'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow non-browser or same-origin
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    optionsSuccessStatus: 200
}));

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

// API-only server (for separate frontend/backend deployment)
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
        message: 'API server only',
        error: 'This is an API-only server. Frontend is deployed separately.',
        apiEndpoints: [
            '/api/health',
            '/api/contact',
            '/api/donations'
        ]
    });
});

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
