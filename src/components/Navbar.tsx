'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOptionalAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { User, LogOut, ChevronDown, Dumbbell, Calendar, Users } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const { role } = useOptionalAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
            <Link href="/" className="flex items-center gap-2">
                <Dumbbell className="text-black" size={24} />
                <span className="text-xl font-bold text-gray-900">MusculApp</span>
            </Link>

            <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-black transition text-sm font-medium">
                    <Dumbbell size={16} />
                    Exercices
                </Link>
                <Link href="/sessions" className="flex items-center gap-1 text-gray-600 hover:text-black transition text-sm font-medium">
                    <Calendar size={16} />
                    Séances
                </Link>
                {role === 'admin' && (
                    <Link href="/admin" className="flex items-center gap-1 text-gray-600 hover:text-black transition text-sm font-medium">
                        <Users size={16} />
                        Clients
                    </Link>
                )}

                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition"
                    >
                        <User size={16} className="text-gray-700" />
                        <ChevronDown size={14} className="text-gray-500" />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
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
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}