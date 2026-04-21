function cargarCategorias(){
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
