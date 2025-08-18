import React from 'react';

const Row = ({ title, points }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <ul className="mt-3 space-y-2 text-gray-600">
            {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-yellow-500" />
                    <span>{p}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ExecutiveCouncil = () => {
    const rows = [
        { title: 'Program Execution', points: ['Translating strategy into measurable outcomes', 'Ensuring on-ground coordination and quality'] },
        { title: 'Resource Management', points: ['Budget tracking and transparency', 'Talent allocation and partner coordination'] },
        { title: 'Learning & Improvement', points: ['Monitoring, evaluation, and rapid iteration', 'Sharing insights across focus areas'] },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <h1 className="text-3xl md:text-5xl font-bold">Executive Council</h1>
                    <p className="mt-4 text-white/80 max-w-2xl">Driving delivery, accountability, and learning across programs.</p>
                </div>
            </section>

            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rows.map((r) => (
                        <Row key={r.title} {...r} />
                    ))}
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Working Principles</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">We keep teams small, decisions transparent, and feedback loops short. Empathy for beneficiaries and clarity in execution shape every choice we make.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ExecutiveCouncil;


