export type Exercice = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    videoUrl: string;
    muscles: string[];
    equipment: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
};