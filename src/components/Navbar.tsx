'use client';

import { useAuth } from '@/context/AuthContext';
import { Calendar, ChevronDown, Dumbbell, LogOut, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const router = useRouter();
    const { role, token, isLoading, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname])


    return (
        <nav className={`px-8 py-4 flex items-center justify-between transition-all ${isHome ? 'absolute top-0 left-0 right-0 bg-transparent z-50' : 'bg-[#F3EEFF] border-b border-purple-100 shadow-sm'}`}>
            <Link href="/" className="flex items-center gap-2">
                <Dumbbell className={isHome ? 'text-white' : 'text-black'} size={24} />
                <span className={`text-xl font-bold ${isHome ? 'text-white' : 'text-gray-900'}`}>MusculApp</span>
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/exercises" className={`flex items-center gap-1 transition text-sm font-medium ${isHome ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                    <Dumbbell size={16} />
                    Exercices
                </Link>
                <Link href="/sessions" className={`flex items-center gap-1 transition text-sm font-medium ${isHome ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                    <Calendar size={16} />
                    Séances
                </Link>
                {role === 'admin' && (
                    <Link href="/admin" className={`flex items-center gap-1 transition text-sm font-medium ${isHome ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                        <Users size={16} />
                        Clients
                    </Link>
                )}

                <div className="relative">
                    <button
                        onClick={() => !isLoading && setMenuOpen(!menuOpen)}
                        className={`flex items-center gap-2 rounded-full px-3 py-2 transition ${isHome ? 'bg-white/20 hover:bg-white/30' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        <User size={16} className={isHome ? 'text-white' : 'text-gray-700'} />
                        <ChevronDown size={14} className={isHome ? 'text-white/70' : 'text-gray-500'} />
                    </button>

                    {menuOpen && !isLoading && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                            {token ? (
                                <>
                                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <User size={14} />
                                        Mon profil
                                    </Link>
                                    <hr className="my-1 border-gray-100" />
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 w-full text-left"
                                    >
                                        <LogOut size={14} />
                                        Se déconnecter
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Se connecter
                                    </Link>
                                    <Link href="/register" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        S'inscrire
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}