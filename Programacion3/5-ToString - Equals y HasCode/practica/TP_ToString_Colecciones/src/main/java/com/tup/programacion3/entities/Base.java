package com.tup.programacion3.entities;

import java.time.LocalDate;

public abstract class Base { //abstract xq nunca vamos ainstanciar un objeto Base
    private Long id;
    private boolean eliminado;
    private LocalDate createdAt;

    public Base() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isEliminado() {
        return eliminado;
    }

    public void setEliminado(boolean eliminado) {
        this.eliminado = eliminado;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}