import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeroImage2 from '../assets/hero image 2.png';
import bannerImage from '../assets/bannerImage.jpg';
import aboutImage from '../assets/about-image.jpg';
import topInstituteImage from '../assets/TopInstitute.jpg';

import { FaTractor, FaFilm, FaShieldAlt, FaPlay, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { GiSpinningWheel } from 'react-icons/gi';
import { MdAgriculture, MdComputer, MdEngineering } from 'react-icons/md';

const Home = () => {
    const navigate = useNavigate();
    const [playingVideo, setPlayingVideo] = useState(false);

    const focusSectors = [
        { icon: MdAgriculture, title: "Agri & Food Processing", color: "from-yellow-100 to-yellow-200" },
        { icon: MdComputer, title: "IT/ITeS/ Data Centres", color: "from-blue-100 to-blue-200" },
        { icon: FaTractor, title: "Mobility & Auto Components", color: "from-yellow-100 to-yellow-200" },
        { icon: MdEngineering, title: "Light Engineering", color: "from-blue-100 to-blue-200" },
        { icon: GiSpinningWheel, title: "Textiles", color: "from-yellow-100 to-yellow-200" },
        { icon: FaFilm, title: "Tourism & Film", color: "from-blue-100 to-blue-200" },
        { icon: FaShieldAlt, title: "Defence & Aerospace", color: "from-yellow-100 to-yellow-200" }
    ];

    const advantages = [
        "70% working-age population",
        "No domicile restrictions for employment",
        "Peaceful industrial relations",
        "Low power tariff (₹5.85 per unit)",
        "Robust infrastructure & connectivity"
    ];

    const educationFeatures = [
        "Mohali emerging as a premier education hub",
        "Presence of world-class schools and universities",
        "R&D institutes driving innovation and knowledge"
    ];

    const excellenceCenters = [
        "PGIMER: Rare Diseases CoE",
        "IISER Mohali: Protein Science CoE, Design and Engineering",
        "Panjab University: CoE on Application of Nano Materials",
        "PEC: Siemens & Cyber Security CoEs"
    ];

    const qualityFeatures = [
        { title: "Seamless Access", desc: "International airport, major highways, rail links" },
        { title: "Advanced Healthcare", desc: "Fortis, Max, Ivy hospitals" },
        { title: "Lifestyle & Leisure", desc: "Premium malls, global hotels, dining" },
        { title: "Modern Living", desc: "Green spaces, walking trails, community design" },
        { title: "Education & Recreation", desc: "Proximity to top institutions" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden border-t border-gray-200/20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-32 h-32 border border-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-24 h-24 border border-yellow-400 rounded-full animate-pulse delay-1000"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="inline-flex items-center px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full text-yellow-400 text-sm font-medium">
                                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                                    Heritage • Progress • Community
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                    Building a Brighter,<br />
                                    <span className="text-yellow-400">Stronger Punjab</span><br />
                                    Together
                                </h1>
                            </div>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                                Join hands in this vibrant movement where progress meets tradition.
                                Together, let's script a new chapter of pride and prosperity for Punjab.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    onClick={() => navigate('/focus-areas')}
                                    className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 px-8 py-4 rounded-xl font-bold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                                >
                                    <span>What We Do</span>
                                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                                </button>
                                <button 
                                    onClick={() => setPlayingVideo(true)}
                                    className="group border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 px-8 py-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <FaPlay className="text-sm group-hover:scale-110 transition-transform duration-200" />
                                    <span>Play Video</span>
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-blue-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            <img 
                                src={HeroImage2} 
                                alt="Punjab heritage and progress" 
                                className="relative rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Highlights Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Punjab Advantage
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Key factors that make Punjab an ideal destination for growth and investment.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Production Advantages */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mr-4">
                                    <FaCheckCircle className="text-white text-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-900">Production Factors</h3>
                            </div>
                            <ul className="space-y-3">
                                {advantages.map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700 text-sm">
                                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Education & Research */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                                    <MdComputer className="text-white text-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-900">Education Hub</h3>
                            </div>
                            <ul className="space-y-3">
                                {educationFeatures.map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700 text-sm">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Centers of Excellence */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-500 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center mr-4">
                                    <MdEngineering className="text-white text-lg" />
                                </div>
                                <h3 className="text-xl font-bold text-blue-900">R&D Excellence</h3>
                            </div>
                            <ul className="space-y-3">
                                {excellenceCenters.map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-700 text-sm">
                                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focus Sectors Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Focus Sectors
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Strategic sectors driving Punjab's economic growth and development.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {focusSectors.map(({ icon: Icon, title, color }, index) => (
                            <div 
                                key={index}
                                className={`group bg-gradient-to-br ${color} hover:from-yellow-500 hover:to-yellow-600 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 border border-gray-200 hover:border-yellow-500`}
                            >
                                <Icon className="text-4xl text-blue-900 group-hover:text-white mx-auto mb-3 transition-colors duration-300" />
                                <p className="font-semibold text-blue-900 group-hover:text-white text-xs leading-tight transition-colors duration-300">
                                    {title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <div className="w-16 h-1 bg-yellow-500 mb-6"></div>
                                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                                    Know About Us
                                </h2>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Empowering Punjab's Future</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                We are dedicated to preserving and promoting the rich cultural heritage of Punjab while fostering economic growth and community development. Our initiatives span across education, healthcare, infrastructure, and cultural preservation.
                            </p>
                            <button 
                                onClick={() => navigate('/about')}
                                className="group bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <span>Learn More</span>
                                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-blue-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                            <img 
                                src={aboutImage} 
                                alt="About Rangla Punjab Society" 
                                className="relative rounded-2xl shadow-xl w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Policies Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Our Mission & Policies
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Driving Punjab's development through strategic policies and world-class infrastructure.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Investment Policy */}
                        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 hover:from-yellow-50 hover:to-yellow-100 rounded-2xl p-8 border border-blue-200 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                            <div className="bg-blue-600 group-hover:bg-yellow-500 text-white px-6 py-3 rounded-xl inline-block mb-6 transition-colors duration-300">
                                <h3 className="font-bold text-lg">Investment Friendly Policy</h3>
                            </div>
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Industrial & Business Development Policy 2022</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start text-gray-700 text-sm">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    SGST reimbursement up to 200% of FCI for up to 20 years
                                </li>
                                <li className="flex items-start text-gray-700 text-sm">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Employment incentive: Up to ₹48,000/year per worker
                                </li>
                                <li className="flex items-start text-gray-700 text-sm">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Up to 100% exemption: CLU & EDC charges
                                </li>
                                <li className="flex items-start text-gray-700 text-sm">
                                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Electricity duty exemption for 15 years
                                </li>
                            </ul>
                        </div>

                        {/* Quality of Life */}
                        <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 hover:from-blue-50 hover:to-blue-100 rounded-2xl p-8 border border-yellow-500 hover:border-blue-600 transition-all duration-300 hover:shadow-lg">
                            <div className="bg-yellow-500 group-hover:bg-blue-600 text-white px-6 py-3 rounded-xl inline-block mb-6 transition-colors duration-300">
                                <h3 className="font-bold text-lg">Quality of Life & Connectivity</h3>
                            </div>
                            <h4 className="text-xl font-bold text-blue-900 mb-4">Mohali – A Global-standard Urban Hub</h4>
                            <ul className="space-y-3">
                                {qualityFeatures.map(({ title, desc }, index) => (
                                    <li key={index} className="flex items-start text-gray-700 text-sm">
                                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        <span><strong>{title}:</strong> {desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Banner Section */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative group">
                        <img 
                            src={bannerImage} 
                            alt="Punjab initiatives banner" 
                            className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>
            </section>

            {/* Top Institutes Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                            Leading Institutions
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            World-class institutions powering Punjab's knowledge economy and research excellence.
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="relative group inline-block">
                            <img 
                                src={topInstituteImage} 
                                alt="Top educational institutes in Punjab" 
                                className="w-full max-w-4xl mx-auto rounded-2xl shadow-xl transform group-hover:scale-[1.02] transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {playingVideo && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-blue-900">About Our Mission</h3>
                            <button 
                                onClick={() => setPlayingVideo(false)}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                            <p className="text-gray-600">Video content would be embedded here</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;