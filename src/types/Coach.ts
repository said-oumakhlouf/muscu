export type Coach = {
    id: number;
    userId: number;
    bio?: string;
    specialty?: string;
    photoUrl?: string;
    createdAt: string;
    user: {
        id: number;
        email: string;
        firstname?: string;
        lastname?: string;
    };
};