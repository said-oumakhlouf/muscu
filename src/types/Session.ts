import { Exercice } from "./Exercice";

export type Session = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    exercices: Exercice[]; // Array of Exercice IDs
    duration: number; // Duration in minutes
    difficulty: "beginner" | "intermediate" | "advanced";
};