import { FormData } from "@/interfaces/register";

interface StepPhysicalProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepPhysical({ form, update }: StepPhysicalProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">Poids (kg)</label>
                    <input
                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                        placeholder="ex: 75"
                        type="number"
                        min={30}
                        max={250}
                        value={form.weight}
                        onChange={(e) => update('weight', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">Taille (cm)</label>
                    <input
                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                        placeholder="ex: 175"
                        type="number"
                        min={100}
                        max={250}
                        value={form.height}
                        onChange={(e) => update('height', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Objectif</label>
                <select
                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors appearance-none cursor-pointer"
                    value={form.goal}
                    onChange={(e) => update('goal', e.target.value)}
                >
                    <option value="">Sélectionner</option>
                    <option value="weight_loss">Perte de poids</option>
                    <option value="muscle_gain">Prise de masse</option>
                    <option value="maintenance">Maintien</option>
                </select>
            </div>
        </div>
    );
}