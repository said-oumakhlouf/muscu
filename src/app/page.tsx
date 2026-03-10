'use client';

import CoachesList from '@/components/CoachesList';
import Link from 'next/link';
import { Dumbbell, Users, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      {/* Section 1 - Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-32" style={{ background: 'linear-gradient(135deg, #7C5CBF 0%, #9B7FD4 100%)' }}>
        <span className="bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
          🏋️ Coaching personnalisé
        </span>
        <h1 className="text-6xl font-black mb-6 tracking-tight text-white">
          Transforme ton corps.<br />Avec ton coach.
        </h1>
        <p className="text-lg text-white/70 mb-10 max-w-xl">
          MusculApp connecte les sportifs avec des coachs professionnels pour des séances sur mesure.
        </p>
        <Link href="/register" className="bg-white text-[#7C5CBF] font-bold px-8 py-4 rounded-full hover:bg-zinc-100 transition text-lg shadow-lg">
          Commencer gratuitement
        </Link>
      </section>

      {/* Section 2 - Features */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#F3EEFF]">
            <div className="w-14 h-14 bg-[#7C5CBF] rounded-2xl flex items-center justify-center">
              <Users size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E]">Coachs certifiés</h3>
            <p className="text-gray-500 text-sm">Des professionnels sélectionnés pour t'accompagner vers tes objectifs.</p>
          </div>
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#F3EEFF]">
            <div className="w-14 h-14 bg-[#7C5CBF] rounded-2xl flex items-center justify-center">
              <Dumbbell size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E]">Séances personnalisées</h3>
            <p className="text-gray-500 text-sm">Chaque programme est adapté à ton profil et tes objectifs.</p>
          </div>
          <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#F3EEFF]">
            <div className="w-14 h-14 bg-[#7C5CBF] rounded-2xl flex items-center justify-center">
              <Calendar size={28} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E]">Suivi en temps réel</h3>
            <p className="text-gray-500 text-sm">Accède à tes séances et suis ta progression à tout moment.</p>
          </div>
        </div>
      </section>

      {/* Section 3 - Coachs */}
      <section className="py-24 px-8 bg-[#F3EEFF]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-[#1A1A2E] mb-2 text-center">Nos coachs</h2>
          <p className="text-gray-500 text-center mb-12">Choisis le coach qui correspond à tes objectifs</p>
          <CoachesList />
        </div>
      </section>

      {/* Section 4 - CTA Final */}
      <section className="py-24 px-8 text-center" style={{ background: 'linear-gradient(135deg, #7C5CBF 0%, #9B7FD4 100%)' }}>
        <h2 className="text-4xl font-black mb-4 text-white">Prêt à commencer ?</h2>
        <p className="text-white/70 mb-8">Rejoins MusculApp et commence ton programme dès aujourd'hui.</p>
        <Link href="/register" className="bg-white text-[#7C5CBF] font-bold px-8 py-4 rounded-full hover:bg-zinc-100 transition text-lg shadow-lg">
          S'inscrire gratuitement
        </Link>
      </section>

    </div>
  );
}