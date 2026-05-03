const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const coachService = {
  async getAll() {
    const res = await fetch(`${API_URL}/coaches`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },
};
