import { ReactNode } from 'react';

interface StatCardProps {
    icon: ReactNode;
    value: string | number;
    label: string;
    sub: string;
}

/**
 * Card de stat générique — icône, valeur, label, sous-label.
 * Réutilisable partout dans l'app.
 */
export default function StatCard({ icon, value, label, sub }: StatCardProps) {
    return (
        <div className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white border border-[#E8DEFF] shadow-sm text-center">
            <div className="w-10 h-10 bg-[#F3EEFF] rounded-xl flex items-center justify-center">
                {icon}
            </div>
            <span className="text-3xl font-black text-[#1A1A2E] tracking-tight leading-none">{value}</span>
            <div>
                <p className="font-semibold text-[#1A1A2E] text-sm">{label}</p>
                <p className="text-[#9CA3AF] text-xs">{sub}</p>
            </div>
        </div>
    );
}