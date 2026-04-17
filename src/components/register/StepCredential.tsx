"use client";

import { FormData } from "@/interfaces/register";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface StepCredentialsProps {
  form: FormData;
  update: (field: keyof FormData, value: string) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRules = [
  { label: "8 caractères minimum", test: (p: string) => p.length >= 8 },
  { label: "1 majuscule", test: (p: string) => /[A-Z]/.test(p) },
  { label: "1 chiffre", test: (p: string) => /[0-9]/.test(p) },
];

export default function StepCredentials({
  form,
  update,
}: StepCredentialsProps) {
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailValid = emailRegex.test(form.email);
  const passwordValid = passwordRules.every((r) => r.test(form.password));

  const showEmailError = emailTouched && form.email.length > 0 && !emailValid;
  const showPasswordHints = passwordTouched && form.password.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400">Email</label>
        <input
          className={`bg-[#F5F5FB] border rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none transition-colors placeholder:text-gray-300
                        ${
                          showEmailError
                            ? "border-red-400 focus:border-red-400 bg-red-50"
                            : "border-[#6C5CE7]/15 focus:border-[#6C5CE7] focus:bg-[#faf9ff]"
                        }`}
          type="email"
          placeholder="email@exemple.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => setEmailTouched(true)}
        />
        {showEmailError && (
          <p className="text-xs text-red-400">Adresse email invalide</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-gray-400">
          Mot de passe
        </label>
        <div className="relative">
          <input
            className={`w-full bg-[#F5F5FB] border rounded-xl px-3 py-2.5 pr-10 text-sm text-[#1a1a2e] outline-none transition-colors placeholder:text-gray-300
                            ${
                              showPasswordHints && !passwordValid
                                ? "border-red-400 focus:border-red-400 bg-red-50"
                                : "border-[#6C5CE7]/15 focus:border-[#6C5CE7] focus:bg-[#faf9ff]"
                            }`}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            onBlur={() => setPasswordTouched(true)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {showPasswordHints && (
          <ul className="flex flex-col gap-1 mt-0.5">
            {passwordRules.map((rule) => {
              const ok = rule.test(form.password);
              return (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1.5 text-xs ${ok ? "text-green-500" : "text-red-400"}`}
                >
                  <span>{ok ? "✓" : "✗"}</span>
                  {rule.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
