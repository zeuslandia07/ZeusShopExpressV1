package com.zeusshop.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio de acceso a datos de la tabla "usuario".
 * Spring Data genera las consultas a partir del nombre de cada metodo.
 */
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    // Busca un usuario por su correo (usado en el inicio de sesion)
    Optional<Usuario> findByCorreo(String correo);

    // Indica si ya existe un usuario con ese correo (usado en el registro)
    boolean existsByCorreo(String correo);
}
