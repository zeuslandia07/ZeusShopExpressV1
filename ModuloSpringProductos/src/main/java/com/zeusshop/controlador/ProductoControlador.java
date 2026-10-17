package com.zeusshop.controlador;

import com.zeusshop.modelo.Producto;
import com.zeusshop.servicio.ProductoServicio;
import jakarta.validation.Valid;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * Controlador web del módulo Productos (patrón MVC).
 * GET muestra páginas; POST recibe los formularios.
 */
@Controller
public class ProductoControlador {

    private static final String VISTA_LISTA = "productos/lista";
    private static final String VISTA_FORMULARIO = "productos/formulario";
    private static final String REDIRIGIR_LISTA = "redirect:/productos";

    private final ProductoServicio productoServicio;

    public ProductoControlador(ProductoServicio productoServicio) {
        this.productoServicio = productoServicio;
    }

    /** La página de inicio redirige a la lista de productos. */
    @GetMapping("/")
    public String inicio() {
        return REDIRIGIR_LISTA;
    }

    /** GET /productos: muestra la lista, con búsqueda opcional por nombre. */
    @GetMapping("/productos")
    public String listar(@RequestParam(required = false) String buscar, Model modelo) {
        modelo.addAttribute("productos", productoServicio.buscar(buscar));
        modelo.addAttribute("buscar", buscar == null ? "" : buscar);
        return VISTA_LISTA;
    }

    /** GET /productos/nuevo: muestra el formulario vacío. */
    @GetMapping("/productos/nuevo")
    public String nuevo(Model modelo) {
        Producto producto = new Producto();
        producto.setEstado("ACTIVO");
        modelo.addAttribute("producto", producto);
        modelo.addAttribute("titulo", "Nuevo producto");
        return VISTA_FORMULARIO;
    }

    /** GET /productos/{id}/editar: muestra el formulario con los datos del producto. */
    @GetMapping("/productos/{id}/editar")
    public String editar(@PathVariable Integer id, Model modelo, RedirectAttributes avisos) {
        return productoServicio.buscarPorId(id)
                .map(producto -> {
                    modelo.addAttribute("producto", producto);
                    modelo.addAttribute("titulo", "Editar producto");
                    return VISTA_FORMULARIO;
                })
                .orElseGet(() -> {
                    avisos.addFlashAttribute("mensaje", "El producto no existe.");
                    return REDIRIGIR_LISTA;
                });
    }

    /** POST /productos/guardar: valida el formulario e inserta o actualiza el producto. */
    @PostMapping("/productos/guardar")
    public String guardar(@Valid @ModelAttribute("producto") Producto producto,
                          BindingResult resultado, Model modelo, RedirectAttributes avisos) {
        boolean esNuevo = producto.getIdProducto() == null;

        // Si hay errores de validación, se vuelve al formulario mostrando los mensajes
        if (resultado.hasErrors()) {
            modelo.addAttribute("titulo", esNuevo ? "Nuevo producto" : "Editar producto");
            return VISTA_FORMULARIO;
        }

        try {
            productoServicio.guardar(producto);
            avisos.addFlashAttribute("mensaje", esNuevo
                    ? "Producto registrado correctamente."
                    : "Producto actualizado correctamente.");
        } catch (DataIntegrityViolationException e) {
            avisos.addFlashAttribute("mensaje",
                    "No se pudo guardar: el proveedor o la categoría no existen.");
        }
        return REDIRIGIR_LISTA;
    }

    /** POST /productos/{id}/eliminar: elimina el producto indicado. */
    @PostMapping("/productos/{id}/eliminar")
    public String eliminar(@PathVariable Integer id, RedirectAttributes avisos) {
        try {
            boolean eliminado = productoServicio.eliminar(id);
            avisos.addFlashAttribute("mensaje", eliminado
                    ? "Producto eliminado correctamente."
                    : "El producto no existe.");
        } catch (DataIntegrityViolationException e) {
            avisos.addFlashAttribute("mensaje",
                    "No se puede eliminar: el producto está relacionado con inventario o pedidos.");
        }
        return REDIRIGIR_LISTA;
    }
}
