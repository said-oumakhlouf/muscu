'use client';

import { useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/User';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useRouter } from 'next/navigation';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

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
    const router = useRouter();

    const loadData = () => {
        if (!token) return;
        userService.getMyClients(token).then(setClients);
        userService.getMySessions(token).then(setUpcomingSessions);
    };

    useEffect(() => {
        if (token && role === 'coach') {
            fetchWithAuth('http://localhost:3000/stripe/status', token).then((sub) => {
                if (sub?.status === 'canceled') {
                    router.push('/billing');
                    return;
                }
                loadData();
                userService.getProfile(token).then((data) => {
                    setCoachName(data.firstname || data.email);
                });
            });
        }
    }, [token, role, router]);

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Chargement...</div>;
    if (role !== 'coach') return <div className="flex min-h-screen items-center justify-center text-red-500">Accès refusé</div>;

    return (
        <div className="flex min-h-screen flex-col items-center p-10">
            <AdminDashboard
                clients={clients}
                coachName={coachName}
                upcomingSessions={upcomingSessions}
                onClientAdded={loadData}
            />
        </div>
    );
}