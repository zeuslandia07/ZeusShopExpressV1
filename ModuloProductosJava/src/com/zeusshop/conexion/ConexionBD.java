package com.zeusshop.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Administra la conexión JDBC con la base de datos MariaDB de ZeusShop Express.
 */
public class ConexionBD {

    private static final String URL =
            "jdbc:mariadb://localhost:3306/zeusshop_express";
    private static final String USUARIO = "root";
    private static final String CLAVE = "";

    private ConexionBD() {
    }

    public static Connection obtenerConexion() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, CLAVE);
    }
}
