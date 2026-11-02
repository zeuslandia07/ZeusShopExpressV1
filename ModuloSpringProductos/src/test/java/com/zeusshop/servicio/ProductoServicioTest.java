package com.zeusshop.servicio;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


import java.util.List;
import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.Sort;


import com.zeusshop.modelo.Producto;
import com.zeusshop.repositorio.ProductoRepositorio;


/**
 * Pruebas unitarias de ProductoServicio.
 * El repositorio se simula con Mockito, por lo que no se usa la base de datos.
 */
class ProductoServicioTest {


    private ProductoRepositorio repositorio;
    private ProductoServicio servicio;


    @BeforeEach
    void preparar() {
        repositorio = mock(ProductoRepositorio.class);
        servicio = new ProductoServicio(repositorio);
    }


    @Test
    void buscarSinTextoListaTodosLosProductos() {
        when(repositorio.findAll(any(Sort.class))).thenReturn(List.of(new Producto()));


        List<Producto> resultado = servicio.buscar("   ");


        assertEquals(1, resultado.size());
        verify(repositorio).findAll(any(Sort.class));
    }


    @Test
    void buscarConTextoFiltraPorNombre() {
        when(repositorio.findByNombreContainingIgnoreCaseOrderByIdProductoAsc("mouse"))
                .thenReturn(List.of(new Producto()));


        List<Producto> resultado = servicio.buscar("  mouse ");


        assertEquals(1, resultado.size());
        verify(repositorio).findByNombreContainingIgnoreCaseOrderByIdProductoAsc("mouse");
    }


    @Test
    void buscarPorIdDevuelveElProductoExistente() {
        Producto producto = new Producto();
        producto.setIdProducto(5);
        when(repositorio.findById(5)).thenReturn(Optional.of(producto));


        Optional<Producto> resultado = servicio.buscarPorId(5);


        assertTrue(resultado.isPresent());
        assertEquals(5, resultado.get().getIdProducto());
    }


    @Test
    void guardarDelegaEnElRepositorio() {
        Producto producto = new Producto();
        producto.setNombre("Teclado Mecánico RGB");
        when(repositorio.save(producto)).thenReturn(producto);


        Producto guardado = servicio.guardar(producto);


        assertEquals("Teclado Mecánico RGB", guardado.getNombre());
        verify(repositorio).save(producto);
    }


    @Test
    void eliminarProductoInexistenteDevuelveFalse() {
        when(repositorio.existsById(99)).thenReturn(false);


        boolean resultado = servicio.eliminar(99);


        assertFalse(resultado);
        verify(repositorio, never()).deleteById(any());
    }


    @Test
    void eliminarProductoExistenteDevuelveTrue() {
        when(repositorio.existsById(1)).thenReturn(true);


        boolean resultado = servicio.eliminar(1);


        assertTrue(resultado);
        verify(repositorio).deleteById(1);
    }
}