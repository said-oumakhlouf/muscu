'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <nav className="bg-black text-white px-8 py-4 flex items-center justify-between">
            <span className="text-xl font-bold">💪 Muscu App</span>
            <div className="flex gap-6">
                <Link href="/" className="hover:text-gray-300">Exercices</Link>
                <Link href="/sessions" className="hover:text-gray-300">Séances</Link>
                <button onClick={handleLogout} className="hover:text-gray-300">Déconnexion</button>
            </div>
        </nav>
    );
}