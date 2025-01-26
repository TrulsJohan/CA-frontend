const API_URL = 'https://ca-databases.onrender.com';
const moviesContainer = document.getElementById('moviesContainer');

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

async function displayMovie() {
    try {
        const data = await getMovieId();
        if (!data || !data.data || data.data.length === 0) {
            throw new Error('No movies found');
        }
        console.log(data);
        moviesContainer.innerHTML = '';
        const movies = data.data
            .map((movie) => {
                return `
                <div class="movie">
                    <h3>${movie.title}</h3>
                    <p>${movie.description}</p>
                    <img src="${movie.img_url}" alt="${movie.title}" style="width: 100px; height: 100px;"/>
                    <p>Posted by: ${movie.username}</p>
                    <button class="deleteBtn" data-id="${movie.id}">Delete Movie</button>
                    <button class="editBtn" data-id="${movie.id}">Edit Movie</button>
            `;
            })
            .join('');
        moviesContainer.innerHTML = movies;
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        deleteBtn.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (id) {
                    deleteMovie(id);
                    /*localStorage.setItem('movie_id', id);
                    console.log(`Movie ID ${id} saved to localStorage.`);*/
                } else {
                    console.error('Movie ID not found.');
                }
            });
        });
        const editBtn = document.querySelectorAll('.editBtn');
        editBtn.forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                if (id) {
                    localStorage.setItem('movie_id', id);
                    window.location.href = '../../../../post/update/index.html';
                } else {
                    console.error('Movie ID not found.');
                }
            });
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

displayMovie();
