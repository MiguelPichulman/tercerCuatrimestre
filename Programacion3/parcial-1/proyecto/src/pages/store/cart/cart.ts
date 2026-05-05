import type { CartItem } from "../../../types/product";

function inicializarCarrito(){
    const carritoString = localStorage.getItem("carrito-food-store");

    let carrito: CartItem[]=carritoString ? JSON.parse(carritoString):[];

    console.log(carrito)
    return carrito;
}
let carritoActual= inicializarCarrito();

const contenedorCarrito = document.getElementById("carrito-contenedor");

function renderCarrito(carrito: CartItem[]) {
    
    // Capturamos el cuadro de resumen usando su clase
    const asideResumen = document.querySelector(".resumen-compra") as HTMLElement; 

    if (!contenedorCarrito) return;
    contenedorCarrito.innerHTML = '';

    // --- EL ESTADO VACÍO BASADO EN TU DISEÑO ---
    if (carrito.length === 0) {
        // Dibujamos el icono, el texto y el enlace al catálogo sin estilos en línea
        contenedorCarrito.innerHTML = `
            <div class="estado-vacio">
                <span>🛒</span>
                <p>Tu carrito está vacío.</p>
                <a href="../home/home.html" class="btn-catalogo">Ver catálogo</a>
            </div>
        `;
        
        // Ocultamos el cuadro de resumen completo
        if (asideResumen) asideResumen.style.display = 'none';
        
        return; // Cortamos la ejecución aquí
    }
    
    // Si hay productos, nos aseguramos de volver a mostrar el cuadro de resumen
    if (asideResumen) asideResumen.style.display = 'block';

    carrito.forEach((item) => {
        const card = document.createElement("article");
        card.classList.add("producto-card");

        const subtotal = item.product.precio * item.quantity;

        // no tiene clic
        card.innerHTML = `
            <img src="${item.product.imagen}" alt="${item.product.nombre}">
            <div class="info-producto">
                <h3>${item.product.nombre}</h3>
                <p class="categoria-label">${item.product.categorias[0]?.nombre || 'Categoría'}</p>
                <p class="precio">Subtotal: $${subtotal.toLocaleString('es-AR')}</p>
            </div>
        `;

        //Los botones

        const controles = document.createElement("div");
        controles.classList.add("controles-contenedor");

        const pastillaCantidad = document.createElement("div");
        pastillaCantidad.classList.add("pastilla-cantidad");


        // Botón Restar
        const btnRestar = document.createElement("button");
        btnRestar.textContent = "-";

        
       
            // Lógica para restar 1
        btnRestar.addEventListener("click", () => {
            // 1. Validamos que no pueda bajar de 1 (¡No queremos cantidades negativas!)
            if (item.quantity > 1) {
                // Modificamos el dato
                item.quantity -= 1;
                
                // Guardamos en memoria (Sobreescribimos el carrito entero)
                localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));
                
                // Actualizamos la pantalla
                renderCarrito(carritoActual);
                //calcularTotal(carritoActual);
            }
        });


        // El numerito de la cantidad actual
        const spanCantidad = document.createElement("span");
        spanCantidad.textContent = item.quantity.toString();

        // Botón Sumar
        const btnSumar = document.createElement("button");
        btnSumar.textContent = "+";
        
            // Lógica para sumar 1
        btnSumar.addEventListener("click", () => {
            // Modificamos el dato
            item.quantity += 1;
            
            // Guardamos en memoria
            localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));
            
            // Actualizamos la pantalla
            renderCarrito(carritoActual);
            //calcularTotal(carritoActual);
        });
        

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar");
        
            // Lógica para quitar el producto entero

        btnEliminar.addEventListener("click", () => {
            // 1. Buscamos en qué posición está este producto
            const indice = carritoActual.findIndex((elemento) => elemento.product.id === item.product.id);

            // 2. Si lo encontramos, lo "cortamos" del arreglo (borramos 1 elemento en esa posición)
            if (indice !== -1) {
                carritoActual.splice(indice, 1);
            }

            // 3. Guardamos la nueva lista en la memoria
            localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));

            // 4. Actualizamos la pantalla y el total
            renderCarrito(carritoActual);
            //calcularTotal(carritoActual);
        });


      // 3. EL ENSAMBLAJE
        // Primero metemos los botones y el número en la pastilla gris
        pastillaCantidad.appendChild(btnRestar);
        pastillaCantidad.appendChild(spanCantidad);
        pastillaCantidad.appendChild(btnSumar);

        // Luego metemos la pastilla (ya armada) y el botón eliminar al contenedor de la derecha
        controles.appendChild(pastillaCantidad);
        controles.appendChild(btnEliminar);

        // Metemos los controles a la tarjeta, y la tarjeta al HTML
        card.appendChild(controles);
        contenedorCarrito.appendChild(card);
    });
    calcularTotal(carrito);
}

function calcularTotal(carrito: CartItem[]) {
    let total = 0;
    carrito.forEach((item) => {
        const subtotal = item.quantity * item.product.precio;
        total = total + subtotal;
    });

    const spanTotal = document.getElementById("total-precio");
    const spanSubtotal = document.getElementById("subtotal-general"); // Atrapamos el subtotal

    if (spanTotal) {
        spanTotal.textContent = total.toLocaleString('es-AR');
    }
    if (spanSubtotal) {
        spanSubtotal.textContent = total.toLocaleString('es-AR'); // Lo actualizamos también
    }
}

function vaciarCarrito(){
    localStorage.removeItem("carrito-food-store");
    carritoActual=[];

    renderCarrito(carritoActual);
    //calcularTotal(carritoActual);
}
const btnVaciar = document.getElementById("btn-vaciar");

btnVaciar?.addEventListener("click", () => {
    vaciarCarrito();
});

// Al final del archivo
renderCarrito(carritoActual);