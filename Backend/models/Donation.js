const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor: {
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
        phone: {
            type: String,
            required: false,
            trim: true,
            match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
            country: {
                type: String,
                default: 'India'
            }
        }
    },
    donation: {
        amount: {
            type: Number,
            required: [true, 'Donation amount is required'],
            min: [1, 'Donation amount must be at least ₹1'],
            max: [1000000, 'Donation amount cannot exceed ₹10,00,000']
        },
        currency: {
            type: String,
            default: 'INR',
            enum: ['INR', 'USD', 'EUR', 'GBP']
        },
        type: {
            type: String,
            required: [true, 'Donation type is required'],
            enum: ['one-time', 'monthly', 'yearly'],
            default: 'one-time'
        },
        category: {
            type: String,
            required: [true, 'Donation category is required'],
            enum: ['education', 'healthcare', 'infrastructure', 'cultural', 'general', 'emergency'],
            default: 'general'
        },
        anonymous: {
            type: Boolean,
            default: false
        }
    },
    payment: {
        method: {
            type: String,
            required: [true, 'Payment method is required'],
            enum: ['razorpay', 'paypal', 'stripe', 'bank-transfer', 'cash', 'cheque']
        },
        status: {
            type: String,
            required: true,
            enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
            default: 'pending'
        },
        transactionId: {
            type: String,
            required: false,
            unique: true,
            sparse: true
        },
        gatewayResponse: {
            type: mongoose.Schema.Types.Mixed,
            required: false
        }
    },
    receipt: {
        number: {
            type: String,
            required: false,
            unique: true,
            sparse: true
        },
        sent: {
            type: Boolean,
            default: false
        },
        sentAt: Date
    },
    notes: {
        type: String,
        maxlength: [500, 'Notes cannot exceed 500 characters']
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

// Indexes for better query performance
donationSchema.index({ 'donor.email': 1, createdAt: -1 });
donationSchema.index({ 'payment.status': 1, createdAt: -1 });
donationSchema.index({ 'donation.category': 1, createdAt: -1 });
donationSchema.index({ 'payment.transactionId': 1 });

// Virtual for full donor name
donationSchema.virtual('donor.fullName').get(function() {
    return `${this.donor.firstName} ${this.donor.lastName}`;
});

// Virtual for formatted amount
donationSchema.virtual('formattedAmount').get(function() {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: this.donation.currency
    }).format(this.donation.amount);
});

// Pre-save middleware to sanitize data
donationSchema.pre('save', function(next) {
    // Capitalize first letter of names
    if (this.donor.firstName) {
        this.donor.firstName = this.donor.firstName.charAt(0).toUpperCase() + this.donor.firstName.slice(1).toLowerCase();
    }
    if (this.donor.lastName) {
        this.donor.lastName = this.donor.lastName.charAt(0).toUpperCase() + this.donor.lastName.slice(1).toLowerCase();
    }
    
    // Generate receipt number if not exists
    if (!this.receipt.number && this.payment.status === 'completed') {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.receipt.number = `RPS-${year}${month}${day}-${random}`;
    }
    
    next();
});

// Static method to get donation statistics
donationSchema.statics.getStats = async function() {
    const stats = await this.aggregate([
        {
            $match: { 'payment.status': 'completed' }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$donation.amount' },
                totalDonations: { $sum: 1 },
                avgAmount: { $avg: '$donation.amount' }
            }
        }
    ]);
    
    return stats[0] || { totalAmount: 0, totalDonations: 0, avgAmount: 0 };
};

module.exports = mongoose.model('Donation', donationSchema);
