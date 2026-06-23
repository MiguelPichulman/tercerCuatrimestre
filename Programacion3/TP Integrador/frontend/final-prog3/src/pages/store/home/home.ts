import type { Product } from "../../../types/product";
import type { ICategory } from "../../../types/category";
// IMPORTAMOS LA LÓGICA CENTRALIZADA DEL HEADER
import { configurarHeader } from "../../../utils/header"; 

const contenedor = document.getElementById("productos-contenedor");
const listaUl = document.getElementById("lista-categorias");
const buscador = document.getElementById("buscador") as HTMLInputElement;
const selectOrdenamiento = document.getElementById("ordenamiento") as HTMLSelectElement;

// Variables globales para guardar los datos en memoria
let todosLosProductos: Product[] = []; 
let todasLasCategorias: ICategory[] = [];
let productosMostrados: Product[] = []; 

// INICIALIZACIÓN DIRECTA
async function init() {
    configurarHeader(); // <-- INICIAMOS EL HEADER ACÁ
    await cargarDatos();
    renderCategorias(todasLasCategorias);
    productosMostrados = [...todosLosProductos]; 
    renderProductos(productosMostrados);
}

init(); // Llamamos a la función apenas carga el script

// FETCH DE DATOS
async function cargarDatos() {
    try {
        const resCat = await fetch('/data/categorias.json');
        todasLasCategorias = await resCat.json();

        const resProd = await fetch('/data/productos.json');
        const productosData: Product[] = await resProd.json();
        
        todosLosProductos = productosData.filter(p => p.disponible === true && p.eliminado !== true);
    } catch (error) {
        console.error("Error al cargar los JSON:", error);
    }
}

// RENDER DE PRODUCTOS
function renderProductos(productosARenderizar: Product[]) {
    if (!contenedor) return;
    contenedor.innerHTML = '';

    if (productosARenderizar.length === 0) {
        contenedor.innerHTML = `<p class="mensaje-vacio">No se encontraron productos</p>`;
        return;
    }

    productosARenderizar.forEach((producto) => {
        const card = document.createElement("article");
        card.classList.add("producto-card");
        
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="150px">
            <p class="categoria-label">${producto.categoria?.nombre || 'Categoría'}</p>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <div class="footer-card">
                <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
            </div>
        `;
        
        const btnDetalle = document.createElement("button");
        btnDetalle.classList.add("btn-agregar"); 
        btnDetalle.textContent = "Ver Detalle";
        
        btnDetalle.addEventListener("click", () => {
            window.location.href = `../productDetail/productDetail.html?id=${producto.id}`;
        });

        const footerCard = card.querySelector(".footer-card");
        if (footerCard) {
            footerCard.appendChild(btnDetalle);
        }

        contenedor.appendChild(card);
    });
}

// RENDER DE CATEGORIAS
function renderCategorias(categorias: ICategory[]) {
    if (!listaUl) return;
    
    listaUl.innerHTML = '<li><a href="#" id="btn-ver-todo-dinamico">Todas las categorias</a></li>';
    
    const btnVerTodoDinamico = document.getElementById("btn-ver-todo-dinamico");
    btnVerTodoDinamico?.addEventListener("click", (e) => {
        e.preventDefault();
        productosMostrados = [...todosLosProductos]; 
        aplicarOrdenamiento(); 
    });

    categorias.forEach(categoria => {
        const nuevoLi = document.createElement("li");
        const nuevoEnlace = document.createElement("a");
        
        nuevoEnlace.textContent = categoria.nombre;
        nuevoEnlace.href = "#";

        nuevoEnlace.addEventListener("click", (e) => {
            e.preventDefault();
            productosMostrados = todosLosProductos.filter((producto) => {
                return producto.categoria && producto.categoria.id === categoria.id;
            });
            aplicarOrdenamiento(); 
        });

        nuevoLi.appendChild(nuevoEnlace);
        listaUl.appendChild(nuevoLi);
    });
}

// BUSCADOR
buscador?.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    productosMostrados = todosLosProductos.filter((producto) => {
        const nombreProducto = producto.nombre.toLowerCase();
        return nombreProducto.includes(texto);
    });
    aplicarOrdenamiento(); 
});

// LÓGICA DE ORDENAMIENTO
selectOrdenamiento?.addEventListener("change", () => {
    aplicarOrdenamiento();
});

function aplicarOrdenamiento() {
    const criterio = selectOrdenamiento?.value;

    if (criterio === "az") {
        productosMostrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (criterio === "za") {
        productosMostrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (criterio === "asc") {
        productosMostrados.sort((a, b) => a.precio - b.precio);
    } else if (criterio === "desc") {
        productosMostrados.sort((a, b) => b.precio - a.precio);
    }

    renderProductos(productosMostrados);
}