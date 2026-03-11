export class CreateSessionDto {
    userId: number;
    name: string;
    scheduledAt?: Date;
    exercises: {
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
    }[];
}
