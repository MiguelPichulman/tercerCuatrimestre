// ============================================
// CLASE 3: TYPESCRIPT + DOM (PARTE 1)
// ============================================

// ============================================
// MÓDULO 1: El problema sin tipos en el DOM
// ============================================

console.log("=== MÓDULO 1: Problema sin tipos ===");

// ❌ JavaScript sin tipos - Esto compila pero falla en runtime
// const button = document.querySelector('#miBoton');
// button.disabled = true; // Error si button es null

// ✅ TypeScript con tipos - Detecta el error en tiempo de compilación
// const button = document.querySelector<HTMLButtonElement>('#miBoton');
// button.disabled = true; // ❌ Error: Object is possibly 'null'

console.log("TypeScript previene errores de null en tiempo de compilación");

// ============================================
// MÓDULO 2: HTMLElement y sus variantes
// ============================================

console.log("=== MÓDULO 2: Tipos específicos del DOM ===");

// PECULIARIDAD TS: Usar genéricos para especificar el tipo exacto
const btn = document.querySelector<HTMLButtonElement>("#btn");
//                                 ^^^^^^^^^^^^^^^^^^
//                                 Genérico: tipo específico del elemento

const input = document.querySelector<HTMLInputElement>("#input");
const titulo = document.querySelector<HTMLHeadingElement>("#titulo");

// Cada tipo tiene propiedades específicas
if (btn) {
  btn.addEventListener("click", () => {
    // HTMLButtonElement tiene la propiedad 'disabled'
    btn.disabled = true; // ✅ TypeScript sabe que existe
    btn.textContent = "¡Clickeado!";
    console.log("Botón deshabilitado");
  });
}

if (input) {
  input.addEventListener("input", () => {
    // HTMLInputElement tiene la propiedad 'value'
    console.log("Valor:", input.value); // ✅ TypeScript sabe que existe
  });
}

if (titulo) {
  titulo.addEventListener("click", () => {
    titulo.style.color = titulo.style.color === "red" ? "#333" : "red";
  });
}

// ============================================
// MÓDULO 3: querySelector - Selección Individual
// ============================================

console.log("=== MÓDULO 3: querySelector ===");

// PECULIARIDAD TS: querySelector retorna TipoEspecificado | null
const miBoton = document.querySelector<HTMLButtonElement>("#miBoton");
//    ^^^^^^^
//    Tipo inferido: HTMLButtonElement | null

const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

// IMPORTANTE: SIEMPRE verificar con if antes de usar
if (miBoton && mensaje) {
  miBoton.addEventListener("click", () => {
    // Dentro del if, TS sabe que NO son null (type narrowing)
    mensaje.textContent = "¡Botón clickeado!";
    miBoton.disabled = true;
    console.log("querySelector: elemento encontrado y usado de forma segura");
  });
}

// ============================================
// MÓDULO 4: querySelectorAll - Múltiples Elementos
// ============================================

console.log("=== MÓDULO 4: querySelectorAll ===");

// PECULIARIDAD TS: querySelectorAll retorna NodeListOf<Tipo>
const botones = document.querySelectorAll<HTMLButtonElement>(".btn");
//    ^^^^^^^
//    Tipo: NodeListOf<HTMLButtonElement>

const btnDeshabilitar =
  document.querySelector<HTMLButtonElement>("#deshabilitarTodos");

console.log(`Encontrados ${botones.length} botones`);

btnDeshabilitar?.addEventListener("click", () => {
  // NodeList tiene forEach ✅
  botones.forEach((boton) => {
    boton.disabled = true;
    boton.style.opacity = "0.5";
  });

  console.log("Todos los botones deshabilitados");

  if (btnDeshabilitar) {
    btnDeshabilitar.textContent = "¡Todos deshabilitados!";
    btnDeshabilitar.disabled = true;
  }
});

// PECULIARIDAD TS: NodeList NO tiene map/filter/reduce
// botones.map(btn => btn.textContent); // ❌ Error: map no existe en NodeList

// Convertir a Array para usar métodos de array
const arrayBotones = Array.from(botones); // ✅ Convertir con Array.from()

const textos = arrayBotones.map((btn) => btn.textContent);
console.log("Textos de los botones:", textos);

// ============================================
// MÓDULO 5: Event Types - MouseEvent y KeyboardEvent
// ============================================

console.log("=== MÓDULO 5: Event Types ===");

const btnClick = document.querySelector<HTMLButtonElement>("#btnClick");
const inputKey = document.querySelector<HTMLInputElement>("#inputKey");
const info = document.querySelector<HTMLParagraphElement>("#info");

// PECULIARIDAD TS: Tipar el evento como MouseEvent
btnClick?.addEventListener("click", (event: MouseEvent) => {
  //                                         ^^^^^^^^^^
  //                                         Tipo específico del evento

  // Ahora TS conoce las propiedades de MouseEvent
  if (info) {
    info.textContent = `Click en X: ${event.clientX}, Y: ${event.clientY}`;
    info.style.background = "#ffe6e6";
  }

  console.log("MouseEvent:", {
    x: event.clientX,
    y: event.clientY,
    button: event.button, // 0=izq, 1=medio, 2=der
    ctrlKey: event.ctrlKey,
  });
});

// PECULIARIDAD TS: Tipar el evento como KeyboardEvent
inputKey?.addEventListener("keydown", (event: KeyboardEvent) => {
  //                                           ^^^^^^^^^^^^^
  //                                           Tipo específico del evento

  console.log("KeyboardEvent:", {
    key: event.key, // 'Enter', 'a', 'Escape'
    code: event.code, // 'KeyA', 'Space'
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
  });

  if (event.key === "Enter" && info && inputKey) {
    info.textContent = `Escribiste: "${inputKey.value}"`;
    info.style.background = "#e6ffe6";
    inputKey.value = "";
  }
});


// ============================================
// RESUMEN DE PECULIARIDADES TS
// ============================================

console.log(`
=== RESUMEN: Peculiaridades de TypeScript con DOM ===

1. Genéricos en querySelector: <HTMLButtonElement>
2. Retorno nullable: querySelector retorna Tipo | null
3. Verificación con if: SIEMPRE verificar antes de usar
4. NodeListOf<T> vs Array<T>: NodeList no tiene map/filter
5. Event Types: MouseEvent, KeyboardEvent tienen propiedades específicas
6. Type Narrowing: TS infiere tipos dentro de if

¡Clase completada!
`);
