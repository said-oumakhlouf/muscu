"use client";

import { Coach } from "@/types/Coach";
import { motion } from "framer-motion";
import Link from "next/link";

interface CoachCardProps {
  coach: Coach;
  featured?: boolean;
  index?: number;
}

type Tier = "gold" | "platinum" | "elite" | "teal";

function getRating(id: number): number {
  return 78 + ((id * 7 + 13) % 20);
}

function getTier(rating: number): Tier {
  if (rating >= 95) return "elite";
  if (rating >= 90) return "platinum";
  if (rating >= 85) return "gold";
  return "teal";
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

const tierClasses: Record<
  Tier,
  {
    card: string;
    rating: string;
    position: string;
    name: string;
    stat: string;
    label: string;
    divider: string;
  }
> = {
  gold: {
    card: "[background:linear-gradient(160deg,#B8860B_0%,#FFD700_30%,#DAA520_55%,#8B6914_80%,#C8960C_100%)] shadow-[0_0_0_1px_rgba(255,215,0,0.4),0_20px_60px_rgba(255,180,0,0.3),0_4px_20px_rgba(0,0,0,0.6)]",
    rating: "text-black/75",
    position: "text-black/50",
    name: "text-black/80",
    stat: "text-black/80",
    label: "text-black/50",
    divider: "bg-black/20",
  },
  platinum: {
    card: "[background:linear-gradient(160deg,#6B6B8A_0%,#C0C0D8_30%,#9898B8_55%,#5A5A78_80%,#8888A8_100%)] shadow-[0_0_0_1px_rgba(192,192,220,0.4),0_20px_60px_rgba(150,150,200,0.25),0_4px_20px_rgba(0,0,0,0.6)]",
    rating: "text-white/85",
    position: "text-white/50",
    name: "text-white/90",
    stat: "text-white/90",
    label: "text-white/50",
    divider: "bg-white/20",
  },
  elite: {
    card: "[background:linear-gradient(160deg,#1a0533_0%,#7C5CBF_25%,#B44FE8_50%,#7C5CBF_75%,#1a0533_100%)] shadow-[0_0_0_1px_rgba(180,79,232,0.5),0_20px_60px_rgba(124,92,191,0.4),0_4px_20px_rgba(0,0,0,0.6)]",
    rating: "text-white/85",
    position: "text-white/50",
    name: "text-white/90",
    stat: "text-white/90",
    label: "text-white/50",
    divider: "bg-white/20",
  },
  teal: {
    card: "[background:linear-gradient(160deg,#003333_0%,#00897B_30%,#26A69A_55%,#00695C_80%,#004D40_100%)] shadow-[0_0_0_1px_rgba(0,229,200,0.4),0_20px_60px_rgba(0,137,123,0.3),0_4px_20px_rgba(0,0,0,0.6)]",
    rating: "text-black/75",
    position: "text-black/50",
    name: "text-black/80",
    stat: "text-black/80",
    label: "text-black/50",
    divider: "bg-black/20",
  },
};

export default function CoachCard({
  coach,
  featured = false,
  index = 0,
}: CoachCardProps) {
  const fullName =
    coach.user.firstname && coach.user.lastname
      ? `${coach.user.firstname} ${coach.user.lastname[0]}.`
      : coach.user.email.split("@")[0];

  const rating = getRating(coach.id);
  const tier = getTier(rating);
  const stats = getStats(rating, coach.specialty);
  const tc = tierClasses[tier];

  return (
    <Link href={`/coaches/${coach.id}`}>
      <motion.div
        initial={{
          opacity: 0,
          x: index % 2 === 0 ? -300 : 300,
          y: -200,
          rotate: index % 2 === 0 ? -25 : 25,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          delay: (index ?? 0) * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`relative cursor-pointer group flex-shrink-0 ${featured ? "w-[280px] h-[420px]" : "w-[220px] h-[340px]"}`}
      >
        {/* Badge Top Coach */}
        {featured && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#F5C518] text-[#1A1A2E] text-[10px] font-black tracking-[2px] uppercase px-3 py-1 rounded-full whitespace-nowrap shadow-[0_4px_12px_rgba(245,197,24,0.4)]">
            ⭐ Top Coach
          </div>
        )}

        {/* Card */}
        <div
          className={`
                w-full h-full rounded-2xl overflow-hidden relative
                transition-all duration-200
                group-hover:-translate-y-3 group-hover:scale-[1.03]
                ${tc.card}
            `}
        >
          {/* Shine overlay */}
          <div className="absolute inset-0 z-[1] pointer-events-none rounded-2xl bg-[linear-gradient(135deg,rgba(255,255,255,0.18)_0%,transparent_50%,rgba(255,255,255,0.06)_100%)]" />

          {/* Content */}
          <div
            className={`relative z-[3] h-full flex flex-col ${featured ? "p-[14px_16px_16px]" : "p-[12px_14px_14px]"}`}
          >
            {/* Rating + spécialité */}
            <div className="flex flex-col gap-0.5 mb-1.5">
              <span
                className={`font-black leading-none ${featured ? "text-[52px]" : "text-[40px]"} ${tc.rating}`}
              >
                {rating}
              </span>
              <span
                className={`text-[11px] font-bold tracking-wide uppercase ${tc.position}`}
              >
                {coach.specialty || "Fitness"}
              </span>
            </div>

            {/* Photo / silhouette */}
            <div className="flex-1 flex items-center justify-center overflow-hidden -mx-3.5">
              {coach.photoUrl ? (
                <div className={`rounded-full overflow-hidden border-2 border-white/20 shrink-0 ${featured ? "w-[160px] h-[160px]" : "w-[120px] h-[120px]"}`}>
                  <img
                    src={coach.photoUrl}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <svg
                  viewBox="0 0 120 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`opacity-35 ${featured ? "w-[140px] h-[170px]" : "w-[110px] h-[130px]"}`}
                >
                  <ellipse cx="60" cy="28" rx="22" ry="22" fill="white" />
                  <path d="M20 150 Q22 95 60 90 Q98 95 100 150Z" fill="white" />
                  <path d="M28 100 Q10 120 8 145" stroke="white" strokeWidth="14" strokeLinecap="round" />
                  <path d="M92 100 Q110 120 112 145" stroke="white" strokeWidth="14" strokeLinecap="round" />
                </svg>
              )}
            </div>

            {/* Nom */}
            <p
              className={`font-black uppercase tracking-wide text-center my-2 leading-none ${featured ? "text-[22px]" : "text-[18px]"} ${tc.name}`}
            >
              {fullName}
            </p>

            {/* Divider */}
            <div className={`h-px mb-2 ${tc.divider}`} />

            {/* Prix */}
            {coach.hourlyRate && (
              <div className="text-center mb-1">
                <span className={`text-[13px] font-black ${tc.name}`}>
                  {coach.hourlyRate}€
                </span>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wide ml-1 ${tc.label}`}
                >
                  /séance
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1">
              {stats.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-0.5">
                  <span
                    className={`font-black leading-none ${featured ? "text-[18px]" : "text-[15px]"} ${tc.stat}`}
                  >
                    {value}
                  </span>
                  <span
                    className={`text-[8px] font-bold tracking-wide uppercase ${tc.label}`}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
