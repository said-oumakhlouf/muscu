// src/components/coach/CoachJoinPlans.tsx
'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
    {
        name: '⚡ Lancement',
        price: '19',
        subtitle: 'Tu démarres',
        clients: 'Jusqu\'à 10 clients',
        features: [
            'Profil visible sur la plateforme',
            'Gestion des séances',
            'Création d\'exercices',
            'Support email',
        ],
    },
    {
        name: '🔥 Croissance',
        price: '49',
        subtitle: 'Tu accélères',
        popular: true,
        clients: 'Jusqu\'à 50 clients',
        features: [
            'Tout Lancement inclus',
            'Profil mis en avant',
            'Statistiques avancées',
            'Programmes personnalisés',
            'Support prioritaire',
        ],
    },
    {
        name: '👑 Élite',
        price: '99',
        subtitle: 'Tu domines',
        clients: 'Clients illimités',
        features: [
            'Tout Croissance inclus',
            'Visibilité prioritaire',
            'Accès anticipé aux nouveautés',
            'Support dédié 7j/7',
        ],
    },
];

export default function CoachJoinPlans() {
    return (
        <section id="plans" className="py-24 px-8 bg-[#1A1A2E]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6"
                >
                    <span className="text-[#A78BFA] text-sm font-bold uppercase tracking-widest mb-4 block">
                        Tarifs
                    </span>
                    <h2
                        className="text-5xl font-black text-white uppercase mb-4"
                        style={{ fontFamily: 'var(--font-barlow)', transform: 'skewX(-4deg)' }}
                    >
                        Un plan pour chaque étape.<br />
                        <span className="text-[#A78BFA]">Sans engagement.</span>
                    </h2>
                    <p className="text-white/50 text-lg max-w-xl mx-auto mb-2">
                        14 jours d&apos;essai gratuit sur tous les plans. Sans carte bancaire.
                    </p>
                    <p className="text-white/30 text-sm">
                        L&apos;accès à la plateforme est entièrement gratuit pour tes clients.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`relative flex flex-col bg-white/5 border rounded-2xl p-8 ${plan.popular
                                    ? 'border-[#A78BFA] shadow-xl shadow-purple-900/30'
                                    : 'border-white/10'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-[#7C5CBF] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                                        Populaire
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                                <p className="text-white/40 text-sm mb-4">{plan.subtitle}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black text-[#A78BFA]">{plan.price}€</span>
                                    <span className="text-white/40 text-sm">/mois</span>
                                </div>
                                <p className="text-white/50 text-sm mt-2">{plan.clients}</p>
                            </div>

                            <ul className="flex flex-col gap-3 mb-8 flex-1">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                                        <div className="w-5 h-5 bg-[#A78BFA]/20 rounded-full flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-[#A78BFA]" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register?role=coach"
                                className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition ${plan.popular
                                        ? 'bg-[#7C5CBF] text-white hover:bg-[#6B4DAF]'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                Commencer gratuitement
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}