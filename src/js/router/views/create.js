import { addMovie } from '../../api/create.js';

document.getElementById('addMovieForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    addMovie();
});
