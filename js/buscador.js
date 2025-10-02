// js/buscador.js
document.addEventListener("DOMContentLoaded", () => {

  // Inicializa el buscador cuando los elementos del header estén presentes
  function setupSearch() {
    const searchForm = document.querySelector("#searchForm");
    const searchInput = document.querySelector("#searchInput");
    const suggestions = document.querySelector("#suggestions");

    if (!searchForm || !searchInput || !suggestions) return false;

    // Helpers
    const getProductos = () => Array.from(document.querySelectorAll(".producto"));

    const clearSuggestions = () => { suggestions.innerHTML = ""; };

    const showOnlyProductByName = (nombreBuscado) => {
      const productos = getProductos();
      const txt = nombreBuscado.toLowerCase();
      productos.forEach(prod => {
        const nombre = (prod.dataset.nombre || "").toLowerCase();
        prod.style.display = nombre.includes(txt) ? "block" : "none";
      });
    };

    const addSuggestionItem = (text, onClick) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "list-group-item list-group-item-action";
      item.textContent = text;
      item.addEventListener("click", onClick);
      suggestions.appendChild(item);
    };

    // Maneja input (sugerencias)
    const onInput = () => {
      const texto = (searchInput.value || "").toLowerCase().trim();
      clearSuggestions();
      if (texto.length === 0) return;

      const productos = getProductos();

      // Si no estamos en la página de productos → sugerir enlace a productos.html?q=...
      if (!document.querySelector("#listaProductos") || productos.length === 0) {
        const link = document.createElement("a");
        link.className = "list-group-item list-group-item-action";
        link.href = `/pages/productos.html?q=${encodeURIComponent(texto)}`;
        link.textContent = `Buscar "${texto}" en productos`;
        suggestions.appendChild(link);
        return;
      }

      // Estamos en productos.html → buscar coincidencias en los nombres
      const resultados = productos
        .map(p => p.dataset.nombre || "")
        .filter(name => name.toLowerCase().includes(texto));

      // Evitar duplicados
      const unicos = Array.from(new Set(resultados));

      if (unicos.length === 0) {
        suggestions.innerHTML = `<div class="list-group-item text-muted">Sin resultados</div>`;
        return;
      }

      unicos.forEach(nombre => {
        addSuggestionItem(nombre, () => {
          showOnlyProductByName(nombre);
          searchInput.value = nombre;
          clearSuggestions();
        });
      });
    };

    searchInput.removeEventListener("input", onInput); // en caso de doble inicialización
    searchInput.addEventListener("input", onInput);

    // Cerrar sugerencias al hacer click fuera del searchBar
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#searchBar") && !e.target.closest("#suggestions")) {
        clearSuggestions();
      }
    });

    // Manejar submit (lupa)
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const texto = (searchInput.value || "").toLowerCase().trim();
      if (!texto) return;

      // Si no estamos en productos.html → redirigir con ?q=
      if (!document.querySelector("#listaProductos")) {
        window.location.href = `/pages/productos.html?q=${encodeURIComponent(texto)}`;
        return;
      }

      // Si estamos en productos.html → filtrar en la misma página
      showOnlyProductByName(texto);
      clearSuggestions();
    });

    // Si llegamos con ?q= en la URL mientras estamos en productos.html, aplica filtro inicial
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q && document.querySelector("#listaProductos")) {
      searchInput.value = q;
      showOnlyProductByName(q);
    }

    return true;
  } // fin setupSearch

  // Intentar inicializar inmediatamente; si falla (header aún no insertado), observar cambios
  if (!setupSearch()) {
    const header = document.getElementById("header");
    if (header) {
      const observer = new MutationObserver((mutations, obs) => {
        if (setupSearch()) obs.disconnect();
      });
      observer.observe(header, { childList: true, subtree: true });
    } else {
      // Fallback a polling corto por 3s
      const poll = setInterval(() => {
        if (setupSearch()) {
          clearInterval(poll);
        }
      }, 200);
      setTimeout(() => clearInterval(poll), 3000);
    }
  }
});
