'use client';

import { exerciseService } from '@/services/exerciseService';
import { sessionService } from '@/services/sessionService';
import { Exercise } from '@/types/Exercise';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface CreateSessionFormProps {
    token: string;
    clientId: number;
    onCreated: () => void;
}

type Intensity = 'low' | 'medium' | 'high';

const INTENSITY_LABELS: Record<Intensity, string> = {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée',
};

export default function CreateSessionForm({ token, clientId, onCreated }: CreateSessionFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [name, setName] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const [calories, setCalories] = useState<number | ''>('');
    const [intensity, setIntensity] = useState<Intensity | ''>('');
    const [selectedExercises, setSelectedExercises] = useState<{
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
    }[]>([]);

    useEffect(() => {
        exerciseService.getAll().then(setExercises);
    }, []);

    const addExercise = () => {
        setSelectedExercises([...selectedExercises, { exerciseId: 0, sets: 3, reps: 10 }]);
    };

    const updateExercise = (index: number, field: string, value: number) => {
        const updated = [...selectedExercises];
        updated[index] = { ...updated[index], [field]: value };
        setSelectedExercises(updated);
    };

    const removeExercise = (index: number) => {
        setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!name || selectedExercises.length === 0) return;
        await sessionService.create(token, {
            name,
            userId: clientId,
            scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
            calories: calories !== '' ? calories : undefined,
            intensity: intensity !== '' ? intensity : undefined,
            exercises: selectedExercises,
        });
        setName('');
        setScheduledAt('');
        setCalories('');
        setIntensity('');
        setSelectedExercises([]);
        setIsOpen(false);
        toast.success(`Séance "${name}" créée avec succès !`);
        onCreated();
    };

    return (
        <div className="w-full">
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-sm font-medium w-full px-4 py-3 rounded-xl border transition-colors ${isOpen
                    ? 'border-[#6C5CE7]/20 text-[#6C5CE7] bg-[#f0eeff]'
                    : 'border-black/[0.06] text-gray-500 bg-[#F5F5FB] hover:bg-[#eeeeff] hover:text-[#6C5CE7]'
                    }`}
            >
                <span className="text-base">{isOpen ? '✕' : '+'}</span>
                <span>{isOpen ? 'Fermer' : 'Nouvelle séance'}</span>
            </button>

            {isOpen && (
                <div className="mt-4 flex flex-col gap-4">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc]">
                        Nouvelle séance
                    </p>

                    {/* Nom + date */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400">Nom de la séance</label>
                            <input
                                className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300 w-full"
                                placeholder="ex: Cardio, Jambes..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400">Date prévue</label>
                            <input
                                className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors w-full"
                                type="datetime-local"
                                value={scheduledAt}
                                onChange={(e) => setScheduledAt(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Calories + Intensité */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400">Calories estimées</label>
                            <input
                                className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300 w-full"
                                type="number"
                                placeholder="ex: 300"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value !== '' ? Number(e.target.value) : '')}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-400">Intensité</label>
                            <select
                                className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors appearance-none cursor-pointer w-full"
                                value={intensity}
                                onChange={(e) => setIntensity(e.target.value as Intensity | '')}
                            >
                                <option value="">— Choisir</option>
                                {(Object.entries(INTENSITY_LABELS) as [Intensity, string][]).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Exercices */}
                    {selectedExercises.length > 0 && (
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-cols-[1fr_64px_64px_64px_24px] gap-2 px-1">
                                {['Exercice', 'Séries', 'Reps', 'Kg', ''].map((h) => (
                                    <p key={h} className="text-[10px] font-semibold uppercase tracking-wider text-[#9990cc]">{h}</p>
                                ))}
                            </div>
                            {selectedExercises.map((se, index) => (
                                <div key={index} className="grid grid-cols-[1fr_64px_64px_64px_24px] gap-2 items-center">
                                    <select
                                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] appearance-none cursor-pointer"
                                        value={se.exerciseId}
                                        onChange={(e) => updateExercise(index, 'exerciseId', Number(e.target.value))}
                                    >
                                        <option value={0}>Choisir</option>
                                        {exercises.map((ex) => (
                                            <option key={ex.id} value={ex.id}>{ex.name}</option>
                                        ))}
                                    </select>
                                    {['sets', 'reps', 'weight'].map((field) => (
                                        <input
                                            key={field}
                                            className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl p-2 text-sm text-[#1a1a2e] text-center outline-none focus:border-[#6C5CE7] transition-colors"
                                            type="number"
                                            value={field === 'weight' ? se.weight || '' : (se as any)[field]}
                                            onChange={(e) => updateExercise(index, field, Number(e.target.value))}
                                        />
                                    ))}
                                    <button
                                        onClick={() => removeExercise(index)}
                                        className="text-red-400 hover:text-red-600 text-sm font-bold transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            onClick={addExercise}
                            className="text-sm px-4 py-2 rounded-xl border border-[#6C5CE7]/20 text-[#6C5CE7] hover:bg-[#f0eeff] transition-colors"
                        >
                            + Exercice
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!name || selectedExercises.length === 0}
                            className="text-sm px-4 py-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            Créer la séance
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}