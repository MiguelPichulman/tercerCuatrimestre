export function configurarHeader() {
    actualizarBadgeCarrito();

    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) return;

    const usuario = JSON.parse(usuarioString);
    const navAdmin = document.getElementById("nav-admin");
    const userNameDisplay = document.getElementById("user-name-display");
    const btnLogout = document.getElementById("btn-logout");

    // Inyectar nombre
    if (userNameDisplay) {
        userNameDisplay.textContent = `${usuario.nombre || ''} ${usuario.apellido || ''}`.trim();
    }

    // LÓGICA DE ADMINISTRACIÓN (LA CLAVE ESTÁ ACÁ)
    // Buscamos el elemento. Si existe (sea en Home o en Cart), le aplicamos la regla.
    if (navAdmin) {
        if (usuario.rol === "ADMIN") {
            navAdmin.style.display = "block";
        } else {
            navAdmin.style.display = "none";
        }
    }

    // Logout
    btnLogout?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "../../auth/login/login.html";
    });
}

export function actualizarBadgeCarrito() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
        const carritoString = localStorage.getItem("carrito-food-store");
        const carrito = carritoString ? JSON.parse(carritoString) : [];
        const cantidadTotal = carrito.reduce((acc: number, item: any) => acc + item.quantity, 0);
        badge.textContent = cantidadTotal.toString();
    }
}