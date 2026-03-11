'use client';

import { useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/User';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
    const { token, role, isLoading } = useAuth();
    const [clients, setClients] = useState<User[]>([]);
    const [upcomingSessions, setUpcomingSessions] = useState<{
        id: number;
        name: string;
        scheduledAt: string;
        user: { firstname: string; lastname: string };
    }[]>([]);
    const [coachName, setCoachName] = useState('');

    useEffect(() => {
        if (token && role === 'admin') {
            userService.getMyClients(token).then(setClients);
            userService.getProfile(token).then((data) => {
                setCoachName(data.firstname || data.email);
            });
            userService.getMySessions(token).then((data) => {
                console.log('upcoming sessions:', data);
                
                setUpcomingSessions(data)
            });

        }
    }, [token, role]);

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Chargement...</div>;
    if (role !== 'admin') return <div className="flex min-h-screen items-center justify-center text-red-500">Accès refusé</div>;

    return (
        <div className="flex min-h-screen flex-col items-center p-10">
            <AdminDashboard clients={clients} coachName={coachName} upcomingSessions={upcomingSessions}/>
        </div>
    );
}