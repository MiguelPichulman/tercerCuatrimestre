package com.tup.programacion3.entities;

import com.tup.programacion3.enums.Estado;
import com.tup.programacion3.enums.FormaPago;
import com.tup.programacion3.interfaces.Calculable;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class Pedido extends Base implements Calculable {
    private LocalDateTime fecha;
    private Estado estado;
    private Double total;
    private FormaPago formaPago;

    private Usuario usuario;
    private Set<DetallePedido> detallePedidos = new HashSet<>();

    public Pedido() {
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public FormaPago getFormaPago() {
        return formaPago;
    }

    public void setFormaPago(FormaPago formaPago) {
        this.formaPago = formaPago;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<DetallePedido> getDetallePedidos() {
        return detallePedidos;
    }

    public void setDetallePedidos(Set<DetallePedido> detallePedidos) {
        this.detallePedidos = detallePedidos;
    }

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


    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Pedido pedido = (Pedido) o;
        return Objects.equals(fecha, pedido.fecha) && estado == pedido.estado && Objects.equals(total, pedido.total) && formaPago == pedido.formaPago;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), fecha, estado, total, formaPago);
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "fecha=" + fecha +
                ", estado=" + estado +
                ", total=" + total +
                ", formaPago=" + formaPago +
                '}';
    }
}
