package com.tp.jpa;

import com.tp.jpa.model.Categoria;
import com.tp.jpa.repository.CategoriaRepository;
import com.tp.jpa.util.JPAUtil;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);

    private static final CategoriaRepository categoriaRepo = new CategoriaRepository();
    private static final com.tp.jpa.repository.ProductoRepository productoRepo = new com.tp.jpa.repository.ProductoRepository();
    private static final com.tp.jpa.repository.UsuarioRepository usuarioRepo = new com.tp.jpa.repository.UsuarioRepository();
    private static final com.tp.jpa.repository.PedidoRepository pedidoRepo = new com.tp.jpa.repository.PedidoRepository();

    public static void main(String[] args) {
        int opcion = -1;

        while (opcion != 0) {
            System.out.println("\n--- FOOD STORE - MENU PRINCIPAL ---");
            System.out.println("1. Gestionar Categorias");
            System.out.println("2. Gestionar Productos");
            System.out.println("3. Gestionar Usuarios");
            System.out.println("4. Gestionar Pedidos");
            System.out.println("5. Reportes");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opcion: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                opcion = -1;
            }

            switch (opcion) {
                case 1:
                    menuCategorias();
                    break;
                case 2:
                    menuProductos();
                    break;
                case 3:
                    menuUsuarios();
                    break;
                case 4:
                    menuPedidos();
                    break;
                case 5:
                    menuReportes();
                    break;
                case 0:
                    System.out.println("Cerrando el sistema...");
                    JPAUtil.close();
                    break;
                default:
                    System.out.println("Opcion invalida. Intente nuevamente.");
            }
        }
    }

    // ====================================================================
    // SUBMENU: CATEGORIAS
    // ====================================================================
    private static void menuCategorias() {
        int opcion = -1;
        while (opcion != 0) {
            System.out.println("\n--- GESTION DE CATEGORIAS ---");
            System.out.println("1. Alta");
            System.out.println("2. Modificar");
            System.out.println("3. Baja logica");
            System.out.println("4. Listado");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                opcion = -1;
            }

            switch (opcion) {
                case 1:
                    altaCategoria();
                    break;
                case 2:
                    modificarCategoria();
                    break;
                case 3:
                    bajaCategoria();
                    break;
                case 4:
                    listarCategorias();
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opcion invalida.");
            }
        }
    }

    private static void altaCategoria() {
        System.out.println("\n- ALTA DE CATEGORIA -");
        System.out.print("Ingrese nombre de la categoria (obligatorio): ");
        String nombre = scanner.nextLine().trim();

        if (nombre.isEmpty()) {
            System.out.println("Error: El nombre no puede estar vacio.");
            return;
        }

        System.out.print("Ingrese descripcion (opcional): ");
        String descripcion = scanner.nextLine().trim();

        Categoria cat = new Categoria();
        cat.setNombre(nombre);
        cat.setDescripcion(descripcion);

        cat = categoriaRepo.guardar(cat);
        System.out.println("Categoria creada exitosamente con ID: " + cat.getId());
    }

    private static void modificarCategoria() {
        System.out.println("\n- MODIFICAR CATEGORIA -");
        listarCategorias();

        System.out.print("Ingrese el ID de la categoria a modificar: ");
        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<Categoria> optCat = categoriaRepo.buscarPorId(id);

            if (!optCat.isPresent() || optCat.get().isEliminado()) {
                System.out.println("Error: La categoria no existe o esta dada de baja.");
                return;
            }

            Categoria cat = optCat.get();
            System.out.println("Valores actuales - Nombre: " + cat.getNombre() + " | Descripcion: " + cat.getDescripcion());

            System.out.print("Nuevo nombre (deje vacio para mantener actual): ");
            String nombre = scanner.nextLine().trim();
            if (!nombre.isEmpty()) {
                cat.setNombre(nombre);
            }

            System.out.print("Nueva descripcion (deje vacio para mantener actual): ");
            String descripcion = scanner.nextLine().trim();
            if (!descripcion.isEmpty()) {
                cat.setDescripcion(descripcion);
            }

            categoriaRepo.guardar(cat);
            System.out.println("Categoria modificada exitosamente.");

        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void bajaCategoria() {
        System.out.println("\n- BAJA DE CATEGORIA -");
        System.out.print("Ingrese el ID de la categoria a dar de baja: ");
        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<Categoria> optCat = categoriaRepo.buscarPorId(id);

            boolean exito = categoriaRepo.eliminarLogico(id);
            if (exito && optCat.isPresent()) {
                System.out.println("Categoria '" + optCat.get().getNombre() + "' dada de baja correctamente.");
            } else {
                System.out.println("Error: No se pudo dar de baja (no existe o ya estaba eliminada).");
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void listarCategorias() {
        List<Categoria> lista = categoriaRepo.listarActivos();
        if (lista.isEmpty()) {
            System.out.println("No hay categorias activas.");
            return;
        }
        System.out.println("\n-- LISTADO DE CATEGORIAS --");
        for (Categoria c : lista) {
            System.out.println("ID: " + c.getId() + " | Nombre: " + c.getNombre() + " | Descripcion: " + c.getDescripcion());
        }
    }

    // ====================================================================
    // SUBMENU: PRODUCTOS
    // ====================================================================
    private static void menuProductos() {
        int opcion = -1;
        while (opcion != 0) {
            System.out.println("\n--- GESTION DE PRODUCTOS ---");
            System.out.println("1. Alta");
            System.out.println("2. Modificar");
            System.out.println("3. Baja logica");
            System.out.println("4. Listado");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                opcion = -1;
            }

            switch (opcion) {
                case 1:
                    altaProducto();
                    break;
                case 2:
                    modificarProducto();
                    break;
                case 3:
                    bajaProducto();
                    break;
                case 4:
                    listarProductos();
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opcion invalida.");
            }
        }
    }

    private static void altaProducto() {
        System.out.println("\n- ALTA DE PRODUCTO -");
        List<Categoria> categorias = categoriaRepo.listarActivos();
        if (categorias.isEmpty()) {
            System.out.println("Error: No hay categorias activas. Debe crear una categoria primero.");
            return;
        }

        System.out.println("Categorias disponibles:");
        for (Categoria c : categorias) {
            System.out.println("ID: " + c.getId() + " - " + c.getNombre());
        }

        System.out.print("Ingrese el ID de la categoria para este producto: ");
        Long idCategoria;
        try {
            idCategoria = Long.parseLong(scanner.nextLine());
        } catch (NumberFormatException e) {
            System.out.println("Error: ID invalido.");
            return;
        }

        Optional<Categoria> optCat = categoriaRepo.buscarPorId(idCategoria);
        if (!optCat.isPresent() || optCat.get().isEliminado()) {
            System.out.println("Error: Categoria no valida.");
            return;
        }

        System.out.print("Nombre del producto (obligatorio): ");
        String nombre = scanner.nextLine().trim();
        if (nombre.isEmpty()) {
            System.out.println("Error: El nombre es obligatorio.");
            return;
        }

        System.out.print("Descripcion: ");
        String descripcion = scanner.nextLine().trim();

        double precio = 0.0;
        System.out.print("Precio: ");
        try {
            precio = Double.parseDouble(scanner.nextLine());
            if (precio <= 0) {
                System.out.println("Error: El precio debe ser mayor a 0.");
                return;
            }
        } catch (NumberFormatException e) {
            System.out.println("Error: Formato de precio invalido.");
            return;
        }

        int stock = 0;
        System.out.print("Stock: ");
        try {
            stock = Integer.parseInt(scanner.nextLine());
            if (stock < 0) {
                System.out.println("Error: El stock no puede ser negativo.");
                return;
            }
        } catch (NumberFormatException e) {
            System.out.println("Error: Formato de stock invalido.");
            return;
        }

        System.out.print("URL de Imagen (opcional): ");
        String imagen = scanner.nextLine().trim();

        System.out.print("Disponible (S/N, por defecto S): ");
        String dispStr = scanner.nextLine().trim().toUpperCase();
        boolean disponible = !dispStr.equals("N");

        com.tp.jpa.model.Producto p = new com.tp.jpa.model.Producto();
        p.setNombre(nombre);
        p.setDescripcion(descripcion);
        p.setPrecio(precio);
        p.setStock(stock);
        p.setImagen(imagen);
        p.setDisponible(disponible);
        p.setCategoria(optCat.get());

        p = productoRepo.guardar(p);
        System.out.println("Producto creado exitosamente con ID: " + p.getId() + " en categoria " + optCat.get().getNombre());
    }

    private static void modificarProducto() {
        System.out.println("\n- MODIFICAR PRODUCTO -");
        listarProductos();
        System.out.print("Ingrese ID del producto a modificar: ");

        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Producto> optProd = productoRepo.buscarPorId(id);

            if (!optProd.isPresent() || optProd.get().isEliminado()) {
                System.out.println("Error: El producto no existe o esta dado de baja.");
                return;
            }

            com.tp.jpa.model.Producto p = optProd.get();
            System.out.println("Valores actuales:");
            System.out.println("Nombre: " + p.getNombre() + " | Precio: " + p.getPrecio() + " | Stock: " + p.getStock());

            System.out.print("Nuevo nombre (Enter para mantener): ");
            String nombre = scanner.nextLine().trim();
            if (!nombre.isEmpty()) p.setNombre(nombre);

            System.out.print("Nuevo precio (Enter para mantener): ");
            String precioStr = scanner.nextLine().trim();
            if (!precioStr.isEmpty()) {
                double precio = Double.parseDouble(precioStr);
                if (precio > 0) p.setPrecio(precio);
                else System.out.println("Precio invalido, se mantiene el anterior.");
            }

            System.out.print("Nuevo stock (Enter para mantener): ");
            String stockStr = scanner.nextLine().trim();
            if (!stockStr.isEmpty()) {
                int stock = Integer.parseInt(stockStr);
                if (stock >= 0) p.setStock(stock);
                else System.out.println("Stock invalido, se mantiene el anterior.");
            }

            productoRepo.guardar(p);
            System.out.println("Producto actualizado exitosamente.");

        } catch (NumberFormatException e) {
            System.out.println("ID o formato invalido.");
        }
    }

    private static void bajaProducto() {
        System.out.println("\n- BAJA DE PRODUCTO -");
        System.out.print("Ingrese ID del producto a eliminar: ");
        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Producto> opt = productoRepo.buscarPorId(id);
            if (productoRepo.eliminarLogico(id) && opt.isPresent()) {
                System.out.println("Producto '" + opt.get().getNombre() + "' dado de baja.");
            } else {
                System.out.println("Error al dar de baja el producto.");
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void listarProductos() {
        List<com.tp.jpa.model.Producto> lista = productoRepo.listarActivos();
        if (lista.isEmpty()) {
            System.out.println("No hay productos activos.");
            return;
        }
        System.out.println("\n-- LISTADO DE PRODUCTOS --");
        for (com.tp.jpa.model.Producto p : lista) {
            String cat = (p.getCategoria() != null) ? p.getCategoria().getNombre() : "Sin categoria";
            System.out.println("ID: " + p.getId() + " | Nombre: " + p.getNombre() + " | Precio: $" + p.getPrecio() + " | Stock: " + p.getStock() + " | Categoria: " + cat);
        }
    }
    // ====================================================================
    // SUBMENU: USUARIOS
    // ====================================================================
    private static void menuUsuarios() {
        int opcion = -1;
        while (opcion != 0) {
            System.out.println("\n--- GESTION DE USUARIOS ---");
            System.out.println("1. Alta");
            System.out.println("2. Modificar");
            System.out.println("3. Baja logica");
            System.out.println("4. Listado");
            System.out.println("5. Buscar por mail");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                opcion = -1;
            }

            switch (opcion) {
                case 1:
                    altaUsuario();
                    break;
                case 2:
                    modificarUsuario();
                    break;
                case 3:
                    bajaUsuario();
                    break;
                case 4:
                    listarUsuarios();
                    break;
                case 5:
                    buscarUsuarioPorMail();
                    break;
                case 0:
                    break;
                default:
                    System.out.println("Opcion invalida.");
            }
        }
    }

    private static void altaUsuario() {
        System.out.println("\n- ALTA DE USUARIO -");

        System.out.print("Nombre: ");
        String nombre = scanner.nextLine().trim();

        System.out.print("Apellido: ");
        String apellido = scanner.nextLine().trim();

        System.out.print("Mail: ");
        String mail = scanner.nextLine().trim();

        Optional<com.tp.jpa.model.Usuario> existente = usuarioRepo.buscarPorMail(mail);
        if (existente.isPresent()) {
            System.out.println("Error: Ya existe un usuario activo con ese mail.");
            return;
        }

        System.out.print("Celular (opcional): ");
        String celular = scanner.nextLine().trim();

        System.out.print("Contrasena: ");
        String contrasena = scanner.nextLine().trim();

        System.out.print("Rol (1. ADMIN, 2. USUARIO): ");
        String rolInput = scanner.nextLine().trim();
        com.tp.jpa.model.enums.Rol rol = rolInput.equals("1") ? com.tp.jpa.model.enums.Rol.ADMIN : com.tp.jpa.model.enums.Rol.USUARIO;

        com.tp.jpa.model.Usuario u = new com.tp.jpa.model.Usuario();
        u.setNombre(nombre);
        u.setApellido(apellido);
        u.setMail(mail);
        u.setCelular(celular);
        u.setContrasena(contrasena);
        u.setRol(rol);

        u = usuarioRepo.guardar(u);
        System.out.println("Usuario creado exitosamente con ID: " + u.getId());
    }

    private static void modificarUsuario() {
        System.out.println("\n- MODIFICAR USUARIO -");
        listarUsuarios();
        System.out.print("Ingrese ID del usuario a modificar: ");

        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Usuario> opt = usuarioRepo.buscarPorId(id);

            if (!opt.isPresent() || opt.get().isEliminado()) {
                System.out.println("Error: El usuario no existe o esta dado de baja.");
                return;
            }

            com.tp.jpa.model.Usuario u = opt.get();
            System.out.println("Valores actuales: Nombre: " + u.getNombre() + " | Apellido: " + u.getApellido() + " | Mail: " + u.getMail() + " | Celular: " + u.getCelular());

            System.out.print("Nuevo nombre (Enter para mantener): ");
            String nombre = scanner.nextLine().trim();
            if (!nombre.isEmpty()) u.setNombre(nombre);

            System.out.print("Nuevo apellido (Enter para mantener): ");
            String apellido = scanner.nextLine().trim();
            if (!apellido.isEmpty()) u.setApellido(apellido);

            System.out.print("Nuevo mail (Enter para mantener): ");
            String mail = scanner.nextLine().trim();
            if (!mail.isEmpty() && !mail.equals(u.getMail())) {
                Optional<com.tp.jpa.model.Usuario> existente = usuarioRepo.buscarPorMail(mail);
                if (existente.isPresent() && !existente.get().getId().equals(u.getId())) {
                    System.out.println("Error: El mail ya esta en uso por otro usuario. Se mantiene el anterior.");
                } else {
                    u.setMail(mail);
                }
            }

            System.out.print("Nuevo celular (Enter para mantener): ");
            String celular = scanner.nextLine().trim();
            if (!celular.isEmpty()) u.setCelular(celular);

            System.out.print("Nueva contrasena (Enter para mantener): ");
            String contrasena = scanner.nextLine().trim();
            if (!contrasena.isEmpty()) u.setContrasena(contrasena);

            usuarioRepo.guardar(u);
            System.out.println("Usuario actualizado exitosamente.");

        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void bajaUsuario() {
        System.out.println("\n- BAJA DE USUARIO -");
        System.out.print("Ingrese ID del usuario a eliminar: ");
        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Usuario> opt = usuarioRepo.buscarPorId(id);
            if (usuarioRepo.eliminarLogico(id) && opt.isPresent()) {
                System.out.println("Usuario '" + opt.get().getNombre() + " " + opt.get().getApellido() + "' dado de baja.");
            } else {
                System.out.println("Error al dar de baja el usuario.");
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void listarUsuarios() {
        List<com.tp.jpa.model.Usuario> lista = usuarioRepo.listarActivos();
        if (lista.isEmpty()) {
            System.out.println("No hay usuarios activos.");
            return;
        }
        System.out.println("\n-- LISTADO DE USUARIOS --");
        for (com.tp.jpa.model.Usuario u : lista) {
            System.out.println("ID: " + u.getId() + " | Nombre: " + u.getNombre() + " " + u.getApellido() + " | Mail: " + u.getMail() + " | Rol: " + u.getRol());
        }
    }

    private static void buscarUsuarioPorMail() {
        System.out.println("\n- BUSCAR USUARIO POR MAIL -");
        System.out.print("Ingrese mail: ");
        String mail = scanner.nextLine().trim();

        Optional<com.tp.jpa.model.Usuario> opt = usuarioRepo.buscarPorMail(mail);
        if (opt.isPresent()) {
            com.tp.jpa.model.Usuario u = opt.get();
            System.out.println("Usuario encontrado:");
            System.out.println("ID: " + u.getId());
            System.out.println("Nombre: " + u.getNombre() + " " + u.getApellido());
            System.out.println("Celular: " + u.getCelular());
            System.out.println("Mail: " + u.getMail());
            System.out.println("Rol: " + u.getRol());
        } else {
            System.out.println("No existe usuario activo con ese mail.");
        }
    }
    // ====================================================================
    // SUBMENU: PEDIDOS
    // ====================================================================
    private static void menuPedidos() {
        int opcion = -1;
        while (opcion != 0) {
            System.out.println("\n--- GESTION DE PEDIDOS ---");
            System.out.println("1. Nuevo Pedido");
            System.out.println("2. Cambiar estado");
            System.out.println("3. Baja logica");
            System.out.println("4. Listado");
            System.out.println("5. Pedidos por usuario");
            System.out.println("6. Pedidos por estado");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                opcion = -1;
            }

            switch (opcion) {
                case 1: nuevoPedido(); break;
                case 2: cambiarEstadoPedido(); break;
                case 3: bajaPedido(); break;
                case 4: listarPedidos(); break;
                case 5: listarPedidosUsuario(); break;
                case 6: reportePedidosPorEstado(); break;
                case 0: break;
                default: System.out.println("Opcion invalida.");
            }
        }
    }
    private static void nuevoPedido() {
        System.out.println("\n- NUEVO PEDIDO -");
        listarUsuarios();
        System.out.print("Ingrese el ID del usuario que realiza la compra: ");

        try {
            Long idUser = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Usuario> optUser = usuarioRepo.buscarPorId(idUser);

            if (!optUser.isPresent() || optUser.get().isEliminado()) {
                System.out.println("Error: No existe un usuario activo con ese ID.");
                return;
            }
            com.tp.jpa.model.Usuario usuario = optUser.get();

            System.out.println("Formas de pago disponibles: TARJETA, TRANSFERENCIA, EFECTIVO");
            System.out.print("Ingrese la forma de pago: ");
            String pagoStr = scanner.nextLine().trim().toUpperCase();
            com.tp.jpa.model.enums.FormaPago formaPago;
            try {
                formaPago = com.tp.jpa.model.enums.FormaPago.valueOf(pagoStr);
            } catch (IllegalArgumentException e) {
                System.out.println("Error: Forma de pago invalida. Cancelando pedido.");
                return;
            }

            java.util.Map<com.tp.jpa.model.Producto, Integer> carritoTemporal = new java.util.HashMap<>();

            boolean agregando = true;
            while (agregando) {
                listarProductos();
                System.out.print("\nIngrese el ID del producto a agregar al carrito: ");
                try {
                    Long idProd = Long.parseLong(scanner.nextLine());
                    Optional<com.tp.jpa.model.Producto> optProd = productoRepo.buscarPorId(idProd);

                    if (optProd.isPresent() && !optProd.get().isEliminado()) {
                        com.tp.jpa.model.Producto prod = optProd.get();

                        if (!prod.getDisponible()) {
                            System.out.println("Error: El producto no esta disponible para la venta.");
                        } else {
                            System.out.print("Cantidad: ");
                            int cant = Integer.parseInt(scanner.nextLine());

                            int enCarrito = carritoTemporal.getOrDefault(prod, 0);

                            if (cant > 0) {
                                if ((cant + enCarrito) <= prod.getStock()) {
                                    carritoTemporal.put(prod, enCarrito + cant);
                                    System.out.println("Producto agregado al carrito temporal.");
                                } else {
                                    System.out.println("Error: Stock insuficiente. Solo quedan " + prod.getStock() + " unidades.");
                                }
                            } else {
                                System.out.println("La cantidad debe ser mayor a cero.");
                            }
                        }
                    } else {
                        System.out.println("Producto no encontrado o inactivo.");
                    }

                    System.out.print("¿Desea agregar otro producto? (S/N): ");
                    if (scanner.nextLine().trim().toUpperCase().equals("N")) {
                        agregando = false;
                    }
                } catch (NumberFormatException e) {
                    System.out.println("ID o cantidad invalida.");
                }
            }

            if (carritoTemporal.isEmpty()) {
                System.out.println("Pedido cancelado: No se agregaron productos al carrito.");
                return;
            }

            com.tp.jpa.model.Pedido pedido = new com.tp.jpa.model.Pedido();
            pedido.setFecha(java.time.LocalDate.now());
            pedido.setEstado(com.tp.jpa.model.enums.Estado.PENDIENTE);
            pedido.setFormaPago(formaPago);

            try {

                pedidoRepo.guardarPedidoConDetalles(usuario, pedido, carritoTemporal);

                System.out.println("¡Pedido registrado exitosamente!");

                double totalParaMostrar = 0;
                for (java.util.Map.Entry<com.tp.jpa.model.Producto, Integer> item : carritoTemporal.entrySet()) {
                    totalParaMostrar += item.getKey().getPrecio() * item.getValue();
                }
                System.out.println("Total a pagar: $" + totalParaMostrar);

            } catch (Exception e) {
                System.out.println("Error al guardar el pedido en la base de datos. Se cancelo la operacion.");
            }

        } catch (NumberFormatException e) {
            System.out.println("Error: ID invalido.");
        }
    }

    private static void listarPedidosUsuario() {
        System.out.println("\n- HISTORIAL DE PEDIDOS POR USUARIO -");

        listarUsuarios();
        System.out.print("Ingrese el ID del usuario: ");
        try {
            Long idUser = Long.parseLong(scanner.nextLine());
            List<com.tp.jpa.model.Pedido> pedidos = pedidoRepo.buscarPorUsuario(idUser);

            if (pedidos.isEmpty()) {
                System.out.println("El usuario no tiene pedidos registrados o no existe.");
                return;
            }

            System.out.println("\n-- TICKETS DEL USUARIO --");
            for (com.tp.jpa.model.Pedido p : pedidos) {
                System.out.println("\nPedido #" + p.getId() + " | Fecha: " + p.getFecha() + " | Estado: " + p.getEstado() + " | Pago: " + p.getFormaPago());
                System.out.println("Total: $" + p.getTotal());
                System.out.println("Detalle de la compra:");
                for (com.tp.jpa.model.DetallePedido dp : p.getDetalles()) {
                    System.out.println("  -> " + dp.getCantidad() + "x " + dp.getProducto().getNombre() + " (Subtotal: $" + dp.getSubtotal() + ")");
                }
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void cambiarEstadoPedido() {
        System.out.println("\n- CAMBIAR ESTADO DE PEDIDO -");
        System.out.print("Ingrese ID del pedido: ");
        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Pedido> opt = pedidoRepo.buscarPorId(id);
            if (!opt.isPresent() || opt.get().isEliminado()) {
                System.out.println("Error: El pedido no existe o esta dado de baja.");
                return;
            }
            com.tp.jpa.model.Pedido p = opt.get();
            System.out.println("Estado actual: " + p.getEstado());
            System.out.println("Estados posibles: PENDIENTE, CONFIRMADO, TERMINADO, CANCELADO");
            System.out.print("Ingrese nuevo estado: ");
            String estadoStr = scanner.nextLine().trim().toUpperCase();

            try {
                com.tp.jpa.model.enums.Estado nuevoEstado = com.tp.jpa.model.enums.Estado.valueOf(estadoStr);
                p.setEstado(nuevoEstado);
                pedidoRepo.guardar(p);
                System.out.println("Estado actualizado exitosamente a " + nuevoEstado);
            } catch (IllegalArgumentException e) {
                System.out.println("Error: Estado invalido.");
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void bajaPedido() {
        System.out.println("\n- BAJA DE PEDIDO -");
        System.out.print("Ingrese ID del pedido a dar de baja: ");
        try {
            Long id = Long.parseLong(scanner.nextLine());
            Optional<com.tp.jpa.model.Pedido> opt = pedidoRepo.buscarPorId(id);
            if (pedidoRepo.eliminarLogico(id) && opt.isPresent()) {
                System.out.println("Pedido #" + opt.get().getId() + " con total $" + opt.get().getTotal() + " dado de baja.");
            } else {
                System.out.println("Error al dar de baja el pedido.");
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void listarPedidos() {
        List<com.tp.jpa.model.Pedido> lista = pedidoRepo.listarActivos();
        if (lista.isEmpty()) {
            System.out.println("No hay pedidos activos.");
            return;
        }
        System.out.println("\n-- LISTADO DE PEDIDOS --");
        for (com.tp.jpa.model.Pedido p : lista) {
            String user = p.getUsuario() != null ? p.getUsuario().getNombre() + " " + p.getUsuario().getApellido() : "N/A";
            System.out.println("ID: " + p.getId() + " | Fecha: " + p.getFecha() + " | Estado: " + p.getEstado() + " | Pago: " + p.getFormaPago() + " | Cliente: " + user + " | Total: $" + p.getTotal());
        }
    }
    // ====================================================================
    // SUBMENU: REPORTES
    // ====================================================================
    private static void menuReportes() {
        int opcion = -1;
        while (opcion != 0) {
            System.out.println("\n--- REPORTES ---");
            System.out.println("1. Productos por Categoria");
            System.out.println("2. Pedidos por Usuario");
            System.out.println("3. Pedidos por Estado");
            System.out.println("4. Total Facturado");
            System.out.println("0. Volver al Menu Principal");
            System.out.print("Seleccione una opcion: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                opcion = -1;
            }

            switch (opcion) {
                case 1: reporteProductosPorCategoria(); break;
                case 2: listarPedidosUsuario(); break;
                case 3: reportePedidosPorEstado(); break;
                case 4: reporteTotalFacturado(); break;
                case 0: break;
                default: System.out.println("Opcion invalida.");
            }
        }
    }

    private static void reporteProductosPorCategoria() {
        System.out.println("\n- PRODUCTOS POR CATEGORIA -");
        List<Categoria> categorias = categoriaRepo.listarActivos();
        if (categorias.isEmpty()) {
            System.out.println("No hay categorias registradas.");
            return;
        }

        System.out.println("Categorias disponibles:");
        for (Categoria c : categorias) {
            System.out.println("ID: " + c.getId() + " - " + c.getNombre());
        }

        System.out.print("Ingrese el ID de la categoria a consultar: ");
        try {
            Long idCat = Long.parseLong(scanner.nextLine());
            List<com.tp.jpa.model.Producto> productos = productoRepo.buscarPorCategoria(idCat);

            if (productos.isEmpty()) {
                System.out.println("No hay productos activos en esta categoria.");
            } else {
                System.out.println("\n-- RESULTADOS --");
                for (com.tp.jpa.model.Producto p : productos) {
                    System.out.println("ID: " + p.getId() + " | Nombre: " + p.getNombre() + " | Stock actual: " + p.getStock() + " | Precio: $" + p.getPrecio());
                }
            }
        } catch (NumberFormatException e) {
            System.out.println("ID invalido.");
        }
    }

    private static void reportePedidosPorEstado() {
        System.out.println("\n- PEDIDOS POR ESTADO -");

        System.out.println("Estados posibles: PENDIENTE, CONFIRMADO, TERMINADO, CANCELADO");
        System.out.print("Ingrese el estado a buscar: ");
        String estadoStr = scanner.nextLine().trim().toUpperCase();

        try {

            com.tp.jpa.model.enums.Estado estado = com.tp.jpa.model.enums.Estado.valueOf(estadoStr);
            List<com.tp.jpa.model.Pedido> pedidos = pedidoRepo.buscarPorEstado(estado);

            if (pedidos.isEmpty()) {
                System.out.println("No hay pedidos registrados con el estado: " + estado);
            } else {
                System.out.println("\n-- RESULTADOS --");
                for (com.tp.jpa.model.Pedido p : pedidos) {
                    String nombreUser = p.getUsuario() != null ? p.getUsuario().getNombre() + " " + p.getUsuario().getApellido() : "Sin usuario";
                    System.out.println("Pedido #" + p.getId() + " | Fecha: " + p.getFecha() + " | Cliente: " + nombreUser + " | Total: $" + p.getTotal());
                }
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Error: El estado ingresado no coincide con un estado valido.");
        }
    }

    private static void reporteTotalFacturado() {
        System.out.println("\n- REPORTE TOTAL FACTURADO -");
        List<com.tp.jpa.model.Pedido> terminados = pedidoRepo.buscarPorEstado(com.tp.jpa.model.enums.Estado.TERMINADO);

        if (terminados.isEmpty()) {
            System.out.println("Total facturado: $0.00");
            return;
        }

        double totalAcumulado = terminados.stream().mapToDouble(p -> p.getTotal() != null ? p.getTotal() : 0.0).sum();

        String formateado = String.format(java.util.Locale.US, "$%.2f", totalAcumulado);
        System.out.println("Total facturado: " + formateado);
    }
}