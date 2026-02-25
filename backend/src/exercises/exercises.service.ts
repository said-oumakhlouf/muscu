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
    await this.prisma.exercise.delete({
      where: { id },
    });
    return { deleted: true };
  }
}
