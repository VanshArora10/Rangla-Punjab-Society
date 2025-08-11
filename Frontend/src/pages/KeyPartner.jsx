import React from "react";
import keyPartnersImage from "../assets/keyPartners.jpg";
import nestleImg from "../assets/nestle.png";
import teleperformanceImg from "../assets/teleperformance.png";
import neclifeImg from "../assets/neclife.png";
import CentrientImg from "../assets/centrient.png";
import FreudenbergImg from "../assets/freudenberg.png";
import hmelImg from "../assets/hmel.png";
import UnileverImg from "../assets/unilever.png";
import ITCimg from "../assets/itc.png";
import CargillImg from "../assets/cargill.png";
import isuzuImg from "../assets/isuzu.png";
import IOLImg from "../assets/iol.png";
import ToppanImg from "../assets/toppan.png";
import ClaasImg from "../assets/claas.png";
import CremicaImg from "../assets/cremica.png";
import HerocyclesImg from "../assets/herocycles.png";
import SunPharmaImg from "../assets/sunpharma.png";
import InfosysImg from "../assets/infosys.png";
import TynorImg from "../assets/tynor.png";
import VerbioImg from "../assets/Verbio.png";
import DanoneImg from "../assets/danone.png";
import YanmarImg from "../assets/yanmar.png";
import SonalikaImg from "../assets/sonalika.png";
import VardhmanImg from "../assets/vardhman.png";
import NiviaImg from "../assets/nivia.png";
import GoorejImg from "../assets/goorej.png";
import HappyImg from "../assets/happy.png";
import DelmonteImg from "../assets/delmonte.png";
import NaharImg from "../assets/nahar.png";
import AmbujaCementImg from "../assets/ambujaCement.png";
import TridentImg from "../assets/trident.png";
import MahindraImg from "../assets/mahindra.png";

const KeyPartner = () => {
    const partners = [
        { img: nestleImg, name: "Nestle" },
        { img: teleperformanceImg, name: "Teleperformance" },
        { img: CentrientImg, name: "Centriënt" },
        { img: neclifeImg, name: "Neclife" },
        { img: FreudenbergImg, name: "Freudenberg" },
        { img: hmelImg, name: "Hmel" },
        { img: UnileverImg, name: "Unilever" },
        { img: ITCimg, name: "ITC" },
        { img: CargillImg, name: "Cargill" },
        { img: isuzuImg, name: "Isuzu" },
        { img: IOLImg, name: "IOL" },
        { img: ToppanImg, name: "Toppan" },
        { img: ClaasImg, name: "Claas" },
        { img: CremicaImg, name: "Cremica" },
        { img: HerocyclesImg, name: "HeroCycles" },
        { img: SunPharmaImg, name: "SunPharma" },
        { img: InfosysImg, name: "Infosys" },
        { img: TynorImg, name: "Tynor" },
        { img: VerbioImg, name: "Verbio" },
        { img: DanoneImg, name: "Danone" },
        { img: YanmarImg, name: "Yanmar" },
        { img: VardhmanImg, name: "Vardhman" },
        { img: SonalikaImg, name: "Sonalika" },
        { img: NiviaImg, name: "Nivia" },
        { img: GoorejImg, name: "Goorej" },
        { img: HappyImg, name: "Happy" },
        { img: DelmonteImg, name: "Delmonte" },
        { img: NaharImg, name: "Nahar" },
        { img: AmbujaCementImg, name: "Ambuja" },
        { img: TridentImg, name: "Trident" },
        { img: MahindraImg, name: "Mahindra" }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section - Clean and Simple */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Text Content */}
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight text-gray-800">
                                Key <span style={{ color: "#2563EB" }}>Partners</span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We are proud to collaborate with a diverse range of key partners who
                                share our vision and values. Our partnerships enhance our ability to
                                deliver exceptional services and products to our community.
                            </p>

                            <button
                                className="px-6 py-3 rounded-md font-semibold text-white shadow-md transition-transform transform hover:scale-105"
                                style={{ backgroundColor: "#F59E0B" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FBBF24")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F59E0B")}
                            >
                                View All Partners
                            </button>
                        </div>

                        {/* Image */}
                        <div className="relative">
                            <img
                                src={keyPartnersImage}
                                alt="Key Partners"
                                className="rounded-lg shadow-lg w-full h-auto border-4"
                                style={{ borderColor: "#FDE047" }}
                            />
                        </div>

                    </div>
                </div>
            </section>


            {/* Partners Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
                            Partners in Growth
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Our partners play a crucial role in our growth and success. Together,
                            we strive to create innovative solutions and drive positive change in
                            the industry.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow duration-300 text-center"
                            >
                                <div className="w-full h-16 flex items-center justify-center mb-3">
                                    <img
                                        src={partner.img}
                                        alt={partner.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-sm font-medium text-gray-700">{partner.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action - Simple and Clean */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-gray-800">
                        Join Our Network of Partners
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Be part of Punjab's growth story. Partner with us to create lasting impact and drive positive change.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                        Become a Partner
                    </button>
                </div>
            </section>
        </div>
    );
}

export default KeyPartner;