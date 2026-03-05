import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCoachDto } from './dto/create-coach.dto';

@Injectable()
export class CoachesService {
    constructor(private prisma: PrismaService) {}

    async create(createCoachDto: CreateCoachDto) {
        return this.prisma.coach.create({
            data: createCoachDto,
        });
    }

    async findAll() {
        return this.prisma.coach.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.coach.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    },
                },
                clients: true,
            },
        });
    }
}
