import { MUSCLE_GROUPS } from '@/constants/muscleGroups';

const MUSCLE_LABELS: Record<string, string> = Object.fromEntries(
    MUSCLE_GROUPS.map(({ value, label }) => [value, label])
);

interface MuscleGroupsCardProps {
    muscleCount: Record<string, number>;  // { chest: 5, legs: 3, ... }
    totalExercises: number;               // total pour calculer le %
}

/**
 * Affiche les groupes musculaires les plus travaillés
 * sous forme de barres de progression avec pourcentage.
 * Reçoit les données déjà calculées depuis le parent.
 */
export default function MuscleGroupsCard({ muscleCount, totalExercises }: MuscleGroupsCardProps) {
    const topMuscles = Object.entries(muscleCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    return (
        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm">
            <h3 className="font-bold text-[#1A1A2E] text-sm mb-4">Groupes musculaires</h3>
            {topMuscles.length === 0 ? (
                <div className="flex flex-col items-center py-6 gap-2">
                    <span className="text-3xl">💪</span>
                    <p className="text-[#9CA3AF] text-sm text-center">Les muscles travaillés<br />apparaîtront ici</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {topMuscles.map(([mg, count]) => {
                        const pct = Math.round((count / topMuscles[0][1]) * 100);
                        const pctOfTotal = Math.round((count / totalExercises) * 100);
                        return (
                            <div key={mg}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-semibold text-[#1A1A2E]">
                                        {MUSCLE_LABELS[mg] ?? mg}
                                    </span>
                                    <span className="text-xs text-[#9CA3AF]">{pctOfTotal}%</span>
                                </div>
                                <div className="bg-[#F3EEFF] rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-full bg-[#7C3AED] rounded-full transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}