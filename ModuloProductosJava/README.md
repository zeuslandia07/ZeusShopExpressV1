# ZeusShop Express - Módulo Gestión de Productos (RF-003)

Evidencia GA7-220501096-AA2-EV01. CRUD en Java 17 con JDBC sobre MariaDB.
Trabaja sobre la tabla `producto` de la base de datos `zeusshop_express`.

## Estructura
- `com.zeusshop.conexion.ConexionBD`: conexión JDBC a MariaDB
- `com.zeusshop.modelo.Producto`: clase del modelo (tabla producto)
- `com.zeusshop.dao.ProductoDAO`: insertar, listar, buscarPorId, actualizar, eliminar
- `com.zeusshop.vista.MenuProductos`: menú de consola (clase principal)
- `sql/estructura_tabla_producto.sql`: documentación de la tabla utilizada

## Cómo ejecutarlo (Visual Studio Code)
1. Verifica que MariaDB esté activo y que exista la base `zeusshop_express` con la tabla `producto`.
2. Instala la extensión "Extension Pack for Java" y abre esta carpeta en VS Code.
3. Copia el `mariadb-java-client-X.X.X.jar` en `lib/`.
4. Ajusta usuario y clave en `ConexionBD.java`.
5. Ejecuta `MenuProductos` (botón Run sobre el método `main`).

Nota: al registrar un producto, `idProveedor` e `idCategoria` deben existir en las tablas proveedor y categoria.

## Versionamiento
Repositorio en Git y GitHub (ver `ENLACE_REPOSITORIO.txt`).

## Estándares
Clases en PascalCase, métodos y variables en camelCase, paquetes en minúscula, constantes en MAYÚSCULAS.
