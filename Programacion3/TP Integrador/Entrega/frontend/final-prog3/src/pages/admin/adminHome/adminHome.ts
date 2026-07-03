async function initDashboard() {
    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) return window.location.href = "../../auth/login/login.html";
    
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol !== "ADMIN") return window.location.href = "../../store/home/home.html";

    document.getElementById("admin-name-display")!.textContent = usuario.nombre;

    try {
        const [catRes, prodRes, pedRes, usuRes] = await Promise.all([
            fetch('/data/categorias.json'),
            fetch('/data/productos.json'),
            fetch('/data/pedidos.json'),
            fetch('/data/usuarios.json')
        ]);

        const categorias = await catRes.json();
        const productos = await prodRes.json();
        const pedidosJson = await pedRes.json();
        const usuarios = await usuRes.json();

        const pedidosLocales = JSON.parse(localStorage.getItem("pedidos-locales") || "[]");
        
        const todosLosPedidos = [...pedidosLocales, ...pedidosJson];

        const categoriasActivas = categorias.filter((c: any) => !c.eliminado).length;
        const productosTotales = productos.filter((p: any) => !p.eliminado).length;
        const productosDisponibles = productos.filter((p: any) => p.disponible && !p.eliminado).length;
        const totalPedidos = todosLosPedidos.length; 
        const totalUsuarios = usuarios.filter((u: any) => !u.eliminado).length;


        document.getElementById("stat-categorias")!.textContent = categoriasActivas.toString();
        document.getElementById("stat-productos")!.textContent = productosTotales.toString();
        document.getElementById("stat-pedidos")!.textContent = totalPedidos.toString();
        document.getElementById("stat-disponibles")!.textContent = productosDisponibles.toString();


        document.getElementById("resumen-texto")!.textContent = 
            `El sistema cuenta actualmente con ${totalUsuarios} usuarios registrados, ${categoriasActivas} categorías activas, un catálogo de ${productosTotales} productos, y ha procesado un total de ${totalPedidos} pedidos históricos.`;

    } catch (error) {
        console.error("Error al cargar estadísticas:", error);
    }

    document.getElementById("btn-logout-admin")?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "../../auth/login/login.html";
    });
}

initDashboard();