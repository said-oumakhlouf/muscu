'use client';

import { useEffect, useState } from 'react';
import { userService } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/User';
import Link from 'next/link';

export default function AdminPage() {
    const { token, role, isLoading } = useAuth();
    const [clients, setClients] = useState<User[]>([]);

    useEffect(() => {
        if (token && role === 'admin') {
            userService.getMyClients(token).then(setClients);
        }
    }, [token, role]);

    if (isLoading) return <div className="flex min-h-screen items-center justify-center">Chargement...</div>;
    if (role !== 'admin') return <div className="flex min-h-screen items-center justify-center text-red-500">Accès refusé</div>;

    return (
        <div className="flex min-h-screen flex-col items-center bg-zinc-50 p-10">
            <h1 className="text-5xl font-bold text-gray-800 mb-10">Mes Clients</h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full max-w-5xl">
                {clients.map((client) => (
                    <Link key={client.id} href={`/admin/clients/${client.id}`}>
                        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer">
                            <h2 className="text-xl font-bold text-gray-800">{client.email}</h2>
                            {client.firstname && <p className="text-gray-600">{client.firstname} {client.lastname}</p>}
                            {client.weight && <p className="text-sm text-gray-500">Poids : {client.weight}kg</p>}
                            {client.height && <p className="text-sm text-gray-500">Taille : {client.height}cm</p>}
                            {client.goal && <p className="text-sm text-gray-500">Objectif : {client.goal}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}