package com.tup.programacion3.entities;

public class DetallePedido extends Base{
    private int cantidad;
    private Double subtotal;
    private Producto producto;

    public DetallePedido() {
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }
    //Metodos
    public void addDetallePedido(int cantidad, Producto producto){
        DetallePedido nuevoDetalle = new DetallePedido();
        nuevoDetalle.setCantidad(cantidad);
        nuevoDetalle.setProducto(producto);

        if(producto!=null && producto.getPrecio()!=null){
            nuevoDetalle.subtotal = (cantidad * producto.getPrecio());
        }
        this.detallePedidos.add(nuevoDetalle);              //ver!!!!!
    }

}
