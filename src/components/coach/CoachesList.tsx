"use client";

import { coachService } from "@/services/coachService";
import { Coach } from "@/types/Coach";
import { useEffect, useState } from "react";
import CoachCard from "./CoachCard";

export default function CoachesList() {
  const [coaches, setCoaches] = useState<Coach[]>([]);

  useEffect(() => {
    coachService.getAll().then(setCoaches);
  }, []);

  const displayed = coaches.slice(0, 4);

  return (
    <div className="flex justify-center items-end gap-7 flex-wrap pt-5">
      {displayed.map((coach, index) => (
        <CoachCard key={coach.id} coach={coach} featured={index === 1} />
      ))}

      {displayed.length === 0 && (
        <p className="text-white/30 text-sm py-12">
          Aucun coach disponible pour le moment.
        </p>
      )}
    </div>
  );
}
