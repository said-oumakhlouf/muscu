'use client';

import { useState } from 'react';
import { exerciseService } from '@/services/exerciseService';

interface Props {
    onCreated: () => void;
}

export default function ExerciseForm({ onCreated }: Props) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        muscleGroup: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await exerciseService.create(form);
        setForm({ name: '', description: '', muscleGroup: '' });
        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow w-full max-w-md mb-10">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ajouter un exercice</h2>

            <input
                className="w-full border rounded-lg p-2 mb-3 text-gray-800"
                placeholder="Nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />
            <input
                className="w-full border rounded-lg p-2 mb-3 text-gray-800"
                placeholder="Groupe musculaire"
                value={form.muscleGroup}
                onChange={(e) => setForm({ ...form, muscleGroup: e.target.value })}
                required
            />
            <textarea
                className="w-full border rounded-lg p-2 mb-3 text-gray-800"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
            />
            <button
                type="submit"
                className="w-full bg-black text-white rounded-lg p-2 font-bold hover:bg-zinc-800"
            >
                Ajouter
            </button>
        </form>
    );
}