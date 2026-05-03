const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const coachService = {
  async getAll(specialty?: string, search?: string) {
    const params = new URLSearchParams();
    if (specialty) params.set("specialty", specialty);
    if (search) params.set("search", search);

    const query = params.toString() ? `?${params.toString()}` : "";
    const res = await fetch(`${API_URL}/coaches${query}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  },
};
