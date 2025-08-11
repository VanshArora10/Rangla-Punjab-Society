const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        enum: ['general', 'partnership', 'volunteer', 'donation', 'other'],
        default: 'general'
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'read', 'replied', 'closed'],
        default: 'pending'
    },
    ipAddress: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1, createdAt: -1 });

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to sanitize data
contactSchema.pre('save', function(next) {
    // Capitalize first letter of names
    if (this.firstName) {
        this.firstName = this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
    }
    if (this.lastName) {
        this.lastName = this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
    }
    next();
});

module.exports = mongoose.model('Contact', contactSchema); 