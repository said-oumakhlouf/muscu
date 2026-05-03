import { fetchWithAuth } from "@/utils/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sessionService = {
  async getAll(token: string) {
    const data = await fetchWithAuth(`${API_URL}/sessions`, token);
    return Array.isArray(data) ? data : [];
  },

  async getAllByCoach(token: string) {
    const data = await fetchWithAuth(`${API_URL}/sessions/coach/all`, token);
    return Array.isArray(data) ? data : [];
  },

  async create(
    token: string,
    data: {
      name: string;
      userId: number;
      scheduledAt?: Date;
      calories?: number;
      intensity?: "low" | "medium" | "high";
      exercises: {
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
      }[];
    },
  ) {
    return fetchWithAuth(`${API_URL}/sessions`, token, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async delete(token: string, id: number) {
    await fetchWithAuth(`${API_URL}/sessions/${id}`, token, {
      method: "DELETE",
    });
  },

  async update(
    token: string,
    id: number,
    data: {
      name?: string;
      scheduledAt?: Date;
      calories?: number;
      intensity?: "low" | "medium" | "high";
      exercises?: {
        exerciseId: number;
        sets: number;
        reps: number;
        weight?: number;
      }[];
    },
  ) {
    return fetchWithAuth(`${API_URL}/sessions/${id}`, token, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async getOne(token: string, id: number) {
    return fetchWithAuth(`${API_URL}/sessions/${id}`, token);
  },

  async addExercise(
    token: string,
    sessionId: number,
    data: {
      exerciseId: number;
      sets: number;
      reps: number;
      weight?: number;
    },
  ) {
    return fetchWithAuth(`${API_URL}/sessions/${sessionId}/exercises`, token, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async removeExercise(token: string, sessionId: number, exerciseId: number) {
    return fetchWithAuth(
      `${API_URL}/sessions/${sessionId}/exercises/${exerciseId}`,
      token,
      {
        method: "DELETE",
      },
    );
  },
};
