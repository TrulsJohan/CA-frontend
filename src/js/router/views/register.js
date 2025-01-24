import { register } from "../../api/register.js";

document.getElementById('registrationForm').addEventListener('submit', (event)=> {
    event.preventDefault();
    register();
});
