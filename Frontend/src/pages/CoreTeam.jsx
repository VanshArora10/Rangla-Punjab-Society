import React from 'react';

const Card = ({ name, role, bio }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-bold text-xl mb-4">
            {name.split(' ').map(w => w[0]).slice(0,2).join('')}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-yellow-600 font-medium mt-1">{role}</p>
        <p className="text-gray-600 mt-3 leading-relaxed">{bio}</p>
    </div>
);

const CoreTeam = () => {
    const members = [
        { name: 'Amanpreet Kaur', role: 'Program Lead', bio: 'Drives initiatives with a focus on education and community upliftment.' },
        { name: 'Harjit Singh', role: 'Operations Head', bio: 'Ensures seamless execution and stakeholder alignment across projects.' },
        { name: 'Simran Arora', role: 'Partnerships', bio: 'Builds meaningful collaborations to scale impact sustainably.' },
        { name: 'Gurpreet Gill', role: 'Communications', bio: 'Crafts engaging narratives and outreach for our mission.' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <h1 className="text-3xl md:text-5xl font-bold">Core Team</h1>
                    <p className="mt-4 text-white/80 max-w-2xl">Meet the people who translate vision into action with empathy, clarity, and discipline.</p>
                </div>
            </section>

            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {members.map((m) => (
                            <Card key={m.name} {...m} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How we work</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">We prioritize outcomes, clarity, and respect. Small teams, rapid feedback, and community-first decisions keep us grounded and effective.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoreTeam;


