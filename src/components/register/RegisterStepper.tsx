'use client';

import { FormData } from '@/interfaces/register';
import { Coach } from '@/types/Coach';
import { useState } from 'react';
import StepCoach from './StepCoach';
import StepCredentials from './StepCredential';
import StepIndicator from './StepIndicator';
import StepPersonal from './StepPersonal';
import StepPhysical from './StepPhysical';
import StepRole from './StepRole';
import StepCoachProfile from './StepCoachProfile';

interface RegisterStepperProps {
    coaches: Coach[];
    onSubmit: (data: FormData) => void;
    error: string;
}

export default function RegisterStepper({ coaches, onSubmit, error }: RegisterStepperProps) {
    const [role, setRole] = useState<'client' | 'coach' | null>(null);
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormData>({
        role: 'client',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        gender: '',
        weight: '',
        height: '',
        goal: '',
        coachId: '',
        speciality: '',
        bio: '',
        hourlyRate: '',
    });

    const update = (field: keyof FormData, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const handleRoleSelect = (selectedRole: 'client' | 'coach') => {
        setRole(selectedRole);
        setForm({ ...form, role: selectedRole });
        setStep(1);
    };

    const totalSteps = role === 'coach' ? 3 : 4;

    const isStepValid = () => {
        if (step === 0) return false;
        if (step === 1) return !!form.email && !!form.password;
        if (role === 'client') {
            if (step === 2) return !!form.firstname && !!form.lastname && !!form.gender;
            if (step === 3) return !!form.weight && !!form.height && !!form.goal;
        }
        if (role === 'coach') {
            if (step === 2) return !!form.firstname && !!form.lastname && !!form.gender;
            if (step === 3) return !!form.speciality;
        }
        return '';
    };

    const getStepTitle = () => {
        if (step === 0) return 'Bienvenue';
        if (step === 1) return 'Votre compte';
        if (role === 'coach') {
            if (step === 2) return 'Informations';
            if (step === 3) return 'Votre profil coach';
        }
        if (role === 'client') {
            if (step === 2) return 'Informations';
            if (step === 3) return 'Profil physique';
            if (step === 4) return 'Votre coach';
        }
        return '';
    };

    return (
        <div className="bg-white rounded-2xl border border-black/6 p-8 w-full max-w-md">

            <h1 className="text-2xl font-semibold text-[#1a1a2e] mb-1">Inscription</h1>
            <p className="text-sm text-gray-400 mb-6">{getStepTitle()}</p>

            {step > 0 && (
                <StepIndicator currentStep={step} totalSteps={totalSteps} />
            )}

            {error && (
                <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                    {error}
                </p>
            )}

            <div className="mt-6">
                {step === 0 && <StepRole onSelect={handleRoleSelect} />}

                {step === 1 && <StepCredentials form={form} update={update} />}

                {role === 'client' && step === 2 && <StepPersonal form={form} update={update} />}
                {role === 'client' && step === 3 && <StepPhysical form={form} update={update} />}
                {role === 'client' && step === 4 && <StepCoach form={form} update={update} coaches={coaches} />}

                {role === 'coach' && step === 2 && <StepPersonal form={form} update={update} />}
                {role === 'coach' && step === 3 && <StepCoachProfile form={form} update={update} />}

            </div>

            {step > 0 && (
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => step === 1 ? (setStep(0), setRole(null)) : setStep(step - 1)}
                        className="flex-1 border border-black/8 text-sm text-gray-500 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Retour
                    </button>

                    {step < totalSteps ? (
                        <button
                            onClick={() => isStepValid() && setStep(step + 1)}
                            className={`flex-1 rounded-xl py-3 text-sm font-semibold transition-colors ${isStepValid()
                                ? 'bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                }`}
                        >
                            Suivant
                        </button>
                    ) : (
                        <button
                            onClick={() => onSubmit(form)}
                            className="flex-1 bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white rounded-xl py-3 text-sm font-semibold transition-colors"
                        >
                            S&apos;inscrire
                        </button>
                    )}
                </div>
            )}

            <p className="text-center text-xs text-gray-400 mt-6">
                Déjà un compte ?{' '}
                <a href="/login" className="text-[#6C5CE7] font-medium hover:underline">
                    Se connecter
                </a>
            </p>
        </div>
    );
}