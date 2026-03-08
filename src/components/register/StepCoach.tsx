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
            <p className="text-gray-500 text-sm mb-2">Choississez votre coach</p>
            <div className="grid grid-cols-1 gap-3">
                {coaches.map((coach) => (
                    <div
                        key={coach.id}
                        onClick={() => update('coachId', String(coach.id))}
                        className={`border rounded-xl p-4 cursor-pointer transition ${form.coachId === String(coach.id) ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <p className="font-bold text-gray-800">{coach.user.firstname} {coach.user.lastname}</p>
                        {coach.specialty && <p className="text-sm text-gray-500">{coach.specialty}</p>}
                        {coach.bio && <p className="text-sm text-gray-600 mt-1">{coach.bio}</p>}
                    </div>
                ))}
            </div>
        </div>
    )
}
