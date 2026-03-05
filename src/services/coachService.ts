const API_URL = 'http://localhost:3000/';

export const coachService = {
    async getAll() {
        const res = await fetch(`${API_URL}coaches`);
        const data = await res.json();
        return Array.isArray(data) ? data : [];
    },
};