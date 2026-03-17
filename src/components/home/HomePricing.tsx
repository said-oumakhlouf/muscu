import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
    {
        name: 'Starter',
        price: '29',
        clients: '10 clients max',
        commission: '10% de commission',
        features: [
            'Gestion des séances',
            'Création d\'exercices',
            'Suivi client de base',
            'Support email',
        ],
    },
    {
        name: 'Pro',
        price: '59',
        popular: true,
        clients: '50 clients max',
        commission: '7% de commission',
        features: [
            'Tout Starter inclus',
            'Statistiques avancées',
            'Programmes personnalisés',
            'Support prioritaire',
        ],
    },
    {
        name: 'Elite',
        price: '99',
        clients: 'Clients illimités',
        commission: '5% de commission',
        features: [
            'Tout Pro inclus',
            'Commission réduite',
            'Accès anticipé aux nouveautés',
            'Support dédié',
        ],
    },
];

export default function HomePricing() {
    return (
        <section className="py-24 px-8 bg-[#F3EEFF]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#1A1A2E] mb-4">
                        Tarifs simples et transparents
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Choisissez le plan qui correspond à votre activité. Sans engagement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col bg-white rounded-2xl p-8 ${plan.popular
                                    ? 'ring-2 ring-[#7C5CBF] shadow-xl'
                                    : 'border border-gray-100'
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
                                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-[#7C5CBF]">{plan.price}€</span>
                                    <span className="text-gray-400 text-sm">/mois</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">{plan.clients}</p>
                                <p className="text-sm text-[#7C5CBF] font-medium mt-1">{plan.commission}</p>
                            </div>

                            <ul className="flex flex-col gap-3 mb-8 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-5 h-5 bg-[#F3EEFF] rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check size={12} className="text-[#7C5CBF]" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register"
                                className={`w-full py-3 rounded-xl font-semibold text-sm text-center transition ${plan.popular
                                        ? 'bg-[#7C5CBF] text-white hover:bg-[#6B4FA8]'
                                        : 'bg-[#F3EEFF] text-[#7C5CBF] hover:bg-[#E8DCFF]'
                                    }`}
                            >
                                Commencer
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}