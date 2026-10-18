package com.zeusshop.auth;

/**
 * Respuesta JSON de los servicios de autenticacion.
 *
 * @param exito   true si la operacion fue correcta
 * @param mensaje texto que describe el resultado
 */
public record RespuestaAuth(boolean exito, String mensaje) { }
