'use client';

import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import { exerciseService } from "@/services/exerciseService";
import { Exercise } from "@/types/Exercise";
import { useAuth } from '@/context/AuthContext';

export default function ExercisesList() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const { role, token } = useAuth();
    const [editingId, setEditingId] = useState<number | null>(null);

    const loadExercises = async () => {
        exerciseService.getAll().then(setExercises);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <section className="w-full max-w-5xl">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Exercices</h2>
                <p className="text-sm text-gray-400 mt-1">{exercises.length} exercice{exercises.length !== 1 ? 's' : ''} disponible{exercises.length !== 1 ? 's' : ''}</p>
            </div>

            {role === 'admin' && <ExerciseForm onCreated={loadExercises} />}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        role={role}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        onUpdated={() => { setEditingId(null); loadExercises(); }}
                        onDeleted={async () => {
                            await exerciseService.delete(token || '', exercise.id);
                            loadExercises();
                        }}
                    />
                ))}
            </div>
        </section>
    );
}