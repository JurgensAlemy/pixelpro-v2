import { me, logout } from "./auth-api.js";

async function renderHeaderUser() {
  const mount = document.querySelector("#header-user");
  if (!mount) return;

  const user = await me();

  if (user?.authenticated) {
    mount.innerHTML = `
      <div class="dropdown">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
          <i class="bi bi-person fs-5 me-1"></i>${user.email}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="/pages/perfil.html">Ver perfil</a></li>
          <li><a class="dropdown-item" href="/pages/pedidos.html">Mis pedidos</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="#" id="logoutBtn">Cerrar sesión</a></li>
        </ul>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", async () => {
      await logout();
      location.reload();
    });
  } else {
    mount.innerHTML = `
      <a href="/pages/login.html" class="nav-link me-3">
        <i class="bi bi-person fs-5"></i>
      </a>
    `;
  }
}

// Cuando el header se haya cargado
document.addEventListener("component:loaded", (ev) => {
  if (ev.detail.id === "header") {
    renderHeaderUser();
  }
});
