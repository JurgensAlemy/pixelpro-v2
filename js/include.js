// Subir solo sin css
// Función que carga un fragmento HTML dentro de un contenedor con un ID
async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (element) {
        try {
            // Trae el archivo HTML
            const response = await fetch(file);
            // Lo convierte a texto
            const html = await response.text();
            // Lo inyecta en el elemento correspondiente
            element.innerHTML = html;
            element.appendChild(html)
        } catch (error) {
            console.error(`Error al cargar ${file}:`, error);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header", "../partials/header.html");
    loadComponent("footer", "../partials/footer.html");
});