'use client';

import { FormData } from '@/interfaces/register';
import { Coach } from '@/types/Coach';
import { useState } from 'react';
import StepCoach from './StepCoach';
import StepCredentials from './StepCredential';
import StepIndicator from './StepIndicator';
import StepPersonal from './StepPersonal';
import StepPhysical from './StepPhysical';

interface RegisterStepperProps {
    coaches: Coach[];
    onSubmit: (data: FormData) => void;
    error: string;
}

export default function RegisterStepper({ coaches, onSubmit, error }: RegisterStepperProps) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        gender: '',
        weight: '',
        height: '',
        goal: '',
        coachId: '',
    });

    const update = (field: keyof FormData, value: string) => {
        setForm({ ...form, [field]: value });
    };

    const isStepValid = () => {
        if (step === 1) return !!form.email && !!form.password;
        if (step === 2) return !!form.firstname && !!form.lastname && !!form.gender;
        if (step === 3) return !!form.weight && !!form.height && !!form.goal;
        return true;
    };

    const stepTitles = ['Votre compte', 'Informations', 'Profil physique', 'Votre coach'];

    return (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-8 w-full max-w-md">

            <h1 className="text-2xl font-semibold text-[#1a1a2e] mb-1">Inscription</h1>
            <p className="text-sm text-gray-400 mb-6">{stepTitles[step - 1]}</p>

            <StepIndicator currentStep={step} totalSteps={4} />

            {error && (
                <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-5">
                    {error}
                </p>
            )}

            <div className="mt-6">
                {step === 1 && <StepCredentials form={form} update={update} />}
                {step === 2 && <StepPersonal form={form} update={update} />}
                {step === 3 && <StepPhysical form={form} update={update} />}
                {step === 4 && <StepCoach form={form} update={update} coaches={coaches} />}
            </div>

            <div className="flex gap-3 mt-6">
                {step > 1 && (
                    <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 border border-black/[0.08] text-sm text-gray-500 rounded-xl py-3 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Retour
                    </button>
                )}
                {step < 4 ? (
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
                        S'inscrire
                    </button>
                )}
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
                Déjà un compte ?{' '}
                <a href="/login" className="text-[#6C5CE7] font-medium hover:underline">
                    Se connecter
                </a>
            </p>
        </div>
    );
}