package com.zeusshop.dao;

import com.zeusshop.conexion.ConexionBD;
import com.zeusshop.modelo.Producto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/**
 * Acceso a datos de la tabla producto (CRUD con JDBC).
 */
public class ProductoDAO {

    private static final String SQL_INSERTAR =
            "INSERT INTO producto (idProveedor, idCategoria, nombre, descripcion, precio, estado) "
            + "VALUES (?,?,?,?,?,?)";
    private static final String SQL_LISTAR =
            "SELECT * FROM producto ORDER BY idProducto";
    private static final String SQL_BUSCAR_POR_ID =
            "SELECT * FROM producto WHERE idProducto = ?";
    private static final String SQL_BUSCAR_POR_NOMBRE =
            "SELECT * FROM producto WHERE nombre LIKE ? ORDER BY idProducto";
    private static final String SQL_ACTUALIZAR =
            "UPDATE producto SET idProveedor=?, idCategoria=?, nombre=?, descripcion=?, "
            + "precio=?, estado=? WHERE idProducto=?";
    private static final String SQL_ELIMINAR =
            "DELETE FROM producto WHERE idProducto = ?";

    /** Inserta un producto y devuelve el id generado (0 si no se insertó). */
    public int insertar(Producto producto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia =
                     conexion.prepareStatement(SQL_INSERTAR, Statement.RETURN_GENERATED_KEYS)) {
            asignarParametros(sentencia, producto);
            if (sentencia.executeUpdate() > 0) {
                try (ResultSet claves = sentencia.getGeneratedKeys()) {
                    if (claves.next()) {
                        return claves.getInt(1);
                    }
                }
            }
            return 0;
        }
    }

    /** Consulta todos los productos. */
    public List<Producto> listar() throws SQLException {
        List<Producto> productos = new ArrayList<>();
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_LISTAR);
             ResultSet resultado = sentencia.executeQuery()) {
            while (resultado.next()) {
                productos.add(convertirFila(resultado));
            }
        }
        return productos;
    }

    /** Consulta un producto por su id; devuelve null si no existe. */
    public Producto buscarPorId(int idProducto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_BUSCAR_POR_ID)) {
            sentencia.setInt(1, idProducto);
            try (ResultSet resultado = sentencia.executeQuery()) {
                return resultado.next() ? convertirFila(resultado) : null;
            }
        }
    }

    /** Consulta los productos cuyo nombre contiene el texto indicado. */
    public List<Producto> buscarPorNombre(String texto) throws SQLException {
        List<Producto> productos = new ArrayList<>();
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_BUSCAR_POR_NOMBRE)) {
            sentencia.setString(1, "%" + texto + "%");
            try (ResultSet resultado = sentencia.executeQuery()) {
                while (resultado.next()) {
                    productos.add(convertirFila(resultado));
                }
            }
        }
        return productos;
    }

    /** Actualiza un producto existente. */
    public boolean actualizar(Producto producto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ACTUALIZAR)) {
            asignarParametros(sentencia, producto);
            sentencia.setInt(7, producto.getIdProducto());
            return sentencia.executeUpdate() > 0;
        }
    }

    /** Elimina un producto por su id. */
    public boolean eliminar(int idProducto) throws SQLException {
        try (Connection conexion = ConexionBD.obtenerConexion();
             PreparedStatement sentencia = conexion.prepareStatement(SQL_ELIMINAR)) {
            sentencia.setInt(1, idProducto);
            return sentencia.executeUpdate() > 0;
        }
    }

    private void asignarParametros(PreparedStatement sentencia, Producto producto)
            throws SQLException {
        sentencia.setInt(1, producto.getIdProveedor());
        sentencia.setInt(2, producto.getIdCategoria());
        sentencia.setString(3, producto.getNombre());
        sentencia.setString(4, producto.getDescripcion());
        sentencia.setDouble(5, producto.getPrecio());
        sentencia.setString(6, producto.getEstado());
    }

    private Producto convertirFila(ResultSet resultado) throws SQLException {
        Producto producto = new Producto();
        producto.setIdProducto(resultado.getInt("idProducto"));
        producto.setIdProveedor(resultado.getInt("idProveedor"));
        producto.setIdCategoria(resultado.getInt("idCategoria"));
        producto.setNombre(resultado.getString("nombre"));
        producto.setDescripcion(resultado.getString("descripcion"));
        producto.setPrecio(resultado.getDouble("precio"));
        producto.setEstado(resultado.getString("estado"));
        Timestamp fecha = resultado.getTimestamp("fechaRegistro");
        if (fecha != null) {
            producto.setFechaRegistro(fecha.toLocalDateTime());
        }
        return producto;
    }
}
