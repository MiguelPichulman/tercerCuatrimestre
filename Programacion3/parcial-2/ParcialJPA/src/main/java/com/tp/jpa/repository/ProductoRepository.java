package com.tp.jpa.repository;

import com.tp.jpa.model.Producto;
import com.tp.jpa.util.JPAUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;

import java.util.ArrayList;
import java.util.List;

public class ProductoRepository extends BaseRepository<Producto> {

    public ProductoRepository() {
        super(Producto.class);
    }

    /*
     * Esta consulta JPQL obtiene una lista de productos que pertenecen a una
     * categoria especifica filtrando por p.categoria.id.
     * Ademas, garantiza que solo se traigan los productos activos agregando
     * la condicion p.eliminado = false.
     * Utiliza un parametro nombrado (:categoriaId) para evitar inyecciones SQL.
     */

    public List<Producto> buscarPorCategoria(Long categoriaId){
        List producto=new ArrayList<>();
        EntityManager em = JPAUtil.getEntityManager();
        try{
            String jpql = "SELECT p FROM Producto p WHERE p.eliminado = false AND p.categoria.id= :categoriaId";
            TypedQuery<Producto> query= em.createQuery(jpql, Producto.class);
            query.setParameter("categoriaId", categoriaId);
            return query.getResultList();
        }finally {
            em.close();
        }
    }
}