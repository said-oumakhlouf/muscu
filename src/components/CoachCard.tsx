import { Coach } from '@/types/Coach';

interface CoachCardProps {
    coach: Coach;
}

export default function CoachCard({ coach }: CoachCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center text-center">
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
    );
}