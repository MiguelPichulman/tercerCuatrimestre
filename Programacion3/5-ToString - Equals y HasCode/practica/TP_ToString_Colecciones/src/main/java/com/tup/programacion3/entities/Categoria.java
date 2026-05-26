package com.tup.programacion3.entities;

import java.util.HashSet;
import java.util.Set;

public class Categoria extends Base{
    private String nombre;
    private String descripcion;
    private Set<Producto> productos = new HashSet<>();

    public Categoria(){
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Producto> getProductos() {
        return productos;
    }

    public void setProductos(Set<Producto> productos) {
        this.productos = productos;
    }
}
