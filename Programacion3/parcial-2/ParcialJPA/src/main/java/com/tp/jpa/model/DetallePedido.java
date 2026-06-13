package com.tp.jpa.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@SuperBuilder
@Entity
public class DetallePedido extends Base {
    private int cantidad;
    private Double subtotal;
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;
}