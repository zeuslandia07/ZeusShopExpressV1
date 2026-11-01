package com.zeusshop.controlador;


import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;


import com.zeusshop.modelo.Producto;
import com.zeusshop.servicio.ProductoServicio;


import jakarta.validation.Valid;


/**
 * API REST de Productos (responde en JSON).
 * Reutiliza ProductoServicio, el mismo que usa el módulo web.
 * Ruta base: /api/productos
 */
@RestController
@RequestMapping("/api/productos")
public class ProductoApiControlador {


    private final ProductoServicio productoServicio;


    public ProductoApiControlador(ProductoServicio productoServicio) {
        this.productoServicio = productoServicio;
    }


    // GET /api/productos  y  GET /api/productos?nombre=camis
    @GetMapping
    public List<Producto> listar(@RequestParam(required = false) String nombre) {
        return productoServicio.buscar(nombre);
    }


    // GET /api/productos/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> obtener(@PathVariable Integer id) {
        Optional<Producto> producto = productoServicio.buscarPorId(id);
        if (producto.isEmpty()) {
            return respuesta(HttpStatus.NOT_FOUND, "El producto no existe.");
        }
        return ResponseEntity.ok(producto.get());
    }


    // POST /api/productos
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody Producto producto, BindingResult resultado) {
        if (resultado.hasErrors()) {
            return errores(resultado);
        }
        try {
            Producto guardado = productoServicio.guardar(producto);
            return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
        } catch (DataIntegrityViolationException e) {
            return respuesta(HttpStatus.CONFLICT,
                    "No se pudo guardar: el proveedor o la categoría no existen.");
        }
    }


    // PUT /api/productos/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@PathVariable Integer id,
                                    @Valid @RequestBody Producto datos,
                                    BindingResult resultado) {
        if (resultado.hasErrors()) {
            return errores(resultado);
        }
        Optional<Producto> existente = productoServicio.buscarPorId(id);
        if (existente.isEmpty()) {
            return respuesta(HttpStatus.NOT_FOUND, "El producto no existe.");
        }
        Producto producto = existente.get();
        producto.setNombre(datos.getNombre());
        producto.setDescripcion(datos.getDescripcion());
        producto.setPrecio(datos.getPrecio());
        producto.setEstado(datos.getEstado());
        producto.setIdProveedor(datos.getIdProveedor());
        producto.setIdCategoria(datos.getIdCategoria());
        try {
            return ResponseEntity.ok(productoServicio.guardar(producto));
        } catch (DataIntegrityViolationException e) {
            return respuesta(HttpStatus.CONFLICT,
                    "No se pudo guardar: el proveedor o la categoría no existen.");
        }
    }


    // DELETE /api/productos/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Integer id) {
        try {
            if (!productoServicio.eliminar(id)) {
                return respuesta(HttpStatus.NOT_FOUND, "El producto no existe.");
            }
            return respuesta(HttpStatus.OK, "Producto eliminado correctamente.");
        } catch (DataIntegrityViolationException e) {
            return respuesta(HttpStatus.CONFLICT,
                    "No se puede eliminar: el producto está relacionado con inventario o pedidos.");
        }
    }


    // Respuesta simple con un mensaje
    private ResponseEntity<Map<String, Object>> respuesta(HttpStatus estado, String mensaje) {
        Map<String, Object> cuerpo = new LinkedHashMap<>();
        cuerpo.put("mensaje", mensaje);
        return ResponseEntity.status(estado).body(cuerpo);
    }


    // Respuesta 400 con el detalle de cada campo inválido
    private ResponseEntity<Map<String, Object>> errores(BindingResult resultado) {
        Map<String, String> campos = new LinkedHashMap<>();
        for (FieldError error : resultado.getFieldErrors()) {
            campos.put(error.getField(), error.getDefaultMessage());
        }
        Map<String, Object> cuerpo = new LinkedHashMap<>();
        cuerpo.put("mensaje", "Datos inválidos.");
        cuerpo.put("errores", campos);
        return ResponseEntity.badRequest().body(cuerpo);
    }
}