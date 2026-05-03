"use client";

import CoachCard from "@/components/coach/CoachCard";
import { coachService } from "@/services/coachService";
import { Coach } from "@/types/Coach";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

const SPECIALTIES = [
  "Tous",
  "Muscu",
  "Running",
  "Yoga",
  "Nutrition",
  "Fitness",
];

function getRating(id: number): number {
  return 78 + ((id * 7 + 13) % 20);
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    coachService
      .getAll(specialty || undefined, search || undefined)
      .then((data) => {
        if (!cancelled) {
          setCoaches(data);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [specialty, search]);

  return (
    <main className="min-h-screen bg-[#1A1A2E]">
      {/* Header */}
      <div className="relative overflow-hidden pt-20 pb-16 px-6 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C5CBF] rounded-full blur-[120px] opacity-10" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F5C518] rounded-full blur-[120px] opacity-6" />
        </div>
        <div className="relative z-10">
          <span className="inline-block text-[#F5C518] text-xs font-bold tracking-[4px] uppercase mb-4">
            ⚡ CoachFik Elite
          </span>
          <h1 className="text-white uppercase leading-none mb-3 font-black skew-x-[-8deg] inline-block text-[clamp(40px,7vw,80px)]">
            Nos <span className="text-[#F5C518]">Coachs</span>
          </h1>
          <p className="text-white/40 text-base mt-3">
            {coaches.length} expert{coaches.length > 1 ? "s" : ""} certifié
            {coaches.length > 1 ? "s" : ""} disponible
            {coaches.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filtres sticky */}
      <div className="sticky top-0 z-20 bg-[#1A1A2E]/90 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Recherche */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            />
            <input
              type="text"
              placeholder="Rechercher un coach..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm rounded-full pl-9 pr-9 py-2.5 outline-none focus:border-[#7C5CBF] transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filtres spécialité */}
          <div className="flex gap-2 flex-wrap">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s === "Tous" ? "" : s)}
                className={`text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full transition
                                    ${
                                      (s === "Tous" && !specialty) ||
                                      specialty === s
                                        ? "bg-[#7C5CBF] text-white shadow-lg shadow-[#7C5CBF]/30"
                                        : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                    }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listing */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="w-8 h-8 border-2 border-[#7C5CBF] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : coaches.length === 0 ? (
          <div className="text-center py-32">
            <p className="text-white/30 text-lg">Aucun coach trouvé</p>
            <button
              onClick={() => {
                setSearch("");
                setSpecialty("");
              }}
              className="mt-4 text-[#7C5CBF] text-sm hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {coaches.map((coach, index) => (
              <CoachCard
                key={coach.id}
                coach={coach}
                featured={
                  getRating(coach.id) ===
                  Math.max(...coaches.map((c) => getRating(c.id)))
                }
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
