// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error('❌ MONGO_URI not found in environment variables. Add it to your .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000, // fail fast if cluster unreachable
            dbName: process.env.NODE_ENV === 'production' ? 'ngo_database' : 'rangla_punjab'
        });
        console.log(`✅ MongoDB connected to db "${mongoose.connection.name}"`);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

// helpful connection event logs
mongoose.connection.on('connected', () => console.log(`Mongoose event: connected to db "${mongoose.connection.name}"`));
mongoose.connection.on('error', (err) => console.error('Mongoose event: error', err));
mongoose.connection.on('disconnected', () => console.warn('Mongoose event: disconnected'));

// graceful shutdown on Ctrl+C
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
});

module.exports = connectDB;
