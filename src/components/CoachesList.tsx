'use client';

import { coachService } from '@/services/coachService';
import { Coach } from '@/types/Coach';
import { useEffect, useState } from 'react';
import CoachCard from './CoachCard';

export default function CoachesList() {
    const [coaches, setCoaches] = useState<Coach[]>([]);

    useEffect(() => {
        coachService.getAll().then(setCoaches);
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {coaches.map((coach) => (
                <CoachCard key={coach.id} coach={coach} />
            ))}
        </div>
    );
}