import Image from 'next/image';

const transformations = [
    {
        name: 'Thomas, 28 ans',
        duration: '3 mois',
        photo: '/assets/thomas.webp',
        gain: '-12kg',
        quote: 'Je ne pensais pas pouvoir atteindre ces résultats aussi vite.',
    },
    {
        name: 'Karim, 34 ans',
        duration: '6 mois',
        photo: '/assets/karim.webp',
        gain: '+8kg muscle',
        quote: 'Mon coach a tout changé dans ma façon de m\'entraîner.',
    },
    {
        name: 'Léa, 25 ans',
        duration: '4 mois',
        photo: '/assets/léa.webp',
        gain: '-8kg',
        quote: 'Un suivi personnalisé qui fait vraiment la différence.',
    },
];

export default function HomeTransformation() {
    return (
        <section className="py-24 px-8 bg-[#1A1A2E]">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-black text-white mb-2 text-center">
                    Ils ont transformé leur corps
                </h2>
                <p className="text-white/40 text-center mb-16">
                    Des résultats réels, avec un vrai suivi personnalisé
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {transformations.map((t) => (
                        <div key={t.name} className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

                            {/* Photo */}
                            <div className="aspect-[4/3] relative">
                                <Image
                                    src={t.photo}
                                    alt={t.name}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>

                            {/* Infos */}
                            <div className="px-5 pb-5 flex flex-col gap-3">
                                <p className="text-white/60 text-sm italic">"{t.quote}"</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-bold text-sm">{t.name}</p>
                                        <p className="text-white/40 text-xs">{t.duration} de coaching</p>
                                    </div>
                                    <span className="bg-[#7C5CBF]/20 text-[#9B7FD4] font-black text-sm px-3 py-1 rounded-full">
                                        {t.gain}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}