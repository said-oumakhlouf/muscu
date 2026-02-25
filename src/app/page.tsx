'use client';

import ExerciseForm from '@/components/ExerciseForm';
import ExerciseEditForm from '@/components/ExerciseEditForm';
import { exerciseService } from '@/services/exerciseService';
import { Exercise } from '@/types/Exercise';
import { useEffect, useState } from 'react';

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const loadExercises = async () => {
    exerciseService.getAll().then(setExercises);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10 dark:bg-black">
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-10">
        Muscle ton Corps
      </h1>

      <ExerciseForm onCreated={loadExercises} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full max-w-5xl">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-xl p-6 shadow">
            {editingId === exercise.id ? (
              <ExerciseEditForm
                exercise={exercise}
                onUpdated={() => { setEditingId(null); loadExercises(); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800">{exercise.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{exercise.muscleGroup}</p>
                <p className="text-gray-600 mt-2">{exercise.description}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditingId(exercise.id)}
                    className="bg-black text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-zinc-800"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={async () => {
                      await exerciseService.delete(exercise.id);
                      loadExercises();
                    }}
                    className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}