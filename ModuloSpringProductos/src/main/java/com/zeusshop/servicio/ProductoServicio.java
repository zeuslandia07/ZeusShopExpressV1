package com.zeusshop.servicio;

import com.zeusshop.modelo.Producto;
import com.zeusshop.repositorio.ProductoRepositorio;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Lógica de negocio del módulo Productos.
 * Separa el controlador (web) del acceso a datos (repositorio).
 */
@Service
public class ProductoServicio {

    private final ProductoRepositorio productoRepositorio;

    /** Spring inyecta el repositorio automáticamente (inyección de dependencias). */
    public ProductoServicio(ProductoRepositorio productoRepositorio) {
        this.productoRepositorio = productoRepositorio;
    }

    /** Lista todos los productos o filtra por nombre si se recibe texto de búsqueda. */
    @Transactional(readOnly = true)
    public List<Producto> buscar(String texto) {
        if (texto == null || texto.isBlank()) {
            return productoRepositorio.findAll(Sort.by("idProducto"));
        }
        return productoRepositorio.findByNombreContainingIgnoreCaseOrderByIdProductoAsc(texto.trim());
    }

    /** Consulta un producto por su id. */
    @Transactional(readOnly = true)
    public Optional<Producto> buscarPorId(Integer idProducto) {
        return productoRepositorio.findById(idProducto);
    }

    /** Inserta (si no tiene id) o actualiza (si ya tiene id) un producto. */
    @Transactional
    public Producto guardar(Producto producto) {
        return productoRepositorio.save(producto);
    }

    /** Elimina un producto; devuelve false si no existía. */
    @Transactional
    public boolean eliminar(Integer idProducto) {
        if (!productoRepositorio.existsById(idProducto)) {
            return false;
        }
        productoRepositorio.deleteById(idProducto);
        return true;
    }
}
