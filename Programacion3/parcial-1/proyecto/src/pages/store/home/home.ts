import {PRODUCTS} from "..//../../data/data"; //para saber cuales productos existen
import type { Product } from "../../../types/product";
import { getCategories } from "../../../data/data";
import type { CartItem } from "../../../types/product";

const contenedor = document.getElementById("productos-contenedor"); //mete en contenedor , productos-contenedor

function renderProductos(productosARenderizar:Product[]){
    
    if(!contenedor)return;

    contenedor.innerHTML='';

    if(productosARenderizar.length===0){
        contenedor.innerHTML=`<p class="mensaje-vacio">No se encontraron productos</p>`;
        return;
    }

    productosARenderizar.forEach((producto)=>{
        const card = document.createElement("article");

        card.classList.add("producto-card");
//innerHTML problemas con botones xq los toma como string
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="150px">
            <p class="categoria-label">${producto.categorias[0].nombre || 'Categoría'}</p>
            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <div class="footer-card">
            <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
            </div>

            
        `;
        //crear boton agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.classList.add("btn-agregar");
        btnAgregar.textContent="Agregar";

        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(producto);
        });
        const footerCard = card.querySelector(".footer-card");
            if(footerCard){
                footerCard.appendChild(btnAgregar);
            }

        contenedor.appendChild(card);
            
    });
}

renderProductos(PRODUCTS);

//buscador
const buscador = document.getElementById("buscador") as HTMLInputElement;

buscador?.addEventListener("input", ()=>{
    const texto=buscador.value.toLowerCase();

    const filtroProducto= PRODUCTS.filter((producto)=>{
        const nombreProducto= producto.nombre.toLowerCase();
        return nombreProducto.includes(texto);
});
    renderProductos(filtroProducto);
});

//render de categorias
const listaUl= document.getElementById("lista-categorias");

const renderCategorias = () =>{
    const listaCategorias = (getCategories());
     
    if(!listaUl) return;

    listaCategorias.forEach(categoria=>{
    const nuevoLi = document.createElement("li");
    const nuevoEnlace = document.createElement("a");

        nuevoEnlace.textContent=categoria.nombre;
        nuevoEnlace.href="#";

        nuevoEnlace.addEventListener("click", (e)=>{
            e.preventDefault();

            const productosFiltrados= PRODUCTS.filter((producto)=>{//lo dificil
                return producto.categorias.some((cat)=>cat.id === categoria.id);
            });

            renderProductos(productosFiltrados);
        })        


        nuevoLi.appendChild(nuevoEnlace);
        listaUl.appendChild(nuevoLi);
        
    })
}
renderCategorias();

//capturar boton, evento clic
const btnVerTodo = document.getElementById("btn-ver-todo");

btnVerTodo?.addEventListener("click",(e)=>{
    e.preventDefault();

    renderProductos(PRODUCTS);
});

//funcion agregar al carrito
function agregarAlCarrito(productoElegido : Product){
    const carritoString = localStorage.getItem("carrito-food-store");
    
    let carrito: CartItem[]=carritoString ? JSON.parse(carritoString):[];

    const indiceExistente = carrito.findIndex((item)=>item.product.id === productoElegido.id);

    if(indiceExistente !== -1){
        carrito[indiceExistente].quantity += 1;

    }else{
        const nuevoItem: CartItem={
            product: productoElegido,
            quantity:1

        };
        carrito.push(nuevoItem);
    }

        localStorage.setItem("carrito-food-store", JSON.stringify(carrito));

        alert(`${productoElegido.nombre} fue agregado correctamente`);
    
}