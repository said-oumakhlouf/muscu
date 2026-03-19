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

    async createCoachProfile(
        userId: number,
        data: {
            speciality?: string;
            bio?: string;
            hourlyRate?: number;
        },
    ) {
        return this.prisma.coach.create({
            data: {
                userId,
                specialty: data.speciality,
                bio: data.bio,
                hourlyRate: data.hourlyRate,
            },
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
            where: { role: 'client' },
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

    async getSessionsByCoach(userId: number) {
        const coach = await this.prisma.coach.findUnique({
            where: { userId },
        });
        if (!coach) return [];
        const clients = await this.prisma.user.findMany({
            where: { coachId: coach.id },
            select: { id: true, firstname: true, lastname: true },
        });
        const clientIds = clients.map((c) => c.id);

        if (clientIds.length === 0) return [];

        return this.prisma.session.findMany({
            where: {
                userId: { in: clientIds },
                scheduledAt: { gte: new Date() },
            },
            include: {
                user: {
                    select: { firstname: true, lastname: true },
                },
            },
            orderBy: { scheduledAt: 'asc' },
            take: 5,
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
