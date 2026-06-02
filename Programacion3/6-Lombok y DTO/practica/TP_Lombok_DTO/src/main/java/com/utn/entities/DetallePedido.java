package com.utn.entities;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder

public class DetallePedido extends Base {
    private int cantidad;
    private Double subtotal;

    private Producto producto;

}
