import { FormData } from '@/interfaces/register';

interface StepCredentialsProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepCredentials({ form, update }: StepCredentialsProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Email</label>
                <input
                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                    type="email"
                    placeholder="email@exemple.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Mot de passe</label>
                <input
                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors placeholder:text-gray-300"
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                />
            </div>
        </div>
    );
}