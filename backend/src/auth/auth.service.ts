import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    async register(
        email: string,
        password: string,
        role?: string,
        firstname?: string,
        lastname?: string,
        weight?: number,
        height?: number,
        goal?: string,
        gender?: string,
        coachId?: number,
        speciality?: string,
        bio?: string,
        hourlyRate?: number,
    ) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            if (role === 'coach') {
                const user = await this.usersService.create({
                    email,
                    password: hashedPassword,
                    role: 'coach',
                    firstname,
                    lastname,
                    gender,
                });

                await this.usersService.createCoachProfile(user.id, {
                    speciality,
                    bio,
                    hourlyRate,
                });

                return { message: 'Coach créé avec succès' };
            }

            await this.usersService.create({
                email,
                password: hashedPassword,
                firstname,
                lastname,
                weight,
                height,
                goal,
                gender,
                coachId,
            });
            return { message: 'Utilisateur créé avec succès' };
        } catch (error) {
            const err = error as { code?: string };
            if (err.code === 'P2002') {
                throw new ConflictException('Cet email est déjà utilisé');
            }
            throw error;
        }
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        // On ne révèle pas si l'email existe ou non (sécurité)
        if (!user) return;

        // Supprimer les anciens tokens de cet utilisateur
        await this.prisma.passwordResetToken.deleteMany({
            where: { userId: user.id },
        });

        // Générer un token aléatoire
        const token = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

        await this.prisma.passwordResetToken.create({
            data: { token, userId: user.id, expiresAt },
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await this.mailService.sendPasswordResetEmail(email, resetUrl);
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken) {
            throw new BadRequestException('Token invalide ou expiré');
        }

        if (resetToken.expiresAt < new Date()) {
            await this.prisma.passwordResetToken.delete({ where: { token } });
            throw new BadRequestException('Token invalide ou expiré');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });

        await this.prisma.passwordResetToken.delete({ where: { token } });
    }
}
