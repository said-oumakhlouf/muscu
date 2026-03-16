'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { MUSCLE_GROUPS } from '@/constants/muscleGroups';
import { CheckCircle, Flame, Calendar, Zap } from 'lucide-react';
import { Session } from '@/types/Session';

const MUSCLE_LABELS: Record<string, string> = Object.fromEntries(
    MUSCLE_GROUPS.map(({ value, label }) => [value, label])
);

const INTENSITY_LABELS = { low: 'Faible', medium: 'Moyenne', high: 'Élevée' };
const INTENSITY_COLORS = { low: '#10B981', medium: '#F59E0B', high: '#EF4444' };
const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function computeStreak(sessions: Session[]): number {
    const completedDates = sessions
        .filter(s => s.scheduledAt && new Date(s.scheduledAt) < new Date())
        .map(s => new Date(s.scheduledAt!).toDateString());
    const uniqueDates = [...new Set(completedDates)].sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );
    if (uniqueDates.length === 0) return 0;
    let streak = 0;
    let cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    for (const dateStr of uniqueDates) {
        const d = new Date(dateStr);
        const diff = Math.round((cursor.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
        if (diff <= 1) { streak++; cursor = d; } else break;
    }
    return streak;
}

function getWeeklyData(sessions: Session[]) {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const days = Array(7).fill(0);
    sessions
        .filter(s => s.scheduledAt && new Date(s.scheduledAt) < now && new Date(s.scheduledAt) >= startOfWeek)
        .forEach(s => {
            const day = new Date(s.scheduledAt!).getDay();
            const idx = day === 0 ? 6 : day - 1;
            days[idx]++;
        });
    return days;
}

// Anneau SVG
function ProgressRing({ value, max, size = 120, color = '#7C3AED' }: { value: number; max: number; size?: number; color?: string }) {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = max === 0 ? 0 : Math.min(value / max, 1);
    const offset = circumference * (1 - pct);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#EDE9FE" strokeWidth={10} />
            <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="none" stroke={color} strokeWidth={10}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
        </svg>
    );
}

export default function ClientDashboard() {
    const { token } = useAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [firstname, setFirstname] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) return;
        Promise.all([
            fetchWithAuth('http://localhost:3000/sessions', token),
            fetchWithAuth('http://localhost:3000/users/profile', token),
        ]).then(([sessionsData, profileData]) => {
            setSessions(Array.isArray(sessionsData) ? sessionsData : []);
            setFirstname(profileData.firstname ?? null);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [token]);

    const now = new Date();
    const completed = sessions.filter(s => s.scheduledAt && new Date(s.scheduledAt) < now);
    const upcoming = sessions
        .filter(s => s.scheduledAt && new Date(s.scheduledAt) >= now)
        .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime());

    const nextSession = upcoming[0] ?? null;
    const streak = computeStreak(sessions);
    const totalCalories = completed.reduce((acc, s) => acc + (s.calories ?? 0), 0);
    const weeklyData = getWeeklyData(sessions);
    const weeklyMax = Math.max(...weeklyData, 1);
    const weeklyTotal = weeklyData.reduce((a, b) => a + b, 0);

    const muscleCount: Record<string, number> = {};
    completed.forEach(s => {
        s.exercises.forEach(se => {
            const mg = se.exercise.muscleGroup;
            if (mg) muscleCount[mg] = (muscleCount[mg] ?? 0) + 1;
        });
    });
    const topMuscles = Object.entries(muscleCount).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const totalExercises = Object.values(muscleCount).reduce((a, b) => a + b, 0);

    const recentSessions = [...completed]
        .sort((a, b) => new Date(b.scheduledAt!).getTime() - new Date(a.scheduledAt!).getTime())
        .slice(0, 4);

    if (loading) return (
        <div className="flex items-center justify-center py-40 bg-[#cec4e2]">
            <p className="text-gray-500 text-sm">Chargement...</p>
        </div>
    );

    return (
        <div className="w-full bg-[#cec4e2] px-6 py-24">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">

                {/* ── SECTION 1 : Header ── */}
                <div className="flex flex-col items-center text-center gap-2">
                    <span className="bg-[#7C5CBF]/10 text-[#7C5CBF] text-sm font-medium px-4 py-1 rounded-full">
                        💪 Espace client
                    </span>
                    <h1 className="text-5xl font-black text-[#1A1A2E] tracking-tight">
                        Bonjour{firstname ? `, ${firstname}` : ''} 👋
                    </h1>
                    <p className="text-[#6B7280] text-lg">Voici ta progression</p>
                </div>

                {/* ── SECTION 2 : Stats cards ── */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { icon: <CheckCircle size={20} className="text-[#7C5CBF]" />, value: completed.length, label: 'Séances', sub: 'complétées' },
                        { icon: <Flame size={20} className="text-[#7C5CBF]" />, value: streak > 0 ? `${streak}j` : '—', label: 'Streak', sub: 'jours consécutifs' },
                        { icon: <Zap size={20} className="text-[#7C5CBF]" />, value: totalCalories > 0 ? `${totalCalories}` : '—', label: 'Calories', sub: 'brûlées' },
                        {
                            icon: <Calendar size={20} className="text-[#7C5CBF]" />,
                            value: nextSession?.scheduledAt
                                ? new Date(nextSession.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
                                : '—',
                            label: 'Prochaine',
                            sub: nextSession?.scheduledAt
                                ? new Date(nextSession.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                                : 'aucune prévue',
                        },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm text-center">
                            <div className="w-10 h-10 bg-[#F3EEFF] rounded-xl flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <span className="text-3xl font-black text-[#1A1A2E] tracking-tight leading-none">{stat.value}</span>
                            <div>
                                <p className="font-semibold text-[#1A1A2E] text-sm">{stat.label}</p>
                                <p className="text-[#9CA3AF] text-xs">{stat.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── SECTION 3 : Progression ── */}
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#7C5CBF] mb-3">Progression</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Graphique hebdomadaire */}
                        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-[#1A1A2E] text-sm">Cette semaine</h3>
                                <span className="text-xs text-[#9CA3AF]">{weeklyTotal} séance{weeklyTotal > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-end gap-2 h-24">
                                {weeklyData.map((count, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                                        <div className="w-full rounded-lg transition-all duration-500 bg-[#EDE9FE]" style={{ height: 80 }}>
                                            <div
                                                className="w-full rounded-lg bg-[#7C3AED] transition-all duration-500"
                                                style={{ height: `${(count / weeklyMax) * 100}%`, minHeight: count > 0 ? 8 : 0 }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-[#9CA3AF] font-medium">{DAY_LABELS[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Anneau de progression */}
                        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm flex flex-col items-center justify-center gap-3">
                            <h3 className="font-bold text-[#1A1A2E] text-sm self-start">Objectif mensuel</h3>
                            <div className="relative flex items-center justify-center">
                                <ProgressRing value={completed.length} max={12} size={120} />
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-2xl font-black text-[#1A1A2E]">{completed.length}</span>
                                    <span className="text-xs text-[#9CA3AF]">/ 12</span>
                                </div>
                            </div>
                            <p className="text-xs text-[#9CA3AF] text-center">
                                {completed.length >= 12
                                    ? '🎉 Objectif atteint !'
                                    : `${12 - completed.length} séance${12 - completed.length > 1 ? 's' : ''} restante${12 - completed.length > 1 ? 's' : ''}`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 4 : Historique + Muscles ── */}
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[#7C5CBF] mb-3">Historique</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Dernières séances */}
                        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm">
                            <h3 className="font-bold text-[#1A1A2E] text-sm mb-4">Dernières séances</h3>
                            {recentSessions.length === 0 ? (
                                <div className="flex flex-col items-center py-6 gap-2">
                                    <span className="text-3xl">📋</span>
                                    <p className="text-[#9CA3AF] text-sm text-center">Aucune séance terminée</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {recentSessions.map(session => (
                                        <div key={session.id} className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-[#F3EEFF] rounded-xl flex items-center justify-center shrink-0 text-sm">🏋️</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-[#1A1A2E] truncate">{session.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-[#9CA3AF]">
                                                        {new Date(session.scheduledAt!).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                    </p>
                                                    {session.intensity && (
                                                        <span className="text-xs font-medium px-1.5 py-0.5 rounded-full" style={{
                                                            color: INTENSITY_COLORS[session.intensity],
                                                            background: `${INTENSITY_COLORS[session.intensity]}18`,
                                                        }}>
                                                            {INTENSITY_LABELS[session.intensity]}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {session.calories && (
                                                <span className="text-xs font-bold text-[#7C3AED] shrink-0">{session.calories} kcal</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Groupes musculaires */}
                        <div className="p-6 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm">
                            <h3 className="font-bold text-[#1A1A2E] text-sm mb-4">Groupes musculaires</h3>
                            {topMuscles.length === 0 ? (
                                <div className="flex flex-col items-center py-6 gap-2">
                                    <span className="text-3xl">💪</span>
                                    <p className="text-[#9CA3AF] text-sm text-center">Les muscles travaillés<br />apparaîtront ici</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {topMuscles.map(([mg, count]) => {
                                        const pct = Math.round((count / topMuscles[0][1]) * 100);
                                        return (
                                            <div key={mg}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-semibold text-[#1A1A2E]">{MUSCLE_LABELS[mg] ?? mg}</span>
                                                    <span className="text-xs text-[#9CA3AF]">{Math.round((count / totalExercises) * 100)}%</span>
                                                </div>
                                                <div className="bg-[#F3EEFF] rounded-full h-2 overflow-hidden">
                                                    <div className="h-full bg-[#7C3AED] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}