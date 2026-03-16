'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

interface Subscription {
    plan: string;
    status: string;
    currentPeriodEnd: string;
}

export default function BillingPage() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }
        fetchSubscription();
    }, []);

    const fetchSubscription = async () => {
        try {
            const token = sessionStorage.getItem('token') ?? '';
            const data = await fetchWithAuth('http://localhost:3000/stripe/status', token);
            setSubscription(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async (priceId: string) => {
        const token = sessionStorage.getItem('token') ?? '';
        const { url } = await fetchWithAuth('http://localhost:3000/stripe/checkout', token, {
            method: 'POST',
            body: JSON.stringify({ priceId }),
        });
        window.location.href = url;
    };

    const plans = [
        {
            name: 'Starter',
            price: '29€',
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER!,
            clients: '10 clients max',
            commission: '10%',
        },
        {
            name: 'Pro',
            price: '59€',
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO!,
            clients: '50 clients max',
            commission: '7%',
            popular: true,
        },
        {
            name: 'Elite',
            price: '99€',
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ELITE!,
            clients: 'Illimité',
            commission: '5%',
        },
    ];

    if (loading) return <div className="p-8">Chargement...</div>;

    return (
        <main className="min-h-screen bg-[#ece9f8] p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold tracking-wide uppercase mb-2">
                    Mon abonnement
                </h1>
                <p className="text-gray-500 mb-8">
                    Gérez votre plan MusculApp et vos paiements
                </p>

                {/* Status actuel */}
                {subscription && (
                    <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                                    Plan actuel
                                </p>
                                <p className="text-2xl font-bold capitalize">
                                    {subscription.plan}
                                </p>
                            </div>
                            <div className="text-right">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${subscription.status === 'active'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}
                                >
                                    {subscription.status === 'active' ? 'Actif' : subscription.status}
                                </span>
                                <p className="text-sm text-gray-400 mt-1">
                                    Renouvellement le{' '}
                                    {new Date(subscription.currentPeriodEnd).toLocaleDateString('fr-FR')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-white rounded-2xl p-6 shadow-sm relative ${plan.popular ? 'ring-2 ring-violet-600' : ''
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
                                    Populaire
                                </span>
                            )}
                            <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                            <p className="text-3xl font-bold text-violet-600 mb-1">
                                {plan.price}
                                <span className="text-sm text-gray-400 font-normal">/mois</span>
                            </p>
                            <p className="text-sm text-gray-500 mb-1">{plan.clients}</p>
                            <p className="text-sm text-gray-400 mb-6">
                                Commission : {plan.commission}
                            </p>
                            <button
                                onClick={() => handleCheckout(plan.priceId)}
                                className={`w-full py-2 rounded-xl font-semibold text-sm transition ${subscription?.plan === plan.name.toLowerCase()
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-violet-600 text-white hover:bg-violet-700'
                                    }`}
                                disabled={subscription?.plan === plan.name.toLowerCase()}
                            >
                                {subscription?.plan === plan.name.toLowerCase()
                                    ? 'Plan actuel'
                                    : 'Choisir ce plan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}