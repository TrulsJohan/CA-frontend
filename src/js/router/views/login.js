import { login } from "../../api/login.js";

document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();
    login();
});
