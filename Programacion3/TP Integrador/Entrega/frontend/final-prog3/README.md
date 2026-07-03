

# Food Store - Trabajo Práctico Integrador (Frontend)

Proyecto desarrollado para la asignatura Programación III. Consiste en una aplicación web de comercio electrónico enfocada en una arquitectura multipágina (MPA) utilizando Vite y TypeScript. El sistema integra la gestión de un catálogo de productos, un carrito de compras para clientes y un panel administrativo con permisos basados en roles.

# Link al video demostrativo
https://drive.google.com/file/d/1JEdRwKArScp6bbIjjtonX7f-LLgyhAa2/view?usp=sharing

## 🎯 Objetivo del Proyecto

El propósito principal de este Trabajo Práctico Integrador es aplicar y consolidar los conceptos fundamentales del desarrollo web del lado del cliente. A través de la construcción de "Food Store", se busca:
* Desarrollar una interfaz de usuario interactiva y dinámica mediante la manipulación del DOM.
* Implementar un tipado estricto y seguro utilizando TypeScript.
* Simular un entorno real de consumo de datos asíncrono utilizando `fetch` y archivos JSON.
* Gestionar estados temporales y control de accesos básicos simulando un flujo completo de e-commerce y administración.


> **📌 Nota para el evaluador:**
> El punto de entrada principal del sistema (`index.html`) redirige automáticamente a la pantalla de Login para asegurar el control de acceso. Para probar el flujo de cliente (catálogo y carrito) o el panel administrativo, por favor inicie sesión utilizando las credenciales provistas al final de este documento. El sistema lo enrutará a la vista correspondiente según su rol.

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** TypeScript
* **Framework/Bundler:** Vite
* **Estilos:** HTML5 y CSS3 puro
* **Persistencia:** `localStorage` (Manejo de sesiones, carrito temporal y persistencia en memoria de los ABM)
* **Fuente de Datos:** API Fetch consumiendo archivos `.json` locales.

---

## 📋 Consideraciones Técnicas y Lógica de Negocio

Para asegurar el correcto funcionamiento y cumplimiento de la rúbrica, se implementaron las siguientes lógicas:

* **Estandarización de Estados (`pedidos.json`):** Se modificó el atributo de estado en los datos fuente para garantizar la compatibilidad estricta con el modelo de dominio oficial. El sistema trabaja exclusivamente con los estados: `PENDIENTE`, `CONFIRMADO`, `TERMINADO` y `CANCELADO`.
* **Protección de Rutas y Seguridad:** Se implementó una protección en la capa de navegación visual que oculta las funcionalidades de compra (carrito, mis pedidos) para el rol de administrador. Adicionalmente, existe una guardia de navegación en los controladores (`init()`) para evitar accesos indebidos por URL cruzada entre roles.
* **Costo de Envío:** El cálculo del checkout incluye un costo de envío fijo implementado mediante una constante global en la lógica del carrito (`COSTO_ENVIO = 1500`).

## 💾 Persistencia en Memoria (LocalStorage)

Dado que el backend en Java corresponde a una segunda etapa, la persistencia temporal se resolvió en el cliente:

* **Gestión de Catálogo:** Las operaciones de creación, edición y eliminación lógica de categorías y productos se aplican sobre los arrays en memoria y se sincronizan con `localStorage`. Esto permite mantener la integridad de los datos (CRUD) durante la sesión activa ante recargas de página (F5).
* **Estados de Pedidos:** Los cambios de estado realizados desde el panel administrativo sobre los pedidos se guardan en el storage temporal para reflejarse dinámicamente en el renderizado sin perder su referencia.

---

## 🚀 Guía de Inicio Rápido

**1. Instalación de dependencias:**
Debido a las configuraciones de `eslint` y `typescript`, se recomienda instalar utilizando la bandera de dependencias heredadas:
```bash
npm install --legacy-peer-deps
2. Ejecución del entorno de desarrollo:

Bash
npm run dev

Acceso: El servidor local le proporcionará una ruta (generalmente http://localhost:5173). Al ingresar, el proyecto lo llevará al catálogo público.


🔑 Credenciales de Prueba
Utilice los siguientes usuarios para probar las restricciones y funcionalidades de cada rol:

Rol USUARIO (Flujo de compra):

Email: cliente@food.com

Clave: cliente123

Rol ADMINISTRADOR (Panel de control):

Email: admin@admin.com

Clave: 123456