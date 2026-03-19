import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
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
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'coach') {
            const user = await this.usersService.create({
                email,
                password: hashedPassword,
                role: 'coach',
                firstname,
                lastname,
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
}
