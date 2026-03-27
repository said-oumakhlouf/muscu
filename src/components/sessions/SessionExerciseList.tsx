// src/components/sessions/SessionExerciseList.tsx
'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface SessionExercise {
    id: number;
    exerciseId: number;
    exercise: { id: number; name: string; muscleGroup: string };
    sets: number;
    reps: number;
    weight?: number;
}

interface Props {
    exercises: SessionExercise[];
    onDrop: (exercise: { externalId: string; name: string }, sets: number, reps: number, weight?: number) => void;
    onRemove: (exerciseId: number) => void;
    isCoach: boolean;
}

export default function SessionExerciseList({ exercises, onDrop, onRemove, isCoach }: Props) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [pendingExercise, setPendingExercise] = useState<{ externalId: string; name: string } | null>(null);
    const [sets, setSets] = useState(3);
    const [reps, setReps] = useState(10);
    const [weight, setWeight] = useState<number | ''>('');

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => setIsDragOver(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const data = e.dataTransfer.getData('exercise');
        if (!data) return;
        const exercise = JSON.parse(data);
        setPendingExercise(exercise);
    };

    const handleConfirm = () => {
        if (!pendingExercise) return;
        onDrop(pendingExercise, sets, reps, weight !== '' ? weight : undefined);
        setPendingExercise(null);
        setSets(3);
        setReps(10);
        setWeight('');
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
                Exercices de la séance
            </h2>

            {/* Zone de drop */}
            {isCoach && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-4 mb-4 text-center transition ${isDragOver
                            ? 'border-[#7C5CBF] bg-[#F3EEFF] text-[#7C5CBF]'
                            : 'border-gray-200 text-gray-400'
                        }`}
                >
                    <p className="text-sm font-medium">
                        {isDragOver ? 'Relâche pour ajouter' : '⠿ Glisse un exercice ici'}
                    </p>
                </div>
            )}

            {/* Popup sets/reps après drop */}
            {pendingExercise && (
                <div className="bg-[#F3EEFF] border border-[#7C5CBF]/20 rounded-xl p-4 mb-4">
                    <p className="text-sm font-semibold text-[#7C5CBF] mb-3">
                        Configurer — {pendingExercise.name}
                    </p>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Séries</label>
                            <input
                                type="number"
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-[#7C5CBF]"
                                value={sets}
                                onChange={e => setSets(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Reps</label>
                            <input
                                type="number"
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-[#7C5CBF]"
                                value={reps}
                                onChange={e => setReps(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-500">Kg (opt.)</label>
                            <input
                                type="number"
                                className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-center outline-none focus:border-[#7C5CBF]"
                                value={weight}
                                onChange={e => setWeight(e.target.value !== '' ? Number(e.target.value) : '')}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleConfirm}
                            className="flex-1 bg-[#7C5CBF] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#6B4DAF] transition"
                        >
                            Ajouter
                        </button>
                        <button
                            onClick={() => setPendingExercise(null)}
                            className="px-4 text-sm text-gray-400 hover:text-gray-600 transition"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Liste exercices */}
            {exercises.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <p className="text-3xl mb-2">🏋️</p>
                    <p className="text-sm">Aucun exercice dans cette séance</p>
                    {isCoach && <p className="text-xs mt-1">Glisse des exercices depuis la bibliothèque</p>}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {exercises.map(se => (
                        <div key={se.id} className="flex items-center gap-4 px-4 py-3 bg-zinc-50 rounded-xl border border-gray-100">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700">{se.exercise.name}</p>
                                <p className="text-xs text-gray-400">
                                    {se.sets} séries · {se.reps} reps
                                    {se.weight ? ` · ${se.weight} kg` : ''}
                                </p>
                            </div>
                            {isCoach && (
                                <button
                                    onClick={() => onRemove(se.exerciseId)}
                                    className="text-gray-300 hover:text-red-400 transition"
                                >
                                    <Trash2 size={15} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}