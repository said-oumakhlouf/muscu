'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}

interface AuthContextType {
    token: string | null;
    role: string | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const t = localStorage.getItem('token');
        if (t) {
            setToken(t);
            const decoded = jwtDecode<JwtPayload>(t);
            setRole(decoded.role);
        }
        setIsLoading(false);
    }, []);

    const login = (t: string) => {
        localStorage.setItem('token', t);
        setToken(t);
        const decoded = jwtDecode<JwtPayload>(t);
        setRole(decoded.role);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}