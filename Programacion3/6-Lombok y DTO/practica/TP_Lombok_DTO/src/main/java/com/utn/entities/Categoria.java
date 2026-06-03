package com.utn.entities;

import lombok.*;
import lombok.experimental.SuperBuilder;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)

@SuperBuilder
public class Categoria extends Base{
    private String nombre;
    private String descripcion;

    @Builder.Default
    @ToString.Exclude
    private Set<Producto> productos = new HashSet<>();

}