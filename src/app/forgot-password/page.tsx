"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    if (!email) {
      toast.error("Veuillez saisir votre email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (!res.ok) throw new Error();

      setSent(true);
    } catch {
      toast.error("Une erreur est survenue, réessayez.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E]">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">📬</div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">
            Email envoyé !
          </h1>
          <p className="text-gray-500 mb-6">
            Si cet email est associé à un compte, vous recevrez un lien de
            réinitialisation dans quelques minutes.
          </p>
          <Link
            href="/login"
            className="text-[#7C5CBF] font-semibold hover:underline"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A2E]">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-[#1A1A2E] mb-2">
          Mot de passe oublié
        </h1>
        <p className="text-gray-500 mb-6">
          Saisissez votre email et on vous envoie un lien pour réinitialiser
          votre mot de passe.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5CBF]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#7C5CBF] text-white font-semibold py-3 rounded-lg hover:bg-[#6a4daa] transition disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer le lien"}
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
