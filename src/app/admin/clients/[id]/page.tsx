'use client';

import CreateSessionForm from '@/components/CreateSessionForm';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/context/AuthContext';
import { sessionService } from '@/services/sessionService';
import { userService } from '@/services/userService';
import { Session } from '@/types/Session';
import { User } from '@/types/User';
import { formatGoal } from '@/utils/goalLabels';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Avatar from '@/components/Avatar';

export default function ClientDetailPage() {
    const { token, role, isLoading } = useAuth();
    const { id } = useParams();
    const [client, setClient] = useState<User | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [editingSession, setEditingSession] = useState<Session | null>(null);
    const [deletingSessionId, setDeletingSessionId] = useState<number | null>(null);

    const handleDelete = async () => {
        if (!deletingSessionId) return;
        await sessionService.delete(token!, deletingSessionId);
        setSessions(sessions.filter(s => s.id !== deletingSessionId));
        setDeletingSessionId(null);
    };

    const handleUpdate = async () => {
        if (!editingSession) return;
        await sessionService.update(token!, editingSession.id, {
            name: editingSession.name,
            scheduledAt: editingSession.scheduledAt ? new Date(editingSession.scheduledAt) : undefined,
            exercises: editingSession.exercises.map(se => ({
                exerciseId: se.exercise.id,
                sets: se.sets,
                reps: se.reps,
                weight: se.weight,
            })),
        });
        setEditingSession(null);
        userService.getSessions(token!, Number(id)).then(setSessions);
    };

    useEffect(() => {
        if (token && role === 'admin' && id) {
            const numericId = Number(id);
            if (isNaN(numericId)) return;
            userService.getOne(token, numericId).then(setClient);
            userService.getSessions(token, numericId).then(setSessions);
        }
    }, [token, role, id]);

    if (isLoading)
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#EEEEF8]">
                Chargement...
            </div>
        );

    return (
        <div className="flex min-h-screen flex-col bg-[#EEEEF8] p-10">
            {client && (
                <div className="mx-auto w-full max-w-2xl flex flex-col gap-5">

                    {/* Card client */}
                    <div className="bg-white rounded-2xl border border-black/[0.06] p-7">

                        {/* Avatar + nom */}
                        <div className="flex items-center gap-5 pb-6 border-b border-black/[0.06]">
                            <Avatar name={`${client.firstname} ${client.lastname}`} size={64} />
                            <div>
                                <h1 className="text-xl font-semibold text-[#1a1a2e]">
                                    {client.firstname} {client.lastname}
                                </h1>
                                <p className="text-sm text-gray-400 mt-0.5">{client.email}</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                            {[
                                { label: 'Poids', value: client.weight ? `${client.weight}` : '_', unit: 'kg' },
                                { label: 'Taille', value: client.height ? `${client.height}` : '—', unit: client.height ? 'cm' : '' },
                                { label: 'Objectif', value: formatGoal(client.goal), unit: '' },
                            ].map(({ label, value, unit }) => (
                                <div key={label} className="bg-[#F5F5FB] rounded-xl p-4 text-center">
                                    <p className="text-lg font-bold text-[#1a1a2e]">
                                        {value}
                                        {unit && <span className="text-xs font-normal text-gray-400 ml-0.5">{unit}</span>}
                                    </p>
                                    <p className="text-xs text-[#9990cc] font-medium mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formulaire nouvelle séance */}
                    <div className="bg-white rounded-2xl border border-black/[0.06] p-7">
                        <CreateSessionForm
                            token={token!}
                            clientId={Number(id)}
                            onCreated={() => userService.getSessions(token!, Number(id)).then(setSessions)}
                        />
                    </div>

                    {/* Liste séances */}
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc] mb-3 px-1">
                            Séances
                        </p>
                        <div className="flex flex-col gap-3">
                            {sessions.length === 0 && (
                                <div className="bg-white rounded-2xl border border-black/[0.06] p-8 text-center text-gray-400 text-sm">
                                    Aucune séance pour ce client.
                                </div>
                            )}
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="bg-white rounded-2xl border border-black/[0.06] px-6 py-4 flex items-center gap-4"
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-[#1a1a2e] text-sm">{session.name}</h3>
                                            <StatusBadge scheduledAt={session.scheduledAt} />
                                        </div>
                                        <p className="text-xs text-gray-400">
                                            {session.exercises.length} exercice{session.exercises.length !== 1 ? 's' : ''}
                                            {session.scheduledAt && ` · ${new Date(session.scheduledAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        <button
                                            onClick={() => setEditingSession(session)}
                                            className="text-xs px-3 py-1.5 rounded-lg border border-[#6C5CE7]/20 text-[#6C5CE7] hover:bg-[#f0eeff] transition-colors"
                                        >
                                            ✏️ Modifier
                                        </button>
                                        <button
                                            onClick={() => setDeletingSessionId(session.id)}
                                            className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-colors"
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Modal modifier séance */}
                    {editingSession && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-7 w-full max-w-md border border-black/[0.06]">
                                <h3 className="text-base font-semibold text-[#1a1a2e] mb-5">Modifier la séance</h3>

                                <div className="flex flex-col gap-1.5 mb-4">
                                    <label className="text-xs font-medium text-gray-400">Nom de la séance</label>
                                    <input
                                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors w-full"
                                        value={editingSession.name}
                                        onChange={(e) => setEditingSession({ ...editingSession, name: e.target.value })}
                                    />
                                </div>

                                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc] mb-3">
                                    Exercices
                                </p>

                                {editingSession.exercises.map((se, index) => (
                                    <div key={se.id} className="flex gap-2 mb-2 items-center">
                                        <span className="flex-1 text-sm text-[#1a1a2e] truncate">{se.exercise.name}</span>
                                        {[
                                            { key: 'sets', placeholder: 'Séries' },
                                            { key: 'reps', placeholder: 'Reps' },
                                            { key: 'weight', placeholder: 'Kg' },
                                        ].map(({ key, placeholder }) => (
                                            <input
                                                key={key}
                                                className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-lg p-1.5 w-16 text-center text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] transition-colors"
                                                type="number"
                                                placeholder={placeholder}
                                                value={(se as any)[key] || ''}
                                                onChange={(e) => {
                                                    const updated = [...editingSession.exercises];
                                                    updated[index] = { ...updated[index], [key]: Number(e.target.value) };
                                                    setEditingSession({ ...editingSession, exercises: updated });
                                                }}
                                            />
                                        ))}
                                    </div>
                                ))}

                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        onClick={() => setEditingSession(null)}
                                        className="px-4 py-2 rounded-xl border border-black/[0.08] text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white text-sm font-semibold transition-colors"
                                    >
                                        Sauvegarder
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal supprimer séance */}
                    {deletingSessionId && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-7 w-full max-w-sm border border-black/[0.06]">
                                <h3 className="text-base font-semibold text-[#1a1a2e] mb-2">Supprimer la séance ?</h3>
                                <p className="text-sm text-gray-400 mb-6">Cette action est irréversible.</p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setDeletingSessionId(null)}
                                        className="px-4 py-2 rounded-xl border border-black/[0.08] text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}