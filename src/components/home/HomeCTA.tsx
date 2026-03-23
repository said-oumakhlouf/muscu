import Link from 'next/link';

export default function HomeCTA() {
    return (
        <section className="py-24 px-8 text-center" style={{ background: 'linear-gradient(135deg, #7C5CBF 0%, #9B7FD4 100%)' }}>
            <h2
                className="text-5xl font-black mb-4 text-white uppercase"
                style={{ fontFamily: 'var(--font-barlow)', transform: 'skewX(-4deg)' }}
            >
                Prêt à passer au niveau supérieur ?
            </h2>
            <p className="text-white/70 mb-12 text-lg max-w-xl mx-auto">
                Que tu cherches un coach ou que tu en sois un, ta place est ici.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/register"
                    className="bg-white text-[#7C5CBF] font-bold px-8 py-4 rounded-full hover:bg-zinc-100 transition text-lg shadow-lg"
                >
                    Trouver mon coach
                </Link>
                <Link
                    href="/coaches/join"
                    className="bg-white/10 border border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 transition text-lg"
                >
                    Devenir coach
                </Link>
            </div>
        </section>
    );
}