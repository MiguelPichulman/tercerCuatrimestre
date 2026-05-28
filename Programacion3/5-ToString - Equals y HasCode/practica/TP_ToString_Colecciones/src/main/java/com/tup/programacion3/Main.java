package com.tup.programacion3;
import com.tup.programacion3.entities.Categoria;
import com.tup.programacion3.entities.Producto;

public class Main {
    public static void main(String[] args) {

        Categoria electrodomesticos = new Categoria();
        electrodomesticos.setId(1L);
        electrodomesticos.setNombre("Electrodomésticos");
        electrodomesticos.setDescripcion("Artículos para el hogar");

        Categoria alimentos = new Categoria();
        alimentos.setId(2L);
        alimentos.setNombre("Alimentos");
        alimentos.setDescripcion("Articulos comestibles");

        Categoria blanco = new Categoria();
        blanco.setId(3L);
        blanco.setNombre("Ropa Blanca");
        blanco.setDescripcion("Ropa de cama, baño");

        Producto producto1 = new Producto();
        producto1.setId(1L);
        producto1.setPrecio(699000.0);
        producto1.setDescripcion("Heladera 300 lts");
        producto1.setStock(10);
        producto1.setImagen("heladera.jpg");
        producto1.setDisponible(true);
        electrodomesticos.getProductos().add(producto1);

        Producto producto2 = new Producto();
        producto2.setId(2L);
        producto2.setNombre("Microondas");
        producto2.setPrecio(150000.0);
        producto2.setDescripcion("Microondas digital 20L");
        producto2.setStock(15);
        producto2.setImagen("microondas.jpg");
        producto2.setDisponible(true);
        electrodomesticos.getProductos().add(producto2);

        Producto producto3 = new Producto();
        producto3.setId(3L);
        producto3.setNombre("Licuadora");
        producto3.setPrecio(45000.0);
        producto3.setDescripcion("Licuadora de vidrio 1.5L");
        producto3.setStock(20);
        producto3.setImagen("licuadora.jpg");
        producto3.setDisponible(true);
        electrodomesticos.getProductos().add(producto3);



        Producto producto4 = new Producto();
        producto4.setId(4L);
        producto4.setNombre("Hamburguesa Doble");
        producto4.setPrecio(8500.0);
        producto4.setDescripcion("Doble carne con queso y bacon");
        producto4.setStock(50);
        producto4.setImagen("hamburguesa.jpg");
        producto4.setDisponible(true);
        alimentos.getProductos().add(producto4);

        Producto producto5 = new Producto();
        producto5.setId(5L);
        producto5.setNombre("Pizza Especial");
        producto5.setPrecio(9200.0);
        producto5.setDescripcion("Pizza muzzarella con jamon y morrones");
        producto5.setStock(30);
        producto5.setImagen("pizza.jpg");
        producto5.setDisponible(true);
        alimentos.getProductos().add(producto5);

        Producto producto6 = new Producto();
        producto6.setId(6L);
        producto6.setNombre("Papas Fritas Cheddar");
        producto6.setPrecio(4500.0);
        producto6.setDescripcion("Porcion grande con cheddar y verdeo");
        producto6.setStock(40);
        producto6.setImagen("papas.jpg");
        producto6.setDisponible(true);
        alimentos.getProductos().add(producto6);

        Producto producto7 = new Producto();
        producto7.setId(7L);
        producto7.setNombre("Coca Cola 1.5L");
        producto7.setPrecio(2200.0);
        producto7.setDescripcion("Gaseosa linea coca cola");
        producto7.setStock(100);
        producto7.setImagen("gaseosa.jpg");
        producto7.setDisponible(true);
        alimentos.getProductos().add(producto7);

        Producto producto8 = new Producto();
        producto8.setId(8L);
        producto8.setNombre("Juego de Sabanas");
        producto8.setPrecio(35000.0);
        producto8.setDescripcion("Sabanas 2 plazas 100% algodon");
        producto8.setStock(25);
        producto8.setImagen("sabanas.jpg");
        producto8.setDisponible(true);
        blanco.getProductos().add(producto8);

        Producto producto9 = new Producto();
        producto9.setId(9L);
        producto9.setNombre("Toallon de Baño");
        producto9.setPrecio(12000.0);
        producto9.setDescripcion("Toallon gigante super absorbente");
        producto9.setStock(30);
        producto9.setImagen("toallon.jpg");
        producto9.setDisponible(true);
        blanco.getProductos().add(producto9);

        Producto producto10 = new Producto();
        producto10.setId(10L);
        producto10.setNombre("Almohada Viscoelastica");
        producto10.setPrecio(18500.0);
        producto10.setDescripcion("Almohada con memoria inteligente");
        producto10.setStock(12);
        producto10.setImagen("almohada.jpg");
        producto10.setDisponible(true);
        blanco.getProductos().add(producto10);

    }
}
