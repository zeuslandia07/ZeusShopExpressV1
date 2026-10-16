<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="includes/encabezado.jspf" %>
<h1>Ocurrió un error</h1>
<p class="aviso">No se pudo completar la operación con la base de datos.</p>
<p>Detalle: <%= esc((String) request.getAttribute("error")) %></p>
<p><a class="boton" href="<%= request.getContextPath() %>/productos">Volver a productos</a></p>
<%@ include file="includes/pie.jspf" %>
