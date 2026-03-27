export const fetchWithAuth = async (url: string, token: string, options?: RequestInit) => {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        },
    });
    const text = await res.text();
    return text ? JSON.parse(text) : null;
};