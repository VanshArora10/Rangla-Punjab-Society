import React, { useState } from 'react';
import { Heart, Info, CheckCircle, AlertCircle, Loader, Shield, Award, Users } from 'lucide-react';

const Donate = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        panCard: '',
        donationPurpose: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
        orderNotes: '',
        publicVisibility: false,
        preferredSector: '',
        amount: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
    const [submitMessage, setSubmitMessage] = useState('');

    const donationPurposes = [
        'Education & Scholarships',
        'Healthcare & Medical Aid',
        'Environment & Sustainability',
        'Poverty Alleviation',
        'Women & Child Development',
        'Disaster Relief',
        'Community Development',
        'Other'
    ];

    const preferredSectors = [
        'Rural Development',
        'Urban Development',
        'Women Empowerment',
        'Child Development',
        'Senior Citizens',
        'Technology & Innovation'
    ];

    const presetAmounts = [500, 1000, 2500, 5000, 10000, 25000];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        let newValue = type === 'checkbox' ? checked : value;

        // Convert PAN card to uppercase
        if (name === 'panCard') {
            newValue = value.toUpperCase();
        }

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handlePresetAmount = (amount) => {
        setFormData(prev => ({
            ...prev,
            amount: amount.toString()
        }));

        // Clear amount error if exists
        if (errors.amount) {
            setErrors(prev => ({
                ...prev,
                amount: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Required field validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }
        if (!formData.panCard.trim()) newErrors.panCard = 'PAN card is required for tax exemption';
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panCard)) {
            newErrors.panCard = 'Please enter a valid PAN card (e.g., ABCDE1234F)';
        }
        if (!formData.donationPurpose) newErrors.donationPurpose = 'Please select donation purpose';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
        if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Please enter a valid donation amount';
        else if (formData.amount < 100) newErrors.amount = 'Minimum donation amount is ₹100';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Transform data to match backend schema
            const donationData = {
                donor: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                        street: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipCode: formData.postcode,
                        country: 'India'
                    }
                },
                donation: {
                    amount: parseFloat(formData.amount),
                    currency: 'INR',
                    type: 'one-time',
                    category: 'general',
                    anonymous: !formData.publicVisibility
                },
                payment: {
                    method: 'bank-transfer' // Default method
                },
                notes: formData.orderNotes || `Donation Purpose: ${formData.donationPurpose}${formData.preferredSector ? `, Preferred Sector: ${formData.preferredSector}` : ''}`
            };

            const response = await fetch('http://localhost:5000/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(donationData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage('Thank you for your generous donation! Your contribution will make a real difference. You will receive a tax exemption certificate via email within 24 hours.');
                // Reset form on success
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    panCard: '',
                    donationPurpose: '',
                    address: '',
                    city: '',
                    state: '',
                    postcode: '',
                    orderNotes: '',
                    publicVisibility: false,
                    preferredSector: '',
                    amount: ''
                });
                // Clear any existing errors
                setErrors({});
            } else {
                // Handle validation errors from backend
                if (data.errors && Array.isArray(data.errors)) {
                    setSubmitStatus('error');
                    setSubmitMessage(`Please fix the following errors: ${data.errors.join(', ')}`);
                } else {
                    setSubmitStatus('error');
                    setSubmitMessage(data.message || 'Failed to submit donation. Please try again.');
                }
            }
        } catch (error) {
            console.error('Donation submission error:', error);
            setSubmitStatus('error');
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setSubmitMessage('Unable to connect to the server. Please check your internet connection and try again.');
            } else {
                setSubmitMessage('Sorry, there was an unexpected error. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="flex justify-center items-center mb-8">
                            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-4 rounded-full shadow-xl">
                                <Heart className="h-10 w-10 text-blue-900" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            Transform Lives Through
                            <span className="block text-yellow-600">Your Generosity</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                            Join thousands of compassionate donors in creating lasting change through education, healthcare,
                            and community development initiatives across the nation
                        </p>

                        {/* Trust Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-200 shadow-lg">
                                <div className="flex items-center justify-center mb-3">
                                    <Shield className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-gray-800 font-semibold text-lg mb-2">100% Secure</h3>
                                <p className="text-gray-600 text-sm">Bank-grade encryption protects your donation</p>
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-200 shadow-lg">
                                <div className="flex items-center justify-center mb-3">
                                    <Users className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-gray-800 font-semibold text-lg mb-2">Proven Impact</h3>
                                <p className="text-gray-600 text-sm">50,000+ lives transformed nationwide</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

                {/* Success/Error Messages */}
                {submitStatus && (
                    <div className={`mb-12 p-8 rounded-2xl flex items-center shadow-lg ${submitStatus === 'success'
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
                        : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'
                        }`}>
                        {submitStatus === 'success' ? (
                            <CheckCircle className="h-8 w-8 text-green-600 mr-6 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="h-8 w-8 text-red-600 mr-6 flex-shrink-0" />
                        )}
                        <p className={`text-xl font-semibold ${submitStatus === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                            {submitMessage}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Donation Amount Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br  from-white to-blue-50/50 rounded-2xl shadow-2xl p-6 lg:p-8 lg:sticky lg:top-6 border border-blue-100">
                            <div className="text-center mb-8">
                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 rounded-full inline-block mb-4">
                                    <Heart className="h-6 w-6 text-blue-900" />
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">Choose Your Impact</h3>
                                <p className="text-blue-700 text-sm">Every contribution makes a difference</p>
                            </div>

                            {/* Preset Amount Buttons */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {presetAmounts.map(amount => (
                                    <button
                                        key={amount}
                                        type="button"
                                        onClick={() => handlePresetAmount(amount)}
                                        className={`p-4 rounded-xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${formData.amount === amount.toString()
                                                ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100 text-blue-900 shadow-lg'
                                                : 'border-blue-200 hover:border-yellow-300 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-blue-50 bg-white'
                                            }`}
                                    >
                                        <div className="font-bold text-lg text-blue-900">₹{amount.toLocaleString()}</div>
                                        <div className="text-xs text-blue-600 mt-1">
                                            {amount === 500 && "Basic Support"}
                                            {amount === 1000 && "Good Impact"}
                                            {amount === 2500 && "Great Change"}
                                            {amount === 5000 && "Major Help"}
                                            {amount === 10000 && "Huge Impact"}
                                            {amount === 25000 && "Life Changer"}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount */}
                            <div className="mb-8">
                                <label htmlFor="customAmount" className="block text-sm font-semibold text-blue-900 mb-3">
                                    Or Enter Custom Amount
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-700 font-bold text-lg">₹</span>
                                    <input
                                        type="number"
                                        id="customAmount"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        min="100"
                                        step="1"
                                        placeholder="Enter amount (min ₹100)"
                                        className={`w-full pl-10 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg font-semibold ${errors.amount ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                            }`}
                                    />
                                </div>
                                {errors.amount && (
                                    <p className="text-red-600 text-sm mt-3 flex items-center">
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        {errors.amount}
                                    </p>
                                )}
                            </div>

                            {/* Tax Benefits Info */}
                            {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                                <div className="flex items-start">
                                    <Award className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-green-800 text-base mb-1">Tax Benefits Available</h4>
                                        <p className="text-green-700 text-sm leading-relaxed">
                                            Get 50% tax deduction under Section 80G. Certificate will be emailed within 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="lg:col-span-3">
                        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-2xl p-6 lg:p-10 border border-blue-100">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-blue-900 mb-3">Donation Details</h2>
                                <p className="text-blue-700">Help us process your generous contribution</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">

                                {/* Donation Purpose Section */}
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-blue-200">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                                        <div className="bg-yellow-400 p-2 rounded-lg mr-3">
                                            <Heart className="h-5 w-5 text-blue-900" />
                                        </div>
                                        How would you like to help?
                                    </h3>
                                    <select
                                        id="donationPurpose"
                                        name="donationPurpose"
                                        value={formData.donationPurpose}
                                        onChange={handleInputChange}
                                        className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg appearance-none bg-white cursor-pointer bg-no-repeat bg-right pr-12 ${errors.donationPurpose ? 'border-red-400 bg-red-50' : 'border-blue-200 hover:border-blue-300'
                                            }`}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>")`,
                                            backgroundSize: '16px'
                                        }}
                                    >
                                        <option value="">Choose your cause</option>
                                        {donationPurposes.map(purpose => (
                                            <option key={purpose} value={purpose}>{purpose}</option>
                                        ))}
                                    </select>
                                    {errors.donationPurpose && (
                                        <p className="text-red-600 text-sm mt-3 flex items-center">
                                            <AlertCircle className="h-4 w-4 mr-1" />
                                            {errors.donationPurpose}
                                        </p>
                                    )}
                                </div>

                                {/* Personal Information Section */}
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-blue-200">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                                        <div className="bg-yellow-400 p-2 rounded-lg mr-3">
                                            <Users className="h-5 w-5 text-blue-900" />
                                        </div>
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* First Name */}
                                        <div>
                                            <label htmlFor="firstName" className="block text-sm font-semibold text-blue-800 mb-3">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg ${errors.firstName ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Last Name */}
                                        <div>
                                            <label htmlFor="lastName" className="block text-sm font-semibold text-blue-800 mb-3">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg ${errors.lastName ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-semibold text-blue-800 mb-3">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg ${errors.email ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                                placeholder="your.email@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-semibold text-blue-800 mb-3">
                                                Mobile Number *
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg ${errors.phone ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                                placeholder="9876543210"
                                                maxLength="10"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Tax Information Section */}
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-blue-200">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                                        <div className="bg-yellow-400 p-2 rounded-lg mr-3">
                                            <Award className="h-5 w-5 text-blue-900" />
                                        </div>
                                        Tax Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {/* PAN Card */}
                                        <div>
                                            <div className="flex items-center mb-3">
                                                <label htmlFor="panCard" className="block text-sm font-semibold text-blue-800">
                                                    PAN Card Number *
                                                </label>
                                                <div className="group relative ml-2">
                                                    <Info className="h-5 w-5 text-blue-600 cursor-help" />
                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-4 bg-blue-900 text-white text-sm rounded-xl z-10 shadow-lg">
                                                        Required for issuing 80G tax exemption certificate. This helps you claim tax deductions.
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                type="text"
                                                id="panCard"
                                                name="panCard"
                                                value={formData.panCard}
                                                onChange={handleInputChange}
                                                placeholder="ABCDE1234F"
                                                maxLength="10"
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg uppercase font-mono ${errors.panCard ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                            />
                                            {errors.panCard && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.panCard}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address Information Section */}
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-blue-200">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                                        <div className="bg-yellow-400 p-2 rounded-lg mr-3">
                                            <Info className="h-5 w-5 text-blue-900" />
                                        </div>
                                        Address Details
                                    </h3>

                                    {/* Full Address */}
                                    <div className="mb-6">
                                        <label htmlFor="address" className="block text-sm font-semibold text-blue-800 mb-3">
                                            Complete Address *
                                        </label>
                                        <textarea
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="House/Flat No., Building Name, Street, Area, Landmark"
                                            className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg resize-none ${errors.address ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                }`}
                                        />
                                        {errors.address && (
                                            <p className="text-red-600 text-sm mt-3 flex items-center">
                                                <AlertCircle className="h-4 w-4 mr-1" />
                                                {errors.address}
                                            </p>
                                        )}
                                    </div>

                                    {/* City, State, Postcode Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* City */}
                                        <div>
                                            <label htmlFor="city" className="block text-sm font-semibold text-blue-800 mb-3">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="Mumbai"
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg ${errors.city ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                            />
                                            {errors.city && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.city}
                                                </p>
                                            )}
                                        </div>

                                        {/* State */}
                                        <div>
                                            <label htmlFor="state" className="block text-sm font-semibold text-blue-800 mb-3">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                placeholder="Maharashtra"
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg ${errors.state ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                            />
                                            {errors.state && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.state}
                                                </p>
                                            )}
                                        </div>

                                        {/* Postcode */}
                                        <div>
                                            <label htmlFor="postcode" className="block text-sm font-semibold text-blue-800 mb-3">
                                                PIN Code *
                                            </label>
                                            <input
                                                type="text"
                                                id="postcode"
                                                name="postcode"
                                                value={formData.postcode}
                                                onChange={handleInputChange}
                                                placeholder="400001"
                                                maxLength="6"
                                                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg font-mono ${errors.postcode ? 'border-red-400 bg-red-50' : 'border-blue-200 bg-white hover:border-blue-300'
                                                    }`}
                                            />
                                            {errors.postcode && (
                                                <p className="text-red-600 text-sm mt-3 flex items-center">
                                                    <AlertCircle className="h-4 w-4 mr-1" />
                                                    {errors.postcode}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information Section */}
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-blue-200">
                                    <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
                                        <div className="bg-yellow-400 p-2 rounded-lg mr-3">
                                            <Info className="h-5 w-5 text-blue-900" />
                                        </div>
                                        Additional Details (Optional)
                                    </h3>

                                    {/* Preferred Sector */}
                                    <div className="mb-6">
                                        <label htmlFor="preferredSector" className="block text-sm font-semibold text-blue-800 mb-3">
                                            Preferred Focus Area
                                        </label>
                                        <select
                                            id="preferredSector"
                                            name="preferredSector"
                                            value={formData.preferredSector}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 border-2 border-blue-200 bg-white hover:border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg appearance-none cursor-pointer bg-no-repeat bg-right pr-12"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'></polyline></svg>")`,
                                                backgroundSize: '16px'
                                            }}
                                        >
                                            <option value="">Choose your preferred area of impact</option>
                                            {preferredSectors.map(sector => (
                                                <option key={sector} value={sector}>{sector}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Order Notes */}
                                    <div className="mb-6">
                                        <label htmlFor="orderNotes" className="block text-sm font-semibold text-blue-800 mb-3">
                                            Personal Message
                                        </label>
                                        <textarea
                                            id="orderNotes"
                                            name="orderNotes"
                                            value={formData.orderNotes}
                                            onChange={handleInputChange}
                                            rows="4"
                                            placeholder="Share your motivation for donating or any special message..."
                                            className="w-full px-5 py-4 border-2 border-blue-200 bg-white hover:border-blue-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-200 focus:border-yellow-400 transition-all duration-200 text-lg resize-none"
                                        />
                                    </div>

                                    {/* Public Visibility Checkbox */}
                                    <div className="flex items-start space-x-4 p-6 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl border-2 border-blue-100">
                                        <input
                                            type="checkbox"
                                            id="publicVisibility"
                                            name="publicVisibility"
                                            checked={formData.publicVisibility}
                                            onChange={handleInputChange}
                                            className="h-6 w-6 text-yellow-500 focus:ring-yellow-400 border-blue-300 rounded-lg mt-1"
                                        />
                                        <label htmlFor="publicVisibility" className="text-blue-800 font-medium leading-6">
                                            <span className="block font-semibold">Show my donation publicly</span>
                                            <span className="text-sm text-blue-600">Display my name and amount on the donor wall to inspire others</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="bg-gradient-to-r from-blue-900/5 to-yellow-500/5 rounded-2xl p-6 md:p-8 border-2 border-blue-200">
                                    <div className="flex flex-col space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="flex items-center text-green-700">
                                                <Shield className="h-5 w-5 mr-2 flex-shrink-0" />
                                                <span className="text-sm font-medium">100% secure & encrypted</span>
                                            </div>
                                            <div className="flex items-center text-blue-700">
                                                <Award className="h-5 w-5 mr-2 flex-shrink-0" />
                                                <span className="text-sm font-medium">Tax certificate in 24hrs</span>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.amount}
                                            className={`w-full px-6 py-4 md:px-8 md:py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg md:text-xl rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 disabled:transform-none border-2 border-blue-500 hover:border-blue-600 ${isSubmitting ? 'cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader className="animate-spin h-5 w-5 md:h-6 md:w-6 mr-3" />
                                                    <span className="text-base md:text-xl">Processing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="bg-yellow-400 p-2 rounded-full mr-3 md:mr-4 flex-shrink-0">
                                                        <Heart className="h-5 w-5 md:h-6 md:w-6 text-blue-900" />
                                                    </div>
                                                    <span className="flex-1 text-center">Complete Your Donation</span>
                                                    {formData.amount && (
                                                        <span className="ml-2 md:ml-4 px-3 py-1 md:px-4 md:py-2 bg-yellow-400 text-blue-900 rounded-full font-extrabold text-sm md:text-base flex-shrink-0">
                                                            ₹{parseInt(formData.amount).toLocaleString()}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donate;