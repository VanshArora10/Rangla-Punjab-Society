import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/Logo.jpg';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [aboutMobileOpen, setAboutMobileOpen] = useState(false);
    const aboutCloseTimerRef = useRef(null);
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

    // Close menus when route changes
    useEffect(() => {
        setMenuOpen(false);
        setAboutOpen(false);
        setAboutMobileOpen(false);
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
        { to: '/focus-areas', label: 'Focus Areas' },
        { to: '/key-partner', label: 'Key Partner' },
        { to: '/contact', label: 'Contact Us' }
    ];

    const aboutItems = [
        { to: '/about', label: 'Overview' },
        { to: '/about/core-team', label: 'Core Team' },
        { to: '/about/governing-council', label: 'Governing Council' },
        { to: '/about/executive-council', label: 'Executive Council' },
        { to: '/about/advisory-board', label: 'Advisory Board' }
    ];

    const isActivePage = (path) => location.pathname === path;
    const isAboutActive = () => location.pathname.startsWith('/about');

    const openAbout = () => {
        if (aboutCloseTimerRef.current) {
            clearTimeout(aboutCloseTimerRef.current);
            aboutCloseTimerRef.current = null;
        }
        setAboutOpen(true);
    };

    const scheduleCloseAbout = () => {
        if (aboutCloseTimerRef.current) {
            clearTimeout(aboutCloseTimerRef.current);
        }
        aboutCloseTimerRef.current = setTimeout(() => {
            setAboutOpen(false);
            aboutCloseTimerRef.current = null;
        }, 250);
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
                            {/* Home first */}
                            <Link
                                to="/"
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-blue-900 ${
                                    isActivePage('/')
                                        ? 'text-blue-900 bg-yellow-600 shadow-md'
                                        : 'text-white hover:text-blue-900 hover:bg-yellow-600/90'
                                }`}
                                aria-current={isActivePage('/') ? 'page' : undefined}
                            >
                                <span className="relative z-10">Home</span>
                                {isActivePage('/') && (
                                    <div className="absolute inset-0 bg-yellow-600 rounded-lg shadow-inner" />
                                )}
                            </Link>

                            {/* About with dropdown */}
                            <div 
                                className="relative"
                                onMouseEnter={openAbout}
                                onMouseLeave={scheduleCloseAbout}
                                onFocus={openAbout}
                                onBlur={(e) => {
                                    if (!e.currentTarget.contains(e.relatedTarget)) {
                                        scheduleCloseAbout();
                                    }
                                }}
                            >
                                <button
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-blue-900 ${
                                        isAboutActive()
                                            ? 'text-blue-900 bg-yellow-600 shadow-md'
                                            : 'text-white hover:text-blue-900 hover:bg-yellow-600/90'
                                    }`}
                                    aria-haspopup="menu"
                                    aria-expanded={aboutOpen}
                                    aria-controls="about-dropdown"
                                    onClick={() => setAboutOpen((v) => !v)}
                                >
                                    <div className="relative z-10 flex items-center gap-2">
                                        <span>About Us</span>
                                        <svg className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.958a.75.75 0 111.08 1.04l-4.24 4.523a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    {isAboutActive() && (
                                        <div className="absolute inset-0 bg-yellow-600 rounded-lg shadow-inner z-0" />
                                    )}
                                </button>
                                {/* Dropdown Menu */}
                                <div
                                    id="about-dropdown"
                                    className={`absolute left-0 top-full w-72 bg-transparent transform transition-all duration-200 ${aboutOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
                                    role="menu"
                                    onMouseEnter={openAbout}
                                    onMouseLeave={scheduleCloseAbout}
                                >
                                    <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-blue-900/10 overflow-hidden py-2" onMouseEnter={openAbout} onMouseLeave={scheduleCloseAbout}>
                                        {aboutItems.map(({ to, label }) => (
                                            <Link
                                                key={to}
                                                to={to}
                                                className={`block px-4 py-2.5 text-sm ${isActivePage(to) ? 'bg-yellow-50 text-blue-900' : 'text-blue-900 hover:bg-yellow-100'} transition-colors`}
                                                role="menuitem"
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Remaining nav items */}
                            {navItems.filter(({ to }) => to !== '/').map(({ to, label }) => (
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
                            {/* Home first */}
                            <Link
                                to="/"
                                className={`block px-4 py-3 text-blue-900 hover:bg-yellow-600 hover:text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset ${
                                    isActivePage('/') ? 'bg-yellow-600 text-white shadow-sm' : ''
                                }`}
                                aria-current={isActivePage('/') ? 'page' : undefined}
                            >
                                <div className="flex items-center justify-between">
                                    <span>Home</span>
                                    {isActivePage('/') && (
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                            </Link>

                            {/* About with collapsible submenu */}
                            <button
                                onClick={() => setAboutMobileOpen((v) => !v)}
                                className={`w-full px-4 py-3 text-left text-blue-900 hover:bg-yellow-600 hover:text-white rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset ${
                                    isAboutActive() ? 'bg-yellow-600 text-white shadow-sm' : ''
                                }`}
                                aria-expanded={aboutMobileOpen}
                            >
                                <div className="flex items-center justify-between">
                                    <span>About Us</span>
                                    <svg className={`w-4 h-4 transition-transform ${aboutMobileOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.188l3.71-3.958a.75.75 0 111.08 1.04l-4.24 4.523a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                            <div className={`mt-2 grid overflow-hidden transition-all ${aboutMobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} duration-300`}>
                                <div className="overflow-hidden">
                                    <div className="flex flex-col gap-1 pl-2">
                                        {aboutItems.map(({ to, label }) => (
                                            <Link
                                                key={to}
                                                to={to}
                                                className={`block px-4 py-2 text-blue-900 hover:bg-yellow-100 rounded-lg font-medium transition-colors ${
                                                    isActivePage(to) ? 'bg-yellow-50' : ''
                                                }`}
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Remaining items */}
                            {navItems.filter(({ to }) => to !== '/').map(({ to, label }, index) => (
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