'use client';

import { useEffect, useState } from 'react';
import { Session } from '@/types/Session';
import { sessionService } from '@/services/sessionService';

export default function SessionsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    
    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        sessionService.getAll(token).then(setSessions);
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-10">Mes Séances</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full max-w-4xl">
                {sessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl p-6 shadow">
                        <h2 className="text-xl font-bold text-gray-800">{session.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {new Date(session.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                        <div className="mt-3">
                            {session.exercises.map((se) => (
                                <div key={se.id} className="text-gray-600 text-sm py-1 border-b">
                                    {se.exercise.name} — {se.sets} séries x {se.reps} reps
                                    {se.weight ? ` @ ${se.weight}kg` : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}