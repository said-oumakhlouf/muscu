'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const { token, isLoading, login } = useAuth();

    useEffect(() => {
        if (!isLoading && token) {
            router.push('/');
        }
    }, [token, isLoading, router]);

    if (isLoading) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        if (!res.ok) {
            setError('Email ou mot de passe incorrect');
            return;
        }

        const data = await res.json();
        login(data.access_token);
        router.push('/sessions');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#EEEEF8]">
            <div className="bg-white rounded-2xl border border-black/[0.06] p-8 w-full max-w-md">

                <h1 className="text-2xl font-semibold text-[#1a1a2e] mb-1">Connexion</h1>
                <p className="text-sm text-gray-400 mb-7">Bienvenue sur MusculApp</p>

                {error && (
                    <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-400">Email</label>
                        <input
                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300 w-full"
                            type="email"
                            placeholder="email@exemple.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-gray-400">Mot de passe</label>
                        <input
                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300 w-full"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white rounded-xl py-3 text-sm font-semibold transition-colors mt-2"
                    >
                        Se connecter
                    </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Pas encore de compte ?{' '}
                    <a href="/register" className="text-[#6C5CE7] font-medium hover:underline">
                        S'inscrire
                    </a>
                </p>
            </div>
        </div>
    );
}