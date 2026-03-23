// src/components/coach/CoachJoinReassurance.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, CreditCard, Headphones } from 'lucide-react';

const reassurances = [
    {
        icon: Shield,
        title: 'Sans engagement',
        desc: 'Résilie quand tu veux. Aucune condition cachée.',
    },
    {
        icon: CreditCard,
        title: 'Sans carte bancaire',
        desc: '14 jours gratuits, aucune CB demandée pour démarrer.',
    },
    {
        icon: Headphones,
        title: 'On t\'accompagne',
        desc: 'Une question ? Notre équipe est là pour t\'aider à démarrer.',
    },
];

export default function CoachJoinReassurance() {
    return (
        <section className="py-24 px-8 bg-[#ece9f8]">
            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {reassurances.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center text-center gap-4"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <r.icon size={22} className="text-[#7C5CBF]" />
                            </div>
                            <div>
                                <h3 className="text-[#1A1A2E] font-bold text-lg mb-1">{r.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#1A1A2E] rounded-3xl p-16 text-center"
                >
                    <h2
                        className="text-5xl font-black text-white uppercase mb-4"
                        style={{ fontFamily: 'var(--font-barlow)', transform: 'skewX(-4deg)' }}
                    >
                        Prêt à remplir<br />
                        <span className="text-[#A78BFA]">ton agenda ?</span>
                    </h2>
                    <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
                        Rejoins les coaches qui ont arrêté de chercher leurs clients.
                    </p>
                    <Link
                        href="/register?role=coach"
                        className="inline-block bg-[#7C5CBF] text-white font-bold px-10 py-4 rounded-full hover:bg-[#6B4DAF] transition text-lg shadow-lg"
                    >
                        Commencer gratuitement
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}