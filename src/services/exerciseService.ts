const API_URL = "http://localhost:3000";

export const exerciseService = {
    async getAll() {
        const res = await fetch(`${API_URL}/exercises`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },

    async create(data: { name: string; description: string; muscleGroup: string }) {
        const res = await fetch(`${API_URL}/exercises`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.json();
    },

    async delete(id: number) {
        await fetch(`${API_URL}/exercises/${id}`, {
            method: "DELETE",
        });
    },

    async update(id: number, data: { name: string; description: string; muscleGroup: string }) {
    const res = await fetch(`${API_URL}/exercises/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
    },
};