const cargarCategorias = () =>{
    const listaUl = document.getElementById("lista-categorias");

    categorias.forEach(nombreCategoria=>{
        const nuevoLi = document.createElement("li");
        const nuevoEnlace = document.createElement("a");

        nuevoEnlace.textContent=nombreCategoria;
        nuevoEnlace.href="#";
        nuevoLi.appendChild(nuevoEnlace);

        listaUl.appendChild(nuevoLi);
        
    })
}
cargarCategorias();

const cargarProductos=()=> {
  
    const contenedor = document.getElementById("contenedor-productos");

    productos.forEach(producto => {        
  
        const card = document.createElement("article");
        
        card.classList.add("producto-card");

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="250px">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">$${producto.precio}</p>
            <button type="button" onclick="alert('Has seleccionado: ${producto.nombre}')">
                Agregar al Carrito
            </button>
        `;

        contenedor.appendChild(card);
    });
}

cargarProductos();