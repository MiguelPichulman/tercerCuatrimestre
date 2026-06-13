package com.tp.jpa.model;

import com.tp.jpa.model.enums.Estado;
import com.tp.jpa.model.enums.FormaPago;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Entity
@SuperBuilder

public class Pedido extends Base implements Calculable {
    private LocalDateTime fecha;

    @Enumerated(EnumType.STRING)
    private Estado estado;
    private Double total;

    @Enumerated(EnumType.STRING)
    private FormaPago formaPago;

    @Builder.Default
    @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "pedido_id")
    private Set<DetallePedido> detallePedidos = new HashSet<>();

    @Override
    public void calcularTotal() {
        double sumaTotal = 0.0;
        for (DetallePedido detalle : this.detallePedidos){
            if (detalle.getSubtotal()!=null){
                sumaTotal = sumaTotal+detalle.getSubtotal();
            }
        }
        this.total= sumaTotal;
    }

    //Metodos
    public void addDetallePedido(int cantidad, Producto producto) {
        DetallePedido nuevoDetalle = new DetallePedido();
        nuevoDetalle.setCantidad(cantidad);
        nuevoDetalle.setProducto(producto);

        if (producto != null && producto.getPrecio() != null) {
            nuevoDetalle.setSubtotal(cantidad * producto.getPrecio());
        }

        this.detallePedidos.add(nuevoDetalle);
    }

    public DetallePedido findDetallePedidoByProducto(Producto producto) {
        for (DetallePedido detalle: this.detallePedidos){
            if (detalle.getProducto()!=null && detalle.getProducto().equals(producto)){
                return detalle;
            }
        }
        return null;
    }

    public void deleteDetallePedidobyProducto(Producto producto){
        // 1. Lo buscamos
        DetallePedido detalleEncontrado = findDetallePedidoByProducto(producto);//sugerencia IA

        // 2. Si lo encontramos, lo borramos
        if (detalleEncontrado != null) {
            this.detallePedidos.remove(detalleEncontrado);
        }
    }
}