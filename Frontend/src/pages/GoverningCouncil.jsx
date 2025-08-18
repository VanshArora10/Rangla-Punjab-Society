import React from 'react';

const Item = ({ title, desc }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2 leading-relaxed">{desc}</p>
    </div>
);

const GoverningCouncil = () => {
    const responsibilities = [
        { title: 'Vision & Strategy', desc: 'Defines long-term priorities and ensures alignment with our mission.' },
        { title: 'Oversight', desc: 'Monitors performance, compliance, and ethical standards.' },
        { title: 'Stewardship', desc: 'Safeguards resources and fosters trust with communities and partners.' },
    ];

    const members = [
        'Rajdeep Singh (Chairperson)',
        'Neha Malhotra (Vice Chair)',
        'Baljit Kaur (Member)',
        'Arun Sharma (Member)',
        'Preeti Chawla (Member)'
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <h1 className="text-3xl md:text-5xl font-bold">Governing Council</h1>
                    <p className="mt-4 text-white/80 max-w-2xl">Guiding direction with accountability and stewardship for sustained impact.</p>
                </div>
            </section>

            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
                    {responsibilities.map((r) => (
                        <Item key={r.title} {...r} />
                    ))}
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Council Members</h2>
                        <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-gray-700">
                            {members.map((m) => (
                                <li key={m} className="bg-gray-50 rounded-xl px-4 py-3">{m}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GoverningCouncil;


