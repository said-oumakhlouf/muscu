'use client';

import Link from 'next/link';
import { Dumbbell, Users, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/utils/fetchWithAuth'; 
import { useEffect, useState } from 'react';

const shortcuts = [
    {
        href: '/sessions',
        icon: Calendar,
        label: 'Séances',
        description: 'Gérer tes séances',
    },
    {
        href: '/admin',
        icon: Users,
        label: 'Clients',
        description: 'Voir tes clients',
    },
    {
        href: '/exercises',
        icon: Dumbbell,
        label: "Bibliothèque d'exercices",
        description: 'Exercices disponibles',
    },
];

export default function CoachWelcome() {
    const { token } = useAuth();
    const [firstname, setFirstname] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        fetchWithAuth('http://localhost:3000/users/profile', token)
            .then((data) => setFirstname(data.firstname ?? null));
    }, [token]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-8 py-24 bg-[#cec4e2]">
            <div className="max-w-2xl w-full text-center">
                <span className="bg-[#7C5CBF]/10 text-[#7C5CBF] text-sm font-medium px-4 py-1 rounded-full mb-6 inline-block">
                    🏋️ Espace coach
                </span>
                <h1 className="text-5xl font-black text-[#1A1A2E] mb-3 tracking-tight">
                    Bonjour{firstname ? `, ${firstname}` : ''} 👋
                </h1>
                <p className="text-gray-400 mb-12 text-lg">Que veux-tu faire aujourd'hui ?</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {shortcuts.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-[#E8DEFF] hover:border-[#7C5CBF] hover:shadow-md transition group"
                        >
                            <div className="w-12 h-12 bg-[#F3EEFF] rounded-xl flex items-center justify-center group-hover:bg-[#E8DEFF] transition">
                                <s.icon size={24} className="text-[#7C5CBF]" />
                            </div>
                            <span className="font-bold text-[#1A1A2E]">{s.label}</span>
                            <span className="text-gray-400 text-sm">{s.description}</span>
                            <ArrowRight size={16} className="text-[#7C5CBF] opacity-0 group-hover:opacity-100 transition" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}