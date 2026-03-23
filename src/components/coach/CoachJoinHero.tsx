// src/components/coach/CoachJoinHero.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CoachJoinHero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden pb-24">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                >
                    <source src="/assets/videos/corde.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#1A1A2E]/50" />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent, #1A1A2E)' }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl pt-16">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6"
                >
                    💪 Espace coaches professionnels
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
                    className="text-7xl font-black mb-6 text-white uppercase"
                    style={{
                        fontFamily: 'var(--font-barlow)',
                        transform: 'skewX(-8deg)',
                        letterSpacing: '0.02em',
                        lineHeight: 1.05,
                    }}
                >
                    Arrête de chercher<br />tes clients.<br />
                    <span className="text-[#A78BFA]">Laisse-les venir à toi.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg text-white/60 mb-10 max-w-xl"
                >
                    La plateforme qui transforme ta passion en business. Gère tes clients, tes séances, ton agenda — tout en un.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex gap-4 mb-16"
                >
                    <Link
                        href="/register?role=coach"
                        className="bg-[#7C5CBF] text-white font-bold px-8 py-4 rounded-full hover:bg-[#6B4DAF] transition text-lg shadow-lg"
                    >
                        Essayer 14 jours gratuitement
                    </Link>
                    <Link
                        href="#plans"
                        className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition text-lg"
                    >
                        Voir les plans
                    </Link>
                </motion.div>
            </div>
        </section >
    );
}