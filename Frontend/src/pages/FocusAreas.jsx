// PeopleFirstAgenda.jsx
import React from "react";
import FocusArea from "../assets/FocusAreas.jpg";
import KP from "../assets/KP.jpeg";
import { FaUsers, FaGraduationCap, FaHeartbeat, FaBriefcase, FaLeaf, FaUsersCog, FaShieldAlt, FaChartLine } from 'react-icons/fa';


// Existing initiatives
const initiatives = [
    {
        title: "Kheda-Vatan Punjab",
        subtitle: "(Sports in Every Village)",
        points: [
            "8,000 villages to have sports grounds (3,100 by Dec 2025)",
            "Structured state-wide events for all age groups"
        ]
    },
    {
        title: "Women Livelihoods - Program Pahel",
        points: [
            "5.5 lakh SHG women supported",
            "Goal: 50,000 women-led enterprises",
            "2,000+ ventures operational; 1,000+ repaid loans"
        ]
    },
    {
        title: "Punjab Sikhya Kranti",
        subtitle: "(Revolution in Government School Education)",
        points: [
            "Infra revamp: 6,000 smart classrooms, 2,500 computer labs, campus staff",
            "Curriculum & pedagogy transformed",
            "Punjab tops National Achievement Survey 2025"
        ]
    },
    {
        title: "Sehatmand Punjab",
        subtitle: "(Healthcare Transformation)",
        points: [
            "3.6 Cr OPDs in 881 Aam Aadmi Clinics",
            "98.5% govt hospital machinery functional",
            "4x increase in availability of essential drugs"
        ]
    },
    {
        title: "Student Jobs & Entrepreneurship",
        points: [
            "Mandatory 5-7 semester entrepreneurship curriculum across colleges",
            "Industry-linked internships for ITI and Polytechnic students",
            "₹20,000 Cr/year projected student-led enterprise revenue"
        ]
    },
    {
        title: "Greener Punjab",
        points: [
            "11,000 ponds revived for water security",
            "5,000+ villages adopting Thapar/Sichewal waste management",
            "Urban overhaul in 153 municipalities and 13 corporations"
        ]
    },
    {
        title: "Youth Clubs for Leadership",
        points: [
            "17,000 youth clubs (21 members, gender-balanced)",
            "Activities in entrepreneurship, culture, sports"
        ]
    },
    {
        title: "Yudh Nashe De Virudh",
        subtitle: "(Punjab's War on Drugs)",
        points: [
            "1,000+ self-declared drug-free villages",
            "Village-level surveillance & mass awareness"
        ]
    }
];

// New section initiatives
const keyPartnerHighlights = [
    {
        title: "Progressive Rankings",
        points: [
            "Top Achiever: Ease of Doing Business, DPIIT",
            "Leader State: Startup India Ranking",
            "Rank 6: National Logistics Index",
            "Top Performer: Invest India's SIPA Rankings"
        ]
    },
    {
        title: "Proactive Investor Support",
        points: [
            "WhatsApp alerts, two-way query redressal",
            "AI Chatbot & Query Engine",
            "Call Center with inbound/outbound resolution"
        ]
    },
    {
        title: "Invest Punjab - Premier Investment Promotion Agency",
        points: [
            "Unified Regulator - one of its kind in India",
            "One stop office with investor-centric professional approach",
            "Investment promotion & facilitation",
            "Policy advocacy",
            "Dedicated relationship managers",
            "After-care"
        ]
    },
    {
        title: "All clearances with maximum 45 Working Days",
        points: [
            "83% of clearances notified within 30 days",
            "Auto-generated deemed approvals post-deadline - legally valid",
            "Escalation monitoring matrix up to Deputy Commissioner & Administrative Secretary",
            "Rejection with escalation and explicit reasoning"
        ]
    },
    {
        title: "FastTrack Punjab Portal - India's Advanced Single Window System",
        points: [
            "Unified Portal",
            "Single-entry, single-exit for 150+ G2B Services of 15+ Departments",
            "Applicable for MSMEs, Large Units, Institutions",
            "Covers Regulatory, Service and Incentive Approvals",
            "No parallel offline or departmental applications allowed"
        ]
    },
    {
        title: "Punjab Right to Business Act (RTBA)",
        points: [
            "In-Principle Approval in minimum 3 Days for eligible units up to ₹125 Cr investment in plant & machinery",
            "Based on self-certification",
            "Valid for the period of 3.5 years"
        ]
    },
    {
        title: "Other Reforms",
        points: [
            "Circle Revenue Office (CRO) report in 15 days",
            "Leasehold-to-Freehold Conversion for industrial plots",
            "Extended validity of fire NOC up to 5 years"
        ]
    }
];


const PeopleFirstAgenda = () => {
    const getIcon = (title) => {
        if (title.includes('Sports') || title.includes('Kheda')) return <FaUsers />;
        if (title.includes('Women') || title.includes('Livelihoods')) return <FaUsers />;
        if (title.includes('Education') || title.includes('Sikhya')) return <FaGraduationCap />;
        if (title.includes('Healthcare') || title.includes('Sehat')) return <FaHeartbeat />;
        if (title.includes('Jobs') || title.includes('Entrepreneurship')) return <FaBriefcase />;
        if (title.includes('Greener') || title.includes('Green')) return <FaLeaf />;
        if (title.includes('Youth') || title.includes('Leadership')) return <FaUsersCog />;
        if (title.includes('Drugs') || title.includes('Nashe')) return <FaShieldAlt />;
        return <FaChartLine />;
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-gray-800">
                                People–First Development Agenda
                            </h1>

                            <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: "#2563EB" }}>
                                Rangla Punjab – <span style={{ color: "#F59E0B" }}>Key Flagship Initiatives</span>
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed">
                                Transforming Punjab through comprehensive development programs that prioritize people,
                                education, healthcare, and sustainable growth.
                            </p>

                            <button
                                onClick={() => {
                                    window.location.href = "/about";
                                }}
                                className="px-6 py-3 rounded-md font-semibold text-white shadow-md transition-transform transform hover:scale-105"
                                style={{ backgroundColor: "#F59E0B" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FBBF24")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                            >
                                Learn More
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <img
                                src={FocusArea}
                                alt="Focus Area"
                                className="rounded-lg shadow-lg w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* Initiatives Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {initiatives.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                                        <span className="text-white text-lg">
                                            {getIcon(item.title)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 font-serif">{item.title}</h3>
                                        {item.subtitle && (
                                            <p className="text-yellow-600 text-sm font-medium">{item.subtitle}</p>
                                        )}
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {item.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-gray-600 text-sm">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mid Section Image */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <img
                        src={KP}
                        alt="Key Partnerships"
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </section>

         
        </div>
    );
};

export default PeopleFirstAgenda;