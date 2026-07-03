// Para saber qué producto mostrar, leeremos el ID de la URL (ej: productDetail.html?id=1)
const params = new URLSearchParams(window.location.search);
const idProductoSeleccionado = params.get("id");

async function initProductDetail() {
    // 1. Verificación de sesión
    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) {
        window.location.href = "../../auth/login/login.html";
        return;
    }
    const usuario = JSON.parse(usuarioString);
    document.getElementById("user-name-display")!.textContent = usuario.nombre;
    actualizarBadgeCarrito();

    // 2. Si no hay ID en la URL, devolvemos al usuario a la tienda
    if (!idProductoSeleccionado) {
        alert("No se seleccionó ningún producto.");
        window.location.href = "../home/home.html";
        return;
    }

    try {
        // 3. Cargamos los productos
        const response = await fetch('/data/productos.json');
        const productos = await response.json();

        // 4. Buscamos el producto específico
        const producto = productos.find((p: any) => p.id === parseInt(idProductoSeleccionado));

        if (!producto || producto.eliminado) {
            document.getElementById("producto-detalle")!.innerHTML = `<h2>Producto no encontrado o no disponible.</h2>`;
            return;
        }

        renderProducto(producto);

    } catch (error) {
        console.error("Error al cargar producto:", error);
        document.getElementById("producto-detalle")!.innerHTML = `<h2>Error al cargar el producto.</h2>`;
    }

    // Configurar Logout
    document.getElementById("btn-logout")?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "../../auth/login/login.html";
    });
}

function renderProducto(producto: any) {
    const contenedor = document.getElementById("producto-detalle")!;
    const sinStockODeshabilitado = !producto.disponible || producto.stock === 0;

    contenedor.innerHTML = `
        <div class="img-detalle-container">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-detalle">
        </div>
        <div class="info-detalle">
            <h2>${producto.nombre}</h2>
            <div class="precio-detalle">$${producto.precio}</div>
            <p class="desc-detalle">${producto.descripcion}</p>
            
            <div class="controles-compra">
                <input type="number" id="input-cant" class="input-cantidad" value="1" min="1" max="${producto.stock}" ${sinStockODeshabilitado ? 'disabled' : ''}>
                <button id="btn-add-carrito" class="btn-agregar" ${sinStockODeshabilitado ? 'disabled' : ''}>
                    ${sinStockODeshabilitado ? 'No Disponible' : 'Agregar al Carrito'}
                </button>
            </div>
            
            <p class="stock-info">
                Stock disponible: <strong>${producto.stock}</strong> unidades.
                ${!producto.disponible ? '<br><span style="color:red;">El producto se encuentra inactivo.</span>' : ''}
            </p>
        </div>
    `;

    // Evento de agregar al carrito
    if (!sinStockODeshabilitado) {
        document.getElementById("btn-add-carrito")!.addEventListener("click", () => {
            const cantidad = parseInt((document.getElementById("input-cant") as HTMLInputElement).value);
            
            if (cantidad > producto.stock) {
                alert(`Solo hay ${producto.stock} unidades disponibles.`);
                return;
            }

            agregarAlCarrito(producto, cantidad);
        });
    }
}

function agregarAlCarrito(producto: any, cantidad: number) {
    let carrito = JSON.parse(localStorage.getItem("carrito-food-store") || "[]");

    // Buscamos usando item.product
    const itemExistente = carrito.find((item: any) => item.product.id === producto.id);

    if (itemExistente) {
        // Validamos usando item.quantity
        if (itemExistente.quantity + cantidad > producto.stock) {
            alert(`No puedes agregar más. Ya tienes ${itemExistente.quantity} en el carrito y el stock máximo es ${producto.stock}.`);
            return;
        }
        itemExistente.quantity += cantidad;
        itemExistente.subtotal = itemExistente.quantity * producto.precio;
    } else {
        // Guardamos usando product y quantity
        carrito.push({
            product: producto,
            quantity: cantidad,
            subtotal: cantidad * producto.precio
        });
    }

    localStorage.setItem("carrito-food-store", JSON.stringify(carrito));
    alert(`${cantidad}x ${producto.nombre} agregado(s) al carrito.`);
    actualizarBadgeCarrito();
}

function actualizarBadgeCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito-food-store") || "[]");
    // Sumamos item.quantity
    const totalItems = carrito.reduce((sum: number, item: any) => sum + item.quantity, 0);
    document.getElementById("cart-badge")!.textContent = totalItems.toString();
}

initProductDetail();