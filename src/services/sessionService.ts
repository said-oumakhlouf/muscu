import { fetchWithAuth } from '@/utils/fetchWithAuth';

const API_URL = 'http://localhost:3000/';

export const sessionService = {
    async getAll(token: string) {
        const data = await fetchWithAuth(`${API_URL}sessions`, token);
        return Array.isArray(data) ? data : [];
    },
    
    async create(token: string, data: {
        name: string;
        userId: number;
        scheduledAt?: Date;
        exercises: { exerciseId: number; sets: number; reps: number; }[]
    }) {
        return fetchWithAuth(`${API_URL}sessions`, token, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async delete(token: string, id: number) {
        await fetchWithAuth(`${API_URL}/sessions/${id}`, token, {
            method: "DELETE",
        });
    },
}
