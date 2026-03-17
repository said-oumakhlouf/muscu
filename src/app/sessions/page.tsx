'use client';

import StatusBadge from '@/components/ui/StatusBadge';
import Avatar from '@/components/ui/Avatar';
import { useAuth } from '@/context/AuthContext';
import { sessionService } from '@/services/sessionService';
import { userService } from '@/services/userService';
import { Session } from '@/types/Session';
import { User } from '@/types/User';
import { getSessionStatus } from '@/utils/sessionStatus';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SessionsPage() {
    const { token, role, isLoading } = useAuth();
    const [coachSessions, setCoachSessions] = useState<Session[]>([]);
    const [clients, setClients] = useState<User[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<number | 'all'>('all');
    const [userName, setUserName] = useState<string | null>(null);
    const [mySessions, setMySessions] = useState<Session[]>([]);
    const [coach, setCoach] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        if (role === 'admin') {
            sessionService.getAllByCoach(token).then(setCoachSessions);
            userService.getMyClients(token).then(setClients);
        } else {
            sessionService.getAll(token).then(setMySessions);
            userService.getProfile(token).then((data) => {
                if (data.coach) setCoach(`${data.coach.user.firstname} ${data.coach.user.lastname}`);
                if (data.firstname) setUserName(data.firstname);
            });
        }
    }, [token, role]);

    if (isLoading) return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-400">Chargement...</p>
        </div>
    );

    if (!token) return (
        <div className="flex min-h-screen items-center justify-center">
            <p className="text-gray-500">Connectez-vous pour voir vos séances</p>
        </div>
    );

    // ── VUE COACH ──────────────────────────────────────────────
    if (role === 'admin') {
        const filtered = selectedClientId === 'all'
            ? coachSessions
            : coachSessions.filter(s => s.userId === selectedClientId);

        // Trier : aujourd'hui en premier, puis à venir, puis terminées, puis sans date
        const order = { today: 0, upcoming: 1, done: 2, unscheduled: 3 };
        const sorted = [...filtered].sort((a, b) => {
            const diff = order[getSessionStatus(a.scheduledAt)] - order[getSessionStatus(b.scheduledAt)];
            if (diff !== 0) return diff;
            if (a.scheduledAt && b.scheduledAt) return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
            return 0;
        });

        return (
            <div className="min-h-screen bg-zinc-50 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Planning</h1>
                        <p className="text-gray-500 mt-1">
                            {coachSessions.length} séance{coachSessions.length !== 1 ? 's' : ''} · {clients.length} client{clients.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Filtre clients */}
                    <div className="flex gap-2 flex-wrap mb-8">
                        <button
                            onClick={() => setSelectedClientId('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedClientId === 'all'
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            Tous
                        </button>
                        {clients.map(client => (
                            <button
                                key={client.id}
                                onClick={() => setSelectedClientId(client.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedClientId === client.id
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                {client.firstname} {client.lastname}
                            </button>
                        ))}
                    </div>

                    {/* Liste planning */}
                    {sorted.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-5xl mb-4">📋</p>
                            <p className="text-lg font-medium">Aucune séance</p>
                            <p className="text-sm mt-1">Créez des séances depuis la fiche d'un client</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sorted.map(session => (
                                <div key={session.id} className="bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">
                                    {/* Avatar client */}
                                    <Avatar name={`${session.user?.firstname} ${session.user?.lastname}`} size={40} />
                                    {/* Infos */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="font-semibold text-gray-800 text-sm">{session.name}</p>
                                            <StatusBadge scheduledAt={session.scheduledAt} />
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {session.user?.firstname} {session.user?.lastname}
                                            {' · '}
                                            {session.exercises.length} exercice{session.exercises.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <div className="text-right shrink-0">
                                        {session.scheduledAt ? (
                                            <>
                                                <p className="text-sm font-bold text-gray-700">
                                                    {new Date(session.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(session.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-xs text-gray-400">—</p>
                                        )}
                                    </div>

                                    {/* Lien fiche client */}
                                    <Link
                                        href={`/admin/clients/${session.userId}`}
                                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium shrink-0"
                                    >
                                        Voir →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ── VUE CLIENT ─────────────────────────────────────────────
    const order = { today: 0, upcoming: 1, done: 2, unscheduled: 3 };
    const sortedMySessions = [...mySessions].sort((a, b) => {
        const diff = order[getSessionStatus(a.scheduledAt)] - order[getSessionStatus(b.scheduledAt)];
        if (diff !== 0) return diff;
        if (a.scheduledAt && b.scheduledAt) return new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime();
        return 0;
    });

    return (
        <div className="min-h-screen bg-zinc-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {userName ? `Bienvenue ${userName} 👋` : 'Mes séances'}
                        </h1>
                        <p className="text-gray-500 mt-1">{mySessions.length} séance{mySessions.length !== 1 ? 's' : ''}</p>
                    </div>
                    {coach && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-center gap-2">
                            <span className="text-amber-600 text-sm">Coach</span>
                            <span className="font-semibold text-amber-800 text-sm">{coach}</span>
                        </div>
                    )}
                </div>

                {sortedMySessions.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">🏋️</p>
                        <p className="text-lg font-medium">Aucune séance pour l'instant</p>
                        <p className="text-sm mt-1">Votre coach vous assignera des séances bientôt</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedMySessions.map(session => (
                            <div key={session.id} className="bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <p className="font-semibold text-gray-800">{session.name}</p>
                                        <StatusBadge scheduledAt={session.scheduledAt} />
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        {session.exercises.length} exercice{session.exercises.length !== 1 ? 's' : ''}
                                        {' · '}
                                        {session.exercises.map(se => se.exercise.name).join(', ')}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    {session.scheduledAt ? (
                                        <>
                                            <p className="text-sm font-bold text-gray-700">
                                                {new Date(session.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(session.scheduledAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-400">—</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}