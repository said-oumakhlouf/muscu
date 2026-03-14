'use client';

import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { useEffect, useState } from 'react';

const GOAL_LABELS: Record<string, string> = {
    weight_loss: 'Perte de poids',
    muscle_gain: 'Prise de masse',
    maintenance: 'Maintien',
};

export default function ProfilePage() {
    const { token, role, isLoading } = useAuth();
    const isAdmin = role === 'admin';

    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
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
                    email: data.email || '',
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
            email: form.email,
            ...(!isAdmin && {
                weight: form.weight ? Number(form.weight) : undefined,
                height: form.height ? Number(form.height) : undefined,
                goal: form.goal,
                gender: form.gender,
            }),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const imc =
        form.weight && form.height
            ? (Number(form.weight) / Math.pow(Number(form.height) / 100, 2)).toFixed(1)
            : null;

    const initials =
        `${form.firstname?.[0] ?? ''}${form.lastname?.[0] ?? ''}`.toUpperCase() || '?';

    const displayName =
        form.firstname || form.lastname
            ? `${form.firstname} ${form.lastname}`.trim()
            : 'Mon profil';

    if (isLoading)
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#EEEEF8]">
                Chargement...
            </div>
        );

    return (
        <div className="flex min-h-screen flex-col bg-[#EEEEF8] p-10">
            <div className="mx-auto w-full max-w-xl flex flex-col gap-5">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-[#1a1a2e] mb-1">Mon Profil</h1>
                    <p className="text-sm text-gray-400">
                        {isAdmin ? 'Gérez votre compte coach' : 'Gérez vos informations personnelles'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl border border-black/[0.06] p-7 flex flex-col gap-6">

                    {/* Avatar row */}
                    <div className="flex items-center gap-5 pb-6 border-b border-black/[0.06]">
                        <div className="w-16 h-16 rounded-full bg-[#6C5CE7] flex items-center justify-center text-white text-xl font-semibold shrink-0">
                            {initials}
                        </div>
                        <div>
                            <p className="font-semibold text-[#1a1a2e] text-base">{displayName}</p>
                            <p className="text-sm text-gray-400 mt-0.5">{form.email || '—'}</p>
                            <span className={`inline-flex items-center gap-1.5 mt-2 text-xs font-medium rounded-full px-3 py-1 ${isAdmin
                                    ? 'bg-[#eeeeff] text-[#534AB7]'
                                    : 'bg-[#eef6ee] text-[#3B6D11]'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isAdmin ? 'bg-[#6C5CE7]' : 'bg-[#639922]'}`} />
                                {isAdmin ? 'Coach' : (form.goal ? GOAL_LABELS[form.goal] ?? form.goal : 'Client')}
                            </span>
                        </div>
                    </div>

                    {/* Infos communes */}
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc] mb-4">
                            Informations du compte
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-400">Prénom</label>
                                <input
                                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                                    placeholder="Prénom"
                                    value={form.firstname}
                                    onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-400">Nom</label>
                                <input
                                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                                    placeholder="Nom"
                                    value={form.lastname}
                                    onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5 col-span-2">
                                <label className="text-xs font-medium text-gray-400">Email</label>
                                <input
                                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                                    placeholder="email@exemple.com"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Données physiques — client uniquement */}
                    {!isAdmin && (
                        <>
                            <div className="border-t border-black/[0.06]" />

                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc] mb-4">
                                    Données physiques
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3 mb-4">
                                    {[
                                        { label: 'Poids', value: form.weight || '—', unit: form.weight ? 'kg' : '' },
                                        { label: 'Taille', value: form.height || '—', unit: form.height ? 'cm' : '' },
                                        { label: 'IMC', value: imc ?? '—', unit: '' },
                                    ].map(({ label, value, unit }) => (
                                        <div key={label} className="bg-[#F5F5FB] rounded-xl p-3 text-center">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9990cc] mb-1">
                                                {label}
                                            </p>
                                            <p className="text-xl font-bold text-[#1a1a2e]">
                                                {value}
                                                {unit && <span className="text-xs font-normal text-gray-400 ml-0.5">{unit}</span>}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-gray-400">Poids (kg)</label>
                                        <input
                                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                                            placeholder="ex: 75"
                                            type="number"
                                            min={30}
                                            max={250}
                                            value={form.weight}
                                            onChange={(e) => setForm({ ...form, weight: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-gray-400">Taille (cm)</label>
                                        <input
                                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                                            placeholder="ex: 175"
                                            type="number"
                                            min={100}
                                            max={250}
                                            value={form.height}
                                            onChange={(e) => setForm({ ...form, height: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-gray-400">Sexe</label>
                                        <select
                                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors appearance-none cursor-pointer"
                                            value={form.gender}
                                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                        >
                                            <option value="">Sélectionner</option>
                                            <option value="male">Homme</option>
                                            <option value="female">Femme</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-gray-400">Objectif</label>
                                        <select
                                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors appearance-none cursor-pointer"
                                            value={form.goal}
                                            onChange={(e) => setForm({ ...form, goal: e.target.value })}
                                        >
                                            <option value="">Sélectionner</option>
                                            <option value="weight_loss">Perte de poids</option>
                                            <option value="muscle_gain">Prise de masse</option>
                                            <option value="maintenance">Maintien</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="border-t border-black/[0.06]" />

                    <button
                        onClick={handleSave}
                        className="w-full bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white rounded-xl py-3 text-sm font-semibold transition-colors"
                    >
                        {saved ? '✅ Sauvegardé !' : 'Sauvegarder'}
                    </button>
                </div>
            </div>
        </div>
    );
}