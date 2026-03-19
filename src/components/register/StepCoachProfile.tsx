'use client';

import { FormData } from '@/interfaces/register';

interface Props {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepCoachProfile({ form, update }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Spécialité</label>
                <input
                    type="text"
                    placeholder="Ex: Musculation, Yoga, CrossFit..."
                    value={form.speciality}
                    onChange={e => update('speciality', e.target.value)}
                    className="w-full border border-black/8 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]"
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Bio</label>
                <textarea
                    placeholder="Décris ton approche en quelques lignes..."
                    value={form.bio}
                    onChange={e => update('bio', e.target.value)}
                    className="w-full border border-black/8 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C5CE7] resize-none h-24"
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Tarif horaire (€)</label>
                <input
                    type="number"
                    placeholder="Ex: 50"
                    value={form.hourlyRate}
                    onChange={e => update('hourlyRate', e.target.value)}
                    className="w-full border border-black/8 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C5CE7]"
                />
            </div>
        </div>
    );
}