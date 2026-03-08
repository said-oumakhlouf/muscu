import { FormData } from '@/interfaces/register';

interface StepCredentialsProps {
    form: FormData;
    update: (field: keyof FormData, value: string) => void;
}

export default function StepCredentials({ form, update }: StepCredentialsProps) {
    return (
        <div className="flex flex-col gap-3">
            <p className="text-gray-500 text-sm mb-2">Créez votre compte</p>
            <input
                className="border rounded-lg p-2 text-gray-800"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
            />
            <input
                className="border rounded-lg p-2 text-gray-800"
                type="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
            />
        </div>
    );
}