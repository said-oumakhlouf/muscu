import { FormData } from "@/interfaces/register";

interface StepPersonalProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepPersonal({ form, update }: StepPersonalProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">Prénom</label>
                    <input
                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                        placeholder="Prénom"
                        value={form.firstname}
                        onChange={(e) => update('firstname', e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">Nom</label>
                    <input
                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                        placeholder="Nom"
                        value={form.lastname}
                        onChange={(e) => update('lastname', e.target.value)}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Sexe</label>
                <select
                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors appearance-none cursor-pointer"
                    value={form.gender}
                    onChange={(e) => update('gender', e.target.value)}
                >
                    <option value="">Sélectionner</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                </select>
            </div>
        </div>
    );
}