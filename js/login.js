// Cambiar entre login y registro
function showRegister() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
}

// Función de registro (simulada con localStorage)
function register() {
    let name = document.getElementById("registerName").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;

    if (name && email && password) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        alert("Cuenta registrada con éxito. Ahora puedes iniciar sesión.");
        showLogin();
    } else {
        alert("Por favor completa todos los campos.");
    }
}

// Función de login (simulada)
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let storedEmail = localStorage.getItem("userEmail");
    let storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
        alert("Bienvenido, sesión iniciada con éxito.");
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

function showRegister() {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("registerForm").classList.remove("d-none");
}
function showLogin() {
    document.getElementById("registerForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
}
function login() { alert("Login pendiente de implementar"); }
function register() { alert("Registro pendiente de implementar"); }