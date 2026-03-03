export class CreateSessionDto {
    userId: number;
    name: string;
    exercises: {
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
    }[];
}
