package com.tp.jpa.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Categoria extends Base {

    private String nombre;
    private String descripcion;

    // JPA exige siempre un constructor vacío
    public Categoria() {
    }
}