import { Exercise } from "./Exercise";

export type Session = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    exercices: Exercise[]; // Array of Exercise objects
    duration: number; // Duration in minutes
    difficulty: "beginner" | "intermediate" | "advanced";
};