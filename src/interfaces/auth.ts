export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
}

export interface AuthContextType {
    token: string | null;
    role: string | null;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}
