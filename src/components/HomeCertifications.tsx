import { BadgeCheck, Award, Shield } from 'lucide-react';

const certifications = [
    {
        icon: BadgeCheck,
        title: 'BPJEPS AF',
        subtitle: 'Diplôme d\'État niveau 4',
        desc: 'Reconnu par le Ministère des Sports, il atteste des compétences pour encadrer la musculation, le fitness et les cours collectifs.',
    },
    {
        icon: Award,
        title: 'CQP Instructeur Fitness',
        subtitle: 'Certificat de Qualification Professionnelle',
        desc: 'Délivré par les fédérations sportives, il valide les compétences techniques pour animer des séances de fitness en salle.',
    },
    {
        icon: Shield,
        title: 'Sélection rigoureuse',
        subtitle: 'Vérification des diplômes',
        desc: 'Chaque coach est vérifié par notre équipe avant d\'intégrer la plateforme. Diplômes, expérience et références sont contrôlés.',
    },
];

export default function HomeCertifications() {
    return (
        <section className="py-24 px-8 bg-[#1A1A2E]">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16">
                    <span className="bg-[#7C5CBF]/20 text-[#9B7FD4] text-sm font-bold px-4 py-1 rounded-full mb-4">
                        ✅ Qualité garantie
                    </span>
                    <h2 className="text-4xl font-black text-white mb-3">
                        Des coachs certifiés et vérifiés
                    </h2>
                    <p className="text-white/40 max-w-xl">
                        Tous nos coachs sont titulaires de diplômes d'État reconnus par le Ministère des Sports. Ton entraînement est entre de bonnes mains.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certifications.map((c) => (
                        <div
                            key={c.title}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#7C5CBF] transition justify-center items-center"
                        >
                            <div className="w-12 h-12 bg-[#7C5CBF]/20 rounded-xl flex items-center justify-center">
                                <c.icon size={24} className="text-[#9B7FD4]" />
                            </div>
                            <div>
                                <h3 className="text-white font-black text-lg">{c.title}</h3>
                                <p className="text-[#9B7FD4] text-xs font-medium mt-0.5">{c.subtitle}</p>
                            </div>
                            <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}