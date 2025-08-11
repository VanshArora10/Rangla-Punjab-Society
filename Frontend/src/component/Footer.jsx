import React from 'react';
import logo1 from '../assets/Logo.jpg';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin, FaPhone, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Content */}
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Logo & Description */}
                    <div className="text-center md:text-left">
                        <Link to="/" className="inline-block mb-4">
                            <img
                                src={logo1}
                                alt="Rangla Punjab Society"
                                className="h-16 w-auto rounded-lg shadow-lg mx-auto md:mx-0"
                            />
                        </Link>
                        <h3 className="text-xl font-bold text-yellow-600 mb-2">Rangla Punjab Society</h3>
                        <p className="text-blue-100 text-sm">
                            Preserving Punjab's vibrant heritage through culture and community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold text-yellow-600 mb-4">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <Link to="/about" className="text-blue-100 hover:text-yellow-600 transition-colors text-sm">About Us</Link>
                            <Link to="/focus-areas" className="text-blue-100 hover:text-yellow-600 transition-colors text-sm">Focus Areas</Link>
                            <Link to="/contact" className="text-blue-100 hover:text-yellow-600 transition-colors text-sm">Contact</Link>
                            <Link to="/donate" className="text-blue-100 hover:text-yellow-600 transition-colors text-sm">Donate</Link>
                        </div>
                    </div>

                    {/* Contact & Social */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold text-yellow-600 mb-4">Connect</h4>
                        <div className="space-y-2 mb-4">
                            <a href="tel:+911721234567" className="flex items-center justify-center md:justify-start text-blue-100 hover:text-yellow-600 transition-colors text-sm">
                                <FaPhone className="mr-2 text-xs" />
                                +91 172 123 4567
                            </a>
                            <a href="mailto:info@ranglapunjab.org" className="flex items-center justify-center md:justify-start text-blue-100 hover:text-yellow-600 transition-colors text-sm">
                                <FaEnvelope className="mr-2 text-xs" />
                                info@ranglapunjab.org
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center md:justify-start space-x-3">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-blue-900 transition-colors">
                                <FaFacebook className="text-sm" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-blue-900 transition-colors">
                                <FaTwitter className="text-sm" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-blue-900 transition-colors">
                                <FaInstagram className="text-sm" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-blue-900 transition-colors">
                                <FaYoutube className="text-sm" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-600 hover:text-blue-900 transition-colors">
                                <FaLinkedin className="text-sm" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-blue-800 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-blue-100 text-sm text-center sm:text-left">
                            &copy; {new Date().getFullYear()} Rangla Punjab Society. All Rights Reserved.
                        </p>
                        <div className="flex space-x-4 text-sm">
                            <Link to="/privacy-policy" className="text-blue-100 hover:text-yellow-600 transition-colors">Privacy</Link>
                            <Link to="/terms" className="text-blue-100 hover:text-yellow-600 transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 w-10 h-10 bg-yellow-600 hover:bg-yellow-500 text-blue-900 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                aria-label="Scroll to top"
            >
                <FaArrowUp className="text-sm" />
            </button>
        </footer>
    );
};

export default Footer;