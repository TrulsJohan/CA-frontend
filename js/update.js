const API_URL = 'https://ca-databases.onrender.com';
const title = document.getElementById('title');
const description = document.getElementById('description');
const img_url = document.getElementById('img_url');

async function getSelectedMovie() {
    const movie_id = localStorage.getItem('movie_id');
    if (!movie_id) {
        console.error('Movie ID not found in localStorage.');
        return;
    }

    try {
        const res = await fetch(`${API_URL}/movies/${movie_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!res.ok) {
            throw new Error(
                `Failed to fetch movie (ID: ${movie_id}): ${res.status} ${res.statusText}`
            );
        }

        const { data } = await res.json();
        console.log(data);
        title.value = data.title;
        description.value = data.description;
        img_url.value = data.img_url;
    } catch (error) {
        console.error('Error fetching movie:', error);
    }
}

async function updateMovie() {
    const movie_id = localStorage.getItem('movie_id');
    const user_id = localStorage.getItem('user_id');

    if (!movie_id || !user_id) {
        console.error('Movie ID or User ID not found in localStorage.');
        return;
    }

    const updatedData = {
        title: title.value,
        description: description.value,
        img_url: img_url.value,
    };

    try {
        const res = await fetch(
            `${API_URL}/movies/update/${movie_id}/${user_id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedData),
            }
        );

        if (!res.ok) {
            throw new Error(
                `Failed to update movie (ID: ${movie_id}): ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();
        console.log(data);
        window.location.reload();
    } catch (error) {
        console.error('Error updating movie:', error);
    }
}

document.getElementById('updateMovieForm').addEventListener('submit', (event) => {
    event.preventDefault();
    updateMovie();
});

getSelectedMovie();
