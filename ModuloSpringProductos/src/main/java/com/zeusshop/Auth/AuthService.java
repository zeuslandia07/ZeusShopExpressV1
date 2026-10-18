package com.zeusshop.auth;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Logica de negocio del registro y el inicio de sesion.
 */
@Service
public class AuthService {

    // Valores que se asignan a los usuarios nuevos (ajustar a los de tu base de datos)
    private static final String ROL_POR_DEFECTO = "CLIENTE";
    private static final String ESTADO_POR_DEFECTO = "ACTIVO";

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Registra un usuario nuevo.
     *
     * @return true si se registro; false si el correo ya existe
     */
    public boolean registrar(RegistroRequest datos) {
        String correo = datos.correo().trim().toLowerCase();

        if (usuarioRepository.existsByCorreo(correo)) {
            return false;
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(datos.nombre().trim());
        usuario.setCorreo(correo);
        // La contrasena se cifra antes de guardarse
        usuario.setContrasenaHash(passwordEncoder.encode(datos.contrasena()));
        usuario.setRol(ROL_POR_DEFECTO);
        usuario.setEstado(ESTADO_POR_DEFECTO);

        try {
            usuarioRepository.save(usuario);
            return true;
        } catch (DataIntegrityViolationException e) {
            // Otro registro con el mismo correo se guardo justo antes
            return false;
        }
    }

    /**
     * Verifica el correo y la contrasena.
     *
     * @return true si las credenciales son correctas
     */
    public boolean autenticar(String correo, String contrasena) {
        return usuarioRepository.findByCorreo(correo.trim().toLowerCase())
                .map(usuario -> passwordEncoder.matches(contrasena, usuario.getContrasenaHash()))
                .orElse(false);
    }
}
