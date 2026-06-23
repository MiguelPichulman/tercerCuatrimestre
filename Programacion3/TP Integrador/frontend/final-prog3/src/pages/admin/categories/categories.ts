let categoriasGlobal: any[] = [];

async function initCategorias() {
    // Seguridad: Verificar si es admin
    const usuarioString = localStorage.getItem("userData");
    if (!usuarioString) return window.location.href = "../../auth/login/login.html";
    const usuario = JSON.parse(usuarioString);
    if (usuario.rol !== "ADMIN") return window.location.href = "../../store/home/home.html";
    document.getElementById("admin-name-display")!.textContent = usuario.nombre;

    // Cargar JSON
    try {
        const response = await fetch('/data/categorias.json');
        categoriasGlobal = await response.json();
        renderTabla();
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }

    configurarEventos();
}

function renderTabla() {
    const tbody = document.getElementById("tabla-categorias")!;
    tbody.innerHTML = '';

    // Mostrar solo las que no están eliminadas (baja lógica)
    const activas = categoriasGlobal.filter(c => !c.eliminado);

    activas.forEach(cat => {
        tbody.innerHTML += `
            <tr>
                <td>${cat.id}</td>
                <td><img src="${cat.imagen}" alt="${cat.nombre}" class="img-thumbnail"></td>
                <td><strong>${cat.nombre}</strong></td>
                <td>
                    <button class="btn-accion btn-editar" data-id="${cat.id}">Editar</button>
                    <button class="btn-accion btn-eliminar" data-id="${cat.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });

    // Agregar eventos a los botones de la tabla
    document.querySelectorAll(".btn-editar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            abrirModalEdicion(id);
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt((e.target as HTMLButtonElement).dataset.id!);
            if (confirm("¿Seguro que deseas eliminar esta categoría?")) {
                const cat = categoriasGlobal.find(c => c.id === id);
                if (cat) cat.eliminado = true; // Baja lógica
                renderTabla();
            }
        });
    });
}

function configurarEventos() {
    const modal = document.getElementById("modal-categoria")!;
    const form = document.getElementById("form-categoria") as HTMLFormElement;

    // Abrir modal para crear
    document.getElementById("btn-nueva-categoria")!.addEventListener("click", () => {
        document.getElementById("modal-titulo")!.textContent = "Nueva Categoría";
        form.reset();
        (document.getElementById("cat-id") as HTMLInputElement).value = "";
        modal.classList.remove("oculto");
    });

    // Cerrar modal
    document.getElementById("btn-cerrar-modal")!.addEventListener("click", () => {
        modal.classList.add("oculto");
    });

    // Submit del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const idInput = (document.getElementById("cat-id") as HTMLInputElement).value;
        const nombre = (document.getElementById("cat-nombre") as HTMLInputElement).value;
        const img = (document.getElementById("cat-img") as HTMLInputElement).value;

        if (idInput) {
            // Es una edición
            const cat = categoriasGlobal.find(c => c.id === parseInt(idInput));
            if (cat) {
                cat.nombre = nombre;
                cat.imagen = img;
            }
        } else {
            // Es una creación
            categoriasGlobal.push({
                id: Date.now(), // ID simulado
                nombre: nombre,
                imagen: img,
                eliminado: false
            });
        }
        
        modal.classList.add("oculto");
        renderTabla();
    });

    document.getElementById("btn-logout-admin")?.addEventListener("click", () => {
        localStorage.removeItem("userData");
        window.location.href = "../../auth/login/login.html";
    });
}

function abrirModalEdicion(id: number) {
    const cat = categoriasGlobal.find(c => c.id === id);
    if (!cat) return;

    document.getElementById("modal-titulo")!.textContent = "Editar Categoría";
    (document.getElementById("cat-id") as HTMLInputElement).value = cat.id.toString();
    (document.getElementById("cat-nombre") as HTMLInputElement).value = cat.nombre;
    (document.getElementById("cat-img") as HTMLInputElement).value = cat.imagen;

    document.getElementById("modal-categoria")!.classList.remove("oculto");
}

initCategorias();