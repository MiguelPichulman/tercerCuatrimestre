package ar.edu.tup.programacion3.entities;

import ar.edu.tup.programacion3.enums.Estado;
import ar.edu.tup.programacion3.enums.FormaPago;
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

@SuperBuilder

public class Pedido extends Base implements Calculable {
    private LocalDateTime fecha;
    private Estado estado;
    private Double total;
    private FormaPago formaPago;

    @ToString.Exclude
    private Usuario usuario;

    @Builder.Default
    @ToString.Exclude
    private Set<DetallePedido> detallePedidos = new HashSet<>();


    //stream
    @Override
    public void calcularTotal(){
        this.total = this.detallePedidos.stream()
                .filter(detalle -> detalle.getSubtotal() != null)
                .mapToDouble(DetallePedido :: getSubtotal)
                .sum();

    }

    //Metodos
    public void addDetallePedido(int cantidad, Producto producto) {
        DetallePedido nuevoDetalle = new DetallePedido();
        nuevoDetalle.setId((long) (this.detallePedidos.size()+1));
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