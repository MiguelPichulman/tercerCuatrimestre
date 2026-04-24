// ============================================
// CLASE 4: TYPESCRIPT + DOM (PARTE 2) + AVANZADO
// ============================================

console.log("=== CLASE 4 INICIALIZADA ===");

// ============================================
// MÓDULO 2-3: FormData en Acción
// ============================================

const form = document.querySelector<HTMLFormElement>("#registro");
const resultado = document.querySelector<HTMLDivElement>("#resultado");

form?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  console.log("=== FORMULARIO ENVIADO ===");

  const formElement = event.currentTarget as HTMLFormElement;

  // Usar FormData para extraer todos los valores
  const formData = new FormData(formElement);

  // Extraer cada campo
  const datos = {
    nombre: formData.get("nombre") as string,
    email: formData.get("email") as string,
    edad: parseInt(formData.get("edad") as string),
    pais: formData.get("pais") as string,
  };

  console.log("Datos extraídos con FormData:", datos);

  // Mostrar resultado en pantalla
  if (resultado) {
    resultado.className = "success";
    resultado.style.display = "block";
    resultado.innerHTML = `
      <h3>✅ Usuario Registrado</h3>
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Edad:</strong> ${datos.edad} años</p>
      <p><strong>País:</strong> ${datos.pais.toUpperCase()}</p>
    `;
  }

  // Limpiar formulario
  formElement.reset();

  // Ocultar resultado después de 5 segundos
  setTimeout(() => {
    if (resultado) {
      resultado.style.display = "none";
    }
  }, 5000);
});

// ============================================
// MÓDULO 4: Type Guards - typeof
// ============================================

console.log("=== MÓDULO 4: Type Guards - typeof ===");

function procesar(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else {
    return valor.toFixed(2);
  }
}

console.log('procesar("hola"):', procesar("hola"));
console.log("procesar(3.14159):", procesar(3.14159));

function mostrarLongitud(texto: unknown): void {
  if (typeof texto === "string") {
    console.log(`Es string, longitud: ${texto.length}`);
  } else {
    console.log("No es un string, es:", typeof texto);
  }
}

mostrarLongitud("TypeScript");
mostrarLongitud(123);
mostrarLongitud(true);

// ============================================
// MÓDULO 4-5: Type Guards - instanceof (MEJORADO)
// ============================================

console.log("=== MÓDULO 4-5: Type Guards - instanceof ===");

/**
 * ❌ SIN instanceof - TypeScript no sabe el tipo específico
 * Esta función NO compilaría porque HTMLElement no tiene 'disabled'
 */
// function manejarSinTypeGuard(elemento: HTMLElement): void {
//   elemento.disabled = true; // ❌ Error: disabled no existe en HTMLElement
// }

/**
 * ✅ CON instanceof - TypeScript sabe el tipo después de validar
 * Esta función SÍ compila porque validamos cada tipo específico
 */
function analizarElemento(elemento: HTMLElement): {
  tipo: string;
  propiedadesUnicas: string[];
  ejemplo: string;
} {
  if (elemento instanceof HTMLButtonElement) {
    // ✅ Aquí TS sabe que elemento es HTMLButtonElement
    return {
      tipo: "HTMLButtonElement",
      propiedadesUnicas: ["disabled", "type", "form"],
      ejemplo: `disabled = ${elemento.disabled}`,
    };
  } else if (elemento instanceof HTMLInputElement) {
    // ✅ Aquí TS sabe que elemento es HTMLInputElement
    return {
      tipo: "HTMLInputElement",
      propiedadesUnicas: ["value", "placeholder", "type", "checked"],
      ejemplo: `value = "${elemento.value}", type = "${elemento.type}"`,
    };
  } else if (elemento instanceof HTMLDivElement) {
    // ✅ Aquí TS sabe que elemento es HTMLDivElement
    return {
      tipo: "HTMLDivElement",
      propiedadesUnicas: ["align", "innerHTML"],
      ejemplo: `id = "${elemento.id}"`,
    };
  } else if (elemento instanceof HTMLSelectElement) {
    // ✅ Aquí TS sabe que elemento es HTMLSelectElement
    return {
      tipo: "HTMLSelectElement",
      propiedadesUnicas: ["options", "selectedIndex", "value"],
      ejemplo: `selectedIndex = ${elemento.selectedIndex}`,
    };
  } else {
    // Tipo genérico
    return {
      tipo: `HTMLElement genérico (${elemento.tagName})`,
      propiedadesUnicas: ["className", "id", "tagName"],
      ejemplo: `tagName = "${elemento.tagName}"`,
    };
  }
}

// Hacer INTERACTIVOS todos los elementos demo
const elementosDemo = document.querySelectorAll<HTMLElement>(".elemento-demo");
const tipoInfo = document.querySelector<HTMLDivElement>("#tipo-info");
const tipoDetalle = document.querySelector<HTMLPreElement>("#tipo-detalle");

elementosDemo.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    console.log("🔍 Elemento clickeado:", elemento);

    const info = analizarElemento(elemento);

    console.log("📊 Análisis:", info);

    if (tipoInfo && tipoDetalle) {
      tipoInfo.style.display = "block";
      tipoDetalle.textContent = `
Tipo detectado: ${info.tipo}

Propiedades únicas de este tipo:
${info.propiedadesUnicas.map((prop) => `  • ${prop}`).join("\n")}

Ejemplo de uso:
  ${info.ejemplo}

✅ instanceof permite acceder a propiedades específicas de forma segura
      `.trim();
    }
  });
});

