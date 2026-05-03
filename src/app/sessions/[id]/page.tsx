"use client";
import ExerciseLibrary from "@/components/sessions/ExerciseLibrary";
import SessionExerciseList from "@/components/sessions/SessionExerciseList";
import { useAuth } from "@/context/AuthContext";
import { sessionService } from "@/services/sessionService";
import { Session } from "@/types/Session";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SessionDetailPage() {
  const { token, role, isLoading } = useAuth();
  const params = useParams();
  const router = useRouter();
  const sessionId = Number(params.id);

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    if (!token) return;
    const data = await sessionService.getOne(token, sessionId);
    setSession(data);
  };

  useEffect(() => {
    if (!token) return;
    sessionService.getOne(token, sessionId).then((data) => {
      setSession(data);
      setLoading(false);
    });
  }, [token, sessionId]);

  const handleDrop = async (
    exercise: { externalId: string; name: string },
    sets: number,
    reps: number,
    weight?: number,
  ) => {
    if (!token || !session) return;

    try {
      const data = await fetchWithAuth(
        "${process.env.NEXT_PUBLIC_API_URL}/exercises/find-or-create",
        token,
        {
          method: "POST",
          body: JSON.stringify({
            name: exercise.name,
            externalId: exercise.externalId,
            muscleGroup: exercise.muscleGroup,
          }),
        },
      );

      await sessionService.addExercise(token, sessionId, {
        exerciseId: data.id,
        sets,
        reps,
        weight,
      });
      toast.success(`${exercise.name} ajouté !`);
      refreshSession();
    } catch {
      toast.error("Erreur lors de l'ajout de l'exercice");
    }
  };

  const handleRemove = async (exerciseId: number) => {
    if (!token) return;
    await sessionService.removeExercise(token, sessionId, exerciseId);
    toast.success("Exercice retiré");
    refreshSession();
  };

  if (isLoading || loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );

  if (!session)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Séance introuvable</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-400 hover:text-gray-600 transition"
          >
            ← Retour
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{session.name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {session.exercises.length} exercice
              {session.exercises.length !== 1 ? "s" : ""}
              {session.scheduledAt &&
                ` · ${new Date(session.scheduledAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`}
            </p>
          </div>
        </div>

        {/* Deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne gauche — bibliothèque */}
          <ExerciseLibrary />

          {/* Colonne droite — exercices de la séance */}
          <SessionExerciseList
            exercises={session.exercises}
            onDrop={handleDrop}
            onRemove={handleRemove}
            isCoach={role === "coach"}
          />
        </div>
      </div>
    </div>
  );
}
