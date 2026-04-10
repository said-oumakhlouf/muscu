import Image from "next/image";
import { Triangle, Circle, Heart, HelpCircle } from "lucide-react";

export type MuscleConfig =
  | { type: "png"; src: string; color: string; bg: string }
  | { type: "lucide"; icon: React.ReactNode; color: string; bg: string };

export const muscleGroupConfig: Record<string, MuscleConfig> = {
  Chest: {
    type: "png",
    src: "/icons/pectoraux.png",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  Back: {
    type: "png",
    src: "/icons/dos.png",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  Legs: {
    type: "png",
    src: "/icons/jambe.png",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  Arms: {
    type: "png",
    src: "/icons/bras.png",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  Shoulders: {
    type: "lucide",
    icon: <Triangle size={20} />,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  Core: {
    type: "lucide",
    icon: <Circle size={20} />,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  Cardio: {
    type: "lucide",
    icon: <Heart size={20} />,
    color: "text-red-500",
    bg: "bg-red-50",
  },
};

export function getMuscleConfig(muscleGroup: string): MuscleConfig {
  return (
    muscleGroupConfig[muscleGroup] ?? {
      type: "lucide",
      icon: <HelpCircle size={20} />,
      color: "text-gray-400",
      bg: "bg-gray-50",
    }
  );
}

export function MuscleIcon({
  muscleGroup,
  size = 20,
}: {
  muscleGroup: string;
  size?: number;
}) {
  const config = getMuscleConfig(muscleGroup);
  return (
    <div
      className={`flex items-center justify-center w-full h-full rounded-xl ${config.bg}`}
    >
      {config.type === "png" ? (
        <Image
          src={config.src}
          alt=""
          width={size}
          height={size}
          className="opacity-80"
        />
      ) : (
        config.icon
      )}
    </div>
  );
}
