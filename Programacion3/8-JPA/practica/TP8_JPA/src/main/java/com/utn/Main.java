package com.utn;

import com.utn.dtos.UsuarioDTO;
import com.utn.entities.Categoria;
import com.utn.entities.Pedido;
import com.utn.entities.Producto;
import com.utn.entities.Usuario;
import com.utn.enums.Estado;
import com.utn.enums.FormaPago;
import com.utn.enums.Rol;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public class Main {
    public static void main(String[] args) {
        //inicia persistencia
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("miUnidad");
        EntityManager em = emf.createEntityManager();

        //abrir transaccion
        em.getTransaction().begin();
//CATEGORIAS
        Categoria electrodomesticos = Categoria.builder()
                //.id(1L)
                .nombre("Electrodomésticos")
                .descripcion("Artículos para el hogar")
                .build();

        Categoria alimentos = Categoria.builder()
                //.id(2L)
                .nombre("Alimentos")
                .descripcion("Articulos comestibles")
                .build();

        Categoria blanco = Categoria.builder()
                //.id(3L)
                .nombre("Ropa BLanca")
                .descripcion("Ropa de cama, baño")
                .build();
//USUARIOS
        Usuario usuario1 = Usuario.builder()
                .nombre("Miguel Angel")
                .apellido("Pichulman")
                .mail("miguel@mail.com")
                .celular("155123456")
                .contrasena("pass123")
                .rol(Rol.ADMIN)
                //.id(1L)
                .eliminado(false)
                .createdAt(LocalDateTime.now())
                .build();

        Usuario usuario2 = Usuario.builder()
                .nombre("Joaquin")
                .apellido("Rodriguez")
                .mail("joaco@mail.com")
                .celular("3515123456")
                .contrasena("joacopass123")
                .rol(Rol.USUARIO)
                //.id(2L)
                .eliminado(false)
                .createdAt(LocalDateTime.now())
                .build();

        //PRODUCTOS
        Producto producto1 = Producto.builder()
                //.id(1L)
                .nombre("Heladera")
                .precio(699999.0)
                .descripcion("Heladera 300 lts")
                .stock(15)
                .imagen("heladera.jpg")
                .disponible(true)
                .build();
        electrodomesticos.getProductos().add(producto1);

        Producto producto2 = Producto.builder()
                //.id(2L)
                .nombre("Microondas")
                .precio(150000.0)
                .descripcion("Microondas digital 20 lts")
                .stock(15)
                .imagen("microondas.jpg")
                .disponible(true)
                .build();
        electrodomesticos.getProductos().add(producto2);

        Producto producto3 = Producto.builder()
                //.id(3L)
                .nombre("Licuadora")
                .precio(45000.0)
                .descripcion("Licuadora de vidrio 1.5 lts")
                .stock(20)
                .imagen("licuadora.jpg")
                .disponible(true)
                .build();
        electrodomesticos.getProductos().add(producto3);

        Producto producto4 = Producto.builder()
                //.id(4L)
                .nombre("Hamburguesa Doble")
                .precio(8500.0)
                .descripcion("Doble carne con queso y bacon")
                .stock(50)
                .imagen("hamburguesa.jpg")
                .disponible(true)
                .build();
        alimentos.getProductos().add(producto4);

        Producto producto5 = Producto.builder()
                //.id(5L)
                .nombre("Pizza Especial")
                .precio(9200.0)
                .descripcion("Piza muzzarella con jamon y morrones")
                .stock(30)
                .imagen("pizza.jpg")
                .disponible(true)
                .build();
        alimentos.getProductos().add(producto5);

        Producto producto6 = Producto.builder()
                //.id(6L)
                .nombre("Papas Fritas Cheddar")
                .precio(4500.0)
                .descripcion("Porcion grande con cheddar y verdeo")
                .stock(40)
                .imagen("papas.jpg")
                .disponible(true)
                .build();
        alimentos.getProductos().add(producto6);

        Producto producto7 = Producto.builder()
                //.id(7L)
                .nombre("Coca Cola 1.5lts")
                .precio(2200.0)
                .descripcion("Gaseosa linea Coca Cola")
                .stock(100)
                .imagen("gaseosa.jpg")
                .disponible(true)
                .build();
        alimentos.getProductos().add(producto7);

        Producto producto8 = Producto.builder()
                //.id(8L)
                .nombre("Juego de Sabanas")
                .precio(35000.0)
                .descripcion("Sabanas 2 plazas 100% algodon")
                .stock(25)
                .imagen("sabanas.jpg")
                .disponible(true)
                .build();
        blanco.getProductos().add(producto8);

        Producto producto9 = Producto.builder()
                //.id(9L)
                .nombre("Toallon de Baño")
                .precio(1200.0)
                .descripcion("Toallon gigante super absorbente")
                .stock(30)
                .imagen("toallon.jpg")
                .disponible(true)
                .build();
        blanco.getProductos().add(producto9);

        Producto producto10 = Producto.builder()
                //.id(10L)
                .nombre("Almohada Viscolastica")
                .precio(18500.0)
                .descripcion("Almohada con memoria inteligente")
                .stock(12)
                .imagen("almohada.jpg")
                .disponible(true)
                .build();
        blanco.getProductos().add(producto10);

        //PEDIDOS
//PEDIDO 1
        Pedido pedido1 = Pedido.builder()
                //.id(1L)
                .fecha(LocalDateTime.now())
                .estado(Estado.PENDIENTE)
                .formaPago(FormaPago.EFECTIVO)
                .eliminado(false)
                .createdAt(LocalDateTime.now())
                //.usuario(usuario1)
                .build();

        pedido1.addDetallePedido(2, producto1);
        pedido1.addDetallePedido(1, producto2);

        pedido1.calcularTotal();

        //PEDIDO 2

        Pedido pedido2 = Pedido.builder()
                //.id(2L)
                .fecha(LocalDateTime.now())
                .estado(Estado.CONFIRMADO)
                .formaPago(FormaPago.TARJETA)
                .eliminado(false)
                .createdAt(LocalDateTime.now())
                //.usuario(usuario2)
                .build();

        pedido2.addDetallePedido(2, producto6);
        pedido2.addDetallePedido(4, producto7);

        pedido2.calcularTotal();

        //PEDIDO 3
        Pedido pedido3 = Pedido.builder()
                //.id(3L)
                .fecha(LocalDateTime.now())
                .estado(Estado.CANCELADO)
                .formaPago(FormaPago.TRANSFERENCIA)
                .eliminado(false)
                .createdAt(LocalDateTime.now())
                //.usuario(usuario2)
                .build();

        pedido3.addDetallePedido(3, producto9);
        pedido3.addDetallePedido(2, producto10);

        pedido3.calcularTotal();

        usuario1.getPedidos().add(pedido1);
        usuario2.getPedidos().add(pedido2);
        usuario2.getPedidos().add(pedido3);
        // producto trampa con el mismo id que la heladera

        Producto productoDuplicado = Producto.builder()
                //.id(1L)
                .nombre("Cocina")
                .precio(699999.0)
                .descripcion("Ccina 4 hornallas con horno")
                .stock(13)
                .imagen("cocina.jpg")
                .disponible(true)
                .build();
        electrodomesticos.getProductos().add(productoDuplicado);

        //persistir
        em.persist(electrodomesticos);
        em.persist(alimentos);
        em.persist(blanco);

        em.persist(usuario1);
        em.persist(usuario2);
        //IMPRIME POR PANTALLA

        System.out.println("---------- RESUMEN DE USUARIOS ----------");
        System.out.println(usuario1);
        System.out.println(usuario2);

        //PUNTO 4
        // 1. Mostrar un producto
        System.out.println("Un Producto: " + producto4);

        // 2. Listado de productos cargados
        System.out.println("\nListado de Productos Cargados:");
        for (Producto p : electrodomesticos.getProductos()) System.out.println(p);
        for (Producto p : alimentos.getProductos()) System.out.println(p);
        for (Producto p : blanco.getProductos()) System.out.println(p);

        // 3. Pedidos del usuario con mas pedidos

        List<Usuario> listaUsuarios = new ArrayList<>();
        listaUsuarios.add(usuario1);
        listaUsuarios.add(usuario2);


        Usuario usuarioConMasPedidos = null;
        int maxPedidos = -1;


        for (Usuario u : listaUsuarios) {
            int cantidadActual = u.getPedidos().size();

            if (cantidadActual > maxPedidos) {
                maxPedidos = cantidadActual;
                usuarioConMasPedidos = u;
            }
        }

        if (usuarioConMasPedidos != null) {
            System.out.println("\nPedidos del usuario con más pedidos (" + usuarioConMasPedidos.getNombre() + " con " + maxPedidos + " pedidos):");
            for (Pedido p : usuarioConMasPedidos.getPedidos()) {
                System.out.println(p);
            }
        }

        System.out.println("\n---------- Producto trampa ----------");

        System.out.println("El producto duplicado es igual al producto1? " + productoDuplicado.equals(producto1));

        boolean existeEnColeccion = electrodomesticos.getProductos().contains(productoDuplicado);
        System.out.println("El producto duplicado ya existe en la coleccion de electrodomesticos? " + existeEnColeccion);



        System.out.println("\n---------- PUNTO 6: DTO ----------");
        // Creamos el DTO con datos seguros de nuestro usuario1
        UsuarioDTO usuario1Seguro = new UsuarioDTO(
                usuario1.getId(),
                usuario1.isEliminado(),
                usuario1.getCreatedAt(),
                usuario1.getNombre(),
                usuario1.getApellido(),
                usuario1.getMail(),
                usuario1.getCelular()
        );

        // Lo imprimimos por pantalla (el record ya tiene su propio toString automatico)
        System.out.println("Usuario Original (con info sensible):");
        System.out.println(usuario1);

        System.out.println("\nUsuario DTO (listo para enviar por la web):");
        System.out.println(usuario1Seguro);

        //commit y cerrar
        em.getTransaction().commit();
//inicia de nuevo
        em.getTransaction().begin();

        Usuario usuarioBuscado = em.find(Usuario.class, usuario1.getId());//al usuario 1
        if(usuarioBuscado!=null) {
            System.out.println("Usuario encontrado: " + usuarioBuscado.getNombre() + "  " + usuarioBuscado.getApellido());
        }
        else{
             System.out.println("No se encontro!");

        }

        //actializar 2 productos
        Producto prodActualizar1 = em.find(Producto.class, producto1.getId());
        Producto prodActualizar2 = em.find(Producto.class, producto2.getId());

        if (prodActualizar1 != null && prodActualizar2 != null) {
            System.out.println("Precio viejo Heladera: " + prodActualizar1.getPrecio());
            // cambio de precio
            prodActualizar1.setPrecio(850000.0);
            System.out.println("Precio nuevo Heladera: " + prodActualizar1.getPrecio());

            System.out.println("Stock viejo Microondas: " + prodActualizar2.getStock());
            //restamos stock
            prodActualizar2.setStock(10);
            System.out.println("Stock nuevo Microondas: " + prodActualizar2.getStock());
        }

        //commit de esto
        em.getTransaction().commit();

        em.getTransaction().begin();

        //buscar a joaco por mail
        String mailBuscado = "joaco@mail.com";

        try {
            Usuario usuarioPorMail = em.createQuery("SELECT u FROM Usuario u WHERE u.mail = :mail", Usuario.class)
                    .setParameter("mail", mailBuscado)
                    .getSingleResult();

            System.out.println("Usuario encontrado por mail: " + usuarioPorMail.getNombre() + " " + usuarioPorMail.getApellido());
        } catch (Exception e) {
            System.out.println("No se encontro el usuario con ese mail.");
        }

        //borrar

        Producto prodBorrar = em.find(Producto.class, producto3.getId());
        if (prodBorrar != null) {
            em.remove(prodBorrar);
            System.out.println("El producto '" + prodBorrar.getNombre() + "' fue borrado exitosamente de la base de datos.");
        }

        // Confirmamos cambios en la base de datos
        em.getTransaction().commit();

        em.close();
        emf.close();
    }
}