'use client';

import { useState } from 'react';
import { Coach } from '@/types/Coach';
import { FormData } from '@/interfaces/register';
import StepIndicator from './register/StepIndicator';
import StepPersonal from './register/StepPersonal';
import StepCredentials from './register/StepCredential';
import StepPhysical from './register/StepPhysical';
import StepCoach from './register/StepCoach';


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

    return (
        <div className="bg-white rounded-xl p-8 shadow w-full max-w-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Inscription</h1>

            <StepIndicator currentStep={step} totalSteps={4}/>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {step === 1 && (
                <StepCredentials form={form} update={update}/>
            )}

            {step === 2 && (
                <StepPersonal form={form} update={update}/>
            )}

            {step === 3 && (
                <StepPhysical form={form} update={update} />
            )}

            {step === 4 && (
                <StepCoach form={form} update={update} coaches={coaches}/>
            )}

            <div className="flex gap-3 mt-6">
                {step > 1 && (
                    <button onClick={() => setStep(step - 1)} className="flex-1 border border-gray-300 text-gray-700 rounded-lg p-2 font-bold hover:bg-gray-50">
                        Retour
                    </button>
                )}
                {step < 4 ? (
                    <button onClick={() => isStepValid() && setStep(step + 1)}
                        className={`flex-1 rounded-lg p-2 font-bold transition ${isStepValid() ? 'bg-black text-white hover:bg-zinc-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                        Suivant
                    </button>
                ) : (
                    <button onClick={() => onSubmit(form)} className="flex-1 bg-black text-white rounded-lg p-2 font-bold hover:bg-zinc-800">
                        S'inscrire
                    </button>
                )}
            </div>
        </div>
    );
}