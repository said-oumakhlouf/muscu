import { FormData } from "@/interfaces/register";

interface StepPhysicalProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepPhysical({ form, update }: StepPhysicalProps) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-gray-500 text-sm mb-2">Votre profil physique</p>
            <input
                className="border rounded-lg p-2 text-gray-800"
                placeholder="Poids (kg)"
                type="number"
                value={form.weight}
                onChange={(e) => update('weight',e.target.value)}
            />
            <input
                className="border rounded-lg p-2 text-gray-800"
                placeholder="Taille (cm)"
                type="number"
                value={form.height}
                onChange={(e) => update('height',e.target.value)}
            />
            <select
                className="border rounded-lg p-2 text-gray-800"
                value={form.goal}
                onChange={(e) => update('goal', e.target.value)}
            >
                <option value="">Objectifs</option>
                <option value="weight_loss">Perte de poids</option>
                <option value="muscle_gain">Prise de masse</option>
                <option value="maintenance">Maintien</option>
            </select>
        </div>
    )
}