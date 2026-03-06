'use client';

import { useEffect, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import ExerciseForm from "./ExerciseForm";
import { exerciseService } from "@/services/exerciseService";
import { Exercise } from "@/types/Exercise";
import { useOptionalAuth } from "@/hooks/useAuth";

export default function ExercisesList() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const { role, token } = useOptionalAuth();
    const [editingId, setEditingId] = useState<number | null>(null);

    const loadExercises = async () => {
        exerciseService.getAll().then(setExercises);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <section className="w-full max-w-5xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Exercices</h2>
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