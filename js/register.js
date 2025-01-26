const API_URL = 'https://ca-databases.onrender.com';

export async function register() {
    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const res = await fetch(`${API_URL}/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            throw new Error(
                `Registration failed: ${res.status} ${res.statusText}`
            );
        }

        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error('Could not register:', error.message);
    }
}

document.getElementById('registrationForm').addEventListener('submit', (event) => {
    event.preventDefault();
    register();
});
