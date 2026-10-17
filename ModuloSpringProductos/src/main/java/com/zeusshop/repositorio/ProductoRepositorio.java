package com.zeusshop.repositorio;

import com.zeusshop.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio de productos.
 * Spring Data JPA genera automáticamente las operaciones CRUD
 * (save, findAll, findById, deleteById...) sin escribir SQL.
 */
@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Integer> {

    /**
     * Busca productos cuyo nombre contenga el texto indicado (sin distinguir mayúsculas).
     * Spring construye la consulta a partir del nombre del método.
     */
    List<Producto> findByNombreContainingIgnoreCaseOrderByIdProductoAsc(String nombre);
}
