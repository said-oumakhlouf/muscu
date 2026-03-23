'use client';
import { motion } from 'framer-motion';

const problems = [
    {
        emoji: '😤',
        title: 'Tu cherches tes clients toi-même',
        desc: 'Réseaux sociaux, bouche à oreille, flyers... tu passes plus de temps à te vendre qu\'à coacher.',
    },
    {
        emoji: '📋',
        title: 'Tu gères tout à la main',
        desc: 'WhatsApp, Excel, notes papier — ton planning est un chaos et tu perds des clients en route.',
    },
    {
        emoji: '💸',
        title: 'Tu laisses de l\'argent sur la table',
        desc: 'Des créneaux vides, des no-shows, des clients qui partent sans prévenir. Ton chiffre d\'affaires est imprévisible.',
    },
];

export default function CoachJoinProblem() {
    return (
        <section className="py-24 px-8 bg-[#1A1A2E]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#A78BFA] text-sm font-bold uppercase tracking-widest mb-4 block">
                        Le problème
                    </span>
                    <h2
                        className="text-5xl font-black text-white uppercase mb-4"
                        style={{ fontFamily: 'var(--font-barlow)', transform: 'skewX(-4deg)' }}
                    >
                        Tu es un excellent coach.<br />
                        <span className="text-[#A78BFA]">Pas un commercial.</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto">
                        Et pourtant tu passes ton temps à faire les deux. On a une solution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {problems.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8"
                        >
                            <span className="text-4xl mb-4 flex justify-center items-center">{p.emoji}</span>
                            <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}