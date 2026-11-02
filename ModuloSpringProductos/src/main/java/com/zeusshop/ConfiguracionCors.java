package com.zeusshop;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Permite que el front-end (HTML/JS) llame a los servicios /api/**
 * desde otro origen, por ejemplo abriendo index.html desde el disco.
 */
@Configuration
public class ConfiguracionCors implements WebMvcConfigurer {


    @Override
    public void addCorsMappings(CorsRegistry registro) {
        registro.addMapping("/api/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}