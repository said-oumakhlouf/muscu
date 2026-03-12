'use client';

import { useEffect, useState } from 'react';
import { exerciseService } from '@/services/exerciseService';
import { sessionService } from '@/services/sessionService';
import { Exercise } from '@/types/Exercise';
import toast from 'react-hot-toast';

interface CreateSessionFormProps {
    token: string;
    clientId: number;
    onCreated: () => void;
}

export default function CreateSessionForm({ token, clientId, onCreated }: CreateSessionFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [name, setName] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
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
            exercises: selectedExercises,
        });
        setName('');
        setScheduledAt('');
        setSelectedExercises([]);
        setIsOpen(false);
        toast.success(`Séance "${name}" créée avec succès !`);
        onCreated();
    };

    return (
        <div className="w-full mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 border border-gray-200 bg-white rounded-xl px-4 py-3 w-full hover:bg-gray-50 transition-colors"
            >
                <span className="text-lg">{isOpen ? '✕' : '+'}</span>
                <span>{isOpen ? 'Fermer' : 'Nouvelle séance'}</span>
            </button>

            {isOpen && (
                <div className="bg-white rounded-xl p-6 shadow border border-gray-100 mt-2">
                    <input
                        className="border rounded-lg p-2 w-full text-gray-800 mb-4"
                        placeholder="Nom de la séance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="border rounded-lg p-2 w-full text-gray-800 mb-4"
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                    />

                    {selectedExercises.map((se, index) => (
                        <div key={index} className="flex gap-2 mb-3 items-center">
                            <select
                                className="border rounded-lg p-2 flex-1 text-gray-800"
                                value={se.exerciseId}
                                onChange={(e) => updateExercise(index, 'exerciseId', Number(e.target.value))}
                            >
                                <option value={0}>Choisir un exercice</option>
                                {exercises.map((ex) => (
                                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                                ))}
                            </select>
                            <input
                                className="border rounded-lg p-2 w-16 text-gray-800 text-center"
                                type="number"
                                placeholder="Séries"
                                value={se.sets}
                                onChange={(e) => updateExercise(index, 'sets', Number(e.target.value))}
                            />
                            <input
                                className="border rounded-lg p-2 w-16 text-gray-800 text-center"
                                type="number"
                                placeholder="Reps"
                                value={se.reps}
                                onChange={(e) => updateExercise(index, 'reps', Number(e.target.value))}
                            />
                            <input
                                className="border rounded-lg p-2 w-16 text-gray-800 text-center"
                                type="number"
                                placeholder="Kg"
                                value={se.weight || ''}
                                onChange={(e) => updateExercise(index, 'weight', Number(e.target.value))}
                            />
                            <button
                                onClick={() => removeExercise(index)}
                                className="text-red-500 hover:text-red-700 font-bold"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={addExercise}
                            className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-50"
                        >
                            + Exercice
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!name || selectedExercises.length === 0}
                            className="bg-black text-white rounded-lg px-4 py-2 font-bold hover:bg-zinc-800 disabled:bg-gray-300"
                        >
                            Créer la séance
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}