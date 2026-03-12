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

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Chargement...</div>;

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
            {client && (
                <>
                    <div className="bg-white rounded-xl p-8 shadow w-full max-w-2xl mb-8">
                        <div className="flex items-center gap-6">
                            <Avatar name={`${client.firstname} ${client.lastname}`} size={80} />
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {client.firstname} {client.lastname}
                                </h1>
                                <p className="text-gray-500">{client.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-zinc-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-gray-800">{client.weight ?? '—'}kg</p>
                                <p className="text-sm text-gray-500">Poids</p>
                            </div>
                            <div className="bg-zinc-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-gray-800">{client.height ?? '—'}cm</p>
                                <p className="text-sm text-gray-500">Taille</p>
                            </div>
                            <div className="bg-zinc-50 rounded-lg p-4 text-center">
                                <p className="text-2xl font-bold text-gray-800">{formatGoal(client.goal)}</p>
                                <p className="text-sm text-gray-500">Objectif</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-2xl">
                        <CreateSessionForm
                            token={token!}
                            clientId={Number(id)}
                            onCreated={() => userService.getSessions(token!, Number(id)).then(setSessions)}
                        />
                    </div>

                    <div className="w-full max-w-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Séances</h2>
                        {sessions.map((session) => (
                            <div key={session.id} className="bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm flex items-center gap-4 mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h3 className="font-bold text-gray-800">{session.name}</h3>
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
                                        className="text-sm px-3 py-1 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                                    >
                                        ✏️ Modifier
                                    </button>
                                    <button
                                        onClick={() => setDeletingSessionId(session.id)}
                                        className="text-sm px-3 py-1 rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {editingSession && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Modifier la séance</h3>
                                <input
                                    className="border rounded-lg p-2 w-full text-gray-800 mb-3"
                                    value={editingSession.name}
                                    onChange={(e) => setEditingSession({ ...editingSession, name: e.target.value })}
                                />
                                {editingSession.exercises.map((se, index) => (
                                    <div key={se.id} className="flex gap-2 mb-2 items-center">
                                        <span className="flex-1 text-sm text-gray-700">{se.exercise.name}</span>
                                        <input
                                            className="border rounded-lg p-1 w-16 text-center text-gray-800"
                                            type="number"
                                            value={se.sets}
                                            onChange={(e) => {
                                                const updated = [...editingSession.exercises];
                                                updated[index] = { ...updated[index], sets: Number(e.target.value) };
                                                setEditingSession({ ...editingSession, exercises: updated });
                                            }}
                                        />
                                        <input
                                            className="border rounded-lg p-1 w-16 text-center text-gray-800"
                                            type="number"
                                            value={se.reps}
                                            onChange={(e) => {
                                                const updated = [...editingSession.exercises];
                                                updated[index] = { ...updated[index], reps: Number(e.target.value) };
                                                setEditingSession({ ...editingSession, exercises: updated });
                                            }}
                                        />
                                        <input
                                            className="border rounded-lg p-1 w-16 text-center text-gray-800"
                                            type="number"
                                            placeholder="Kg"
                                            value={se.weight || ''}
                                            onChange={(e) => {
                                                const updated = [...editingSession.exercises];
                                                updated[index] = { ...updated[index], weight: Number(e.target.value) };
                                                setEditingSession({ ...editingSession, exercises: updated });
                                            }}
                                        />
                                    </div>
                                ))}
                                <div className="flex justify-end gap-3 mt-4">
                                    <button
                                        onClick={() => setEditingSession(null)}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        className="px-4 py-2 rounded-lg bg-black text-white font-bold hover:bg-zinc-800"
                                    >
                                        Sauvegarder
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {deletingSessionId && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Supprimer la séance ?</h3>
                                <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setDeletingSessionId(null)}
                                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}