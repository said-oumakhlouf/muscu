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
    exercises: SessionExercise[];
};