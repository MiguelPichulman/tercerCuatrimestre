package com.tp.jpa.repository;

import com.tp.jpa.model.Producto;
import com.tp.jpa.util.JPAUtil;

import javax.persistence.EntityManager;
import java.util.List;

public class ProductoRepository extends BaseRepository<Producto> {

    public ProductoRepository() {
        super(Producto.class);
    }

    public List<Producto> buscarPorCategoria(Long categoriaId) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            // Consulta JPQL: retorna productos activos de una categoria especifica
            // Filtra por categoria.id y por eliminado = false para excluir bajas logicas
            String jpql = "SELECT p FROM Producto p WHERE p.categoria.id = :catId AND p.eliminado = false";
            return em.createQuery(jpql, Producto.class)
                    .setParameter("catId", categoriaId)
                    .getResultList();
        } finally {
            em.close();
        }
    }
}