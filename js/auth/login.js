import { login, register, me } from "./auth-api.js";

// Si ya está logueado y entra a login.html → redirigir al home
document.addEventListener("DOMContentLoaded", async () => {
    const user = await me();
    if (user?.authenticated) {
        location.href = "/index.html";
    }
});

window.login = async function () {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const data = await login(email, password);
    console.log("Login OK", data);
    // forzar reconsulta de /me antes de redirigir
    const meData = await me();
    console.log("Me after login", meData);
    if (meData.authenticated) {
        location.href = "/index.html";
    }


};

window.register = async function () {
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const res = await register(email, password);

    if (res?.authenticated) {
        location.href = "/index.html";
    } else {
        alert("Error en registro");
    }
};

window.showRegister = function () {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("registerForm").classList.remove("d-none");
};
window.showLogin = function () {
    document.getElementById("registerForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
};
