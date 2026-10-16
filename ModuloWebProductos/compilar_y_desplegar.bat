@echo off
rem Uso: compilar_y_desplegar.bat "C:\ruta\apache-tomcat-10.1.x"
cd /d "%~dp0"
if "%~1"=="" (
    echo Debe indicar la carpeta de Tomcat. Ejemplo:
    echo compilar_y_desplegar.bat "C:\apache-tomcat-10.1.30"
    exit /b 1
)
set TOMCAT=%~1
set APP=zeusshop
set OUT=build\%APP%

if exist build rmdir /s /q build
mkdir %OUT%\WEB-INF\classes
xcopy /E /I /Y src\main\webapp %OUT% >nul

javac -encoding UTF-8 -cp "%TOMCAT%\lib\servlet-api.jar;src\main\webapp\WEB-INF\lib\*" -d %OUT%\WEB-INF\classes src\main\java\com\zeusshop\conexion\ConexionBD.java src\main\java\com\zeusshop\modelo\Producto.java src\main\java\com\zeusshop\dao\ProductoDAO.java src\main\java\com\zeusshop\controlador\ProductoServlet.java
if errorlevel 1 (
    echo Error de compilacion. Revise los mensajes de arriba.
    exit /b 1
)

if exist "%TOMCAT%\webapps\%APP%" rmdir /s /q "%TOMCAT%\webapps\%APP%"
xcopy /E /I /Y %OUT% "%TOMCAT%\webapps\%APP%" >nul
echo.
echo Listo. Inicie Tomcat y abra: http://localhost:8080/%APP%/
