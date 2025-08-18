import React from 'react';

const Advisor = ({ name, expertise, note }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center text-blue-900 font-bold">
                {name.split(' ').map(w => w[0]).slice(0,2).join('')}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-yellow-600">{expertise}</p>
            </div>
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed">{note}</p>
    </div>
);

const AdvisoryBoard = () => {
    const advisors = [
        { name: 'Dr. Meera Bedi', expertise: 'Public Health', note: 'Guides our health interventions with a focus on rural access and equity.' },
        { name: 'Prof. Ishaan Mehta', expertise: 'Education Policy', note: 'Advises on pedagogy and scalable models for learning outcomes.' },
        { name: 'Ravi Kapoor', expertise: 'Sustainability', note: 'Supports climate-smart practices and green livelihood strategies.' },
        { name: 'Anita Verma', expertise: 'Social Enterprise', note: 'Mentors on inclusive growth and entrepreneurship models.' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="relative bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                    <h1 className="text-3xl md:text-5xl font-bold">Advisory Board</h1>
                    <p className="mt-4 text-white/80 max-w-2xl">Experts who bring depth, perspective, and rigor to our approach.</p>
                </div>
            </section>

            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advisors.map((a) => (
                        <Advisor key={a.name} {...a} />
                    ))}
                </div>
            </section>

            <section className="pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Advisory Ethos</h2>
                        <p className="mt-4 text-gray-600 leading-relaxed">We invite diverse voices who challenge assumptions, ground our work in evidence, and keep us accountable to communities we serve.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdvisoryBoard;


