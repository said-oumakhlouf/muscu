'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { User } from '@/types/User';
import { Session } from '@/types/Session';
import { useParams } from 'next/navigation';
import CreateSessionForm from '@/components/CreateSessionForm';

export default function ClientDetailPage() {
    const { token, role, isLoading } = useAuth();
    const { id } = useParams();
    const [client, setClient] = useState<User | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        if (token && role === 'admin') {
            userService.getOne(token, Number(id)).then(setClient);
            userService.getSessions(token, Number(id)).then(setSessions);
        }
    }, [token, role, id]);

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Chargement...</div>;

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
            {client && (
                <>
                    <div className="bg-white rounded-xl p-8 shadow w-full max-w-2xl mb-8">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-3xl">
                                👤
                            </div>
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
                                <p className="text-2xl font-bold text-gray-800">{client.goal ?? '—'}</p>
                                <p className="text-sm text-gray-500">Objectif</p>
                            </div>
                        </div>
                    </div>

                    <CreateSessionForm
                        token={token!}
                        clientId={Number(id)}
                        onCreated={() => userService.getSessions(token!, Number(id)).then(setSessions)}
                    />

                    <div className="w-full max-w-2xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Séances</h2>
                        {sessions.map((session) => (
                            <div key={session.id} className="bg-white rounded-xl p-6 shadow mb-4">
                                <h3 className="text-lg font-bold text-gray-800">{session.name}</h3>
                                <p className="text-sm text-gray-500 mb-3">
                                    {new Date(session.createdAt).toLocaleDateString('fr-FR')}
                                </p>
                                {session.exercises.map((se) => (
                                    <div key={se.id} className="text-gray-600 text-sm py-1 border-b">
                                        {se.exercise.name} — {se.sets} séries x {se.reps} reps
                                        {se.weight ? ` @ ${se.weight}kg` : ''}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}