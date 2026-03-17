import CoachesList from '@/components/coach/CoachesList';

export default function HomeCoaches() {
    return (
        <section className="py-24 px-8 bg-[#F3EEFF]">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-black text-[#1A1A2E] mb-2 text-center">Nos coachs</h2>
                <p className="text-gray-500 text-center mb-12">Choisis le coach qui correspond à tes objectifs</p>
                <CoachesList />
            </div>
        </section>
    );
}