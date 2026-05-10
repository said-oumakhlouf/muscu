"use client";

import CoachCard from "@/components/coach/CoachCard";
import { coachService } from "@/services/coachService";
import { Coach } from "@/types/Coach";
import { ArrowLeft, Users, Zap } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function getRating(id: number): number {
  return 78 + ((id * 7 + 13) % 20);
}

function getTier(rating: number) {
  if (rating >= 95)
    return { label: "Elite", color: "text-[#B44FE8]", bg: "bg-[#B44FE8]/10" };
  if (rating >= 90)
    return {
      label: "Platinum",
      color: "text-[#C0C0D8]",
      bg: "bg-[#C0C0D8]/10",
    };
  if (rating >= 85)
    return { label: "Gold", color: "text-[#FFD700]", bg: "bg-[#FFD700]/10" };
  return { label: "Rising", color: "text-[#26A69A]", bg: "bg-[#26A69A]/10" };
}

function getStats(rating: number, specialty?: string) {
  const vary = (offset: number) => Math.min(99, Math.max(70, rating + offset));
  const map: Record<string, { labels: string[]; offsets: number[] }> = {
    Muscu: {
      labels: ["Force", "Nutrition", "Suivi", "Cardio", "Mental", "Récup"],
      offsets: [5, -3, 2, -4, 1, -2],
    },
    Running: {
      labels: ["Endurance", "Vitesse", "Suivi", "Nutrition", "Mental", "Récup"],
      offsets: [6, 3, 2, -2, 4, -1],
    },
    Yoga: {
      labels: ["Flexib.", "Mental", "Suivi", "Récup", "Médita.", "Cardio"],
      offsets: [7, 5, 1, 4, 6, -5],
    },
    Nutrition: {
      labels: ["Nutrition", "Masse", "Suivi", "Cardio", "Mental", "Récup"],
      offsets: [9, -3, 2, -5, 1, 4],
    },
    Fitness: {
      labels: ["Cardio", "Force", "Suivi", "Nutrition", "Mental", "Récup"],
      offsets: [4, 2, 3, -1, 2, -2],
    },
  };
  const key = specialty && map[specialty] ? specialty : "Fitness";
  const { labels, offsets } = map[key];
  return labels.map((label, i) => ({ label, value: vary(offsets[i]) }));
}

export default function CoachProfilePage() {
  const { id } = useParams();
  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    coachService
      .getOne(Number(id))
      .then(setCoach)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1A1A2E] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7C5CBF] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (!coach) {
    return (
      <main className="min-h-screen bg-[#1A1A2E] flex flex-col items-center justify-center gap-4">
        <p className="text-white/40 text-lg">Coach introuvable</p>
        <Link
          href="/coaches"
          className="text-[#7C5CBF] text-sm hover:underline"
        >
          ← Retour aux coachs
        </Link>
      </main>
    );
  }

  const fullName =
    coach.user.firstname && coach.user.lastname
      ? `${coach.user.firstname} ${coach.user.lastname}`
      : coach.user.email.split("@")[0];

  const rating = getRating(coach.id);
  const tier = getTier(rating);
  const stats = getStats(rating, coach.specialty);
  const clientCount = (coach as any).clients?.length ?? 0;

  return (
    <main className="min-h-screen bg-[#1A1A2E]">
      {/* Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#7C5CBF] rounded-full blur-[150px] opacity-8" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/coaches"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition mb-10"
        >
          <ArrowLeft size={16} />
          Retour aux coachs
        </Link>

        {/* Hero */}
        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start mb-16">
          <div className="flex-shrink-0">
            <CoachCard coach={coach} featured index={0} />
          </div>

          {/* Infos principales */}
          <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
            {/* Tier badge */}
            <span
              className={`inline-block text-xs font-bold tracking-[3px] uppercase px-3 py-1 rounded-full w-fit mx-auto lg:mx-0 ${tier.color} ${tier.bg}`}
            >
              {tier.label}
            </span>

            {/* Nom */}
            <h1 className="text-white font-black uppercase text-[clamp(36px,6vw,64px)] leading-none skew-x-[-4deg] inline-block">
              {fullName}
            </h1>

            {/* Spécialité + prix */}
            <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
              {coach.specialty && (
                <span className="flex items-center gap-1.5 text-white/60 text-sm font-medium">
                  <Zap size={14} className="text-[#7C5CBF]" />
                  {coach.specialty}
                </span>
              )}
              {coach.hourlyRate && (
                <span className="text-[#F5C518] font-black text-xl">
                  {coach.hourlyRate}€{" "}
                  <span className="text-sm font-medium text-white/40">
                    /séance
                  </span>
                </span>
              )}
              {clientCount > 0 && (
                <span className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Users size={14} />
                  {clientCount} client{clientCount > 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Bio */}
            {coach.bio && (
              <p className="text-white/50 text-base leading-relaxed max-w-lg">
                {coach.bio}
              </p>
            )}

            {/* CTA */}
            <div className="flex gap-3 justify-center lg:justify-start flex-wrap mt-2">
              <button className="bg-[#7C5CBF] text-white font-bold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-[#9370D8] transition hover:-translate-y-0.5 shadow-lg shadow-[#7C5CBF]/30">
                Réserver une séance
              </button>
              <button className="bg-white/5 border border-white/10 text-white/70 font-bold text-sm tracking-wide uppercase px-8 py-3.5 rounded-full hover:bg-white/10 transition">
                Contacter
              </button>
            </div>
          </div>
        </div>

        {/* Stats détaillées */}
        <div className="border border-white/5 rounded-2xl p-8 bg-white/[0.02]">
          <h2 className="text-white font-black uppercase text-2xl mb-8 skew-x-[-4deg] inline-block">
            Mes <span className="text-[#F5C518]">Stats</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 text-xs font-bold uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="text-white font-black text-lg">{value}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7C5CBF] rounded-full transition-all duration-700"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
