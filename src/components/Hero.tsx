'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Link from 'next/link';

const stats = [
    { value: '500+', label: 'Coachs certifiés' },
    { value: '10k+', label: 'Sportifs actifs' },
    { value: '98%', label: 'Satisfaction' },
];

const logos = ['Nike', 'Adidas', 'Decathlon', 'MyProtein', 'Gymshark'];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 overflow-hidden">
            {/* Vidéo plein écran */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center"
                >
                    <source src="assets/videos/corde.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[#1A1A2E]/20" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#1A1A2E]" />
            </div>
            {/* Contenu */}
            <div className="relative z-10 flex flex-col items-center max-w-4xl pt-16">

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6"
                >
                    🏋️ Coaching personnalisé
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
                    Transforme ton corps.<br />Avec ton coach.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg text-white/60 mb-10 max-w-xl"
                >
                    MusculApp connecte les sportifs avec des coachs professionnels pour des séances sur mesure.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex gap-4 mb-16"
                >
                    <Link
                        href="/register"
                        className="bg-[#7C5CBF] text-white font-bold px-8 py-4 rounded-full hover:bg-[#6B4DAF] transition text-lg shadow-lg"
                    >
                        Commencer gratuitement
                    </Link>
                    <Link
                        href="#coachs"
                        className="bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition text-lg"
                    >
                        Voir les coachs
                    </Link>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex gap-12 mb-16"
                >
                    {stats.map((s) => (
                        <div key={s.label} className="flex flex-col items-center">
                            <span className="text-4xl font-black text-white" style={{ fontFamily: 'var(--font-barlow)' }}>
                                {s.value}
                            </span>
                            <span className="text-white/50 text-sm mt-1">{s.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Social proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                        <span className="text-white/50 text-sm ml-2">4.9/5 · +2 400 avis</span>
                    </div>
                    <p className="text-white/30 text-xs uppercase tracking-widest">Ils nous font confiance</p>
                    <div className="flex gap-6 items-center">
                        {logos.map((l) => (
                            <span key={l} className="text-white/20 font-black text-sm tracking-widest uppercase">
                                {l}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}