const API_URL = 'http://localhost:3000/';

export const sessionService = {
    async getAll(token: string) {
        const res = await fetch(`${API_URL}sessions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
    
    async create(token: string, data: { name: string; exercises: { exerciseId: number; sets: number; reps: number; }[] }) {
        const res = await fetch(`${API_URL}sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    async delete(token: string, id: number) {
        await fetch(`${API_URL}/sessions/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
}