'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}

// Hook pour les pages PRIVÉES → redirige vers /login si pas connecté
export function useAuth() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const t = localStorage.getItem('token');
        setToken(t);
        setIsLoading(false);
        if (!t) {
            router.push('/login');
        } else {
            const decoded = jwtDecode<JwtPayload>(t);
            setRole(decoded.role);
        }
    }, [router]);

    return { token, role, isLoading };
}

// Hook pour les pages PUBLIQUES → pas de redirection
export function useOptionalAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const t = localStorage.getItem('token');
        setToken(t);
        if (t) {
            const decoded = jwtDecode<JwtPayload>(t);
            setRole(decoded.role);
        }
    }, []);

    return { token, role };
}