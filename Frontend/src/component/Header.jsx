import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.jpg';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    // Handle scroll effect with hide/show behavior
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrolled = currentScrollY > 10;
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Hide when scrolling down
            } else {
                setIsVisible(true); // Show when scrolling up
            }
            
            setScrolled(isScrolled);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // Close mobile menu when route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && menuOpen) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About Us' },
        { to: '/focus-areas', label: 'Focus Areas' },
        { to: '/key-partner', label: 'Key Partner' },
        { to: '/contact', label: 'Contact Us' }
    ];

    const isActivePage = (path) => {
        return location.pathname === path;
    };

    return (
        <>
            <nav 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
                    scrolled 
                        ? 'bg-blue-900/95 backdrop-blur-md shadow-lg' 
                        : 'bg-blue-900 shadow-md'
                } ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 z-10">
                            <Link 
                                to="/" 
                                className="flex items-center group focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-blue-900 rounded-lg"
                                aria-label="Rangla Punjab Society - Home"
                            >
                                <div className="relative">
                                    <img 
                                        src={Logo} 
                                        alt="Rangla Punjab Society Logo" 
                                        className="h-14 w-auto rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-200 ring-2 ring-yellow-600/20 group-hover:ring-yellow-600/40"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map(({ to, label }) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-blue-900 ${
                                        isActivePage(to)
                                            ? 'text-blue-900 bg-yellow-600 shadow-md'
                                            : 'text-white hover:text-blue-900 hover:bg-yellow-600/90'
                                    }`}
                                    aria-current={isActivePage(to) ? 'page' : undefined}
                                >
                                    <span className="relative z-10">{label}</span>
                                    {isActivePage(to) && (
                                        <div className="absolute inset-0 bg-yellow-600 rounded-lg shadow-inner" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Donate Button */}
                        <div className="hidden lg:block">
                            <Link
                                to="/donate"
                                className="relative inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-blue-900 px-6 py-3 rounded-xl font-bold text-sm transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-blue-900 group overflow-hidden"
                                aria-label="Make a donation"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                                <span className="relative z-10 font-bold">Donate Now</span>
                                <svg className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                                </svg>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden relative p-2 text-white hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-blue-900 rounded-lg transition-colors duration-200 z-10"
                            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                        >
                            <div className="w-6 h-6 flex flex-col justify-center items-center">
                                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1.5'}`} />
                                <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} />
                                <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1.5'}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Separation Line */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-60"></div>

                {/* Mobile Navigation Overlay */}
                <div
                    className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
                        menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    <div 
                        className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                    />
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    id="mobile-menu"
                    className={`lg:hidden fixed top-20 left-4 right-4 z-50 transform transition-all duration-300 ${
                        menuOpen 
                            ? 'translate-y-0 opacity-100 scale-100' 
                            : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
                    }`}
                >
                    <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-blue-900/10 overflow-hidden">
                        <div className="px-2 py-3">
                            {navItems.map(({ to, label }, index) => (
                                <Link
                                    key={to}
                                    to={to}
                                    className={`block px-4 py-3 text-blue-900 hover:bg-yellow-600 hover:text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset ${
                                        isActivePage(to) ? 'bg-yellow-600 text-white shadow-sm' : ''
                                    }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    aria-current={isActivePage(to) ? 'page' : undefined}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{label}</span>
                                        {isActivePage(to) && (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </Link>
                            ))}
                            
                            <div className="mt-4 pt-3 border-t border-gray-200">
                                <Link
                                    to="/donate"
                                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white px-4 py-3 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset"
                                >
                                    <span>Donate Now</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7V17" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer to prevent content from hiding behind fixed header */}
            <div className="h-20" />
        </>
    );
};

export default Header;