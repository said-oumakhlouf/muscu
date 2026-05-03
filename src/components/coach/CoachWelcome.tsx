"use client";

import { useAuth } from "@/context/AuthContext";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { Calendar, Dumbbell, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const shortcuts = [
  {
    href: "/sessions",
    icon: Calendar,
    label: "Séances",
    description: "Gérer tes séances",
  },
  {
    href: "/admin",
    icon: Users,
    label: "Clients",
    description: "Voir tes clients",
  },
  {
    href: "/exercises",
    icon: Dumbbell,
    label: "Exercices",
    description: "Bibliothèque d'exercices",
  },
];

export default function CoachWelcome() {
  const { token } = useAuth();
  const [firstname, setFirstname] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchWithAuth(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      token,
    ).then((data) => setFirstname(data.firstname ?? null));
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 py-24">
      <div className="max-w-xl w-full text-center">
        {/* Badge */}
        <span className="text-[11px] font-medium tracking-widest uppercase text-[#7c3aed] bg-[#ede9fe] border border-[#7c3aed]/20 px-4 py-1.5 rounded-full inline-block mb-7">
          Espace coach
        </span>

        {/* Greeting */}
        <h1
          className="text-[6rem] font-black uppercase leading-none text-[#1A1A2E] mb-4 tracking-tight"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Bonjour,
          <br />
          <span className="text-[#7c3aed]">{firstname ?? "Coach"}.</span>
        </h1>

        <p className="text-lg text-gray-400 font-light mb-8">
          Que veux-tu faire aujourd&apos;hui ?
        </p>

        <div className="w-full h-px bg-[#e5d9f9] mb-8" />

        {/* Shortcuts */}
        <div className="flex flex-col gap-3">
          {shortcuts.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="bg-white rounded-2xl px-8 py-6 flex items-center gap-5 border-[1.5px] border-transparent hover:border-[#7c3aed] transition-colors group"
            >
              <div className="w-14 h-14 bg-[#F3EEFF] rounded-xl flex items-center justify-center shrink-0">
                <s.icon size={30} className="text-[#7c3aed]" />
              </div>
              <div className="flex-1 text-left">
                <span
                  className="block text-[1.4rem] font-black uppercase leading-none text-[#1A1A2E] mb-1"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {s.label}
                </span>
                <span className="text-sm text-gray-400 font-light">
                  {s.description}
                </span>
              </div>
              <span className="text-[#7c3aed] text-xl opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
