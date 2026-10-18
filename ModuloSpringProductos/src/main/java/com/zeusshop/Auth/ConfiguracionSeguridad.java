package com.zeusshop.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuracion del cifrado de contrasenas.
 * Solo se usa la libreria de cifrado (spring-security-crypto), por eso
 * no se bloquean los demas endpoints del proyecto.
 */
@Configuration
public class ConfiguracionSeguridad {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
