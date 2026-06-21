package com.tp.jpa.model;

import com.tp.jpa.model.enums.Estado;
import com.tp.jpa.model.enums.FormaPago;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Pedido extends Base implements Calculable {

    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    private Estado estado;

    private Double total;

    @Enumerated(EnumType.STRING)
    private FormaPago formaPago;

    // Relacion bidireccional: un Pedido gestiona muchos DetallePedido
    // Se inicializa la lista para evitar NullPointerException
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<DetallePedido> detalles = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "usuario_id", insertable = false, updatable = false)
    private Usuario usuario;

    // Constructor vacio requerido por JPA
    public Pedido() {
    }

    // Unico metodo encargado de crear y asociar detalles
    public void addDetallePedido(int cantidad, Producto producto) {
        DetallePedido detalle = new DetallePedido();
        detalle.setCantidad(cantidad);

        // Calcula el subtotal multiplicando precio por cantidad
        detalle.setSubtotal(producto.getPrecio() * cantidad);

        detalle.setProducto(producto);

        // Establece la referencia bidireccional
        detalle.setPedido(this);

        this.detalles.add(detalle);
    }

    // Implementacion de la interfaz Calculable
    @Override
    public void calcularTotal() {
        double suma = 0.0;
        for (DetallePedido detalle : detalles) {
            if (detalle.getSubtotal() != null) {
                suma += detalle.getSubtotal();
            }
        }
        this.total = suma;
    }
}