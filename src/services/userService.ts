const API_URL = 'http://localhost:3000/';

const fetchWithAuth = async (url: string, token: string) => {
    const res = await fetch(url, {
        headers: {  Authorization: `Bearer ${token}` },
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
}