# Proyecto JPA - ABM de Categorías y Productos

## Descripción Breve del Proyecto
Este proyecto es una aplicación de consola desarrollada en Java que implementa el patrón de 
persistencia utilizando JPA (Java Persistence API) e Hibernate. El sistema permite gestionar
un catálogo básico mediante operaciones CRUD (Alta, Baja lógica, Modificación y Listado) para
dos entidades relacionadas: **Categorías** y **Productos**.

Además de los ABM tradicionales, el sistema incluye un módulo de reportes construido con consultas
JPQL personalizadas que permite listar dinámicamente los productos activos filtrados por su categoría
correspondiente.

## Tecnologías Utilizadas
* Java
* JPA / Hibernate
* Base de datos H2 (en memoria / archivo local)
* Gradle (gestor de dependencias)

## Instrucciones para Ejecutarlo

1. **Requisitos previos:** Asegúrese de tener instalado el JDK de Java en su sistema y un entorno
de desarrollo compatible (como IntelliJ IDEA, Eclipse o VS Code).
2. **Abrir el proyecto:** Importe la carpeta raíz del proyecto en su IDE elegido. Permita que Gradle
descargue las dependencias necesarias.
3. **Configuración de la Base de Datos:** Por defecto, el archivo `persistence.xml` está configurado
para conectarse a una base de datos local H2. Si es la primera vez que se ejecuta o desea resetear
los datos, asegúrese de que la propiedad `hibernate.hbm2ddl.auto` esté en `create` o `update`.
4. **Ejecución:** Ubique la clase principal `Main.java` (dentro del paquete `com.tp.jpa`) y ejecute el método `main`.
5. **Uso del sistema:** Interactúe con el menú principal a través de la consola ingresando los números
de las opciones deseadas y presionando Enter.