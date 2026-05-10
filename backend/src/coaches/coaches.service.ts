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

    async findAll(specialty?: string, search?: string) {
        return this.prisma.coach.findMany({
            where: {
                ...(specialty ? { specialty } : {}),
                ...(search
                    ? {
                          OR: [
                              {
                                  specialty: {
                                      contains: search,
                                      mode: 'insensitive',
                                  },
                              },
                              {
                                  bio: {
                                      contains: search,
                                      mode: 'insensitive',
                                  },
                              },
                              {
                                  user: {
                                      firstname: {
                                          contains: search,
                                          mode: 'insensitive',
                                      },
                                  },
                              },
                              {
                                  user: {
                                      lastname: {
                                          contains: search,
                                          mode: 'insensitive',
                                      },
                                  },
                              },
                          ],
                      }
                    : {}),
            },
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
