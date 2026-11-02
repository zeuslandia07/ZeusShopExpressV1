package com.zeusshop.controlador;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


import java.math.BigDecimal;
import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;


import com.zeusshop.modelo.Producto;
import com.zeusshop.servicio.ProductoServicio;


/**
 * Pruebas unitarias de la API REST de productos.
 * Se comprueban los códigos HTTP que devuelve cada servicio.
 */
class ProductoApiControladorTest {


    private ProductoServicio servicio;
    private ProductoApiControlador controlador;


    @BeforeEach
    void preparar() {
        servicio = mock(ProductoServicio.class);
        controlador = new ProductoApiControlador(servicio);
    }


    /** Crea un producto con datos válidos para las pruebas. */
    private Producto productoValido() {
        Producto producto = new Producto();
        producto.setNombre("Teclado Mecánico RGB");
        producto.setDescripcion("Switches rojos");
        producto.setPrecio(new BigDecimal("189000"));
        producto.setEstado("ACTIVO");
        producto.setIdProveedor(1);
        producto.setIdCategoria(1);
        return producto;
    }


    @Test
    void obtenerProductoInexistenteDevuelve404() {
        when(servicio.buscarPorId(99)).thenReturn(Optional.empty());


        ResponseEntity<?> respuesta = controlador.obtener(99);


        assertEquals(404, respuesta.getStatusCode().value());
    }


    @Test
    void obtenerProductoExistenteDevuelve200() {
        when(servicio.buscarPorId(1)).thenReturn(Optional.of(productoValido()));


        ResponseEntity<?> respuesta = controlador.obtener(1);


        assertEquals(200, respuesta.getStatusCode().value());
    }


    @Test
    void crearProductoValidoDevuelve201() {
        Producto producto = productoValido();
        when(servicio.guardar(any(Producto.class))).thenReturn(producto);
        BindingResult resultado = new BeanPropertyBindingResult(producto, "producto");


        ResponseEntity<?> respuesta = controlador.crear(producto, resultado);


        assertEquals(201, respuesta.getStatusCode().value());
    }


    @Test
    void crearProductoConDatosInvalidosDevuelve400() {
        Producto producto = productoValido();
        producto.setNombre("");
        BindingResult resultado = new BeanPropertyBindingResult(producto, "producto");
        resultado.rejectValue("nombre", "vacio", "El nombre es obligatorio");


        ResponseEntity<?> respuesta = controlador.crear(producto, resultado);


        assertEquals(400, respuesta.getStatusCode().value());
        verify(servicio, never()).guardar(any());
    }


    @Test
    void crearProductoConProveedorInexistenteDevuelve409() {
        Producto producto = productoValido();
        when(servicio.guardar(any(Producto.class)))
                .thenThrow(new DataIntegrityViolationException("clave foránea"));
        BindingResult resultado = new BeanPropertyBindingResult(producto, "producto");


        ResponseEntity<?> respuesta = controlador.crear(producto, resultado);


        assertEquals(409, respuesta.getStatusCode().value());
    }


    @Test
    void eliminarProductoInexistenteDevuelve404() {
        when(servicio.eliminar(99)).thenReturn(false);


        ResponseEntity<?> respuesta = controlador.eliminar(99);


        assertEquals(404, respuesta.getStatusCode().value());
    }


    @Test
    void eliminarProductoExistenteDevuelve200() {
        when(servicio.eliminar(1)).thenReturn(true);


        ResponseEntity<?> respuesta = controlador.eliminar(1);


        assertEquals(200, respuesta.getStatusCode().value());
    }


    @Test
    void eliminarProductoConRelacionesDevuelve409() {
        when(servicio.eliminar(1)).thenThrow(new DataIntegrityViolationException("relacionado"));


        ResponseEntity<?> respuesta = controlador.eliminar(1);


        assertEquals(409, respuesta.getStatusCode().value());
    }
}