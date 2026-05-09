import type { CartItem } from "../../../types/product";

function inicializarCarrito(){
    const carritoString = localStorage.getItem("carrito-food-store");        //traigo el localStorage

    let carrito: CartItem[]=carritoString ? JSON.parse(carritoString):[];  //se parsea si existe 

    console.log(carrito)
    return carrito;
}
let carritoActual= inicializarCarrito();                //se guarda para manejar el estado en toda la pagina

const contenedorCarrito = document.getElementById("carrito-contenedor");

//RENDER CARRITO

function renderCarrito(carrito: CartItem[]) {
    
    const asideResumen = document.querySelector(".resumen-compra") as HTMLElement; //funcion ppal de renderizado
                                                                                   
    if (!contenedorCarrito) return;
    contenedorCarrito.innerHTML = ''; 

    // EL ESTADO VACIO                           //si no hay carrito
    if (carrito.length === 0) {                  //INYECTAMOS icono, texto y enlace al catalogo                           
        
        contenedorCarrito.innerHTML = `
            <div class="estado-vacio">
                <span>🛒</span>
                <p>Tu carrito está vacío.</p>
                <a href="../home/home.html" class="btn-catalogo">Ver catálogo</a>
            </div>
        `;
        
        if (asideResumen) asideResumen.style.display = 'none';

        contenedorCarrito.style.gridColumn='1/3';
        
        return;
    }

    if (asideResumen) asideResumen.style.display = 'block';
    contenedorCarrito.style.gridColumn='1/2';

    carrito.forEach((item) => {                               //recorremos el array al igual que con el catalogo
        const card = document.createElement("article");        //creamos la etiqueta article y  usamos innerHTML
        card.classList.add("producto-card");

        const subtotal = item.product.precio * item.quantity; //precio del producto por cantidad que figura en el carrito

                                                        //*armado hibrido innerHTML y createElement
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
       
        btnRestar.addEventListener("click", () => {
           
            if (item.quantity > 1) {
                
                item.quantity -= 1;
                
                localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));
                
                renderCarrito(carritoActual);
                //calcularTotal(carritoActual);
            }
        });

        const spanCantidad = document.createElement("span");
        spanCantidad.textContent = item.quantity.toString();

        // Botón Sumar
        const btnSumar = document.createElement("button");
        btnSumar.textContent = "+";
        
        btnSumar.addEventListener("click", () => {
            
            item.quantity += 1;
            
            localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));
            
            renderCarrito(carritoActual);
            //calcularTotal(carritoActual);
        });
        

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("btn-eliminar");
        
            // Logica para quitar el producto entero

        btnEliminar.addEventListener("click", () => {
           
            const indice = carritoActual.findIndex((elemento) => elemento.product.id === item.product.id);

            
            if (indice !== -1) {
                carritoActual.splice(indice, 1);
            }

            localStorage.setItem("carrito-food-store", JSON.stringify(carritoActual));

            renderCarrito(carritoActual);
            //calcularTotal(carritoActual);
        });


        pastillaCantidad.appendChild(btnRestar);
        pastillaCantidad.appendChild(spanCantidad);
        pastillaCantidad.appendChild(btnSumar);

        controles.appendChild(pastillaCantidad);
        controles.appendChild(btnEliminar);

        card.appendChild(controles);
        contenedorCarrito.appendChild(card);
    });
    calcularTotal(carrito);
}


//CALCULAR TOTAL

function calcularTotal(carrito: CartItem[]) {              //funcion que itera sobre los items multiplicando su cantidad por su valor
    let total = 0;                                          //almmacena en total y leugo se actualiza el DOM
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
        spanSubtotal.textContent = total.toLocaleString('es-AR'); // Lo actualizamos tambien
    }
}

function vaciarCarrito(){
    localStorage.removeItem("carrito-food-store");  //vacia el array del localStorage y renderiza 
    carritoActual=[];

    renderCarrito(carritoActual);
    //calcularTotal(carritoActual);
}
const btnVaciar = document.getElementById("btn-vaciar");

btnVaciar?.addEventListener("click", () => {
    vaciarCarrito();
});

renderCarrito(carritoActual);