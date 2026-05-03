import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.authService.register(
            body.email,
            body.password,
            body.role,
            body.firstname,
            body.lastname,
            body.weight,
            body.height,
            body.goal,
            body.gender,
            body.coachId,
            body.speciality,
            body.bio,
            body.hourlyRate,
        );
    }

    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body.email, body.password);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string }) {
        await this.authService.forgotPassword(body.email);
        // Toujours retourner le même message (sécurité)
        return {
            message:
                'Si cet email existe, un lien de réinitialisation a été envoyé.',
        };
    }

    @Post('reset-password')
    async resetPassword(@Body() body: { token: string; password: string }) {
        await this.authService.resetPassword(body.token, body.password);
        return { message: 'Mot de passe réinitialisé avec succès.' };
    }
}
