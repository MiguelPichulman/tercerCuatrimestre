package com.tp.jpa;

import com.tp.jpa.repository.CategoriaRepository;
import com.tp.jpa.repository.ProductoRepository;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        CategoriaRepository categoriaRepo = new CategoriaRepository();
        ProductoRepository productoRepo = new ProductoRepository();

        boolean salir = false;

        while (!salir) {
            System.out.println("\n==============================");
            System.out.println("       MENU PRINCIPAL");
            System.out.println("==============================");
            System.out.println("1. ABM de Categorias");
            System.out.println("2. ABM de Productos");
            System.out.println("3. Reportes");
            System.out.println("4. Salir");
            System.out.print("Seleccione una opcion: ");

            //opcion elegida
            String input = scanner.nextLine();

            switch (input) {
                case "1":
                    menuCategorias(scanner, categoriaRepo);
                    break;
                case "2":
                    menuProductos(scanner, productoRepo, categoriaRepo);
                    break;
                case "3":
                    menuReportes(scanner, productoRepo, categoriaRepo);
                    break;
                case "4":
                    salir = true;
                    System.out.println("Cerrando el sistema.");
                    break;
                default:
                    System.out.println("Advertencia: Opcion incorrecta. Intente nuevamente.");
            }
        }
        scanner.close();
    }

    private static void menuCategorias(Scanner scanner, CategoriaRepository repo) {
        boolean volver = false;

        while (!volver) {
        System.out.println("\n--- SUBMENU CATEGORIAS ---");
        System.out.println("1. Alta");
        System.out.println("2. Modificacion");
        System.out.println("3. Baja logica");
        System.out.println("4. Listado");
        System.out.println("5. Volver al menu principal");
        System.out.print("Elija una opcion: ");

        String input = scanner.nextLine();

        switch (input){
            case"1":
                System.out.println("Ingrese el nuevo nombre de la Categoria a crear");
                String nombreN = scanner.nextLine();

                if(nombreN.trim().isEmpty()){
                    System.out.println("Advertencia: El nombre no puede estar vacio");
                    break;
                }
                System.out.println("Ingrese lña descripcion de la Nueva Categoria");
                String descripcionN = scanner.nextLine();
                 //persiste
                com.tp.jpa.model.Categoria nuevaCat = new com.tp.jpa.model.Categoria(nombreN, descripcionN);
                nuevaCat = repo.guardar(nuevaCat);
                System.out.println("Nueva Categoria guardada con exito");
                break;

            case "2":
                System.out.println("Categorias Disponibles:");
                for(com.tp.jpa.model.Categoria c : repo.listarActivos()){
                    System.out.println("ID:" + c.getId()+ " - " + c.getNombre());
                }
                System.out.println("Ingrese el ID de la Categoria a modificar: ");
                try{
                    Long idMod= Long.parseLong(scanner.nextLine());
                    java.util.Optional<com.tp.jpa.model.Categoria>categoriaModOpt = repo.buscarPorId(idMod);
                    if (categoriaModOpt.isPresent() && !categoriaModOpt.get().isEliminado()){
                        com.tp.jpa.model.Categoria categoriaMod = categoriaModOpt.get();

                        System.out.println("Ingrese el nuevo nombre (deje en blanco para mantener el actual): ");
                        String nuevoNombre = scanner.nextLine();
                        if (!nuevoNombre.trim().isEmpty()) {
                            categoriaMod.setNombre(nuevoNombre);
                        }

                        System.out.print("Nueva descripcion (deje en blanco para mantener la actual): ");
                        String nuevaDesc = scanner.nextLine();
                        if (!nuevaDesc.trim().isEmpty()) {
                            categoriaMod.setDescripcion(nuevaDesc);
                        }

                        repo.guardar(categoriaMod); //persiste
                        System.out.println("Categoria modificada con exito.");
                    }else{
                        System.out.println("Advertencia: el Id no corresponde auna categoria activa");
                    }

                }catch(NumberFormatException e){
                    System.out.println("Advertencia: debe ingresar un ID numerico valido");
                }
                break;

            case"3":
                System.out.print("Ingrese el ID de la categoria a dar de baja: ");
                try {
                    Long idBaja = Long.parseLong(scanner.nextLine());
                    java.util.Optional<com.tp.jpa.model.Categoria> categoriaBajaOpt = repo.buscarPorId(idBaja);

                    if (categoriaBajaOpt.isPresent() && !categoriaBajaOpt.get().isEliminado()) {
                        String nombreEliminado = categoriaBajaOpt.get().getNombre();
                        repo.eliminarLogico(idBaja); //baja logica
                        System.out.println("La categoria '" + nombreEliminado + "' fue dada de baja exitosamente.");
                    } else {
                        System.out.println("Advertencia: La categoría no existe o ya esta dada de baja.");
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Advertencia: debe ingresar un ID numerico valido.");
                }
                break;

            case "4":
                System.out.println("\n--- LISTADO DE CATEGORIAS ACTIVAS ---");
                java.util.List<com.tp.jpa.model.Categoria> activas = repo.listarActivos();
                if (activas.isEmpty()) {
                    System.out.println("No hay categorias activas en el sistema.");
                } else {
                    for (com.tp.jpa.model.Categoria c : activas) {
                        //mostramos id, nombre y descripcion
                        System.out.println("ID: " + c.getId() + " | Nombre: " + c.getNombre() + " | Descripción: " + c.getDescripcion());
                    }
                }
                break;

            case "5"://volver
                System.out.println("Volviendo al menu principal...");
                volver=true;
                break;

            default:
                System.out.println("Advertencia: Opcion incorrecta. Intente nuevamente.");
        }
        }
    }

    private static void menuProductos(Scanner scanner, ProductoRepository prodRepo, CategoriaRepository categoriaRepo) {
        boolean volver = false;

        while (!volver) {
            System.out.println("\n--- SUBMENU PRODUCTOS ---");
            System.out.println("1. Alta");
            System.out.println("2. Modificacion");
            System.out.println("3. Baja logica");
            System.out.println("4. Listado");
            System.out.println("5. Volver al menu principal");
            System.out.print("Elija una opcion: ");

            String input = scanner.nextLine();

            switch (input) {
                case "1": //alta de producto
                    System.out.print("Ingrese el nombre del nuevo producto: ");
                    String nombre = scanner.nextLine();

                    if (nombre.trim().isEmpty()) {
                        System.out.println("Advertencia: El nombre no puede estar vacio.");
                        break;
                    }

                    try {
                        System.out.print("Ingrese el precio: ");
                        Double precio = Double.parseDouble(scanner.nextLine());

                        System.out.print("Ingrese el stock: ");
                        Integer stock = Integer.parseInt(scanner.nextLine());

                        //categorias a elegir
                        System.out.println("\nCategorias disponibles:");
                        for (com.tp.jpa.model.Categoria c : categoriaRepo.listarActivos()) {
                            System.out.println("ID: " + c.getId() + " - " + c.getNombre());
                        }

                        System.out.print("Ingrese el ID de la categoria a la que pertenece: ");
                        Long idCat = Long.parseLong(scanner.nextLine());

                        // buscamos la categoria en la BD
                        java.util.Optional<com.tp.jpa.model.Categoria> categoriaOpt = categoriaRepo.buscarPorId(idCat);

                        // si existe y esta activa creamos el producto
                        if (categoriaOpt.isPresent() && !categoriaOpt.get().isEliminado()) {
                            com.tp.jpa.model.Producto nuevoProd = new com.tp.jpa.model.Producto(nombre, precio, stock, categoriaOpt.get());
                            nuevoProd = prodRepo.guardar(nuevoProd);
                            System.out.println("Producto creado con exito. ID generado: " + nuevoProd.getId());
                        } else {
                            System.out.println("Advertencia: El ID ingresado no corresponde a una categoria activa.");
                        }

                    } catch (NumberFormatException e) {
                        System.out.println("Advertencia: Debe ingresar valores numericos validos para precio, stock e ID.");
                    }
                    break;

                case "2":
                    System.out.println("\nProductos Disponibles:");
                    for(com.tp.jpa.model.Producto p : prodRepo.listarActivos()){
                        System.out.println("ID:" + p.getId()+ " - " + p.getNombre());
                    }

                    System.out.print("\nIngrese el ID del Producto a modificar: ");
                    try{
                        Long idMod= Long.parseLong(scanner.nextLine());
                        java.util.Optional<com.tp.jpa.model.Producto> productoModOpt = prodRepo.buscarPorId(idMod);

                        if (productoModOpt.isPresent() && !productoModOpt.get().isEliminado()){
                            com.tp.jpa.model.Producto productoMod = productoModOpt.get();

                            System.out.print("Ingrese el nuevo nombre (deje en blanco para mantener el actual): ");
                            String nuevoNombre = scanner.nextLine();
                            if (!nuevoNombre.trim().isEmpty()) {
                                productoMod.setNombre(nuevoNombre);
                            }

                            System.out.print("Nuevo precio (deje en blanco para mantener el actual): ");
                            String nuevoPrecio = scanner.nextLine();
                            if (!nuevoPrecio.trim().isEmpty()) {
                                productoMod.setPrecio(Double.parseDouble(nuevoPrecio));
                            }

                            System.out.print("Nuevo stock (deje en blanco para mantener el actual): ");
                            String nuevoStock = scanner.nextLine();
                            if (!nuevoStock.trim().isEmpty()) {
                                productoMod.setStock(Integer.parseInt(nuevoStock));
                            }

                            prodRepo.guardar(productoMod); // persiste
                            System.out.println("Producto modificado con exito.");
                        } else {
                            System.out.println("Advertencia: el Id no corresponde a un producto activo");
                        }

                    } catch(NumberFormatException e) {
                        System.out.println("Advertencia: debe ingresar un ID o valor numerico valido");
                    }
                    break;

                case "3": // BAJA LOGICA
                    System.out.print("Ingrese el ID del producto a dar de baja: ");
                    try {
                        Long idBaja = Long.parseLong(scanner.nextLine());
                        java.util.Optional<com.tp.jpa.model.Producto> prodBajaOpt = prodRepo.buscarPorId(idBaja);

                        if (prodBajaOpt.isPresent() && !prodBajaOpt.get().isEliminado()) {
                            String nombreEliminado = prodBajaOpt.get().getNombre();
                            prodRepo.eliminarLogico(idBaja);
                            System.out.println("El producto '" + nombreEliminado + "' fue dado de baja exitosamente.");
                        } else {
                            System.out.println("Advertencia: El producto no existe o ya esta dado de baja.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Advertencia: Debe ingresar un ID numerico valido.");
                    }
                    break;

                case "4": // LISTADO
                    System.out.println("\n--- LISTADO DE PRODUCTOS ACTIVOS ---");
                    java.util.List<com.tp.jpa.model.Producto> activos = prodRepo.listarActivos();
                    if (activos.isEmpty()) {
                        System.out.println("No hay productos activos en el sistema.");
                    } else {
                        for (com.tp.jpa.model.Producto p : activos) {
                            // validamos que tenga categoria para evitar errores
                            String nombreCat = (p.getCategoria() != null) ? p.getCategoria().getNombre() : "Sin categoria";

                            System.out.println("ID: " + p.getId() +
                                    " | Nombre: " + p.getNombre() +
                                    " | Precio: $" + p.getPrecio() +
                                    " | Stock: " + p.getStock() +
                                    " | Categoria: " + nombreCat);
                        }
                    }
                    break;
                case "5": // VOLVER
                    System.out.println("Volviendo al menu principal...");
                    volver = true;
                    break;

                default:
                    System.out.println("Advertencia: Opcion incorrecta. Intente nuevamente.");
            }
        }
    }

    private static void menuReportes(Scanner scanner, ProductoRepository productoRepo, CategoriaRepository categoriaRepo) {
        System.out.println("\n--- REPORTE DE PRODUCTOS POR CATEGORIA (HU-09) ---");

        System.out.println("Categorias disponibles:");
        for (com.tp.jpa.model.Categoria c : categoriaRepo.listarActivos()) {
            System.out.println("ID: " + c.getId() + " - " + c.getNombre());
        }

        System.out.print("\nIngrese el ID de la categoria para ver sus productos: ");
        try {
            Long idCat = Long.parseLong(scanner.nextLine());

            // la categoria existe
            java.util.Optional<com.tp.jpa.model.Categoria> catOpt = categoriaRepo.buscarPorId(idCat);
            if (catOpt.isPresent() && !catOpt.get().isEliminado()) {

                java.util.List<com.tp.jpa.model.Producto> productos = productoRepo.buscarPorCategoria(idCat);

                if (productos.isEmpty()) {
                    System.out.println("No hay productos activos para esta categoria.");
                } else {
                    System.out.println("\nProductos en la categoria '" + catOpt.get().getNombre() + "':");
                    for (com.tp.jpa.model.Producto p : productos) {
                        System.out.println("- ID: " + p.getId() + " | Nombre: " + p.getNombre() + " | Precio: $" + p.getPrecio() + " | Stock: " + p.getStock());

                    }
                }
            } else {
                System.out.println("Atención: El ID ingresado no corresponde a una categoria activa.");
            }
        } catch (NumberFormatException e) {
            System.out.println("Atención: Debe ingresar un ID numerico valido.");
        }
    }
}