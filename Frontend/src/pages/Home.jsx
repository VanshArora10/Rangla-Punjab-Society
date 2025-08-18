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
            <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0">
                    {/* Geometric shapes */}
                    <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-yellow-400/10 to-yellow-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-blue-800/5 rounded-full blur-3xl"></div>

                    {/* Floating decorative elements */}
                    <div className="absolute top-32 right-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-60 animate-bounce"></div>
                    <div className="absolute top-40 right-1/3 w-2 h-2 bg-blue-600 rounded-full opacity-40 animate-pulse"></div>
                    <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-yellow-500 rounded-full opacity-50 animate-bounce delay-1000"></div>

                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, #1e40af 1px, transparent 0)`,
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>
                </div>

                <div className="relative max-w-7xl  -mt-12.5 mx-auto px-4 sm:px-6 lg:px-1">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Content Side */}
                        <div className="space-y-8 lg:pr-8">
                            <div className="space-y-6">
                                {/* Badge */}
                                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-full">
                                    <span className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-3 animate-pulse"></span>
                                    <span className="text-yellow-700 font-semibold text-sm tracking-wide">Heritage • Progress • Community</span>
                                </div>

                                {/* Main Heading */}
                                <div className="space-y-4">
                                    <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight">
                                        <span className="block text-blue-900 drop-shadow-sm">Building a</span>
                                        <span className="block">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 animate-gradient">
                                                Brighter,
                                            </span>
                                        </span>
                                        <span className="block text-blue-900 drop-shadow-sm">
                                            <span className="relative">
                                                Stronger Punjab
                                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transform scale-x-0 animate-scale-in animation-delay-1000"></div>
                                            </span>
                                        </span>
                                        <span className="block text-blue-900 drop-shadow-sm">Together</span>
                                    </h1>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="relative">
                                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-blue-600 rounded-full"></div>
                                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium pl-8">
                                    Join hands in this vibrant movement where{' '}
                                    <span className="text-blue-900 font-bold">progress meets tradition</span>.
                                    Together, let's script a new chapter of{' '}
                                    <span className="text-yellow-600 font-bold">pride and prosperity</span> for Punjab.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => navigate('/focus-areas')}
                                    className="group relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:from-blue-800 hover:via-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10">What We Do</span>
                                    <FaArrowRight className="relative z-10 text-sm group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                                <button
                                    onClick={() => setPlayingVideo(true)}
                                    className="group relative border-3 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 bg-yellow-50 hover:bg-yellow-500"
                                >
                                    <FaPlay className="text-sm group-hover:scale-110 transition-transform duration-300" />
                                    <span>Play Video</span>
                                </button>   
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="relative">
                            {/* Background decoration for image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-blue-600/20 rounded-3xl transform rotate-3 scale-105"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-yellow-400/10 rounded-3xl transform -rotate-2 scale-95"></div>

                            {/* Main image container */}
                            <div className="relative group">
                                <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/30 to-blue-600/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
                                    <img
                                        src={HeroImage2}
                                        alt="Punjab heritage and progress"
                                        className="w-full sm:h-auto lg:h-120  rounded-xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500"
                                    />
                                    <div className="absolute inset-4 bg-gradient-to-t from-blue-900/10 via-transparent to-yellow-400/10 rounded-xl pointer-events-none"></div>
                                </div>

                                {/* Floating badges */}
                                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-3 border-l-4 border-yellow-500 animate-float">
                                    <div className="text-blue-900 font-bold text-sm">Heritage</div>
                                    <div className="text-gray-600 text-xs">Rich Culture</div>
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 border-l-4 border-blue-600 animate-float animation-delay-1000">
                                    <div className="text-blue-900 font-bold text-sm">Progress</div>
                                    <div className="text-gray-600 text-xs">Modern Growth</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
                        <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="#f9fafb" />
                    </svg>
                </div>
            </section>

            {/* Key Highlights Section */}
           

            {/* Focus Sectors Section */}
            {/* <section className="py-16 bg-white">
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
            </section> */}

            {/* About Us Section */}
         

            {/* Mission & Policies Section */}
        

            {/* Banner Section */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative group">
                        <img
                            src={bannerImage}
                            alt="Punjab initiatives banner"
                            className="w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                        />
                        <div className="absolute inset-0  rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                </div>
            </section>

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

            {/* Top Institutes Section */}
           

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