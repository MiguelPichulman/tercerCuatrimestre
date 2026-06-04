package ar.edu.tup.programacion3.entities;

import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@SuperBuilder
public abstract class Base {//abstract xq nunca vamos a instanciar un objeto Base

    @EqualsAndHashCode.Include
    private Long id;

    private boolean eliminado;
    private LocalDateTime createdAt;
}