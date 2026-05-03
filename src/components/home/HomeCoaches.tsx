"use client";

import CoachesList from "@/components/coach/CoachesList";

export default function HomeCoaches() {
  return (
    <section className="py-24 px-8 bg-[#1A1A2E] relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C5CBF] rounded-full blur-[120px] opacity-10" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F5C518] rounded-full blur-[120px] opacity-6" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-[#F5C518] text-xs font-bold tracking-[4px] uppercase mb-4"
          >
            ⚡ CoachFik Elite
          </span>
          <h2
            className="block text-white uppercase leading-none mb-4 font-black skew-x-[-8deg] text-[clamp(48px,8vw,88px)]"
          >
            Nos <span className="text-[#F5C518]">Coachs</span>
          </h2>
          <p className="text-white/40 text-base mt-3">
            Des experts certifiés, prêts à transformer votre performance
          </p>
        </div>

        {/* Cards */}
        <CoachesList />

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/coaches"
            className="inline-flex items-center gap-2 bg-[#7C5CBF] text-white font-bold text-[15px] tracking-[1.5px] uppercase px-10 py-4 rounded-full hover:bg-[#9370D8] transition hover:-translate-y-0.5 shadow-lg shadow-[#7C5CBF]/30"
          >
            Voir tous les coachs
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <p className="text-white/25 text-xs mt-3 tracking-wide">
            +120 coachs certifiés disponibles
          </p>
        </div>
      </div>
    </section>
  );
}
