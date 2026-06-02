package com.utn.entities;

import com.utn.enums.Estado;
import com.utn.enums.FormaPago;
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
@EqualsAndHashCode(callSuper = true)
@SuperBuilder

public class Pedido extends Base implements Calculable {
    private LocalDateTime fecha;
    private Estado estado;
    private Double total;
    private FormaPago formaPago;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Usuario usuario;

    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
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
        // 1. Lo buscamos (usando el método que ya tenés)
        DetallePedido detalleEncontrado = findDetallePedidoByProducto(producto);//sugerencia IA

        // 2. Si lo encontramos, lo borramos (sin bucles de por medio)
        if (detalleEncontrado != null) {
            this.detallePedidos.remove(detalleEncontrado);
        }
    }
}
