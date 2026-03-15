import { FormData } from "@/interfaces/register";
import { Coach } from "@/types/Coach";

interface StepCoachProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
    coaches: Coach[];
}

export default function StepCoach({ form, update, coaches }: StepCoachProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3">
                {coaches.map((coach) => {
                    const isSelected = form.coachId === String(coach.id);
                    return (
                        <div
                            key={coach.id}
                            onClick={() => update('coachId', String(coach.id))}
                            className={`rounded-xl p-4 cursor-pointer border transition-all ${isSelected
                                    ? 'border-[#6C5CE7] bg-[#f0eeff]'
                                    : 'border-black/[0.06] bg-[#F5F5FB] hover:border-[#6C5CE7]/40'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-semibold text-sm text-[#1a1a2e]">
                                    {coach.user.firstname} {coach.user.lastname}
                                </p>
                                {isSelected && (
                                    <span className="w-4 h-4 rounded-full bg-[#6C5CE7] flex items-center justify-center">
                                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                            <path d="M1 4L3 6L7 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                            {coach.specialty && (
                                <p className="text-xs text-[#6C5CE7] font-medium">{coach.specialty}</p>
                            )}
                            {coach.bio && (
                                <p className="text-xs text-gray-400 mt-1 line-clamp-2">{coach.bio}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}