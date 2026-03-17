import Link from 'next/link';

export default function HomeCTA() {
    return (
        <section className="py-24 px-8 text-center" style={{ background: 'linear-gradient(135deg, #7C5CBF 0%, #9B7FD4 100%)' }}>
            <h2 className="text-4xl font-black mb-4 text-white">Prêt à commencer ?</h2>
            <p className="text-white/70 mb-8">Rejoins MusculApp et commence ton programme dès aujourd'hui.</p>
            <Link href="/register" className="bg-white text-[#7C5CBF] font-bold px-8 py-4 rounded-full hover:bg-zinc-100 transition text-lg shadow-lg">
                S'inscrire gratuitement
            </Link>
        </section>
    )
}


