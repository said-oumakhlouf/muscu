"use client";

import MuscleGroupsCard from "@/components/client/dashboard/MuscleGroupsCard";
import ProgressRing from "@/components/client/dashboard/ProgressRing";
import RecentSessionsCard from "@/components/client/dashboard/RecentSessionsCard";
import WeeklyChart from "@/components/client/dashboard/WeeklyChart";
import StatCard from "@/components/ui/StatCard";
import { useAuth } from "@/context/AuthContext";
import { Session } from "@/types/Session";
import { computeStreak } from "@/utils/computeStreak";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { getWeeklyData } from "@/utils/getWeeklyData";
import { Calendar, CheckCircle, Flame, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const MONTHLY_GOAL = 12;

export default function ClientDashboard() {
  const { token } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [firstname, setFirstname] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetchWithAuth("${process.env.next_public_api_url}/sessions", token),
      fetchWithAuth("${process.env.next_public_api_url}/users/profile", token),
    ])
      .then(([sessionsData, profileData]) => {
        setSessions(Array.isArray(sessionsData) ? sessionsData : []);
        setFirstname(profileData.firstname ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const now = new Date();
  const completed = sessions.filter(
    (s) => s.scheduledAt && new Date(s.scheduledAt) < now,
  );
  const upcoming = sessions
    .filter((s) => s.scheduledAt && new Date(s.scheduledAt) >= now)
    .sort(
      (a, b) =>
        new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime(),
    );

  const nextSession = upcoming[0] ?? null;
  const streak = computeStreak(sessions);
  const totalCalories = completed.reduce(
    (acc, s) => acc + (s.calories ?? 0),
    0,
  );
  const weeklyData = getWeeklyData(sessions);
  const weeklyTotal = weeklyData.reduce((a, b) => a + b, 0);

  const muscleCount: Record<string, number> = {};
  completed.forEach((s) => {
    s.exercises.forEach((se) => {
      const mg = se.exercise.muscleGroup;
      if (mg) muscleCount[mg] = (muscleCount[mg] ?? 0) + 1;
    });
  });
  const totalExercises = Object.values(muscleCount).reduce((a, b) => a + b, 0);
  const recentSessions = [...completed]
    .sort(
      (a, b) =>
        new Date(b.scheduledAt!).getTime() - new Date(a.scheduledAt!).getTime(),
    )
    .slice(0, 4);

  if (loading)
    return (
      <div className="flex items-center justify-center py-40 bg-[#cec4e2]">
        <p className="text-gray-500 text-sm">Chargement...</p>
      </div>
    );

  return (
    <div className="w-full bg-[#cec4e2] px-6 py-24">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <span className="bg-[#7C5CBF]/10 text-[#7C5CBF] text-sm font-medium px-4 py-1 rounded-full">
            💪 Espace client
          </span>
          <h1 className="text-5xl font-black text-[#1A1A2E] tracking-tight">
            Bonjour{firstname ? `, ${firstname}` : ""} 👋
          </h1>
          <p className="text-[#6B7280] text-lg">Voici ta progression</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            icon={<CheckCircle size={20} className="text-[#7C5CBF]" />}
            value={completed.length}
            label="Séances"
            sub="complétées"
          />
          <StatCard
            icon={<Flame size={20} className="text-[#7C5CBF]" />}
            value={streak > 0 ? `${streak}j` : "—"}
            label="Streak"
            sub="jours consécutifs"
          />
          <StatCard
            icon={<Zap size={20} className="text-[#7C5CBF]" />}
            value={totalCalories > 0 ? `${totalCalories}` : "—"}
            label="Calories"
            sub="brûlées"
          />
          <StatCard
            icon={<Calendar size={20} className="text-[#7C5CBF]" />}
            value={
              nextSession?.scheduledAt
                ? new Date(nextSession.scheduledAt).toLocaleDateString(
                    "fr-FR",
                    { day: "numeric", month: "short" },
                  )
                : "—"
            }
            label="Prochaine"
            sub={
              nextSession?.scheduledAt
                ? new Date(nextSession.scheduledAt).toLocaleTimeString(
                    "fr-FR",
                    { hour: "2-digit", minute: "2-digit" },
                  )
                : "aucune prévue"
            }
          />
        </div>

        {/* Progression */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7C5CBF]">
            Progression
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WeeklyChart data={weeklyData} total={weeklyTotal} />
            <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm flex flex-col items-center justify-center gap-3">
              <h3 className="font-bold text-[#1A1A2E] text-sm self-start">
                Objectif mensuel
              </h3>
              <div className="relative flex items-center justify-center">
                <ProgressRing
                  value={completed.length}
                  max={MONTHLY_GOAL}
                  size={120}
                />
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-[#1A1A2E]">
                    {completed.length}
                  </span>
                  <span className="text-xs text-[#9CA3AF]">
                    / {MONTHLY_GOAL}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#9CA3AF] text-center">
                {completed.length >= MONTHLY_GOAL
                  ? "🎉 Objectif atteint !"
                  : `${MONTHLY_GOAL - completed.length} séance${MONTHLY_GOAL - completed.length > 1 ? "s" : ""} restante${MONTHLY_GOAL - completed.length > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
        </div>

        {/* Historique */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#7C5CBF]">
            Historique
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RecentSessionsCard sessions={recentSessions} />
            <MuscleGroupsCard
              muscleCount={muscleCount}
              totalExercises={totalExercises}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
