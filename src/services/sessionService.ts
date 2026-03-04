const API_URL = 'http://localhost:3000/';

const fetchWithAuth = async (url: string, token: string, options?: RequestInit) => {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
    });
    return res.json();
};

export const sessionService = {
    async getAll(token: string) {
        const data = await fetchWithAuth(`${API_URL}sessions`, token);
        return Array.isArray(data) ? data : [];
    },
    
    async create(token: string, data: { name: string; exercises: { exerciseId: number; sets: number; reps: number; }[] }) {
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
