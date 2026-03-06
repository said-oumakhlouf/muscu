import { Exercise } from "@/types/Exercise";
import ExerciseEditForm from "./ExerciseEditForm";

interface ExerciseCardProps {
    exercise: Exercise;
    role: string | null;
    editingId: number | null;
    setEditingId: (id: number | null) => void;
    onUpdated: () => void;
    onDeleted: () => void;
}

export default function ExerciseCard({ exercise, role, editingId, setEditingId, onUpdated, onDeleted }: ExerciseCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow">
            {editingId === exercise.id ? (
                <ExerciseEditForm
                    exercise={exercise}
                    onUpdated={onUpdated}
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
                                onClick={onDeleted}
                                className="bg-red-500 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-red-700"
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}