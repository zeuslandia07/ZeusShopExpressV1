package com.zeusshop.auth;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


import java.util.Optional;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.password.PasswordEncoder;


/**
 * Pruebas unitarias de AuthService (registro e inicio de sesión).
 * El repositorio y el cifrador de contraseñas se simulan con Mockito.
 */
class AuthServiceTest {


    private UsuarioRepository repositorio;
    private PasswordEncoder cifrador;
    private AuthService servicio;


    @BeforeEach
    void preparar() {
        repositorio = mock(UsuarioRepository.class);
        cifrador = mock(PasswordEncoder.class);
        servicio = new AuthService(repositorio, cifrador);
    }


    @Test
    void registrarCorreoNuevoGuardaUsuarioConClaveCifrada() {
        when(repositorio.existsByCorreo("laura@zeusshop.com")).thenReturn(false);
        when(cifrador.encode("Clave2026*")).thenReturn("HASH");


        boolean resultado = servicio.registrar(
                new RegistroRequest("Laura Gómez", " Laura@ZeusShop.com ", "Clave2026*"));


        assertTrue(resultado);
        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
        verify(repositorio).save(captor.capture());
        Usuario guardado = captor.getValue();
        assertEquals("laura@zeusshop.com", guardado.getCorreo());
        assertEquals("HASH", guardado.getContrasenaHash());
        assertEquals("CLIENTE", guardado.getRol());
        assertEquals("ACTIVO", guardado.getEstado());
    }


    @Test
    void registrarCorreoExistenteDevuelveFalse() {
        when(repositorio.existsByCorreo("laura@zeusshop.com")).thenReturn(true);


        boolean resultado = servicio.registrar(
                new RegistroRequest("Laura Gómez", "laura@zeusshop.com", "Clave2026*"));


        assertFalse(resultado);
        verify(repositorio, never()).save(any());
    }


    @Test
    void autenticarConClaveCorrectaDevuelveTrue() {
        Usuario usuario = new Usuario();
        usuario.setContrasenaHash("HASH");
        when(repositorio.findByCorreo("laura@zeusshop.com")).thenReturn(Optional.of(usuario));
        when(cifrador.matches("Clave2026*", "HASH")).thenReturn(true);


        assertTrue(servicio.autenticar("LAURA@zeusshop.com", "Clave2026*"));
    }


    @Test
    void autenticarConClaveIncorrectaDevuelveFalse() {
        Usuario usuario = new Usuario();
        usuario.setContrasenaHash("HASH");
        when(repositorio.findByCorreo("laura@zeusshop.com")).thenReturn(Optional.of(usuario));
        when(cifrador.matches("otraClave", "HASH")).thenReturn(false);


        assertFalse(servicio.autenticar("laura@zeusshop.com", "otraClave"));
    }


    @Test
    void autenticarConCorreoInexistenteDevuelveFalse() {
        when(repositorio.findByCorreo("nadie@zeusshop.com")).thenReturn(Optional.empty());


        assertFalse(servicio.autenticar("nadie@zeusshop.com", "Clave2026*"));
    }
}