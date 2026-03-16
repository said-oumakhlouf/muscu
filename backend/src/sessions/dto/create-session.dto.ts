export class CreateSessionDto {
    userId: number;
    name: string;
    scheduledAt?: Date;
    calories?: number;
    intensity?: 'low' | 'medium' | 'high';
    exercises: {
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
    }[];
}
