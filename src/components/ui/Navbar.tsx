'use client';

import { useAuth } from '@/context/AuthContext';
import { Calendar, ChevronDown, Dumbbell, LogOut, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const { role, token, isLoading, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/' && !token;

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const linkClass = (href: string) => {
        const isActive = pathname === href;
        const base = 'flex items-center gap-1.5 text-sm font-medium transition-all px-3 py-1.5 rounded-full';
        if (isHome) {
            return `${base} ${isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`;
        }
        return `${base} ${isActive ? 'bg-[#F3EEFF] text-[#7C5CBF]' : 'text-gray-500 hover:text-[#7C5CBF] hover:bg-[#F3EEFF]'}`;
    };

    return (
        <nav className={`px-8 py-4 flex items-center justify-between transition-all z-50 ${isHome ? 'absolute top-0 left-0 right-0 bg-transparent' : 'bg-white border-b border-gray-100 shadow-sm'}`}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isHome ? 'bg-white/20' : 'bg-[#7C5CBF]'}`}>
                    <Dumbbell size={18} className="text-white" />
                </div>
                <span
                    className={`text-2xl font-black tracking-tight ${isHome ? 'text-white' : 'text-[#1A1A2E]'}`}
                    style={{ fontFamily: 'var(--font-barlow)' }}
                >
                    TRAINITY
                </span>
            </Link>

            {/* Liens */}
            <div className="flex items-center gap-1">
                <Link href="/exercises" className={linkClass('/exercises')}>
                    <Dumbbell size={15} />
                    Exercices
                </Link>
                {role !== 'coach' && (
                    <Link href="/sessions" className={linkClass('/sessions')}>
                        <Calendar size={15} />
                        Séances
                    </Link>
                )}
                {role === 'coach' && (
                    <Link href="/admin" className={linkClass('/admin')}>
                        <Users size={15} />
                        Clients
                    </Link>
                )}
            </div>

            {/* Droite */}
            <div className="flex items-center gap-3">

                {/* CTA si non connecté */}
                {!token && !isLoading && (
                    <Link
                        href="/register"
                        className={`text-sm font-bold px-4 py-2 rounded-full transition ${isHome ? 'bg-white text-[#7C5CBF] hover:bg-zinc-100' : 'bg-[#7C5CBF] text-white hover:bg-[#6B4DAF]'}`}
                    >
                        Commencer
                    </Link>
                )}

                {/* Menu utilisateur */}
                <div className="relative">
                    <button
                        onClick={() => !isLoading && setMenuOpen(!menuOpen)}
                        className={`flex items-center gap-2 rounded-full px-3 py-2 transition ${isHome ? 'bg-white/15 hover:bg-white/25 border border-white/20' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                    >
                        <User size={15} className={isHome ? 'text-white' : 'text-gray-600'} />
                        <ChevronDown
                            size={13}
                            className={`transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''} ${isHome ? 'text-white/60' : 'text-gray-400'}`}
                        />
                    </button>

                    {menuOpen && !isLoading && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                            {token ? (
                                <>
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F3EEFF] hover:text-[#7C5CBF] transition mx-1 rounded-xl"
                                    >
                                        <User size={14} />
                                        Mon profil
                                    </Link>
                                    <hr className="my-1.5 border-gray-100 mx-3" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition w-full text-left mx-1 rounded-xl"
                                        style={{ width: 'calc(100% - 8px)' }}
                                    >
                                        <LogOut size={14} />
                                        Se déconnecter
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#F3EEFF] hover:text-[#7C5CBF] transition mx-1 rounded-xl"
                                >
                                    Se connecter
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}