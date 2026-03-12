'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, AuthContextType } from '@/interfaces/auth';


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const t = sessionStorage.getItem('token');
        if (t) {
            setToken(t);
            const decoded = jwtDecode<JwtPayload>(t);
            setRole(decoded.role);
            setUserId(decoded.sub)
        }
        setIsLoading(false);
    }, []);

    const login = (t: string) => {
        sessionStorage.setItem('token', t);
        setToken(t);
        const decoded = jwtDecode<JwtPayload>(t);
        setRole(decoded.role);
        setUserId(decoded.sub);
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setToken(null);
        setRole(null);
        setUserId(null)
    };

    return (
        <AuthContext.Provider value={{ token, role, userId ,isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}