'use client';

import { useState } from "react";
import Model from "react-body-highlighter";
import { Exercise } from "@/types/Exercise";
import ExerciseEditForm from "./ExerciseEditForm";
import { getMuscleConfig, MuscleIcon } from "@/utils/muscleGroupConfig";
import { MUSCLE_GROUPS } from "@/constants/muscleGroups";

interface ExerciseCardProps {
  exercise: Exercise;
  role: string | null;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  onUpdated: () => void;
  onDeleted: () => void;
}

function getMuscleLabel(muscleGroup: string) {
  return (
    MUSCLE_GROUPS.find((g) => g.value === muscleGroup)?.label ?? muscleGroup
  );
}

const muscleMap: Record<string, string[]> = {
  Chest: ["chest"],
  Back: ["upper-back", "lower-back"],
  Legs: ["quadriceps", "hamstring", "calves"],
  Arms: ["biceps", "triceps", "forearm"],
  Shoulders: ["front-deltoids", "back-deltoids"],
  Core: ["abs"],
  Cardio: [],
};

export default function ExerciseCard({
  exercise,
  role,
  editingId,
  setEditingId,
  onUpdated,
  onDeleted,
}: ExerciseCardProps) {
  const isEditing = editingId === exercise.id;
  const muscle = getMuscleConfig(exercise.muscleGroup);
  const [showBody, setShowBody] = useState(false);

  const muscles = muscleMap[exercise.muscleGroup] ?? [];
  const data = muscles.length > 0 ? [{ name: exercise.name, muscles }] : [];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#ece9f8] flex flex-col gap-2 transition hover:shadow-md">
      {isEditing ? (
        <ExerciseEditForm
          exercise={exercise}
          onUpdated={onUpdated}
          onCancel={() => setEditingId(null)}
        />
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-xl ${muscle.bg}`}>
              <MuscleIcon muscleGroup={exercise.muscleGroup} size={32} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-800 leading-tight">
                {exercise.name}
              </h3>
              <span className={`inline-block text-xs font-semibold mt-1 ${muscle.color}`}>
                {getMuscleLabel(exercise.muscleGroup)}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed flex-1">
            {exercise.description}
          </p>

          {muscles.length > 0 && (
            <button
              onClick={() => setShowBody(!showBody)}
              className="flex items-center gap-1.5 text-xs text-[#7c3aed] font-semibold mt-1 w-fit px-3 py-1.5 rounded-lg bg-[#f5f3ff] hover:bg-[#ede9fe] transition"
            >
              <span>{showBody ? "▲" : "▼"}</span>
              {showBody ? "Masquer le schéma" : "Voir les muscles ciblés"}
            </button>
          )}

          {showBody && muscles.length > 0 && (
            <div className="flex justify-center gap-4 mt-2 p-3 bg-[#faf9ff] rounded-xl border border-[#ece9f8]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Avant</span>
                <Model
                  data={data}
                  style={{ width: "100px" }}
                  highlightedColors={["#7C5CBF"]}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Arrière</span>
                <Model
                  data={data}
                  style={{ width: "100px" }}
                  highlightedColors={["#7C5CBF"]}
                  type="posterior"
                />
              </div>
            </div>
          )}

          {(role === "admin" || role === "coach") && (
            <div className="flex gap-2 mt-2 pt-3 border-t border-[#f5f3ff]">
              <button
                onClick={() => setEditingId(exercise.id)}
                className="flex-1 bg-[#f5f3ff] hover:bg-[#ede9fe] text-[#7c3aed] text-xs font-semibold py-2 rounded-lg transition"
              >
                Modifier
              </button>
              <button
                onClick={onDeleted}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold py-2 rounded-lg transition"
              >
                Supprimer
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}