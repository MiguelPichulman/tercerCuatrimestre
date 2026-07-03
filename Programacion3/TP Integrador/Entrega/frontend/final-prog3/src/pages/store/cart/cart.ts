import type { CartItem } from "../../../types/product";
import { configurarHeader, actualizarBadgeCarrito } from "../../../utils/header";

const contenedorCarrito = document.getElementById("carrito-contenedor");
const spanSubtotal = document.getElementById("subtotal-general");
const spanEnvio = document.getElementById("costo-envio");
const spanTotal = document.getElementById("total-precio");

// Elementos del Modal
const modalCheckout = document.getElementById("modal-checkout");
const btnAbrirCheckout = document.getElementById("btn-abrir-checkout") as HTMLButtonElement;
const btnCerrarModal = document.getElementById("btn-cerrar-modal");
const spanModalTotal = document.getElementById("modal-total-precio");
const btnComprar = document.getElementById("btn-comprar") as HTMLButtonElement;

const btnVaciar = document.getElementById("btn-vaciar") as HTMLButtonElement;

const COSTO_ENVIO = 1500; 
let carritoActual: CartItem[] = [];

// INICIALIZACIÓN
function init() {
    // GUARDIA DE ROL: Solo los USUARIOS pueden acceder al carrito
    const usuario = JSON.parse(localStorage.getItem("userData") || "{}");
    if (usuario.rol === "ADMIN") {
        alert("Acceso denegado: El panel de administración es tu área de gestión.");
        window.location.href = "../../admin/adminHome/adminHome.html";
        return;
    }

    configurarHeader();
    const carritoString = localStorage.getItem("carrito-food-store");
    carritoActual = carritoString ? JSON.parse(carritoString) : [];
    renderCarrito();
}
init();

// RENDERIZADO DEL CARRITO
function renderCarrito() {
    if (!contenedorCarrito) return;
    contenedorCarrito.innerHTML = '';

    if (carritoActual.length === 0) {
        contenedorCarrito.innerHTML = `
            <div class="estado-vacio">
                <span>🛒</span>
                <p>Tu carrito está vacío.</p>
                <a href="../home/home.html" class="btn-catalogo">Ir al catálogo</a>
            </div>
        `;
        if (btnAbrirCheckout) btnAbrirCheckout.disabled = true;
        if (btnVaciar) btnVaciar.disabled = true;
        actualizarTotales();
        return;
    }

    if (btnAbrirCheckout) btnAbrirCheckout.disabled = false;
    if (btnVaciar) btnVaciar.disabled = false;

    carritoActual.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        card.innerHTML = `
            <img src="${item.product.imagen}" alt="${item.product.nombre}">
            <div class="info-producto">
                <p class="categoria-label">${item.product.categoria?.nombre || 'Categoría'}</p>
                <h3>${item.product.nombre}</h3>
                <p class="precio">$${item.product.precio.toLocaleString('es-AR')} c/u</p>
            </div>
            
            <div class="controles-contenedor">
                <p style="font-weight:bold; font-size: 1.1rem; color: var(--color-primario); margin-bottom: 5px;">
                    $${(item.quantity * item.product.precio).toLocaleString('es-AR')}
                </p>
                <div class="pastilla-cantidad">
                    <button class="btn-restar" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-sumar" data-index="${index}">+</button>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        contenedorCarrito.appendChild(card);
    });

    asignarEventosBotones();
    actualizarTotales();
}

function asignarEventosBotones() {
    document.querySelectorAll(".btn-sumar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number((e.target as HTMLButtonElement).dataset.index);
            const item = carritoActual[index];
            if (item.quantity < item.product.stock) {
                item.quantity++;
                guardarYRenderizar();
            } else {
                alert(`No hay más stock disponible para ${item.product.nombre}.`);
            }
        });
    });

    document.querySelectorAll(".btn-restar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number((e.target as HTMLButtonElement).dataset.index);
            if (carritoActual[index].quantity > 1) {
                carritoActual[index].quantity--;
                guardarYRenderizar();
            }
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number((e.target as HTMLButtonElement).dataset.index);
            carritoActual.splice(index, 1);
            guardarYRenderizar();
        });
    });
}

function actualizarTotales() {
    let subtotal = 0;
    carritoActual.forEach(item => {
        subtotal += (item.quantity * item.product.precio);
    });

    const costoEnvioAplicado = subtotal > 0 ? COSTO_ENVIO : 0;
    const total = subtotal + costoEnvioAplicado;

    if (spanSubtotal) spanSubtotal.textContent = subtotal.toLocaleString('es-AR');
    if (spanEnvio) spanEnvio.textContent = costoEnvioAplicado.toLocaleString('es-AR');
    if (spanTotal) spanTotal.textContent = total.toLocaleString('es-AR');
    
    // Actualizamos también el total dentro del Modal
    if (spanModalTotal) spanModalTotal.textContent = total.toLocaleString('es-AR');
}

function guardarYRenderizar() {
    localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));
    actualizarBadgeCarrito(); // Actualiza la burbuja del header en tiempo real!
    renderCarrito();
}

// BOTÓN VACIAR
btnVaciar?.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        carritoActual = [];
        guardarYRenderizar();
    }
});

// LÓGICA DEL MODAL DE CHECKOUT
// LÓGICA DEL MODAL DE CHECKOUT
btnAbrirCheckout?.addEventListener("click", () => {
    if (modalCheckout) modalCheckout.classList.remove("oculto");
});

btnCerrarModal?.addEventListener("click", () => {
    if (modalCheckout) modalCheckout.classList.add("oculto");
});

// FINALIZAR COMPRA (Dentro del modal)
btnComprar?.addEventListener("click", () => {
    const telefonoInput = document.getElementById("telefono-pedido") as HTMLInputElement;
    const formaPagoSelect = document.getElementById("forma-pago") as HTMLSelectElement;

    if (!telefonoInput.value.trim()) {
        alert("Por favor, ingrese un teléfono de contacto para el pedido.");
        return;
    }

    let subtotalFinal = 0;
    carritoActual.forEach(i => subtotalFinal += (i.quantity * i.product.precio));

    const usuarioLogueado = JSON.parse(localStorage.getItem("userData") || "{}");

    const nuevoPedido = {
        id: Date.now(), // ID temporal
        fecha: new Date().toISOString().split('T')[0],
        estado: "PENDIENTE",
        total: subtotalFinal + COSTO_ENVIO,
        formaPago: formaPagoSelect.value,
        telefono: telefonoInput.value,
        // 2. AQUÍ ESTÁ EL CAMBIO: Agregamos el usuarioDto
        usuarioDto: {
            id: usuarioLogueado.id,
            nombre: usuarioLogueado.nombre,
            apellido: usuarioLogueado.apellido || "",
            mail: usuarioLogueado.mail || "",
            celular: telefonoInput.value,
            rol: usuarioLogueado.rol
        },
        detalles: carritoActual.map(item => ({
            cantidad: item.quantity,
            subtotal: item.quantity * item.product.precio,
            producto: item.product
        }))
    };

    // 3. Guardar en localStorage
    const pedidosLocales = JSON.parse(localStorage.getItem("pedidos-locales") || "[]");
    pedidosLocales.push(nuevoPedido);
    localStorage.setItem("pedidos-locales", JSON.stringify(pedidosLocales));

    alert("¡Compra finalizada con éxito!");
    
    // Limpieza final
    carritoActual = [];
    guardarYRenderizar();
    if (modalCheckout) modalCheckout.classList.add("oculto");
    window.location.href = "../home/home.html";
});