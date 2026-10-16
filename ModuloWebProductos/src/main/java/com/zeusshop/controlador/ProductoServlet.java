package com.zeusshop.controlador;

import com.zeusshop.dao.ProductoDAO;
import com.zeusshop.modelo.Producto;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

/**
 * Servlet del módulo Gestión de Productos.
 * GET: muestra páginas (lista, búsqueda, formularios).
 * POST: recibe los formularios para guardar, actualizar o eliminar.
 */
@WebServlet("/productos")
public class ProductoServlet extends HttpServlet {

    private static final String VISTA_LISTA = "/WEB-INF/vistas/productos.jsp";
    private static final String VISTA_FORMULARIO = "/WEB-INF/vistas/formulario.jsp";
    private static final String VISTA_ERROR = "/WEB-INF/vistas/error.jsp";

    private final ProductoDAO productoDAO = new ProductoDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String accion = request.getParameter("accion");
        if (accion == null) {
            accion = "listar";
        }
        try {
            switch (accion) {
                case "nuevo":
                    request.getRequestDispatcher(VISTA_FORMULARIO).forward(request, response);
                    break;
                case "editar":
                    mostrarFormularioEdicion(request, response);
                    break;
                default:
                    listarProductos(request, response);
            }
        } catch (SQLException e) {
            mostrarError(request, response, e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String accion = request.getParameter("accion");
        HttpSession sesion = request.getSession();
        try {
            if ("guardar".equals(accion)) {
                guardarProducto(request, sesion);
            } else if ("eliminar".equals(accion)) {
                eliminarProducto(request, sesion);
            }
        } catch (NumberFormatException e) {
            sesion.setAttribute("mensaje", "Los datos numéricos no son válidos.");
        } catch (SQLIntegrityConstraintViolationException e) {
            sesion.setAttribute("mensaje", "No se pudo completar: el proveedor o la categoría "
                    + "no existen, o el producto está relacionado con otros registros.");
        } catch (SQLException e) {
            mostrarError(request, response, e);
            return;
        }
        response.sendRedirect(request.getContextPath() + "/productos");
    }

    private void listarProductos(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, ServletException, IOException {
        String busqueda = request.getParameter("buscar");
        List<Producto> productos;
        if (busqueda == null || busqueda.trim().isEmpty()) {
            productos = productoDAO.listar();
        } else {
            productos = productoDAO.buscarPorNombre(busqueda.trim());
        }
        request.setAttribute("productos", productos);
        request.setAttribute("busqueda", busqueda == null ? "" : busqueda.trim());
        request.getRequestDispatcher(VISTA_LISTA).forward(request, response);
    }

    private void mostrarFormularioEdicion(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, ServletException, IOException {
        Producto producto = null;
        try {
            producto = productoDAO.buscarPorId(Integer.parseInt(request.getParameter("id")));
        } catch (NumberFormatException e) {
            // id inválido: se trata como producto inexistente
        }
        if (producto == null) {
            request.getSession().setAttribute("mensaje", "El producto no existe.");
            response.sendRedirect(request.getContextPath() + "/productos");
            return;
        }
        request.setAttribute("producto", producto);
        request.getRequestDispatcher(VISTA_FORMULARIO).forward(request, response);
    }

    private void guardarProducto(HttpServletRequest request, HttpSession sesion) throws SQLException {
        String nombre = request.getParameter("nombre").trim();
        if (nombre.isEmpty()) {
            sesion.setAttribute("mensaje", "El nombre es obligatorio.");
            return;
        }
        String descripcion = request.getParameter("descripcion").trim();
        Producto producto = new Producto(
                Integer.parseInt(request.getParameter("idProveedor")),
                Integer.parseInt(request.getParameter("idCategoria")),
                nombre,
                descripcion.isEmpty() ? null : descripcion,
                Double.parseDouble(request.getParameter("precio")),
                request.getParameter("estado"));

        int idProducto = Integer.parseInt(request.getParameter("idProducto"));
        if (idProducto > 0) {
            producto.setIdProducto(idProducto);
            productoDAO.actualizar(producto);
            sesion.setAttribute("mensaje", "Producto actualizado correctamente.");
        } else {
            productoDAO.insertar(producto);
            sesion.setAttribute("mensaje", "Producto registrado correctamente.");
        }
    }

    private void eliminarProducto(HttpServletRequest request, HttpSession sesion) throws SQLException {
        int idProducto = Integer.parseInt(request.getParameter("id"));
        boolean eliminado = productoDAO.eliminar(idProducto);
        sesion.setAttribute("mensaje",
                eliminado ? "Producto eliminado correctamente." : "El producto no existe.");
    }

    private void mostrarError(HttpServletRequest request, HttpServletResponse response, SQLException e)
            throws ServletException, IOException {
        request.setAttribute("error", e.getMessage());
        request.getRequestDispatcher(VISTA_ERROR).forward(request, response);
    }
}
