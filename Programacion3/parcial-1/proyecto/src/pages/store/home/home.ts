import {PRODUCTS} from "..//../../data/data"; //para saber cuales productos existen
import type { Product } from "../../../types/product";
import { getCategories } from "../../../data/data";
import type { CartItem } from "../../../types/product";

const contenedor = document.getElementById("productos-contenedor");

function renderProductos(productosARenderizar:Product[]){  ////FUNCION RENDER
    
    if(!contenedor)return;

    contenedor.innerHTML='';

    if(productosARenderizar.length===0){
        contenedor.innerHTML=`<p class="mensaje-vacio">No se encontraron productos</p>`;
        return;
    }

    productosARenderizar.forEach((producto)=>{                          //se recorre el array de productos 
        const card = document.createElement("article");                 //para inyectar los productos al html
                                                                        //con innnerHTML
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
        const btnAgregar = document.createElement("button");        //aunque para agregar el btn agregar utilizamos
        btnAgregar.classList.add("btn-agregar");                    //createElement ya que dentro de innerHTML se
        btnAgregar.textContent="Agregar";                           // pierde la capacidad de atarle el evento clic
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


//  BUSCADOR

const buscador = document.getElementById("buscador") as HTMLInputElement; //captura elemento input

buscador?.addEventListener("input", ()=>{
    const texto=buscador.value.toLowerCase();

    const filtroProducto= PRODUCTS.filter((producto)=>{       // utilizamos filter sobre el array de producto para generar 
        const nombreProducto= producto.nombre.toLowerCase();  //un nuevo array que coincida con lo ingresado en el input
        return nombreProducto.includes(texto);                //y luego renderiza el nuevo array
});
    renderProductos(filtroProducto);
});


//RENDER DE CATEGORIAS


const listaUl= document.getElementById("lista-categorias"); //se genera el menu de categorias
                                                            //recorriendo el array de categorias
const renderCategorias = () =>{
    const listaCategorias = (getCategories());
     
    if(!listaUl) return;

    listaCategorias.forEach(categoria=>{
    const nuevoLi = document.createElement("li");          //crando elemntos li y a
    const nuevoEnlace = document.createElement("a");       // el evento click de cada enlace, utiliza filter y
                                                           //some para verificar si dentro del array existe
        nuevoEnlace.textContent=categoria.nombre;          // el id de la categoria que el usuario clickeo
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



// BOTON VER TODO //

const btnVerTodo = document.getElementById("btn-ver-todo"); //captuarmos el btn-ver-todo

btnVerTodo?.addEventListener("click",(e)=>{  //si existe en el DOM asigna el evento
    e.preventDefault();       //evita el comportamiento por defecto

    renderProductos(PRODUCTS);    //renderiza todo
});



//AGREGAR AL CARRITO ///

function agregarAlCarrito(productoElegido : Product){
    const carritoString = localStorage.getItem("carrito-food-store");  //traigo el localStorage
    
    let carrito: CartItem[]=carritoString ? JSON.parse(carritoString):[];  //si hay algo lo parseo, si no vacio

    const indiceExistente = carrito.findIndex((item)=>item.product.id === productoElegido.id);

    if(indiceExistente !== -1){                                                 // usamos findindex para ver si el producto elegido
        carrito[indiceExistente].quantity += 1;                 //ya esta en el carrito. SI= incrementa en 1
                                                                //NO= se hace un push con un elemento nuevo en el array
    }else{
        const nuevoItem: CartItem={
            product: productoElegido,
            quantity:1

        };
        carrito.push(nuevoItem);
    }
                                                                            // se almacena todo de nuevo en localStorage
        localStorage.setItem("carrito-food-store", JSON.stringify(carrito));  //stringify (inverso de JSON)

        alert(`${productoElegido.nombre} fue agregado correctamente`); // aviso de agregado
    
}