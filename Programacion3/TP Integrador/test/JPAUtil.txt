package com.tp.jpa.util;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class JPAUtil {

    // Apunta al nombre de la unidad de persistencia que pusimos en el XML
    private static final EntityManagerFactory emf = Persistence.createEntityManagerFactory("foodstore-pu");

    public static EntityManagerFactory getEntityManagerFactory() {
        return emf;
    }

    public static void close() {
        if (emf != null && emf.isOpen()) {
            emf.close();
        }
    }
}