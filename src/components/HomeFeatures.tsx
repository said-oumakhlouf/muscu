import { Calendar, Dumbbell, Users } from 'lucide-react';

const features = [
    { icon: Users, title: 'Coachs certifiés', desc: "Des professionnels sélectionnés pour t'accompagner vers tes objectifs." },
    { icon: Dumbbell, title: 'Séances personnalisées', desc: 'Chaque programme est adapté à ton profil et tes objectifs.' },
    { icon: Calendar, title: 'Suivi en temps réel', desc: 'Accède à tes séances et suis ta progression à tout moment.' },
];

export default function HomeFeatures() {
    return (
        <section className="py-24 px-8 bg-white">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {features.map((f) => (
                    <div key={f.title} className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#F3EEFF]">
                        <div className="w-14 h-14 bg-[#7C5CBF] rounded-2xl flex items-center justify-center">
                            <f.icon size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1A1A2E]">{f.title}</h3>
                        <p className="text-gray-500 text-sm">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}