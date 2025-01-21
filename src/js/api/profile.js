import { API_URL } from '../global/headers.js';

export async function getMovieId() {
    try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            throw new Error('Could not find user_id in localStorage.');
        }
        const res = await fetch(`${API_URL}/movies/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!res.ok) {
            throw new Error(
                `Failed to fetch movie: ${res.status} ${res.statusText}`
            );
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie:', error.message);
    }
}
