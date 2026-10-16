package com.zeusshop.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Administra la conexión JDBC con la base de datos MariaDB de ZeusShop Express.
 */
public class ConexionBD {

    private static final String URL = "jdbc:mariadb://localhost:3306/zeusshop_express";
    private static final String USUARIO = "zeusshop";
    private static final String CLAVE = "Zeus2026";

    private ConexionBD() {
    }

    public static Connection obtenerConexion() throws SQLException {
        try {
            // En un servidor web el driver se carga de forma explícita
            Class.forName("org.mariadb.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("No se encontró el driver de MariaDB en WEB-INF/lib", e);
        }
        return DriverManager.getConnection(URL, USUARIO, CLAVE);
    }
}
