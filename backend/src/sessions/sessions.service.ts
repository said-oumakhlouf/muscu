import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async create(createSessionDto: CreateSessionDto, userId: number) {
        return this.prisma.session.create({
            data: {
                name: createSessionDto.name,
                userId,
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

    async remove(id: number, userId: number) {
        await this.prisma.sessionExercise.deleteMany({
            where: { sessionId: id },
        });
        return this.prisma.session.delete({
            where: { id, userId },
        });
    }
}
