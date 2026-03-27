// src/components/sessions/ExerciseLibrary.tsx
'use client';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WgerExercise {
    id: number;
    name: string;
    category: string;
}
interface WgerApiExercise {
    id: number;
    name: string;
    category: { name: string } | null;
}

interface WgerApiResponse {
    results: WgerApiExercise[];
}

export default function ExerciseLibrary() {
    const [exercises, setExercises] = useState<WgerExercise[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://wger.de/api/v2/exerciseinfo/?format=json&language=2&limit=100')
            .then(res => res.json())
            .then((data: any) => {
                const list = data.results
                    .map((e: any) => {
                        const translation = e.translations?.find((t: any) => t.language === 2);
                        const name = translation?.name || '';
                        return {
                            id: e.id,
                            name,
                            category: e.category?.name || 'Autre',
                        };
                    })
                    .filter((e: any) => e.name);
                setExercises(list);
                setLoading(false);
            });
    }, []);

    const filtered = exercises.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDragStart = (e: React.DragEvent, exercise: WgerExercise) => {
        e.dataTransfer.setData('exercise', JSON.stringify({
            externalId: String(exercise.id),
            name: exercise.name,
        }));
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Bibliothèque d&apos;exercices</h2>

            {/* Recherche */}
            <div className="relative mb-4">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    className="w-full bg-zinc-50 border border-gray-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#7C5CBF] transition"
                    placeholder="Rechercher un exercice..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Liste */}
            {loading ? (
                <p className="text-gray-400 text-sm text-center py-8">Chargement...</p>
            ) : (
                <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
                    {filtered.map(exercise => (
                        <div
                            key={exercise.id}
                            draggable
                            onDragStart={e => handleDragStart(e, exercise)}
                            className="flex items-center justify-between px-4 py-3 bg-zinc-50 rounded-xl border border-gray-100 cursor-grab hover:border-[#7C5CBF]/30 hover:bg-[#F3EEFF] transition group"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-700 group-hover:text-[#7C5CBF]">{exercise.name}</p>
                                <p className="text-xs text-gray-400">{exercise.category}</p>
                            </div>
                            <span className="text-gray-300 text-xs group-hover:text-[#7C5CBF]">⠿ drag</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}