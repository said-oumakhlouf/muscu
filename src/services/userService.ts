const API_URL = 'http://localhost:3000/';

const fetchWithAuth = async (url: string, token: string, options?: RequestInit) => {
    const res = await fetch(url, {
        ...options,
        headers: { Authorization: `Bearer ${token}` },
        ...options?.headers,
    });
    return res.json();
};

export const userService = {
    async getAll(token: string) {
        const data = await fetchWithAuth(`${API_URL}users`, token);
        return Array.isArray(data) ? data : [];
    },

    async getOne(token: string, id: number) {
        return fetchWithAuth(`${API_URL}users/${id}`, token);
    },

    async getSessions(token: string, userId: number) {
        const data = await fetchWithAuth(`${API_URL}sessions/user/${userId}`, token);
        return Array.isArray(data) ? data : [];
    },

    async getProfile(token: string) {
        return fetchWithAuth(`${API_URL}users/profile`, token);
    },

    async updateProfile(token: string, data: object) {
        return fetchWithAuth(`${API_URL}users/profile`, token, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },
}