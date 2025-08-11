const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Joi = require('joi');

// Validation schemas
const contactValidationSchema = Joi.object({
    firstName: Joi.string().required().min(2).max(50).trim(),
    lastName: Joi.string().required().min(2).max(50).trim(),
    email: Joi.string().email().required().trim(),
    subject: Joi.string().valid('general', 'partnership', 'volunteer', 'donation', 'other').required(),
    message: Joi.string().required().min(10).max(1000).trim()
});

// Middleware to get client info
const getClientInfo = (req) => ({
    ipAddress: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent']
});

// @route   POST /api/contact
// @desc    Submit a new contact form
// @access  Public
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const { error, value } = contactValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
        }

        // Get client information
        const clientInfo = getClientInfo(req);

        // Create new contact
        const contact = new Contact({
            ...value,
            ...clientInfo
        });

        await contact.save();

        res.status(201).json({
            success: true,
            message: 'Thank you! Your message has been sent successfully.',
            data: {
                id: contact._id,
                fullName: contact.fullName,
                subject: contact.subject,
                submittedAt: contact.createdAt
            }
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (Admin only)
// @access  Private (Admin)
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, status, subject, search } = req.query;
        
        // Build query
        let query = {};
        
        if (status) {
            query.status = status;
        }
        
        if (subject) {
            query.subject = subject;
        }
        
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { message: { $regex: search, $options: 'i' } }
            ];
        }

        // Execute query with pagination
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-__v');

        // Get total count
        const total = await Contact.countDocuments(query);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });

    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/contact/stats/overview
// @desc    Get contact statistics
// @access  Private (Admin)
router.get('/stats/overview', async (req, res) => {
    try {
        const stats = await Contact.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
                    read: { $sum: { $cond: [{ $eq: ['$status', 'read'] }, 1, 0] } },
                    replied: { $sum: { $cond: [{ $eq: ['$status', 'replied'] }, 1, 0] } },
                    closed: { $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] } }
                }
            }
        ]);

        const subjectStats = await Contact.aggregate([
            {
                $group: {
                    _id: '$subject',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        const monthlyStats = await Contact.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);

        res.json({
            success: true,
            data: {
                overview: stats[0] || { total: 0, pending: 0, read: 0, replied: 0, closed: 0 },
                bySubject: subjectStats,
                byMonth: monthlyStats
            }
        });

    } catch (error) {
        console.error('Get contact stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   GET /api/contact/:id
// @desc    Get a specific contact submission
// @access  Private (Admin)
router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).select('-__v');
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.json({
            success: true,
            data: contact
        });

    } catch (error) {
        console.error('Get contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   PUT /api/contact/:id
// @desc    Update contact status
// @access  Private (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        
        // Validate status
        if (status && !['pending', 'read', 'replied', 'closed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const updateData = {};
        if (status) updateData.status = status;
        if (notes) updateData.notes = notes;

        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-__v');

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact updated successfully',
            data: contact
        });

    } catch (error) {
        console.error('Update contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a contact submission
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact submission not found'
            });
        }

        res.json({
            success: true,
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

module.exports = router; 