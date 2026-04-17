import {
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères',
    })
    @Matches(/[A-Z]/, {
        message: 'Le mot de passe doit contenir au moins une majuscule',
    })
    @Matches(/[0-9]/, {
        message: 'Le mot de passe doit contenir au moins un chiffre',
    })
    password!: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsOptional()
    @IsString()
    firstname?: string;

    @IsOptional()
    @IsString()
    lastname?: string;

    @IsOptional()
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsNumber()
    height?: number;

    @IsOptional()
    @IsString()
    goal?: string;

    @IsOptional()
    @IsString()
    gender?: string;

    @IsOptional()
    @IsNumber()
    coachId?: number;

    // Champs coach
    @IsOptional()
    @IsString()
    speciality?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsNumber()
    hourlyRate?: number;
}
