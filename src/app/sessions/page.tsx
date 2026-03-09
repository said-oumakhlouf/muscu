'use client';

import { useEffect, useState } from 'react';
import { Session } from '@/types/Session';
import { sessionService } from '@/services/sessionService';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';

export default function SessionsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const { token } = useAuth();
    const [coach, setCoach] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        if (token) {
            sessionService.getAll(token).then(setSessions);
            userService.getProfile(token).then((data) => {                
                if (data.coach) {
                    setCoach(`${data.coach.user.firstname} ${data.coach.user.lastname}`)
                }
                if (data.firstname) {
                    setUserName(data.firstname)
                }
            })
        }
    }, [token]);

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-500">Connectez-vous pour voir vos séances</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-10">{userName ? `Bienvenue ${userName} 👋` : 'Mes Séances'}</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full max-w-4xl">
                {coach && (
                    <div className='bg-[#e6ab4c] rounded-xl px-6 py-4 shadow mb-6 w-full max-w-4xl flex items-center gap-3'>
                        <span className='text-gray-800 text-sm'>Mon Coach</span>
                        <span className='font-bold text-gray-800'>{coach}</span>
                    </div>
                )}
                {sessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl p-6">
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