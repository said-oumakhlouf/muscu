import Image from "next/image";
import { Exercise } from "@/types/Exercise";
import ExerciseEditForm from "./ExerciseEditForm";
import { Triangle, Circle, Heart, HelpCircle } from "lucide-react";
import { MUSCLE_GROUPS } from "@/constants/muscleGroups";

interface ExerciseCardProps {
    exercise: Exercise;
    role: string | null;
    editingId: number | null;
    setEditingId: (id: number | null) => void;
    onUpdated: () => void;
    onDeleted: () => void;
}

type MuscleConfig =
    | { type: "png"; src: string; color: string; bg: string }
    | { type: "lucide"; icon: React.ReactNode; color: string; bg: string };

const muscleGroupConfig: Record<string, MuscleConfig> = {
    Chest: { type: "png", src: "/icons/pectoraux.png", color: "text-violet-600", bg: "bg-violet-50" },
    Back: { type: "png", src: "/icons/dos.png", color: "text-blue-600", bg: "bg-blue-50" },
    Legs: { type: "png", src: "/icons/jambe.png", color: "text-green-600", bg: "bg-green-50" },
    Arms: { type: "png", src: "/icons/bras.png", color: "text-yellow-600", bg: "bg-yellow-50" },
    Shoulders: { type: "lucide", icon: <Triangle size={32} />, color: "text-orange-500", bg: "bg-orange-50" },
    Core: { type: "lucide", icon: <Circle size={32} />, color: "text-pink-500", bg: "bg-pink-50" },
    Cardio: { type: "lucide", icon: <Heart size={32} />, color: "text-red-500", bg: "bg-red-50" },
};

function getMuscleConfig(muscleGroup: string): MuscleConfig {
    return muscleGroupConfig[muscleGroup] ?? {
        type: "lucide",
        icon: <HelpCircle size={32} />,
        color: "text-gray-400",
        bg: "bg-gray-50",
    };
}

function getMuscleLabel(muscleGroup: string) {
    return MUSCLE_GROUPS.find((g) => g.value === muscleGroup)?.label ?? muscleGroup;
}

function MuscleIcon({ config }: { config: MuscleConfig }) {
    if (config.type === "png") {
        return (
            <Image
                src={config.src}
                alt=""
                width={32}
                height={32}
                className="opacity-80"
            />
        );
    }
    return <>{config.icon}</>;
}

export default function ExerciseCard({ exercise, role, editingId, setEditingId, onUpdated, onDeleted }: ExerciseCardProps) {
    const isEditing = editingId === exercise.id;
    const muscle = getMuscleConfig(exercise.muscleGroup);

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ece9f8] flex flex-col gap-2 transition hover:shadow-md">
            {isEditing ? (
                <ExerciseEditForm
                    exercise={exercise}
                    onUpdated={onUpdated}
                    onCancel={() => setEditingId(null)}
                />
            ) : (
                <>
                    <div className="flex items-start justify-between gap-3">
                        <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${muscle.bg}`}>
                            <MuscleIcon config={muscle} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-800 leading-tight">{exercise.name}</h3>
                            <span className={`inline-block text-xs font-semibold mt-1 ${muscle.color}`}>
                                {getMuscleLabel(exercise.muscleGroup)}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{exercise.description}</p>

                    {role === 'admin' || role === 'coach' && (
                        <div className="flex gap-2 mt-2 pt-3 border-t border-[#f5f3ff]">
                            <button
                                onClick={() => setEditingId(exercise.id)}
                                className="flex-1 bg-[#f5f3ff] hover:bg-[#ede9fe] text-[#7c3aed] text-xs font-semibold py-2 rounded-lg transition"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={onDeleted}
                                className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold py-2 rounded-lg transition"
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}