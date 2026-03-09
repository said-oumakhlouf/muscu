import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findOne(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            include: {
                coach: {
                    include: {
                        user: {
                            select: {
                                firstname: true,
                                lastname: true,
                            },
                        },
                    },
                },
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            where: { role: 'user' },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                weight: true,
                height: true,
                goal: true,
                createdAt: true,
            },
        });
    }

    async getClientsByCoach(userId: number) {
        const coach = await this.prisma.coach.findUnique({
            where: { userId },
        });
        if (!coach) return [];
        return this.prisma.user.findMany({
            where: { coachId: coach.id },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                weight: true,
                height: true,
                goal: true,
                gender: true,
            },
        });
    }

    async updateProfile(userId: number, data: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                weight: true,
                height: true,
                goal: true,
                gender: true,
            },
        });
    }
}
