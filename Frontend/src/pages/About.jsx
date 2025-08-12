import React from 'react';
import aboutimage from '../assets/about-image.jpg';
import { FaArrowRight, FaUsers, FaGraduationCap, FaHeart, FaHandshake } from 'react-icons/fa';

const About = () => (
    <div className="min-h-screen">
        {/* Hero Section */}
        <section
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--color-gray-50)" }}
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight text-gray-900">
                            About{" "}
                            <span style={{ color: "#FBBF24" }}>
                                Rangla Punjab
                            </span>
                        </h1>
                        <p className="text-xl leading-relaxed max-w-2xl text-gray-700">
                            Rangla Punjab is dedicated to building a brighter, stronger Punjab by empowering
                            communities, fostering education, and promoting sustainable growth. Our mission is to
                            bridge tradition with progress, ensuring every individual has the opportunity to thrive.
                            Join us as we work together to create lasting impact and celebrate the vibrant spirit of
                            Punjab.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => {
                                    window.location.href = "/contact";
                                }}
                                className="text-white px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-md flex items-center justify-center space-x-2"
                                style={{
                                    backgroundColor: "#F59E0B",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#FBBF24";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#F59E0B";
                                }}
                            >
                                <span>Join Us</span>
                                <FaArrowRight className="text-sm" />
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <img
                            src={aboutimage}
                            alt="About Rangla Punjab"
                            className="rounded-2xl shadow-lg w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>


        {/* Values Section */}
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4" style={{ color: '#374151' }}>
                        Our Core Values
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
                        The principles that guide our mission and drive our commitment to Punjab's development.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center p-6">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: `linear-gradient(to bottom right, #2563EB, #3B82F6)` }}
                        >
                            <FaUsers className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: '#374151' }}>Community</h3>
                        <p style={{ color: '#6B7280' }}>Building strong, inclusive communities that support and uplift every member.</p>
                    </div>

                    <div className="text-center p-6">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: `linear-gradient(to bottom right, #FACC15, #FDE047)` }}
                        >
                            <FaGraduationCap className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: '#374151' }}>Education</h3>
                        <p style={{ color: '#6B7280' }}>Empowering through knowledge and creating opportunities for lifelong learning.</p>
                    </div>

                    <div className="text-center p-6">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: `linear-gradient(to bottom right, #1E40AF, #2563EB)` }}
                        >
                            <FaHeart className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: '#374151' }}>Compassion</h3>
                        <p style={{ color: '#6B7280' }}>Serving with empathy and understanding, putting people first in everything we do.</p>
                    </div>

                    <div className="text-center p-6">
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ background: `linear-gradient(to bottom right, #FDE047, #FBBF24)` }}
                        >
                            <FaHandshake className="text-2xl text-white" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 font-serif" style={{ color: '#374151' }}>Partnership</h3>
                        <p style={{ color: '#6B7280' }}>Collaborating with stakeholders to create sustainable, lasting impact.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6" style={{ color: '#374151' }}>
                        Our Mission
                    </h2>
                    <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: '#6B7280' }}>
                        To preserve and promote the rich cultural heritage of Punjab while fostering economic growth,
                        community development, and social progress. We strive to create a sustainable future where
                        tradition and innovation coexist harmoniously, ensuring prosperity for generations to come.
                    </p>
                </div>
            </div>
        </section>
    </div>
);

export default About;