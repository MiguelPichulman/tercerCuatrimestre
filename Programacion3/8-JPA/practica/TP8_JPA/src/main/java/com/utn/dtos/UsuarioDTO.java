package com.utn.dtos;

import java.time.LocalDateTime;

public record UsuarioDTO(Long id,
                         boolean eliminado,
                         LocalDateTime createdAt,
                         String nombre,
                         String apellido,
                         String mail,
                         String celular) {
}