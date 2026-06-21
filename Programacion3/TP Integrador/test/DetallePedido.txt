package com.tp.jpa.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class DetallePedido extends Base {

    private int cantidad;
    private Double subtotal;

    // Relacion hacia el producto (unidireccional)
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    // Relacion hacia el pedido (bidireccional, es dueña de la Foreign Key)
    @ManyToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    // Constructor vacio requerido por JPA
    public DetallePedido() {
    }
}