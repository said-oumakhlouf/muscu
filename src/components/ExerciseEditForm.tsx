'use client';

import { useState } from 'react';
import { Exercise } from '@/types/Exercise';
import { exerciseService } from '@/services/exerciseService';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await exerciseService.update(exercise.id, form);
        onUpdated();
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <input
                className="w-full border rounded-lg p-2 mb-2 text-gray-800"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
            />
            <input
                className="w-full border rounded-lg p-2 mb-2 text-gray-800"
                value={form.muscleGroup}
                onChange={(e) => setForm({ ...form, muscleGroup: e.target.value })}
                required
            />
            <textarea
                className="w-full border rounded-lg p-2 mb-2 text-gray-800"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-black text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-zinc-800">
                    Sauvegarder
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 text-sm font-bold hover:bg-gray-300">
                    Annuler
                </button>
            </div>
        </form>
    );
}