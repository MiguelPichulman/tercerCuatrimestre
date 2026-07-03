# Food Store - Backend (JPA / Hibernate)

## Descripción
Este proyecto corresponde a la capa de persistencia y lógica de negocio (Backend) del sistema "Food Store", desarrollado como Trabajo Práctico Integrador. Es una aplicación de consola en Java que permite gestionar un catálogo de comidas, administrar usuarios y procesar órdenes de compra de forma transaccional.

El sistema utiliza JPA y Hibernate para mapear las entidades del modelo de dominio a una base de datos relacional H2 configurada en modo archivo, garantizando la persistencia de los datos entre ejecuciones.

# Link al video demostrativo
https://drive.google.com/file/d/1JEdRwKArScp6bbIjjtonX7f-LLgyhAa2/view?usp=sharing

## Tecnologías Utilizadas
* **Lenguaje:** Java
* **Persistencia:** JPA / Hibernate
* **Base de Datos:** H2 (Modo archivo local `jdbc:h2:file:./data/jpa_db`)
* **Gestor de dependencias:** Gradle

## Estructura del Proyecto
El código fuente respeta la arquitectura solicitada para el sistema:
* `src/main/java/com/tp/jpa/`: Contiene la clase `Main.java` con el menú de consola interactivo.
* `src/main/java/com/tp/jpa/model/`: Entidades del modelo de dominio (`Base`, `Categoria`, `Producto`, `Usuario`, `Pedido`, `DetallePedido`) y la interfaz `Calculable`.
* `src/main/java/com/tp/jpa/model/enums/`: Enumerados del sistema (`Estado`, `FormaPago`, `Rol`).
* `src/main/java/com/tp/jpa/repository/`: Repositorios encargados del acceso a datos y consultas JPQL personalizadas (`BaseRepository` y repositorios específicos).
* `src/main/java/com/tp/jpa/util/`: Clase `JPAUtil` para la gestión del `EntityManagerFactory`.

## Funcionalidades Principales
1. **Gestión de Entidades (CRUD):** Alta, baja lógica (`eliminado = true`), modificación y listado de Categorías, Productos y Usuarios.
2. **Gestión de Pedidos:** Alta de pedidos con validación de stock y disponibilidad, cálculo automático de subtotales y total, y persistencia atómica en base de datos.
3. **Reportes Integrados:** Consultas de productos por categoría, historial de pedidos por usuario, pedidos por estado y cálculo exacto del total facturado.

## Instrucciones de Instalación y Ejecución
1. Asegúrate de tener instalado el **JDK** (Java Development Kit) en tu sistema.
2. Abre una terminal o consola de comandos y navega hasta la carpeta raíz del backend (`/backend`).
3. Compila y ejecuta el proyecto utilizando Gradle con el siguiente comando:
   ```bash
   gradle run