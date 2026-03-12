'use client';

import { MUSCLE_GROUPS } from '@/constants/muscleGroups';
import { exerciseService } from '@/services/exerciseService';
import { Exercise } from '@/types/Exercise';
import { useState } from 'react';

interface Props {
    exercise: Exercise;
    onUpdated: () => void;
    onCancel: () => void;
}

export default function ExerciseEditForm({ exercise, onUpdated, onCancel }: Props) {
    const [form, setForm] = useState({
        name: exercise.name,
        description: exercise.description,
        muscleGroup: exercise.muscleGroup,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await exerciseService.update(exercise.id, form);
        setLoading(false);
        onUpdated();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</label>
                <input
                    className="w-full bg-[#f5f3ff] border border-transparent rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] transition"
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
            <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Description</label>
                <textarea
                    className="w-full bg-[#f5f3ff] border border-transparent rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 focus:border-[#7c3aed] transition resize-none"
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />
            </div>
            <div className="flex gap-2 mt-1">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold px-4 py-2 rounded-lg transition disabled:opacity-60"
                >
                    {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-[#f5f3ff] text-gray-600 hover:bg-[#ede9fe] text-xs font-semibold px-4 py-2 rounded-lg transition"
                >
                    Annuler
                </button>
            </div>
        </form>
    );
}