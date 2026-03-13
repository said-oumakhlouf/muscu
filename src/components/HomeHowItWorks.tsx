import { UserPlus, Search, Dumbbell } from 'lucide-react';

const steps = [
    {
        number: '01',
        icon: UserPlus,
        title: 'Crée ton compte',
        desc: 'Inscris-toi en quelques minutes et renseigne ton profil physique et tes objectifs.',
    },
    {
        number: '02',
        icon: Search,
        title: 'Choisis ton coach',
        desc: 'Parcours notre sélection de coachs certifiés et trouve celui qui correspond à tes besoins.',
    },
    {
        number: '03',
        icon: Dumbbell,
        title: 'Commence à t\'entraîner',
        desc: 'Reçois ton programme personnalisé et suis ta progression en temps réel.',
    },
];

export default function HomeHowItWorks() {
    return (
        <section className="py-24 px-8 bg-white">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-black text-[#1A1A2E] mb-2 text-center">
                    Comment ça marche ?
                </h2>
                <p className="text-gray-400 text-center mb-16">
                    3 étapes pour commencer ton transformation
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Ligne de connexion entre les étapes */}
                    <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-[#E8DEFF]" />

                    {steps.map((s, i) => (
                        <div key={s.number} className="flex flex-col items-center text-center gap-4 relative">

                            {/* Numéro + icône */}
                            <div className="relative">
                                <div className="w-20 h-20 rounded-2xl bg-[#F3EEFF] flex items-center justify-center">
                                    <s.icon size={32} className="text-[#7C5CBF]" />
                                </div>
                                <span className="absolute -top-3 -right-3 w-7 h-7 bg-[#7C5CBF] text-white text-xs font-black rounded-full flex items-center justify-center">
                                    {i + 1}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-[#1A1A2E]">{s.title}</h3>
                            <p className="text-gray-400 text-sm">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}