export function configurarHeader() {
    actualizarBadgeCarrito();

    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) return;

    const usuario = JSON.parse(usuarioString);
    const navAdmin = document.getElementById("nav-admin");
    const userNameDisplay = document.getElementById("user-name-display");
    const btnLogout = document.getElementById("btn-logout");
    
    // NUEVO: Selectores para ocultar enlaces
    const linkCarrito = document.getElementById("link-carrito");
    const linkMisPedidos = document.getElementById("link-mis-pedidos");

    // Inyectar nombre
    if (userNameDisplay) {
        userNameDisplay.textContent = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
    }

    // LÓGICA DE ADMINISTRACIÓN Y VISIBILIDAD
    if (usuario.rol === "ADMIN") {
        if (navAdmin) navAdmin.style.display = "block";
        
        // Ocultamos enlaces de cliente
        if (linkCarrito) linkCarrito.style.display = "none";
        if (linkMisPedidos) linkMisPedidos.style.display = "none";
    } else {
        if (navAdmin) navAdmin.style.display = "none";
        // Aseguramos que se vean para usuario normal
        if (linkCarrito) linkCarrito.style.display = "inline-block";
        if (linkMisPedidos) linkMisPedidos.style.display = "inline-block";
    }

    // Logout
    btnLogout?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "../../auth/login/login.html";
    });
}

export function actualizarBadgeCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito-food-store") || "[]");
    // Es vital que aquí también diga item.quantity
    const totalItems = carrito.reduce((sum: number, item: any) => sum + item.quantity, 0);
    
    const badge = document.getElementById("cart-badge");
    if (badge) {
        badge.textContent = totalItems.toString();
    }
}