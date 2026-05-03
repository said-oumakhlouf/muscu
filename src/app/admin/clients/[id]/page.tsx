"use client";

import CreateSessionForm from "@/components/sessions/CreateSessionForm";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { sessionService } from "@/services/sessionService";
import { userService } from "@/services/userService";
import { Session } from "@/types/Session";
import { User } from "@/types/User";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { formatGoal } from "@/utils/goalLabels";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const GOAL_OPTIONS = [
  { value: "weight_loss", label: "Perte de poids" },
  { value: "muscle_gain", label: "Prise de masse" },
  { value: "endurance", label: "Endurance" },
  { value: "flexibility", label: "Flexibilité" },
  { value: "general_fitness", label: "Forme générale" },
];

const GENDER_OPTIONS = [
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
  { value: "other", label: "Autre" },
];

export default function ClientDetailPage() {
  const { token, role, isLoading } = useAuth();
  const { id } = useParams();
  const [client, setClient] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [deletingSessionId, setDeletingSessionId] = useState<number | null>(
    null,
  );
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    weight: "",
    height: "",
    goal: "",
    gender: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  const handleDelete = async () => {
    if (!deletingSessionId) return;
    await sessionService.delete(token!, deletingSessionId);
    setSessions(sessions.filter((s) => s.id !== deletingSessionId));
    setDeletingSessionId(null);
  };

  const handleUpdate = async () => {
    if (!editingSession) return;
    await sessionService.update(token!, editingSession.id, {
      name: editingSession.name,
      scheduledAt: editingSession.scheduledAt
        ? new Date(editingSession.scheduledAt)
        : undefined,
      exercises: editingSession.exercises.map((se) => ({
        exerciseId: se.exercise.id,
        sets: se.sets,
        reps: se.reps,
        weight: se.weight,
      })),
    });
    setEditingSession(null);
    userService.getSessions(token!, Number(id)).then(setSessions);
  };

  const openProfileModal = () => {
    setProfileForm({
      weight: client?.weight ? String(client.weight) : "",
      height: client?.height ? String(client.height) : "",
      goal: client?.goal ?? "",
      gender: client?.gender ?? "",
    });
    setEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      await fetchWithAuth(
        `${process.env.next_public_api_url}/users/${id}`,
        token!,
        {
          method: "PATCH",
          body: JSON.stringify({
            weight: profileForm.weight ? Number(profileForm.weight) : undefined,
            height: profileForm.height ? Number(profileForm.height) : undefined,
            goal: profileForm.goal || undefined,
            gender: profileForm.gender || undefined,
          }),
        },
      );
      toast.success("Profil mis à jour");
      setEditingProfile(false);
      userService.getOne(token!, Number(id)).then(setClient);
    } catch {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setSavingProfile(false);
    }
  };

  useEffect(() => {
    if (token && role === "coach" && id) {
      const numericId = Number(id);
      if (isNaN(numericId)) return;
      userService.getOne(token, numericId).then(setClient);
      userService.getSessions(token, numericId).then(setSessions);
    }
  }, [token, role, id]);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEEEF8]">
        Chargement...
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col bg-[#EEEEF8] p-10">
      {client && (
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-5">
          {/* Card client */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-7">
            {/* Avatar + nom */}
            <div className="flex items-center justify-between pb-6 border-b border-black/[0.06]">
              <div className="flex items-center gap-5">
                <Avatar
                  name={`${client.firstname} ${client.lastname}`}
                  size={64}
                />
                <div>
                  <h1 className="text-xl font-semibold text-[#1a1a2e]">
                    {client.firstname} {client.lastname}
                  </h1>
                  <p className="text-sm text-gray-400 mt-0.5">{client.email}</p>
                </div>
              </div>
              <button
                onClick={openProfileModal}
                className="text-xs px-4 py-2 rounded-xl border border-[#6C5CE7]/20 text-[#6C5CE7] hover:bg-[#f0eeff] transition-colors font-medium"
              >
                ✏️ Modifier le profil
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                {
                  label: "Poids",
                  value: client.weight ? `${client.weight}` : "—",
                  unit: client.weight ? "kg" : "",
                },
                {
                  label: "Taille",
                  value: client.height ? `${client.height}` : "—",
                  unit: client.height ? "cm" : "",
                },
                { label: "Objectif", value: formatGoal(client.goal), unit: "" },
              ].map(({ label, value, unit }) => (
                <div
                  key={label}
                  className="bg-[#F5F5FB] rounded-xl p-4 text-center"
                >
                  <p className="text-lg font-bold text-[#1a1a2e]">
                    {value}
                    {unit && (
                      <span className="text-xs font-normal text-gray-400 ml-0.5">
                        {unit}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#9990cc] font-medium mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire nouvelle séance */}
          <div className="bg-white rounded-2xl border border-black/[0.06] p-7">
            <CreateSessionForm
              token={token!}
              clientId={Number(id)}
              onCreated={() =>
                userService.getSessions(token!, Number(id)).then(setSessions)
              }
            />
          </div>

          {/* Liste séances */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc] mb-3 px-1">
              Séances
            </p>
            <div className="flex flex-col gap-3">
              {sessions.length === 0 && (
                <div className="bg-white rounded-2xl border border-black/[0.06] p-8 text-center text-gray-400 text-sm">
                  Aucune séance pour ce client.
                </div>
              )}
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl border border-black/[0.06] px-6 py-4 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#1a1a2e] text-sm">
                        {session.name}
                      </h3>
                      <StatusBadge scheduledAt={session.scheduledAt} />
                    </div>
                    <p className="text-xs text-gray-400">
                      {session.exercises.length} exercice
                      {session.exercises.length !== 1 ? "s" : ""}
                      {session.scheduledAt &&
                        ` · ${new Date(session.scheduledAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link
                      href={`/sessions/${session.id}`}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                    >
                      👁️ Voir
                    </Link>
                    <button
                      onClick={() => setEditingSession(session)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-[#6C5CE7]/20 text-[#6C5CE7] hover:bg-[#f0eeff] transition-colors"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => setDeletingSessionId(session.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 transition-colors"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal modifier profil client */}
          {editingProfile && (
            <div
              className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
              onClick={() => setEditingProfile(false)}
            >
              <div
                className="bg-white rounded-2xl p-7 w-full max-w-md flex flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h2 className="text-lg font-bold text-[#1a1a2e]">
                    Modifier le profil
                  </h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {client.firstname} {client.lastname}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">
                      Poids (kg)
                    </label>
                    <input
                      type="number"
                      placeholder="ex: 75"
                      value={profileForm.weight}
                      onChange={(e) =>
                        setProfileForm((p) => ({
                          ...p,
                          weight: e.target.value,
                        }))
                      }
                      className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#6C5CE7] transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-gray-400">
                      Taille (cm)
                    </label>
                    <input
                      type="number"
                      placeholder="ex: 175"
                      value={profileForm.height}
                      onChange={(e) =>
                        setProfileForm((p) => ({
                          ...p,
                          height: e.target.value,
                        }))
                      }
                      className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#6C5CE7] transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-400">
                    Objectif
                  </label>
                  <select
                    value={profileForm.goal}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, goal: e.target.value }))
                    }
                    className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#6C5CE7] transition bg-white"
                  >
                    <option value="">— Sélectionner —</option>
                    {GOAL_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-gray-400">
                    Genre
                  </label>
                  <select
                    value={profileForm.gender}
                    onChange={(e) =>
                      setProfileForm((p) => ({ ...p, gender: e.target.value }))
                    }
                    className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#6C5CE7] transition bg-white"
                  >
                    <option value="">— Sélectionner —</option>
                    {GENDER_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3 mt-1">
                  <button
                    onClick={() => setEditingProfile(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={savingProfile}
                    className="flex-1 py-2.5 rounded-xl bg-[#6C5CE7] text-white text-sm font-semibold hover:bg-[#5a4bd0] transition disabled:opacity-60"
                  >
                    {savingProfile ? "Sauvegarde..." : "Sauvegarder"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal modifier séance */}
          {editingSession && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-7 w-full max-w-md border border-black/[0.06]">
                <h3 className="text-base font-semibold text-[#1a1a2e] mb-5">
                  Modifier la séance
                </h3>
                <div className="flex flex-col gap-1.5 mb-4">
                  <label className="text-xs font-medium text-gray-400">
                    Nom de la séance
                  </label>
                  <input
                    className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-xl px-3 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] focus:bg-[#faf9ff] transition-colors w-full"
                    value={editingSession.name}
                    onChange={(e) =>
                      setEditingSession({
                        ...editingSession,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9990cc] mb-3">
                  Exercices
                </p>
                {editingSession.exercises.map((se, index) => (
                  <div key={se.id} className="flex gap-2 mb-2 items-center">
                    <span className="flex-1 text-sm text-[#1a1a2e] truncate">
                      {se.exercise.name}
                    </span>
                    {[
                      { key: "sets", placeholder: "Séries" },
                      { key: "reps", placeholder: "Reps" },
                      { key: "weight", placeholder: "Kg" },
                    ].map(({ key, placeholder }) => (
                      <input
                        key={key}
                        className="bg-[#F5F5FB] border border-[#6C5CE7]/15 rounded-lg p-1.5 w-16 text-center text-sm text-[#1a1a2e] outline-none focus:border-[#6C5CE7] transition-colors"
                        type="number"
                        placeholder={placeholder}
                        value={(se as any)[key] || ""}
                        onChange={(e) => {
                          const updated = [...editingSession.exercises];
                          updated[index] = {
                            ...updated[index],
                            [key]: Number(e.target.value),
                          };
                          setEditingSession({
                            ...editingSession,
                            exercises: updated,
                          });
                        }}
                      />
                    ))}
                  </div>
                ))}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setEditingSession(null)}
                    className="px-4 py-2 rounded-xl border border-black/[0.08] text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-4 py-2 rounded-xl bg-[#6C5CE7] hover:bg-[#5a4bd0] text-white text-sm font-semibold transition-colors"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal supprimer séance */}
          {deletingSessionId && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-7 w-full max-w-sm border border-black/[0.06]">
                <h3 className="text-base font-semibold text-[#1a1a2e] mb-2">
                  Supprimer la séance ?
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Cette action est irréversible.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeletingSessionId(null)}
                    className="px-4 py-2 rounded-xl border border-black/[0.08] text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
