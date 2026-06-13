package com.tp.jpa.repository;

import com.tp.jpa.util.JPAUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import java.util.List;
import java.util.Optional;

public abstract class BaseRepository<T> {

    private final Class<T> entityClass;

    public BaseRepository(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    public Optional<T> buscarPorId(Long id) {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            T entity = em.find(entityClass, id);

            return Optional.ofNullable(entity);
        } finally {
            em.close(); // Siempre se ejecuta, haya error o no
        }
    }

    public T guardar(T entity) {
        EntityManager em = JPAUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        try {
            tx.begin();
            entity = em.merge(entity);//persist solo para objetos nuevos, merge para actualizar
            tx.commit();
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            throw e;

        } finally {
            em.close();
        }
        return entity;
    }

    public List<T> listarActivos() {
        EntityManager em = JPAUtil.getEntityManager();
        try {
            String jpql = "SELECT e FROM " + entityClass.getSimpleName() + " e WHERE e.eliminado = false";
            return em.createQuery(jpql, entityClass).getResultList();
        } finally {
            em.close();
        }
    }

    //ACAAAA QUEDAMOS
    public boolean eliminarLogico(Long id) {
        EntityManager em = JPAUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();

        try {
            tx.begin();
            T entity = em.find(entityClass, id);
            if (entity != null) {
                ((com.tp.jpa.model.Base) entity).setEliminado(true);
                em.merge(entity);
                tx.commit();
                return true;
            } else {
                tx.commit();
                return false;
            }
        } catch (Exception e) {
            if (tx != null && tx.isActive()) {
                tx.rollback();
            }
            throw e;
        } finally {
            em.close();
        }
    }
}