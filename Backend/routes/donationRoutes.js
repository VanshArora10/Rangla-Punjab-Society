const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Joi = require('joi');

// Validation schemas
const donationValidationSchema = Joi.object({
    donor: Joi.object({
        firstName: Joi.string().required().min(2).max(50).trim(),
        lastName: Joi.string().required().min(2).max(50).trim(),
        email: Joi.string().email().required().trim(),
        phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).optional(),
        address: Joi.object({
            street: Joi.string().optional(),
            city: Joi.string().optional(),
            state: Joi.string().optional(),
            zipCode: Joi.string().optional(),
            country: Joi.string().default('India')
        }).optional()
    }).required(),
    donation: Joi.object({
        amount: Joi.number().required().min(1).max(1000000),
        currency: Joi.string().valid('INR', 'USD', 'EUR', 'GBP').default('INR'),
        type: Joi.string().valid('one-time', 'monthly', 'yearly').default('one-time'),
        category: Joi.string().valid('education', 'healthcare', 'infrastructure', 'cultural', 'general', 'emergency').default('general'),
        anonymous: Joi.boolean().default(false)
    }).required(),
    payment: Joi.object({
        method: Joi.string().valid('razorpay', 'paypal', 'stripe', 'bank-transfer', 'cash', 'cheque').required()
    }).required(),
    notes: Joi.string().max(500).optional()
});

// Middleware to get client info
const getClientInfo = (req) => ({
    ipAddress: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent']
});

// @route   POST /api/donations
// @desc    Create a new donation
// @access  Public
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { error, value } = donationValidationSchema.validate(req.body);
        if (error) {
            const errorMessages = error.details.map(detail => {
                const field = detail.path.join('.');
                switch (detail.type) {
                    case 'any.required':
                        return `${field} is required`;
                    case 'string.email':
                        return 'Please enter a valid email address';
                    case 'string.pattern.base':
                        if (field.includes('phone')) {
                            return 'Please enter a valid phone number';
                        }
                        return `${field} format is invalid`;
                    case 'number.min':
                        return `${field} must be at least ${detail.context.limit}`;
                    case 'number.max':
                        return `${field} must be no more than ${detail.context.limit}`;
                    case 'any.only':
                        return `Please select a valid ${field}`;
                    default:
                        return detail.message;
                }
            });
            
            return res.status(400).json({
                success: false,
                message: 'Please fix the following errors:',
                errors: errorMessages
            });
        }

        // Get client information
        const clientInfo = getClientInfo(req);

        // Create new donation
        const donation = new Donation({
            ...value,
            ...clientInfo
        });

        await donation.save();

        res.status(201).json({
            success: true,
            message: 'Donation created successfully',
            data: {
                id: donation._id,
                donorName: donation.donor.fullName,
                amount: donation.formattedAmount,
                category: donation.donation.category,
                status: donation.payment.status,
                createdAt: donation.createdAt
            }
        });

    } catch (error) {
        console.error('Donation creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// @route   GET /api/donations
// @desc    Get all donations with filtering and pagination
// @access  Private (Admin)
router.get('/', async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            status, 
            category, 
            type, 
            search,
            startDate,
            endDate,
            minAmount,
            maxAmount
        } = req.query;
        
        // Build query
        let query = {};
        
        if (status) {
            query['payment.status'] = status;
        }
        
        if (category) {
            query['donation.category'] = category;
        }
        
        if (type) {
            query['donation.type'] = type;
        }
        
        if (search) {
            query.$or = [
                { 'donor.firstName': { $regex: search, $options: 'i' } },
                { 'donor.lastName': { $regex: search, $options: 'i' } },
                { 'donor.email': { $regex: search, $options: 'i' } }
            ];
        }

        // Date range filter
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        // Amount range filter
        if (minAmount || maxAmount) {
            query['donation.amount'] = {};
            if (minAmount) query['donation.amount'].$gte = parseFloat(minAmount);
            if (maxAmount) query['donation.amount'].$lte = parseFloat(maxAmount);
        }

        // Execute query with pagination
        const donations = await Donation.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v');

        // Get total count
        const total = await Donation.countDocuments(query);

        res.json({
            success: true,
            data: donations,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get donations error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/donations/stats/overview
// @desc    Get donation statistics
// @access  Private (Admin)
router.get('/stats/overview', async (req, res) => {
    try {
        const stats = await Donation.getStats();
        
        const categoryStats = await Donation.aggregate([
            {
                $match: { 'payment.status': 'completed' }
            },
            {
                $group: {
                    _id: '$donation.category',
                    totalAmount: { $sum: '$donation.amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        const monthlyStats = await Donation.aggregate([
            {
                $match: { 'payment.status': 'completed' }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    totalAmount: { $sum: '$donation.amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);

        const paymentMethodStats = await Donation.aggregate([
            {
                $match: { 'payment.status': 'completed' }
            },
            {
                $group: {
                    _id: '$payment.method',
                    totalAmount: { $sum: '$donation.amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        res.json({
            success: true,
            data: {
                overview: stats,
                byCategory: categoryStats,
                byMonth: monthlyStats,
                byPaymentMethod: paymentMethodStats
            }
        });

    } catch (error) {
        console.error('Get donation stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/donations/:id
// @desc    Get a specific donation
// @access  Private (Admin)
router.get('/:id', async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).select('-__v');
        
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        res.json({
            success: true,
            data: donation
        });

    } catch (error) {
        console.error('Get donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   PUT /api/donations/:id
// @desc    Update donation payment status
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { status, transactionId, gatewayResponse, notes } = req.body;
        
        // Validate status
        if (status && !['pending', 'processing', 'completed', 'failed', 'refunded'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const updateData = {};
        if (status) updateData['payment.status'] = status;
        if (transactionId) updateData['payment.transactionId'] = transactionId;
        if (gatewayResponse) updateData['payment.gatewayResponse'] = gatewayResponse;
        if (notes) updateData.notes = notes;

        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        res.json({
            success: true,
            message: 'Donation updated successfully',
            data: donation
        });

    } catch (error) {
        console.error('Update donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   DELETE /api/donations/:id
// @desc    Delete a donation (Admin only)
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const donation = await Donation.findByIdAndDelete(req.params.id);
        
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        res.json({
            success: true,
            message: 'Donation deleted successfully'
        });

    } catch (error) {
        console.error('Delete donation error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   POST /api/donations/:id/complete-payment
// @desc    Complete a donation payment (for payment gateways)
// @access  Public
router.post('/:id/complete-payment', async (req, res) => {
    try {
        const { transactionId, gatewayResponse, amount } = req.body;
        
        const donation = await Donation.findById(req.params.id);
        
        if (!donation) {
            return res.status(404).json({
                success: false,
                message: 'Donation not found'
            });
        }

        // Verify amount matches
        if (amount && amount !== donation.donation.amount) {
            return res.status(400).json({
                success: false,
                message: 'Amount mismatch'
            });
        }

        // Update payment status
        donation.payment.status = 'completed';
        donation.payment.transactionId = transactionId;
        donation.payment.gatewayResponse = gatewayResponse;
        
        await donation.save();

        res.json({
            success: true,
            message: 'Payment completed successfully',
            data: {
                id: donation._id,
                receiptNumber: donation.receipt.number,
                amount: donation.formattedAmount,
                status: donation.payment.status
            }
        });

    } catch (error) {
        console.error('Complete payment error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
