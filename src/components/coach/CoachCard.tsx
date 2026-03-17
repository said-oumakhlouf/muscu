import Image from 'next/image';
import { BadgeCheck, Dumbbell } from 'lucide-react';
import { Coach } from '@/types/Coach';

interface CoachCardProps {
    coach: Coach;
}

export default function CoachCard({ coach }: CoachCardProps) {
    const fullName = coach.user.firstname && coach.user.lastname
        ? `${coach.user.firstname} ${coach.user.lastname}`
        : coach.user.email;

    const initials = coach.user.firstname && coach.user.lastname
        ? `${coach.user.firstname[0]}${coach.user.lastname[0]}`
        : '?';

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-[#E8DEFF] hover:shadow-lg hover:border-[#7C5CBF] transition group">

            {/* Photo */}
            <div className="relative h-48 bg-[#F3EEFF]">
                {coach.photoUrl ? (
                    <Image
                        src={coach.photoUrl}
                        alt={fullName}
                        fill
                        className="object-cover object-top"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-black text-[#7C5CBF] opacity-30">
                            {initials}
                        </span>
                    </div>
                )}

                {/* Badge certifié */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#7C5CBF] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <BadgeCheck size={13} className="text-[#7C5CBF]" />
                    Certifié
                </div>
            </div>

            {/* Infos */}
            <div className="p-5 flex flex-col gap-3">

                <div>
                    <h3 className="text-lg font-bold text-[#1A1A2E]">{fullName}</h3>
                    {coach.specialty && (
                        <div className="flex items-center gap-1 mt-1">
                            <Dumbbell size={13} className="text-[#7C5CBF]" />
                            <span className="text-sm text-[#7C5CBF] font-medium">{coach.specialty}</span>
                        </div>
                    )}
                </div>

                {coach.bio && (
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{coach.bio}</p>
                )}

                {/* Footer card */}
                <div className="flex items-center justify-between pt-2 border-t border-[#F3EEFF]">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">★</span>
                        ))}
                        <span className="text-xs text-gray-400 ml-1">5.0</span>
                    </div>
                    <span className="text-xs text-[#7C5CBF] font-bold bg-[#F3EEFF] px-3 py-1 rounded-full group-hover:bg-[#7C5CBF] group-hover:text-white transition">
                        Voir le profil →
                    </span>
                </div>

            </div>
        </div>
    );
}