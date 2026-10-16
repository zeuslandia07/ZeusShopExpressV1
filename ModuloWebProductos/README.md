# ZeusShop Express - Módulo web de Productos (servlets y JSP)

Evidencia GA7-220501096-AA2-EV02. Aplicación web con Servlets, formularios HTML, métodos GET y POST y JSP,
sobre la tabla `producto` de la base `zeusshop_express` (MariaDB).

## Estructura
- `controlador/ProductoServlet`: servlet con `doGet` (listar, buscar, abrir formularios) y `doPost` (guardar, actualizar, eliminar)
- `modelo/Producto`, `dao/ProductoDAO`, `conexion/ConexionBD`: capa de datos con JDBC
- `webapp/WEB-INF/vistas/*.jsp`: vistas JSP (lista, formulario, error) con directivas, scriptlets, expresiones y declaraciones
- `webapp/WEB-INF/vistas/includes/*.jspf`: encabezado y pie reutilizables (include)
- `webapp/css/estilos.css`: estilos con la identidad visual del proyecto

## Cómo ejecutarlo
1. Copia `mariadb-java-client-X.X.X.jar` en `src/main/webapp/WEB-INF/lib/`.
2. Revisa usuario y clave en `ConexionBD.java`.
3. Ejecuta `compilar_y_desplegar.bat "C:\ruta\apache-tomcat-10.1.x"`.
4. Inicia Tomcat (`bin\startup.bat`) y abre http://localhost:8080/zeusshop/

Requisitos: JDK 17, Apache Tomcat 10.1 y MariaDB con la base `zeusshop_express`.
