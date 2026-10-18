package com.zeusshop.auth;

import jakarta.validation.constraints.NotBlank;

/**
 * Datos que recibe el servicio POST /api/auth/login (cuerpo JSON).
 */
public record LoginRequest(
        @NotBlank(message = "El correo es obligatorio")
        String correo,

        @NotBlank(message = "La contrasena es obligatoria")
        String contrasena
) { }
