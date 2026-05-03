"use client";

import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/User";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { formatGoal } from "@/utils/goalLabels";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

interface AdminDashboardProps {
  clients: User[];
  coachName: string;
  upcomingSessions: {
    id: number;
    name: string;
    scheduledAt: string;
    user: { firstname: string; lastname: string };
  }[];
  onClientAdded: () => void;
}

export default function AdminDashboard({
  clients,
  coachName,
  upcomingSessions,
  onClientAdded,
}: AdminDashboardProps) {
  const { token } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!form.email || !form.firstname || !form.lastname || !form.password) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }
    setLoading(true);
    try {
      await fetchWithAuth(
        "${process.env.next_public_api_url}/users/invite",
        token!,
        {
          method: "POST",
          body: JSON.stringify(form),
        },
      );
      toast.success(`${form.firstname} a été ajouté !`);
      setModalOpen(false);
      setForm({ email: "", firstname: "", lastname: "", password: "" });
      onClientAdded();
    } catch {
      toast.error("Erreur lors de la création du client");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Clients actifs",
      value: String(clients.length),
      delta: "total",
      icon: "👤",
    },
    {
      label: "Poids moyen",
      value:
        clients.filter((c) => c.weight).length > 0
          ? `${Math.round(clients.reduce((acc, c) => acc + (Number(c.weight) || 0), 0) / clients.filter((c) => c.weight).length)}kg`
          : "—",
      delta: "moyenne",
      icon: "⚖️",
    },
    {
      label: "Taille moyenne",
      value:
        clients.filter((c) => c.height).length > 0
          ? `${Math.round(clients.reduce((acc, c) => acc + (Number(c.height) || 0), 0) / clients.filter((c) => c.height).length)}cm`
          : "—",
      delta: "moyenne",
      icon: "📏",
    },
    {
      label: "Objectifs",
      value: String(new Set(clients.map((c) => c.goal).filter(Boolean)).size),
      delta: "différents",
      icon: "🎯",
    },
  ];

  return (
    <div className="w-full max-w-5xl">
      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-7 w-full max-w-md flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Inviter un client
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Le client pourra se connecter avec ces identifiants
              </p>
            </div>

            {[
              { key: "firstname", placeholder: "Prénom", type: "text" },
              { key: "lastname", placeholder: "Nom", type: "text" },
              { key: "email", placeholder: "Email", type: "email" },
              {
                key: "password",
                placeholder: "Mot de passe temporaire",
                type: "password",
              },
            ].map((field) => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key as keyof typeof form]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#7C5CBF] transition"
              />
            ))}

            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleInvite}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-[#7C5CBF] text-white text-sm font-semibold hover:bg-[#6B4DAF] transition disabled:opacity-60"
              >
                {loading ? "Création..." : "Créer le compte"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Bienvenue, {coachName} 👋
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {clients.length} clients actifs
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#7C5CBF] text-white text-sm font-semibold hover:bg-[#6B4DAF] transition"
        >
          + Inviter un client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold tracking-tight leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-[#7C5CBF] font-medium mt-1.5">
                  {stat.delta}
                </p>
              </div>
              <span className="text-xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Prochaines séances */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-900">
              Prochaines séances
            </h2>
          </div>
          <div>
            {upcomingSessions.length === 0 ? (
              <p className="px-5 py-4 text-sm text-gray-400">
                Aucune séance planifiée
              </p>
            ) : (
              upcomingSessions.map((session, i) => (
                <div
                  key={session.id}
                  className={`px-5 py-3.5 flex items-center gap-3 ${i < upcomingSessions.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <Avatar
                    name={`${session.user.firstname} ${session.user.lastname}`}
                    size={38}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {session.user.firstname} {session.user.lastname}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session.name}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-700">
                      {new Date(session.scheduledAt).toLocaleDateString(
                        "fr-FR",
                        { day: "numeric", month: "short" },
                      )}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(session.scheduledAt).toLocaleTimeString(
                        "fr-FR",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Clients */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-gray-900">Mes clients</h2>
          </div>
          <div>
            {clients.length === 0 ? (
              <p className="px-5 py-4 text-sm text-gray-400">
                Aucun client pour l'instant
              </p>
            ) : (
              clients.map((client, i) => (
                <Link
                  key={client.id}
                  href={`/admin/clients/${client.id}`}
                  className={`px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors ${i < clients.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <Avatar
                    name={`${client.firstname} ${client.lastname}`}
                    size={38}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {client.firstname
                        ? `${client.firstname} ${client.lastname}`
                        : client.email}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {formatGoal(client.goal)}
                      {client.weight ? ` · ${client.weight}kg` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-[#7C5CBF] font-medium shrink-0">
                    Voir →
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
