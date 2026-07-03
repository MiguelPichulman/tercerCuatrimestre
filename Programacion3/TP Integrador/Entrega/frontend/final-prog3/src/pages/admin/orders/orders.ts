let pedidosGlobal: any[] = [];
let usuariosGlobal: any[] = [];
let productosGlobal: any[] = [];

async function initPedidos() {
    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) return window.location.href = "../../auth/login/login.html";
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol !== "ADMIN") return window.location.href = "../../store/home/home.html";
    document.getElementById("admin-name-display")!.textContent = usuario.nombre;

    try {
        const [pedRes, usRes, prodRes] = await Promise.all([
            fetch('/data/pedidos.json'),
            fetch('/data/usuarios.json'),
            fetch('/data/productos.json')
        ]);
        
        const pedidosJson = await pedRes.json();
        usuariosGlobal = await usRes.json();
        productosGlobal = await prodRes.json();

        const pedidosLocales = JSON.parse(localStorage.getItem("pedidos-locales") || "[]");
        
        pedidosGlobal = [...pedidosLocales, ...pedidosJson];
        pedidosGlobal.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
        
        renderPedidos();
    } catch (error) {
        console.error("Error cargando datos:", error);
    }

    configurarEventos();
    configurarLogout();
}

function renderPedidos(estadoFiltro: string = "TODOS") {
    const contenedor = document.getElementById("contenedor-pedidos")!;
    contenedor.innerHTML = '';

    let pedidosFiltrados = pedidosGlobal;
    if (estadoFiltro !== "TODOS") {
        pedidosFiltrados = pedidosGlobal.filter(p => p.estado === estadoFiltro);
    }

    if (pedidosFiltrados.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#888;">No se encontraron pedidos con este estado.</p>';
        return;
    }

    pedidosFiltrados.forEach(pedido => {
        let nombreCliente = pedido.usuarioDto ? `${pedido.usuarioDto.nombre} ${pedido.usuarioDto.apellido}` : 'Cliente Desconocido';
        const cantidadItems = pedido.detalles ? pedido.detalles.length : 0;

        contenedor.innerHTML += `
            <div class="pedido-card">
                <div class="pedido-info-basica">
                    <h4>Pedido #${pedido.id} <span class="badge-estado estado-${pedido.estado}">${pedido.estado}</span></h4>
                    <p>📅 ${pedido.fecha} | 👤 ${nombreCliente}</p>
                    <p>📦 ${cantidadItems} productos</p>
                </div>
                <div style="display:flex; align-items:center;">
                    <div class="pedido-monto">$${pedido.total}</div>
                    <button class="btn-detalle" data-id="${pedido.id}">Ver Detalles</button>
                </div>
            </div>
        `;
    });

    document.querySelectorAll(".btn-detalle").forEach(btn => {
        btn.addEventListener("click", (e) => abrirModalPedido(parseInt((e.target as HTMLButtonElement).dataset.id!)));
    });
}

function configurarEventos() {
    const modal = document.getElementById("modal-pedido")!;
    const selectFiltro = document.getElementById("filtro-estado") as HTMLSelectElement;
    const formEstado = document.getElementById("form-estado-pedido") as HTMLFormElement;

    selectFiltro.addEventListener("change", () => renderPedidos(selectFiltro.value));

    document.getElementById("btn-cerrar-modal")!.addEventListener("click", () => modal.classList.add("oculto"));

    formEstado.addEventListener("submit", (e) => {
        e.preventDefault();
        const idPedido = parseInt((document.getElementById("pedido-id") as HTMLInputElement).value);
        const nuevoEstado = (document.getElementById("select-estado-modal") as HTMLSelectElement).value;

        const pedido = pedidosGlobal.find(p => p.id === idPedido);
        if (pedido) {
            pedido.estado = nuevoEstado;
            
            const pedidosLocales = JSON.parse(localStorage.getItem("pedidos-locales") || "[]");
            const indexLocal = pedidosLocales.findIndex((p: any) => p.id === idPedido);
            
            if (indexLocal !== -1) {
                pedidosLocales[indexLocal].estado = nuevoEstado;
                localStorage.setItem("pedidos-locales", JSON.stringify(pedidosLocales));
            }
            
            alert(`Pedido #${idPedido} actualizado a ${nuevoEstado}.`);
        }

        modal.classList.add("oculto");
        renderPedidos(selectFiltro.value);
    });
}

function abrirModalPedido(id: number) {
    const pedido = pedidosGlobal.find(p => p.id === id);
    if (!pedido) return;

    let nombreCliente = 'Desconocido';
    if (pedido.usuarioDto) {
        nombreCliente = `${pedido.usuarioDto.nombre} ${pedido.usuarioDto.apellido}`;
    } else if (pedido.idUsuario) {
        const cliente = usuariosGlobal.find(u => Number(u.id) === Number(pedido.idUsuario));
        if (cliente) nombreCliente = `${cliente.nombre} ${cliente.apellido}`;
    }
    
    document.getElementById("modal-titulo")!.textContent = `Pedido #${pedido.id}`;
    document.getElementById("detalle-cliente")!.textContent = nombreCliente;
    document.getElementById("detalle-fecha")!.textContent = pedido.fecha;
    document.getElementById("detalle-pago")!.textContent = pedido.formaPago || 'No especificada';
    document.getElementById("detalle-total")!.textContent = pedido.total;

    (document.getElementById("pedido-id") as HTMLInputElement).value = pedido.id.toString();
    
    const estadosValidos = ["PENDIENTE", "CONFIRMADO", "TERMINADO", "CANCELADO"];
    const estadoMostrar = estadosValidos.includes(pedido.estado) ? pedido.estado : "PENDIENTE";
    (document.getElementById("select-estado-modal") as HTMLSelectElement).value = estadoMostrar;

    const ul = document.getElementById("lista-productos-pedido")!;
    ul.innerHTML = '';
    
    if (pedido.detalles) {
        pedido.detalles.forEach((det: any) => {
            
            let nombreProd = `Producto Desconocido`;
            if (det.producto && det.producto.nombre) {
                nombreProd = det.producto.nombre;
            } else if (det.idProducto) {
                const prodInfo = productosGlobal.find(p => Number(p.id) === Number(det.idProducto));
                if (prodInfo) nombreProd = prodInfo.nombre;
            }

            ul.innerHTML += `
                <li>
                    <span>${det.cantidad}x ${nombreProd}</span>
                    <strong>$${det.subtotal}</strong>
                </li>
            `;
        });
    }

    document.getElementById("modal-pedido")!.classList.remove("oculto");
}
function configurarLogout() {
    const btnLogout = document.getElementById("btn-logout-admin");
    
    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            localStorage.removeItem("userData");
            
            window.location.href = "../../auth/login/login.html";
        });
    } else {
        console.error("El botón de logout no se encontró en el DOM.");
    }
}

initPedidos();