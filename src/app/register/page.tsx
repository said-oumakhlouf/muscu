'use client';

import RegisterStepper from '@/components/register/RegisterStepper';
import { useAuth } from '@/context/AuthContext';
import { coachService } from '@/services/coachService';
import { Coach } from '@/types/Coach';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        coachService.getAll().then(setCoaches);
    }, []);

    const handleSubmit = async (form: {
        role: string;
        email: string;
        password: string;
        firstname: string;
        lastname: string;
        gender: string;
        weight: string;
        height: string;
        goal: string;
        coachId: string;
        speciality: string;
        bio: string;
        hourlyRate: string;
    }) => {
        const res = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...form,
                weight: form.weight ? Number(form.weight) : undefined,
                height: form.height ? Number(form.height) : undefined,
                coachId: form.coachId ? Number(form.coachId) : undefined,
                hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : undefined,
            }),
        });

        if (!res.ok) {
            setError('Une erreur est survenue');
            return;
        }

        const loginRes = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email, password: form.password }),
        });

        const data = await loginRes.json();
        login(data.access_token);
        
        if (form.role === 'coach') {
            router.push('/admin');
        } else { router.push('/sessions') };
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 py-10">
            <RegisterStepper coaches={coaches} onSubmit={handleSubmit} error={error} />
        </div>
    );
}