package com.zeusshop.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Datos que recibe el servicio POST /api/auth/registro (cuerpo JSON).
 */
public record RegistroRequest(
        @NotBlank(message = "El nombre es obligatorio")
        @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
        String nombre,

        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "El correo no tiene un formato valido")
        @Size(max = 150, message = "El correo no puede superar 150 caracteres")
        String correo,

        @NotBlank(message = "La contrasena es obligatoria")
        @Size(min = 6, max = 72, message = "La contrasena debe tener entre 6 y 72 caracteres")
        String contrasena
) { }
