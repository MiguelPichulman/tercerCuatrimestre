package com.tp.jpa.repository;

import com.tp.jpa.model.Usuario;
import com.tp.jpa.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

public class UsuarioRepository extends BaseRepository<Usuario> {

    public UsuarioRepository() {
        super(Usuario.class);
    }

    public Optional<Usuario> buscarPorMail(String mail) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            // Consulta JPQL: busca un usuario activo por su direccion de correo electronico
            // Retorna Optional para manejar el caso en que el mail no este registrado
            String jpql = "SELECT u FROM Usuario u WHERE u.mail = :mail AND u.eliminado = false";
            TypedQuery<Usuario> q = em.createQuery(jpql, Usuario.class);
            q.setParameter("mail", mail);
            List<Usuario> res = q.getResultList();

            return res.isEmpty() ? Optional.empty() : Optional.of(res.get(0));
        } finally {
            em.close();
        }
    }
}