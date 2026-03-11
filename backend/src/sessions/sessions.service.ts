import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async create(createSessionDto: CreateSessionDto) {
        return this.prisma.session.create({
            data: {
                name: createSessionDto.name,
                userId: createSessionDto.userId,
                scheduledAt: createSessionDto.scheduledAt,
                exercises: {
                    create: createSessionDto.exercises.map((e) => ({
                        exerciseId: e.exerciseId,
                        sets: e.sets,
                        reps: e.reps,
                        weight: e.weight,
                    })),
                },
            },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.session.findMany({
            where: { userId },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    }

    async findByUser(userId: number) {
        return this.prisma.session.findMany({
            where: { userId },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    }

    async findOne(id: number, userId: number) {
        return this.prisma.session.findFirst({
            where: { id, userId },
            include: {
                exercises: {
                    include: {
                        exercise: true,
                    },
                },
            },
        });
    }

    async remove(id: number) {
        await this.prisma.sessionExercise.deleteMany({
            where: { sessionId: id },
        });
        return this.prisma.session.delete({
            where: { id },
        });
    }

    async update(id: number, dto: UpdateSessionDto) {
        if (dto.exercises) {
            await this.prisma.sessionExercise.deleteMany({
                where: { sessionId: id },
            });
        }

        return this.prisma.session.update({
            where: { id },
            data: {
                ...(dto.name && { name: dto.name }),
                ...(dto.scheduledAt && { scheduledAt: dto.scheduledAt }),
                ...(dto.exercises && {
                    exercises: {
                        create: dto.exercises.map((e) => ({
                            exerciseId: e.exerciseId,
                            sets: e.sets,
                            reps: e.reps,
                            weight: e.weight,
                        })),
                    },
                }),
            },
            include: {
                exercises: { include: { exercise: true } },
            },
        });
    }
}
