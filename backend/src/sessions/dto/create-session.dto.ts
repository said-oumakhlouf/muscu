import { Transform } from 'class-transformer';

export class CreateSessionDto {
  userId: number;
  name: string;

  @Transform(({ value }) => (value ? new Date(value) : undefined))
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
