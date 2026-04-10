import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: createExerciseDto,
    });
  }

  async findAll() {
    return this.prisma.exercise.findMany();
  }

  async findOne(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  async remove(id: number) {
    await this.prisma.sessionExercise.deleteMany({
      where: { exerciseId: id },
    });
    return this.prisma.exercise.delete({
      where: { id },
    });
  }

  async findOrCreate(name: string, externalId?: string, muscleGroup?: string) {
    // Cherche d'abord par externalId si fourni
    if (externalId) {
      const byExternalId = await this.prisma.exercise.findFirst({
        where: { externalId },
      });
      if (byExternalId) return byExternalId;
    }

    // Sinon cherche par nom
    const existing = await this.prisma.exercise.findFirst({
      where: { name },
    });
    if (existing) return existing;

    // Crée avec muscleGroup si fourni
    return this.prisma.exercise.create({
      data: {
        name,
        description: '',
        muscleGroup: muscleGroup || 'Autre',
        externalId: externalId || null,
      },
    });
  }
}
