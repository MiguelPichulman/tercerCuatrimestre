import type { Product, CartItem } from "../../../types/product";

const contenedor = document.getElementById("detalle-contenedor");

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Obtenemos el ID de la URL
    const params = new URLSearchParams(window.location.search);
    const idProducto = Number(params.get("id"));

    if (!idProducto) {
        if (contenedor) contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    try {
        // 2. Buscamos el producto en el JSON
        const response = await fetch('/data/productos.json');
        const productos: Product[] = await response.json();
        
        const productoElegido = productos.find(p => p.id === idProducto);

        if (productoElegido) {
            renderDetalle(productoElegido);
        } else {
            if (contenedor) contenedor.innerHTML = "<p>El producto no existe.</p>";
        }
    } catch (error) {
        console.error("Error al cargar el producto:", error);
    }
});

function renderDetalle(producto: Product) {
    if (!contenedor) return;

    // 3. Renderizamos la vista del detalle
    contenedor.innerHTML = `
        <div style="flex: 1;">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; border-radius: 8px; object-fit: cover; aspect-ratio: 1/1;">
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
            <span style="color: #ff6347; font-weight: bold; font-size: 0.9rem; text-transform: uppercase;">${producto.categoria?.nombre || 'Categoría'}</span>
            <h2 style="font-size: 2rem; margin: 10px 0;">${producto.nombre}</h2>
            <p style="color: #666; font-size: 1.1rem; margin-bottom: 20px;">${producto.descripcion}</p>
            <p style="font-size: 1.8rem; font-weight: bold; margin-bottom: 20px;">$${producto.precio.toLocaleString('es-AR')}</p>
            
            <p style="margin-bottom: 10px; color: ${producto.stock > 0 ? 'green' : 'red'};">
                Stock disponible: ${producto.stock}
            </p>

            <div style="display: flex; gap: 15px; margin-top: 20px;">
                <input type="number" id="input-cantidad" value="1" min="1" max="${producto.stock}" style="width: 70px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; text-align: center; font-size: 1.1rem;">
                <button id="btn-sumar-carrito" style="flex: 1; background-color: #ff6347; color: white; border: none; border-radius: 4px; font-weight: bold; font-size: 1.1rem; cursor: pointer; padding: 10px;" ${producto.stock === 0 ? 'disabled' : ''}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;

    // 4. Lógica para agregar al carrito
    const btnAgregar = document.getElementById("btn-sumar-carrito");
    const inputCantidad = document.getElementById("input-cantidad") as HTMLInputElement;

    btnAgregar?.addEventListener("click", () => {
        const cantidadIngresada = Number(inputCantidad.value);

        // Validación de stock
        if (cantidadIngresada > producto.stock) {
            alert(`No puedes agregar más de ${producto.stock} unidades.`);
            return;
        }

        guardarEnCarrito(producto, cantidadIngresada);
    });
}

function guardarEnCarrito(producto: Product, cantidad: number) {
    const carritoString = localStorage.getItem("carrito-food-store");
    let carrito: CartItem[] = carritoString ? JSON.parse(carritoString) : [];

    const indiceExistente = carrito.findIndex((item) => item.product.id === producto.id);

    if (indiceExistente !== -1) {
        // Validamos que la suma no supere el stock
        const nuevaCantidad = carrito[indiceExistente].quantity + cantidad;
        if(nuevaCantidad > producto.stock){
            alert(`Ya tienes unidades en el carrito. No puedes superar el stock total de ${producto.stock}.`);
            return;
        }
        carrito[indiceExistente].quantity = nuevaCantidad;
    } else {
        carrito.push({ product: producto, quantity: cantidad });
    }

    localStorage.setItem("carrito-food-store", JSON.stringify(carrito));
    alert(`${cantidad}x ${producto.nombre} agregado(s) al carrito.`);
}