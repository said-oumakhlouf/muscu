'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: 'Comment choisir mon coach ?',
        answer: 'Tu peux parcourir notre sélection de coachs certifiés, filtrer par spécialité et consulter leur profil. Une fois ton choix fait, tu es mis en relation directement.',
    },
    {
        question: 'Est-ce que MusculApp est gratuit ?',
        answer: 'L\'inscription est gratuite. Tu accèdes ensuite aux coachs et aux séances selon la formule choisie. Certaines fonctionnalités avancées sont disponibles en premium.',
    },
    {
        question: 'Comment se déroulent les séances ?',
        answer: 'Ton coach crée un programme personnalisé basé sur ton profil et tes objectifs. Tu suis tes séances directement dans l\'app et ton coach ajuste le programme selon ta progression.',
    },
    {
        question: 'Puis-je changer de coach ?',
        answer: 'Oui, tu peux changer de coach à tout moment depuis ton profil. Ta progression et ton historique sont conservés.',
    },
    {
        question: 'Mes données sont-elles sécurisées ?',
        answer: 'Oui, toutes tes données personnelles et de santé sont stockées de manière sécurisée et conformément au RGPD. Nous ne partageons jamais tes données avec des tiers.',
    },
];

export default function HomeFAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="py-24 px-8 bg-white">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-black text-[#1A1A2E] mb-2 text-center">
                    Questions fréquentes
                </h2>
                <p className="text-gray-400 text-center mb-16">
                    Tout ce que tu dois savoir avant de commencer
                </p>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-[#E8DEFF] rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F9F6FF] transition"
                            >
                                <span className="font-bold text-[#1A1A2E]">{faq.question}</span>
                                <ChevronDown
                                    size={20}
                                    className="text-[#7C5CBF] transition-transform duration-300 flex-shrink-0"
                                    style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </button>

                            <div
                                className="overflow-hidden transition-all duration-300"
                                style={{ maxHeight: open === i ? '200px' : '0px' }}
                            >
                                <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}