import { Exercise } from './Exercise';

export type SessionExercise = {
    id: number;
    sessionId: number;
    exerciseId: number;
    sets: number;
    reps: number;
    weight?: number;
    exercise: Exercise;
};

export type Session = {
    id: number;
    name: string;
    userId: number;
    createdAt: string;
    scheduledAt?: string;
    calories?: number;
    intensity?: 'low' | 'medium' | 'high';
    exercises: SessionExercise[];
    user?: { id: number; firstname: string; lastname: string };
};