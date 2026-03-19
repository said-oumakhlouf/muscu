'use client';

interface Props {
    onSelect: (role: 'client' | 'coach') => void;
}

export default function StepRole({ onSelect }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => onSelect('client')}
                className="border border-black/8 rounded-xl p-5 text-left hover:border-[#6C5CE7] transition-colors group"
            >
                <p className="font-semibold text-[#1a1a2e] group-hover:text-[#6C5CE7]">Je suis client</p>
                <p className="text-xs text-gray-400 mt-1">Je cherche un coach pour m&apos;accompagner</p>
            </button>
            <button
                onClick={() => onSelect('coach')}
                className="border border-black/8 rounded-xl p-5 text-left hover:border-[#6C5CE7] transition-colors group"
            >
                <p className="font-semibold text-[#1a1a2e] group-hover:text-[#6C5CE7]">Je suis coach</p>
                <p className="text-xs text-gray-400 mt-1">Je veux gérer mes clients avec Trainity</p>
            </button>
        </div>
    )
}