'use client';

import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { token, isLoading } = useAuth();
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        weight: '',
        height: '',
        goal: '',
        gender: '',
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (token) {
            userService.getProfile(token).then((data) => {
                setForm({
                    firstname: data.firstname || '',
                    lastname: data.lastname || '',
                    weight: data.weight || '',
                    height: data.height || '',
                    goal: data.goal || '',
                    gender: data.gender || '',
                });
            });
        }
    }, [token]);

    const handleSave = async () => {
        if (!token) return;
        await userService.updateProfile(token, {
            firstname: form.firstname,
            lastname: form.lastname,
            weight: form.weight ? Number(form.weight) : undefined,
            height: form.height ? Number(form.height) : undefined,
            goal: form.goal,
            gender: form.gender,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Chargement...</div>;

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
            <div className="bg-white rounded-xl p-8 shadow w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>

                <div className="flex flex-col gap-3">
                    <input
                        className="border rounded-lg p-2 text-gray-800"
                        placeholder="Prénom"
                        value={form.firstname}
                        onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                    />
                    <input
                        className="border rounded-lg p-2 text-gray-800"
                        placeholder="Nom"
                        value={form.lastname}
                        onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                    />
                    <input
                        className="border rounded-lg p-2 text-gray-800"
                        placeholder="Poids (kg)"
                        type="number"
                        value={form.weight}
                        onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    />
                    <input
                        className="border rounded-lg p-2 text-gray-800"
                        placeholder="Taille (cm)"
                        type="number"
                        value={form.height}
                        onChange={(e) => setForm({ ...form, height: e.target.value })}
                    />
                    <select
                        className="border rounded-lg p-2 text-gray-800"
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                        <option value="">Sexe</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                    </select>
                    <select
                        className="border rounded-lg p-2 text-gray-800"
                        value={form.goal}
                        onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    >
                        <option value="">Objectif</option>
                        <option value="weight_loss">Perte de poids</option>
                        <option value="muscle_gain">Prise de masse</option>
                        <option value="maintenance">Maintien</option>
                    </select>

                    <button
                        onClick={handleSave}
                        className="bg-black text-white rounded-lg p-2 font-bold hover:bg-zinc-800 mt-2"
                    >
                        {saved ? '✅ Sauvegardé !' : 'Sauvegarder'}
                    </button>
                </div>
            </div>
        </div>
    );
}