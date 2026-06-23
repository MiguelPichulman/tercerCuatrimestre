import { configurarHeader } from "../../../utils/header";

const COSTO_ENVIO = 500;

async function init() {
    configurarHeader();
    const usuario = JSON.parse(localStorage.getItem("userData") || "{}");
    
    if (!usuario.id) {
        window.location.href = "../../auth/login/login.html";
        return;
    }

    try {
        const response = await fetch('/data/pedidos.json');
        if (!response.ok) throw new Error("No se pudo cargar el archivo pedidos.json");
        
        const pedidos = await response.json();
        const misPedidos = pedidos.filter((p: any) => p.usuarioDto.id === usuario.id);
        
        renderPedidos(misPedidos);
        configurarCierreModal();
    } catch (error) {
        console.error("Error cargando pedidos:", error);
    }
}

function renderPedidos(pedidos: any[]) {
    const contenedor = document.getElementById("contenedor-pedidos");
    if (!contenedor) return;
    contenedor.innerHTML = ''; 

    if (pedidos.length === 0) {
        contenedor.innerHTML = "<p>Aún no has realizado pedidos.</p>";
        return;
    }

    pedidos.forEach(pedido => {
        const card = document.createElement("div");
        card.className = "pedido-card";
        card.style.cursor = "pointer";
        
        const totalProductos = pedido.detalles.reduce((acc: number, d: any) => acc + d.cantidad, 0);

        card.innerHTML = `
            <div class="pedido-header">
                <h3>Pedido #${pedido.id}</h3>
                <span class="badge-estado estado-${pedido.estado}">${pedido.estado.replace('_', ' ')}</span>
            </div>
            <p><small>${pedido.fecha}</small></p>
            <div class="pedido-detalles">
                ${pedido.detalles.map((d: any) => `<p>• ${d.producto.nombre} (x${d.cantidad})</p>`).join('')}
            </div>
            <div class="pedido-footer">
                <span>📦 ${totalProductos} producto(s)</span>
                <span style="font-size: 1.2rem;">$${pedido.total.toLocaleString('es-AR')}</span>
            </div>
        `;
        
        card.addEventListener("click", () => abrirModal(pedido));
        contenedor.appendChild(card);
    });
}

function abrirModal(pedido: any) {
    const modal = document.getElementById("modal-detalle");
    if(!modal) return;

    // 1. Estado y Fecha
    const badge = document.getElementById("modal-badge-estado")!;
    badge.className = `badge-estado estado-${pedido.estado}`;
    badge.textContent = pedido.estado.replace('_', ' ');
    document.getElementById("modal-fecha")!.textContent = pedido.fecha;

    // 2. Información de entrega
    document.getElementById("modal-telefono")!.textContent = pedido.usuarioDto?.celular || 'No registrado';
    // Capitalizamos la primera letra del método de pago
    const metodoPago = pedido.formaPago.charAt(0).toUpperCase() + pedido.formaPago.slice(1).toLowerCase();
    document.getElementById("modal-pago")!.textContent = metodoPago;

    // 3. Productos y Subtotal
    const listaProd = document.getElementById("modal-productos-lista")!;
    listaProd.innerHTML = '';
    let subtotalCalculado = 0;

    pedido.detalles.forEach((d: any) => {
        subtotalCalculado += d.subtotal;
        listaProd.innerHTML += `
            <div class="producto-modal-item">
                <div>
                    <p class="producto-modal-nombre">${d.producto.nombre}</p>
                    <p class="producto-modal-cant">Cantidad: ${d.cantidad} × $${d.producto.precio.toLocaleString('es-AR')}</p>
                </div>
                <div class="producto-modal-precio">$${d.subtotal.toLocaleString('es-AR')}</div>
            </div>
        `;
    });

    // 4. Resumen
    document.getElementById("modal-subtotal")!.textContent = `$${subtotalCalculado.toLocaleString('es-AR')}`;
    document.getElementById("modal-envio")!.textContent = `$${COSTO_ENVIO.toLocaleString('es-AR')}`;
    document.getElementById("modal-total")!.textContent = `$${(subtotalCalculado + COSTO_ENVIO).toLocaleString('es-AR')}`;

    // 5. Mensaje de Alerta Dinámico
    const mensajeBox = document.getElementById("modal-mensaje-estado")!;
    if (pedido.estado === "PENDIENTE") {
        mensajeBox.className = "modal-mensaje-alert alerta-pendiente";
        mensajeBox.innerHTML = `<p><strong>⏳ Tu pedido está siendo procesado</strong></p><p>Te notificaremos cuando esté listo para entrega.</p>`;
    } else if (pedido.estado === "EN_PREPARACION") {
        mensajeBox.className = "modal-mensaje-alert alerta-preparacion";
        mensajeBox.innerHTML = `<p><strong>🍳 Tu pedido está en preparación</strong></p><p>Nuestros cocineros están manos a la obra.</p>`;
    } else if (pedido.estado === "ENTREGADO") {
        mensajeBox.className = "modal-mensaje-alert alerta-entregado";
        mensajeBox.innerHTML = `<p><strong>✅ Pedido Entregado</strong></p><p>¡Esperamos que lo disfrutes!</p>`;
    } else {
        mensajeBox.className = "modal-mensaje-alert";
        mensajeBox.innerHTML = `<p><strong>Estado: ${pedido.estado.replace('_', ' ')}</strong></p>`;
    }

    modal.classList.remove("oculto");
}

function cerrarModal() {
    document.getElementById("modal-detalle")?.classList.add("oculto");
}

function configurarCierreModal() {
    document.getElementById("btn-cerrar-modal")?.addEventListener("click", cerrarModal);
    document.getElementById("modal-detalle")?.addEventListener("click", (e) => {
        if(e.target === document.getElementById("modal-detalle")) cerrarModal();
    });
}

init();