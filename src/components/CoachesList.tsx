'use client';

import { useEffect, useState } from 'react';
import { Coach } from '@/types/Coach';
import { coachService } from '@/services/coachService';
import CoachCard from './CoachCard';

export default function CoachesList() {
    const [coaches, setCoaches] = useState<Coach[]>([]);

    useEffect(() => {
        coachService.getAll().then(setCoaches);
    }, []);

    return (
        <section className="w-full max-w-5xl mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Nos Coachs</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {coaches.map((coach) => (
                    <CoachCard key={coach.id} coach={coach} />
                ))}
            </div>
        </section>
    );
}