export type Exercise = {
    id: number;
    name: string;
    description: string;
    muscleGroup: string;
    imageUrl?: string;
    videoUrl?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    createdAt?: string;
};