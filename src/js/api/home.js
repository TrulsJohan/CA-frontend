import { API_URL } from '../global/headers.js';

export async function getMovies() {
    try {
        const res = await fetch(`${API_URL}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}
