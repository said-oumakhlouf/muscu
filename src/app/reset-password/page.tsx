"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "react-hot-toast";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!password || !confirm) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (!token) {
      toast.error("Token manquant ou invalide.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        },
      );

      if (!res.ok) throw new Error();

      toast.success("Mot de passe réinitialisé !");
      router.push("/login");
    } catch {
      toast.error("Token invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E]">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">
          Nouveau mot de passe
        </h1>
        <p className="text-gray-500 mb-6">
          Choisissez un nouveau mot de passe pour votre compte.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CBF]"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CBF]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#7C5CBF] text-white font-semibold py-3 rounded-lg hover:bg-[#6a4daa] transition disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Réinitialiser le mot de passe"}
        </button>

        <div className="mt-4 text-center">
          <Link href="/login" className="text-sm text-gray-500 hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
