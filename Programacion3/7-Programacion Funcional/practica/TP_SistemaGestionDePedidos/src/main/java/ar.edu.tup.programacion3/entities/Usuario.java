package ar.edu.tup.programacion3.entities;



import ar.edu.tup.programacion3.enums.Rol;
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

public class Usuario extends Base{
    private String nombre;
    private String apellido;
    private String mail;
    private String celular;
    private String contrasena;
    private Rol rol;

    @Builder.Default
    @ToString.Exclude
    private Set<Pedido> pedidos = new HashSet<>();

}
