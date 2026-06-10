package com.utn.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@SuperBuilder
@MappedSuperclass
public abstract class Base {//abstract xq nunca vamos a instanciar un objeto Base

    //@EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean eliminado;
    private LocalDateTime createdAt;
}