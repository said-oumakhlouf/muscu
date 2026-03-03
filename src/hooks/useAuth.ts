'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}

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