'use client';

import { useState } from 'react';
import { Coach } from '@/types/Coach';
import { FormData } from '@/interfaces/register';


interface RegisterStepperProps {
    coaches: Coach[];
    onSubmit: (data: FormData) => void;
    error: string;
}

export default function RegisterStepper({ coaches, onSubmit, error }: RegisterStepperProps) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        gender: '',
        weight: '',
        height: '',
        goal: '',
        coachId: '',
    });

    const update = (field: keyof FormData, value: string) => {
        setForm({ ...form, [field]: value });
    };

    return (
        <div className="bg-white rounded-xl p-8 shadow w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Inscription</h1>

            {/* Barre de progression */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {s}
                        </div>
                        {s < 4 && <div className={`h-1 flex-1 rounded ${step > s ? 'bg-black' : 'bg-gray-200'}`} />}
                    </div>
                ))}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {step === 1 && (
                <div className="flex flex-col gap-3">
                    <p className="text-gray-500 text-sm mb-2">Créez votre compte</p>
                    <input className="border rounded-lg p-2 text-gray-800" type="email" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                    <input className="border rounded-lg p-2 text-gray-800" type="password" placeholder="Mot de passe" value={form.password} onChange={(e) => update('password', e.target.value)} />
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col gap-3">
                    <p className="text-gray-500 text-sm mb-2">Informations personnelles</p>
                    <input className="border rounded-lg p-2 text-gray-800" placeholder="Prénom" value={form.firstname} onChange={(e) => update('firstname', e.target.value)} />
                    <input className="border rounded-lg p-2 text-gray-800" placeholder="Nom" value={form.lastname} onChange={(e) => update('lastname', e.target.value)} />
                    <select className="border rounded-lg p-2 text-gray-800" value={form.gender} onChange={(e) => update('gender', e.target.value)}>
                        <option value="">Sexe</option>
                        <option value="male">Homme</option>
                        <option value="female">Femme</option>
                    </select>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col gap-3">
                    <p className="text-gray-500 text-sm mb-2">Votre profil physique</p>
                    <input className="border rounded-lg p-2 text-gray-800" type="number" placeholder="Poids (kg)" value={form.weight} onChange={(e) => update('weight', e.target.value)} />
                    <input className="border rounded-lg p-2 text-gray-800" type="number" placeholder="Taille (cm)" value={form.height} onChange={(e) => update('height', e.target.value)} />
                    <select className="border rounded-lg p-2 text-gray-800" value={form.goal} onChange={(e) => update('goal', e.target.value)}>
                        <option value="">Objectif</option>
                        <option value="weight_loss">Perte de poids</option>
                        <option value="muscle_gain">Prise de masse</option>
                        <option value="maintenance">Maintien</option>
                    </select>
                </div>
            )}

            {step === 4 && (
                <div className="flex flex-col gap-3">
                    <p className="text-gray-500 text-sm mb-2">Choisissez votre coach</p>
                    <div className="grid grid-cols-1 gap-3">
                        {coaches.map((coach) => (
                            <div
                                key={coach.id}
                                onClick={() => update('coachId', String(coach.id))}
                                className={`border rounded-xl p-4 cursor-pointer transition ${form.coachId === String(coach.id) ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                            >
                                <p className="font-bold text-gray-800">{coach.user.firstname} {coach.user.lastname}</p>
                                {coach.specialty && <p className="text-sm text-gray-500">{coach.specialty}</p>}
                                {coach.bio && <p className="text-sm text-gray-600 mt-1">{coach.bio}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-3 mt-6">
                {step > 1 && (
                    <button onClick={() => setStep(step - 1)} className="flex-1 border border-gray-300 text-gray-700 rounded-lg p-2 font-bold hover:bg-gray-50">
                        Retour
                    </button>
                )}
                {step < 4 ? (
                    <button onClick={() => setStep(step + 1)} className="flex-1 bg-black text-white rounded-lg p-2 font-bold hover:bg-zinc-800">
                        Suivant
                    </button>
                ) : (
                    <button onClick={() => onSubmit(form)} className="flex-1 bg-black text-white rounded-lg p-2 font-bold hover:bg-zinc-800">
                        S'inscrire
                    </button>
                )}
            </div>
        </div>
    );
}