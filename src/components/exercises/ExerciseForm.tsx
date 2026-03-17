'use client';

import { useState } from 'react';
import { exerciseService } from '@/services/exerciseService';
import { useAuth } from '@/context/AuthContext';
import { MUSCLE_GROUPS } from '@/constants/muscleGroups';

interface Props {
    onCreated: () => void;
}

export default function ExerciseForm({ onCreated }: Props) {
    const { token } = useAuth();
    const [form, setForm] = useState({ name: '', description: '', muscleGroup: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await exerciseService.create(token!, form);
        setForm({ name: '', description: '', muscleGroup: '' });
        setLoading(false);
        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-[#ece9f8] w-full mb-8">
            <h2 className="text-sm font-semibold text-[#7c3aed] uppercase tracking-widest mb-5">
                Ajouter un exercice
            </h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</label>
                    <input
                        className="w-full bg-[#f5f3ff] border border-transparent rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] transition"
                        placeholder="ex: Développé couché"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Groupe musculaire</label>
                    <select
                        className="w-full bg-[#f5f3ff] border border-transparent rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] transition appearance-none cursor-pointer"
                        value={form.muscleGroup}
                        onChange={(e) => setForm({ ...form, muscleGroup: e.target.value })}
                        required
                    >
                        <option value="" disabled>Sélectionner...</option>
                        {MUSCLE_GROUPS.map((g) => (
                            <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-1 mt-3">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Description</label>
                <textarea
                    className="w-full bg-[#f5f3ff] border border-transparent rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] transition resize-none"
                    placeholder="Décrivez l'exercice..."
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />
            </div>

            <div className="flex justify-end mt-5">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition disabled:opacity-60"
                >
                    {loading ? 'Ajout...' : 'Ajouter'}
                </button>
            </div>
        </form>
    );
}