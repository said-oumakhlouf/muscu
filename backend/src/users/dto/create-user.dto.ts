export class CreateUserDto {
    email: string;
    password: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    weight?: number;
    height?: number;
    goal?: string;
}
