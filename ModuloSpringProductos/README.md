# ZeusShop Express - Módulo de Productos con Spring Boot

Evidencia GA7-220501096-AA3-EV01. CRUD web de productos aplicando el framework **Spring Boot**
(Spring MVC, Spring Data JPA, Thymeleaf y Bootstrap) sobre la tabla `producto` de la base `zeusshop_express` (MariaDB).

## Arquitectura (MVC por capas)
- `modelo/Producto`: entidad JPA con validaciones
- `repositorio/ProductoRepositorio`: acceso a datos con Spring Data JPA
- `servicio/ProductoServicio`: lógica de negocio
- `controlador/ProductoControlador`: rutas web (GET y POST)
- `resources/templates`: vistas Thymeleaf (lista, formulario y fragmentos reutilizables)

## Cómo ejecutarlo
1. Requisitos: JDK 17, Apache Maven 3.9 y MariaDB con la base `zeusshop_express`.
2. Usuario de la base (se crea una sola vez en HeidiSQL):
   `CREATE USER 'zeusshop'@'localhost' IDENTIFIED BY 'Zeus2026'; GRANT ALL PRIVILEGES ON zeusshop_express.* TO 'zeusshop'@'localhost';`
3. En la terminal, dentro de esta carpeta: `mvn spring-boot:run`
4. Abrir http://localhost:8081/

## Estándares
Clases en PascalCase, métodos y variables en camelCase, paquetes en minúscula, constantes en MAYÚSCULAS, comentarios Javadoc en cada clase y método.
