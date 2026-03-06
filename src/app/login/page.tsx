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
    }, [token, isLoading, router])

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
        login(data.access_token)
        router.push('/sessions');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <div className="bg-white rounded-xl p-8 shadow w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Connexion</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    className="w-full border rounded-lg p-2 mb-3 text-gray-800"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    className="w-full border rounded-lg p-2 mb-4 text-gray-800"
                    type="password"
                    placeholder="Mot de passe"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white rounded-lg p-2 font-bold hover:bg-zinc-800"
                >
                    Se connecter
                </button>
            </div>
        </div>
    );
}

