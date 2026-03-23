// src/components/coach/CoachJoinFeatures.tsx
'use client';
import { motion } from 'framer-motion';
import { Users, Calendar, BarChart3, Star } from 'lucide-react';

const features = [
    {
        icon: Users,
        title: 'Des clients qui te trouvent',
        desc: 'Ton profil est visible par tous les sportifs qui cherchent un coach sur la plateforme. Tu n\'as plus à te vendre.',
    },
    {
        icon: Calendar,
        title: 'Ton agenda en ligne',
        desc: 'Tes créneaux disponibles, tes réservations, tes séances — tout centralisé. Fini les allers-retours WhatsApp.',
    },
    {
        icon: BarChart3,
        title: 'Suivi de tes clients',
        desc: 'Crée des séances, assigne des exercices, suis la progression de chacun de tes clients depuis ton dashboard.',
    },
    {
        icon: Star,
        title: 'Ta réputation se construit',
        desc: 'Les avis de tes clients s\'accumulent sur ton profil. Plus tu coaches, plus tu es visible.',
    },
];

export default function CoachJoinFeatures() {
    return (
        <section className="py-24 px-8 bg-[#ece9f8]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#7C5CBF] text-sm font-bold uppercase tracking-widest mb-4 block">
                        La solution
                    </span>
                    <h2
                        className="text-5xl font-black text-[#1A1A2E] uppercase mb-4"
                        style={{ fontFamily: 'var(--font-barlow)', transform: 'skewX(-4deg)' }}
                    >
                        Tout ce qu&apos;il te faut.<br />
                        <span className="text-[#7C5CBF]">En un seul endroit.</span>
                    </h2>
                    <p className="text-gray-500 text-lg max-w-xl mx-auto">
                        Concentre-toi sur ce que tu fais de mieux — coacher. On gère le reste.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-8 flex gap-6 items-start border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-[#ece9f8] rounded-xl flex items-center justify-center shrink-0">
                                <f.icon size={22} className="text-[#7C5CBF]" />
                            </div>
                            <div>
                                <h3 className="text-[#1A1A2E] font-bold text-lg mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}