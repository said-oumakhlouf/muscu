export class CreateSessionDto {
    name: string;
    exercises: {
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
    }[];
}
