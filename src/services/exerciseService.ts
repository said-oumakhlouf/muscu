const API_URL = "http://localhost:3000";

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

export const exerciseService = {
    async getAll() {
        const res = await fetch(`${API_URL}/exercises`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },

    async create(token: string, data: { name: string; description: string; muscleGroup: string }) {
        return fetchWithAuth(`${API_URL}/exercises`, token, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    async delete(token: string, id: number) {
        await fetchWithAuth(`${API_URL}/exercises/${id}`, token, {
            method: "DELETE",
        });
    },

    async update(token: string, id: number, data: { name: string; description: string; muscleGroup: string }) {
        return fetchWithAuth(`${API_URL}/exercises/${id}`, token, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },
};