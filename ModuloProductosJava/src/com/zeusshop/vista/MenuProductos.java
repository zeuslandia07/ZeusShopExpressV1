package com.zeusshop.vista;

import com.zeusshop.dao.ProductoDAO;
import com.zeusshop.modelo.Producto;

import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Scanner;

/**
 * Menú de consola del módulo Gestión de Productos - ZeusShop Express.
 */
public class MenuProductos {

    private static final Scanner teclado = new Scanner(System.in);
    private static final ProductoDAO productoDAO = new ProductoDAO();

    public static void main(String[] args) {
        int opcion;
        do {
            mostrarMenu();
            opcion = leerEntero("Seleccione una opción: ");
            try {
                switch (opcion) {
                    case 1: registrarProducto(); break;
                    case 2: listarProductos(); break;
                    case 3: consultarProducto(); break;
                    case 4: actualizarProducto(); break;
                    case 5: eliminarProducto(); break;
                    case 0: System.out.println("Hasta pronto."); break;
                    default: System.out.println("Opción no válida.");
                }
            } catch (SQLIntegrityConstraintViolationException e) {
                System.out.println("No se pudo completar: el proveedor o la categoría no existen, "
                        + "o el producto está relacionado con otros registros (inventario, pedidos).");
            } catch (SQLException e) {
                System.out.println("Error de base de datos: " + e.getMessage());
            }
        } while (opcion != 0);
    }

    private static void mostrarMenu() {
        System.out.println("\n=== ZeusShop Express - Gestión de Productos ===");
        System.out.println("1. Registrar producto");
        System.out.println("2. Listar productos");
        System.out.println("3. Consultar producto por ID");
        System.out.println("4. Actualizar producto");
        System.out.println("5. Eliminar producto");
        System.out.println("0. Salir");
    }

    private static void registrarProducto() throws SQLException {
        System.out.println("\n--- Nuevo producto ---");
        Producto producto = leerDatosProducto();
        int id = productoDAO.insertar(producto);
        System.out.println(id > 0
                ? "Producto registrado con ID " + id
                : "No se pudo registrar el producto.");
    }

    private static void listarProductos() throws SQLException {
        List<Producto> productos = productoDAO.listar();
        if (productos.isEmpty()) {
            System.out.println("No hay productos registrados.");
            return;
        }
        System.out.printf("%-4s %-30s %13s %-10s %s%n",
                "ID", "NOMBRE", "PRECIO", "ESTADO", "PROVEEDOR / CATEGORIA / DESCRIPCION");
        for (Producto producto : productos) {
            System.out.println(producto);
        }
    }

    private static void consultarProducto() throws SQLException {
        int id = leerEntero("ID del producto: ");
        Producto producto = productoDAO.buscarPorId(id);
        System.out.println(producto != null ? producto : "No existe un producto con ese ID.");
    }

    private static void actualizarProducto() throws SQLException {
        int id = leerEntero("ID del producto a actualizar: ");
        if (productoDAO.buscarPorId(id) == null) {
            System.out.println("No existe un producto con ese ID.");
            return;
        }
        System.out.println("Ingrese los nuevos datos:");
        Producto producto = leerDatosProducto();
        producto.setIdProducto(id);
        System.out.println(productoDAO.actualizar(producto)
                ? "Producto actualizado."
                : "No se pudo actualizar el producto.");
    }

    private static void eliminarProducto() throws SQLException {
        int id = leerEntero("ID del producto a eliminar: ");
        System.out.println(productoDAO.eliminar(id)
                ? "Producto eliminado."
                : "No existe un producto con ese ID.");
    }

    private static Producto leerDatosProducto() {
        int idProveedor = leerEntero("ID del proveedor (debe existir): ");
        int idCategoria = leerEntero("ID de la categoría (debe existir): ");
        String nombre = leerTexto("Nombre: ");
        String descripcion = leerTexto("Descripción (opcional): ");
        double precio = leerDecimal("Precio: ");
        String estado = leerTexto("Estado (ej. Activo): ");
        return new Producto(idProveedor, idCategoria, nombre,
                descripcion.isEmpty() ? null : descripcion, precio, estado);
    }

    private static String leerTexto(String mensaje) {
        System.out.print(mensaje);
        return teclado.nextLine().trim();
    }

    private static int leerEntero(String mensaje) {
        while (true) {
            try {
                return Integer.parseInt(leerTexto(mensaje));
            } catch (NumberFormatException e) {
                System.out.println("Ingrese un número entero válido.");
            }
        }
    }

    private static double leerDecimal(String mensaje) {
        while (true) {
            try {
                return Double.parseDouble(leerTexto(mensaje));
            } catch (NumberFormatException e) {
                System.out.println("Ingrese un número válido.");
            }
        }
    }
}
