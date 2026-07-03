let productosGlobal: any[] = [];
let categoriasGlobal: any[] = [];

async function initProductos() {
    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) return window.location.href = "../../auth/login/login.html";
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol !== "ADMIN") return window.location.href = "../../store/home/home.html";
    document.getElementById("admin-name-display")!.textContent = usuario.nombre;

    try {
        
        const guardados = localStorage.getItem("productos-locales");
        if (guardados) {
            productosGlobal = JSON.parse(guardados);
            categoriasGlobal = JSON.parse(localStorage.getItem("categorias-locales") || "[]");
            llenarSelectCategorias();
            renderTabla();
        } else {
            const [prodRes, catRes] = await Promise.all([ fetch('/data/productos.json'), fetch('/data/categorias.json') ]);
            productosGlobal = await prodRes.json();
            categoriasGlobal = await catRes.json();
            guardarProductosEnMemoria();
            llenarSelectCategorias();
            renderTabla();
        }
    } catch (error) {
        console.error("Error cargando datos:", error);
    }

    configurarEventos();
}

function llenarSelectCategorias() {
    const select = document.getElementById("prod-categoria") as HTMLSelectElement;
    select.innerHTML = '';
    
    categoriasGlobal.filter(c => !c.eliminado).forEach(cat => {
        select.innerHTML += `<option value="${cat.id}">${cat.nombre}</option>`;
    });
}

function renderTabla() {
    const tbody = document.getElementById("tabla-productos")!;
    tbody.innerHTML = '';

    const activos = productosGlobal.filter(p => !p.eliminado);

    activos.forEach(prod => {
        
        const idCatProducto = prod.categoria?.id || prod.categoriaId;
        
        const cat = categoriasGlobal.find(c => c.id === idCatProducto);
        const nombreCat = cat ? cat.nombre : 'Sin Categoría';
        const estadoHTML = prod.disponible ? '<span style="color: green;">✅ Activo</span>' : '<span style="color: red;">❌ Inactivo</span>';

        tbody.innerHTML += `
            <tr>
                <td><img src="${prod.imagen}" alt="${prod.nombre}" class="img-thumbnail"></td>
                <td><strong>${prod.nombre}</strong></td>
                <td>${nombreCat}</td>
                <td>$${prod.precio}</td>
                <td>${prod.stock}</td>
                <td>${estadoHTML}</td>
                <td>
                    <button class="btn-accion btn-editar" data-id="${prod.id}">Editar</button>
                    <button class="btn-accion btn-eliminar" data-id="${prod.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", (e) => abrirModalEdicion(parseInt((e.target as HTMLButtonElement).dataset.id!)));
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => eliminarProducto(parseInt((e.target as HTMLButtonElement).dataset.id!)));
    });
}

function configurarEventos() {
    const modal = document.getElementById("modal-producto")!;
    const form = document.getElementById("form-producto") as HTMLFormElement;

    document.getElementById("btn-nuevo-producto")!.addEventListener("click", () => {
        if (categoriasGlobal.filter(c => !c.eliminado).length === 0) {
            alert("Debes crear al menos una categoría activa antes de crear un producto.");
            return;
        }
        document.getElementById("modal-titulo")!.textContent = "Nuevo Producto";
        form.reset();
        (document.getElementById("prod-id") as HTMLInputElement).value = "";
        modal.classList.remove("oculto");
    });

    document.getElementById("btn-cerrar-modal")!.addEventListener("click", () => modal.classList.add("oculto"));

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const precio = parseFloat((document.getElementById("prod-precio") as HTMLInputElement).value);
        const stock = parseInt((document.getElementById("prod-stock") as HTMLInputElement).value);

        
        if (precio <= 0) return alert("El precio debe ser mayor a 0.");
        if (stock < 0) return alert("El stock no puede ser negativo.");

        const idInput = (document.getElementById("prod-id") as HTMLInputElement).value;
        const nombre = (document.getElementById("prod-nombre") as HTMLInputElement).value;
        const desc = (document.getElementById("prod-desc") as HTMLTextAreaElement).value;
        const catId = parseInt((document.getElementById("prod-categoria") as HTMLSelectElement).value);
        const img = (document.getElementById("prod-img") as HTMLInputElement).value;
        const disponible = (document.getElementById("prod-disponible") as HTMLInputElement).checked;

        if (idInput) {
            
            const prod = productosGlobal.find(p => p.id === parseInt(idInput));
            if (prod) {
                prod.nombre = nombre; prod.descripcion = desc; prod.precio = precio;
                prod.stock = stock; prod.categoriaId = catId; prod.imagen = img; prod.disponible = disponible;
            }
        } else {
            
            productosGlobal.push({
                id: Date.now(), nombre: nombre, descripcion: desc, precio: precio,
                stock: stock, categoriaId: catId, imagen: img, disponible: disponible, eliminado: false
            });
        }
        guardarProductosEnMemoria();
        modal.classList.add("oculto");
        renderTabla();
        
    });

    document.getElementById("btn-logout-admin")?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "../../auth/login/login.html";
    });
}

function abrirModalEdicion(id: number) {
    const prod = productosGlobal.find(p => p.id === id);
    if (!prod) return;

    
    const idCatProducto = prod.categoria?.id || prod.categoriaId || '';

    document.getElementById("modal-titulo")!.textContent = "Editar Producto";
    (document.getElementById("prod-id") as HTMLInputElement).value = prod.id.toString();
    (document.getElementById("prod-nombre") as HTMLInputElement).value = prod.nombre;
    (document.getElementById("prod-desc") as HTMLTextAreaElement).value = prod.descripcion;
    (document.getElementById("prod-precio") as HTMLInputElement).value = prod.precio.toString();
    (document.getElementById("prod-stock") as HTMLInputElement).value = prod.stock.toString();
    
    (document.getElementById("prod-categoria") as HTMLSelectElement).value = idCatProducto.toString();
    
    (document.getElementById("prod-img") as HTMLInputElement).value = prod.imagen;
    (document.getElementById("prod-disponible") as HTMLInputElement).checked = prod.disponible;

    document.getElementById("modal-producto")!.classList.remove("oculto");
}

function eliminarProducto(id: number) {
    if (confirm("¿Seguro que deseas eliminar este producto lógicamente?")) {
        const prod = productosGlobal.find(p => p.id === id);
        if (prod) {
            prod.eliminado = true;
            guardarProductosEnMemoria();
        }
        renderTabla();
    }
}
function guardarProductosEnMemoria() {
    localStorage.setItem("productos-locales", JSON.stringify(productosGlobal));
}

initProductos();