'use client';

import ExerciseEditForm from '@/components/ExerciseEditForm';
import ExerciseForm from '@/components/ExerciseForm';
import { useOptionalAuth } from '@/hooks/useAuth';
import { exerciseService } from '@/services/exerciseService';
import { coachService } from '@/services/coachService';
import { Exercise } from '@/types/Exercise';
import { Coach } from '@/types/Coach';
import { useEffect, useState } from 'react';

export default function Home() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { role, token } = useOptionalAuth();

  const loadExercises = async () => {
    exerciseService.getAll().then(setExercises);
  };

  useEffect(() => {
    loadExercises();
    coachService.getAll().then(setCoaches);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">

      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Nos Coachs</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {coaches.map((coach) => (
            <div key={coach.id} className="bg-white rounded-xl p-6 shadow flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-3xl mb-4">
                💪
              </div>
              <h3 className="text-lg font-bold text-gray-800">
                {coach.user.firstname && coach.user.lastname
                  ? `${coach.user.firstname} ${coach.user.lastname}`
                  : coach.user.email}
              </h3>
              {coach.specialty && <p className="text-sm text-gray-500 mt-1">{coach.specialty}</p>}
              {coach.bio && <p className="text-gray-600 text-sm mt-2">{coach.bio}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Exercices</h2>
        {role === 'admin' && <ExerciseForm onCreated={loadExercises} />}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                  <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{exercise.muscleGroup}</p>
                  <p className="text-gray-600 mt-2">{exercise.description}</p>
                  {role === 'admin' && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setEditingId(exercise.id)}
                        className="bg-black text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-zinc-800"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={async () => {
                          await exerciseService.delete(token || '', exercise.id);
                          loadExercises();
                        }}
                        className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-red-700"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}