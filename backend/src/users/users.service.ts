import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
