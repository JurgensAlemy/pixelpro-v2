const API = "http://localhost:8080/api/auth";

const opts = {
    headers: { "Content-Type": "application/json" },
    credentials: "include" // importante para cookies de sesión
};

export async function me() {
    const res = await fetch(`${API}/me`, { ...opts, method: "GET" });
    if (!res.ok) {
        return { authenticated: false }; // devolvemos algo seguro
    }
    return res.json();
}


export async function login(email, password) {
    const res = await fetch(`${API}/login`, {
        ...opts,
        method: "POST",
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

export async function register(email, password) {
    const res = await fetch(`${API}/register`, {
        ...opts,
        method: "POST",
        body: JSON.stringify({ email, password })
    });
    return res.json();
}

export async function logout() {
    const res = await fetch(`${API}/logout`, { ...opts, method: "POST" });
    return res.ok;
}
