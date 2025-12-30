import React, { Fragment } from 'react';
import Image from 'next/image';
import { Megaphone, Wallet, Users } from 'lucide-react';

interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ExperienceSection = () => {
    const features: Feature[] = [
        {
            title: "Stand out from your competitors",
            description: "Wouldn't you rather shop in the store with a virtual try-on? Let's be honest here.",
            icon: <Megaphone className="w-6 h-6 text-white" />,
        },
        {
            title: "Save money. Save nature.",
            description: "Returns and refunds cost time, money and CO2. Minimize them with our tool.",
            icon: <Wallet className="w-6 h-6 text-white" />,
        },
        {
            title: "Enhance customer experience",
            description: "Wouldn't you rather shop in the store with a virtual try-on? Let's be honest here.",
            icon: <Users className="w-6 h-6 text-white" />,
        },
        {
            title: "No shipping required",
            description: "Wouldn't you rather shop in the store with a virtual try-on? Let's be honest here.",
            icon: <Users className="w-6 h-6 text-white" />,
        },
    ];

    return (
        <section className="relative min-h-screen bg-black text-white px-6 py-15 lg:py-32 overflow-visible section-experience">
            {/* Background Gradient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-purple-900/30 to-transparent blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 tracking-tight">
                    Experience the New Era of <span className="text-gray-400">Shopping</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-16 items-center">

                    {/* Left Column */}
                    <div className="relative order-2 lg:order-1 flex flex-col items-start">
                        {features.slice(0, 2).map((item, idx) => (
                            <Fragment key={idx}>
                                <div key={idx} className="group relative z-10 py-10">
                                    <div className="mb-8 p-3 w-fit rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500 transition-colors">
                                        {item.icon}
                                    </div>
                                    <p className="text-[20px] font-bold mb-4">{item.title}</p>
                                    <p className="text-gray-400 leading-relaxed max-w-sm mb-8">
                                        {item.description}
                                    </p>
                                </div>
                                {/* Dot-dot line between elements */}
                                {idx === 0 && (
                                    <div className="w-full border-t border-dashed" style={{ borderColor: '#4D4D50' }}></div>
                                )}
                            </Fragment>
                        ))}
                    </div>



                    {/* Center Phone Image */}
                    <div className="order-1 lg:order-2 flex justify-center relative mb-0 z-20 lg:-mb-[95px] scale-100 lg:scale-150">
                        <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px]">
                            {/* Replace with your Sanity Image URL */}
                            <img
                                src="/export-shopping.png"
                                alt="App Interface"
                                className="w-full h-full object-contain drop-shadow-2xl transform hover:rotate-[5deg] transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-24 order-3">
                        {features.slice(2, 4).map((item, idx) => (
                            <Fragment key={idx}>
                                <div key={idx} className="group relative z-10">
                                    <div className="mb-8 p-3 w-fit rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-500 transition-colors">
                                        {item.icon}
                                    </div>
                                    <p className="text-[20px] font-bold mb-4">{item.title}</p>
                                    <p className="text-gray-400 leading-relaxed max-w-sm mb-8">
                                        {item.description}
                                    </p>
                                </div>
                                {/* Dot-dot line between elements */}
                                {idx === 0 && (
                                    <div className="w-full border-t border-dashed" style={{ borderColor: '#4D4D50' }}></div>
                                )}
                            </Fragment>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;