package com.tp.jpa.repository;


import com.tp.jpa.model.Base;
import com.tp.jpa.util.JPAUtil;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public abstract class BaseRepository<T extends Base> {

    private final Class<T> entityClass;
    private final EntityManagerFactory emf;

    // El constructor recibe la clase de la entidad para poder hacer los find() y JPQL
    public BaseRepository(Class<T> entityClass) {
        this.entityClass = entityClass;
        this.emf = JPAUtil.getEntityManagerFactory();
    }

    public T guardar(T entity) {
        EntityManager em = emf.createEntityManager();
        try {
            em.getTransaction().begin();
            // Si el ID es null es un alta. si ya tiene ID es una actualizacion
            if (entity.getId() == null) {
                em.persist(entity);
            } else {
                entity = em.merge(entity);
            }
            em.getTransaction().commit();
            return entity;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            throw e;
        } finally {
            //cierre de la conexion
            em.close();
        }
    }

    public Optional<T> buscarPorId(Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            T entity = em.find(entityClass, id);

            return Optional.ofNullable(entity);
        } finally {
            em.close();
        }
    }

    public List<T> listarActivos() {
        EntityManager em = emf.createEntityManager();
        try {
            // Construimos el JPQL dinamicamente usando el nombre de la clase
            String jpql = "SELECT e FROM " + entityClass.getSimpleName() + " e WHERE e.eliminado = false";
            return em.createQuery(jpql, entityClass).getResultList();
        } finally {
            em.close();
        }
    }

    public boolean eliminarLogico(Long id) {
        EntityManager em = emf.createEntityManager();
        try {
            T entity = em.find(entityClass, id);
            if (entity != null) {
                em.getTransaction().begin();
                entity.setEliminado(true);
                // Sincronizamos el cambio con merge ya que la entidad tiene ID
                em.merge(entity);
                em.getTransaction().commit();
                return true;
            }
            return false;
        } catch (Exception e) {
            if (em.getTransaction().isActive()) {
                em.getTransaction().rollback();
            }
            return false;
        } finally {
            em.close();
        }
    }
}