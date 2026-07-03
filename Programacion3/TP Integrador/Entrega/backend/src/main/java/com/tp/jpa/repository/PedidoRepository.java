package com.tp.jpa.repository;

import com.tp.jpa.model.Pedido;
import com.tp.jpa.model.enums.Estado;
import com.tp.jpa.util.JPAUtil;

import javax.persistence.EntityManager;
import java.util.List;

public class PedidoRepository extends BaseRepository<Pedido> {

    public PedidoRepository() {
        super(Pedido.class);
    }

    public List<Pedido> buscarPorUsuario(Long idUsuario) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            // Consulta JPQL: retorna todos los pedidos activos de un usuario dado su ID
            // Filtra por eliminado = false para excluir pedidos dados de baja logica
            String jpql = "SELECT p FROM Pedido p WHERE p.usuario.id = :uid AND p.eliminado = false";
            return em.createQuery(jpql, Pedido.class)
                    .setParameter("uid", idUsuario)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public List<Pedido> buscarPorEstado(Estado estado) {
        EntityManager em = JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            // Consulta JPQL: retorna todos los pedidos activos con un estado especifico
            // Util para filtrar PENDIENTE, CONFIRMADO, TERMINADO o CANCELADO
            String jpql = "SELECT p FROM Pedido p WHERE p.estado = :estado AND p.eliminado = false";
            return em.createQuery(jpql, Pedido.class)
                    .setParameter("estado", estado)
                    .getResultList();
        } finally {
            em.close();
        }
    }
    //agregar para cumplir consigna
    public void guardarPedidoConDetalles(com.tp.jpa.model.Usuario usuario, com.tp.jpa.model.Pedido pedido, java.util.Map<com.tp.jpa.model.Producto, Integer> carrito) {
        // Aca se cumple la regla UN SOLO ENTITY MANAGER PARA TODO EL PROCESO

        javax.persistence.EntityManager em = com.tp.jpa.util.JPAUtil.getEntityManagerFactory().createEntityManager();
        try {
            em.getTransaction().begin();

            // traemos al usuario a este EntityManager
            com.tp.jpa.model.Usuario userManaged = em.find(com.tp.jpa.model.Usuario.class, usuario.getId());

            // procesamos el carrito
            for (java.util.Map.Entry<com.tp.jpa.model.Producto, Integer> entry : carrito.entrySet()) {
                // Traemos el producto a este EntityManager
                com.tp.jpa.model.Producto prodManaged = em.find(com.tp.jpa.model.Producto.class, entry.getKey().getId());
                int cantidad = entry.getValue();

                // Descontamos stock y agregamos detalle
                prodManaged.setStock(prodManaged.getStock() - cantidad);
                pedido.addDetallePedido(cantidad, prodManaged);
            }

            pedido.calcularTotal();
            userManaged.getPedidos().add(pedido);

            // persistimos todo de una sola vez
            em.persist(pedido);
            em.merge(userManaged);

            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }
}