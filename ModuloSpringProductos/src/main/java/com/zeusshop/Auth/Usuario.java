package com.zeusshop.auth;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

/**
 * Entidad que representa la tabla "usuario" de la base zeusshop_express.
 * Los nombres de los atributos coinciden con las columnas de la tabla.
 */
@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;

    @Column(nullable = false, length = 100)
    private String nombre;

    // El correo es el "usuario" con el que se inicia sesion (columna UNIQUE)
    @Column(nullable = false, unique = true, length = 150)
    private String correo;

    // Aqui se guarda la contrasena cifrada con BCrypt, nunca en texto plano
    @Column(nullable = false, length = 255)
    private String contrasenaHash;

    @Column(nullable = false, length = 50)
    private String rol;

    @Column(nullable = false, length = 20)
    private String estado;

    // La llena la base de datos con current_timestamp(), por eso no se inserta
    @Column(insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    public Integer getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Integer idUsuario) { this.idUsuario = idUsuario; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getContrasenaHash() { return contrasenaHash; }
    public void setContrasenaHash(String contrasenaHash) { this.contrasenaHash = contrasenaHash; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
}
