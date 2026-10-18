package com.zeusshop.auth;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

/**
 * Servicio web REST de registro e inicio de sesion.
 *
 * POST /api/auth/registro -> crea un usuario nuevo
 * POST /api/auth/login    -> valida correo y contrasena
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /** Registro: 201 si se crea, 409 si el correo ya existe, 400 si los datos son invalidos. */
    @PostMapping("/registro")
    public ResponseEntity<RespuestaAuth> registro(@Valid @RequestBody RegistroRequest datos) {
        if (authService.registrar(datos)) {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new RespuestaAuth(true, "Registro exitoso"));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new RespuestaAuth(false, "El correo ya esta registrado"));
    }

    /** Login: 200 con autenticacion satisfactoria, 401 si las credenciales son incorrectas. */
    @PostMapping("/login")
    public ResponseEntity<RespuestaAuth> login(@Valid @RequestBody LoginRequest datos) {
        if (authService.autenticar(datos.correo(), datos.contrasena())) {
            return ResponseEntity.ok(new RespuestaAuth(true, "Autenticacion satisfactoria"));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new RespuestaAuth(false, "Error en la autenticacion"));
    }

    /** Devuelve 400 con el detalle de los campos que no cumplen las validaciones. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RespuestaAuth> manejarValidacion(MethodArgumentNotValidException ex) {
        String mensaje = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return ResponseEntity.badRequest().body(new RespuestaAuth(false, mensaje));
    }
}
