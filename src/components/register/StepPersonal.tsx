import { FormData } from "@/interfaces/register";

interface StepPersonalProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepPersonal({ form, update }: StepPersonalProps) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-gray-500 text-sm mb-2">Informations personnelles</p>
            <input
                className="border rounded-lg p-2 text-gray-800"
                placeholder="Prénom"
                value={form.firstname}
                onChange={(e) => update('firstname', e.target.value)}
            />
            <input
                className="border rounded-lg p-2 text-gray-800"
                placeholder="Nom"
                value={form.lastname}
                onChange={(e) => update('lastname', e.target.value)}
            />
            <select
                className="border rounded-lg p-2 text-gray-800"
                value={form.gender}
                onChange={(e) => update('gender', e.target.value)}
            >
                <option value="">Sexe</option>
                <option value="male">Homme</option>
                <option value="female">Femme</option>
            </select>
        </div>
    )
}