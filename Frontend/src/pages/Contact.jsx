import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { useToast } from '../context/ToastContext';
import { apiPost } from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { showSuccess, showError } = useToast();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.subject) newErrors.subject = 'Please select a subject';
        if (!formData.message.trim()) newErrors.message = 'Message is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            const result = await apiPost('/api/contact', formData);
            
            showSuccess(result.message || 'Thank you! Your message has been sent successfully.');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Contact submission error:', error);
            showError(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                            Get in <span className="text-yellow-400">Touch</span>
                        </h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            We'd love to hear from you. Reach out to us for any questions, 
                            partnerships, or to learn more about our initiatives in Punjab.
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-8">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-600">
                            <h2 className="text-3xl font-bold mb-6 text-blue-900">
                                Let's Connect
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600 mb-8">
                                We welcome your inquiries and feedback about our programs and partnerships. 
                                Our team is here to help and support your journey with us.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-600 hover:border-yellow-500">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-yellow-100 rounded-xl flex items-center justify-center transition-colors duration-300">
                                        <FaMapMarkerAlt className="text-2xl text-blue-600 group-hover:text-yellow-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-blue-900">Office Address</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Rangla Punjab Society<br />
                                            123 Punjab Street, Sector 15<br />
                                            Chandigarh, Punjab 160015
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 hover:border-blue-600">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-yellow-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors duration-300">
                                        <FaPhone className="text-2xl text-yellow-500 group-hover:text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-blue-900">Phone Numbers</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Main Office: +91 172 123 4567<br />
                                            Helpline: +91 98765 43210
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 hover:border-yellow-500">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-yellow-100 rounded-xl flex items-center justify-center transition-colors duration-300">
                                        <FaEnvelope className="text-2xl text-blue-500 group-hover:text-yellow-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-blue-900">Email Addresses</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            General: info@ranglapunjab.org<br />
                                            Partnerships: partnership@ranglapunjab.org<br />
                                            Support: support@ranglapunjab.org
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-400 hover:border-blue-600">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-yellow-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors duration-300">
                                        <FaClock className="text-2xl text-yellow-500 group-hover:text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-blue-900">Office Hours</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                                            Saturday: 9:00 AM - 2:00 PM<br />
                                            Sunday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600">
                        <h2 className="text-3xl font-bold mb-8 text-blue-900 text-center">
                            Send Us a Message
                        </h2>



                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-blue-900">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your first name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-blue-900">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your last name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-blue-900">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-blue-900">
                                    Subject *
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.subject ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="volunteer">Volunteering</option>
                                    <option value="donation">Donation</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.subject && (
                                    <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2 text-blue-900">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    required
                                    className={`w-full px-4 py-3 border rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.message ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Please describe your inquiry or message..."
                                ></textarea>
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full text-white font-semibold py-4 px-6 rounded-xl transform transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                                    isSubmitting 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:scale-105'
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaPaperPlane className="text-sm" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;