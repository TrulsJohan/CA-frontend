import { API_URL } from '../global/headers.js';

export async function deleteMovie(id) {
    try {
        const res = await fetch(`${API_URL}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (!res.ok) {
            throw new Error(
                `Failed to delete movie: ${res.status} ${res.statusText}`
            );
        }
        const data = await res.json();
        console.log('Movie deleted successfully:', data);
    } catch (error) {
        console.error('Error deleting movie:', error);
    }
}
