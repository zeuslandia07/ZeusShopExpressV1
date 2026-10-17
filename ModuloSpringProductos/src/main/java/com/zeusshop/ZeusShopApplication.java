package com.zeusshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de ZeusShop Express (módulo Productos).
 * Arranca Spring Boot, que levanta el servidor web y configura todo el módulo.
 */
@SpringBootApplication
public class ZeusShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZeusShopApplication.class, args);
    }
}
