<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
         import="java.util.List, com.zeusshop.modelo.Producto" %>
<%@ include file="includes/encabezado.jspf" %>
<%
    List<Producto> productos = (List<Producto>) request.getAttribute("productos");
    String busqueda = (String) request.getAttribute("busqueda");
    String mensaje = (String) session.getAttribute("mensaje");
    session.removeAttribute("mensaje");
%>
<div class="titulo-fila">
    <h1>Gestión de Productos</h1>
    <a class="boton" href="<%= request.getContextPath() %>/productos?accion=nuevo">+ Nuevo producto</a>
</div>

<% if (mensaje != null) { %>
    <p class="aviso"><%= esc(mensaje) %></p>
<% } %>

<%-- Formulario de búsqueda: envía los datos con el método GET --%>
<form class="busqueda" action="<%= request.getContextPath() %>/productos" method="get">
    <input type="text" name="buscar" placeholder="Buscar por nombre" value="<%= esc(busqueda) %>">
    <button type="submit">Buscar</button>
    <a href="<%= request.getContextPath() %>/productos">Limpiar</a>
</form>

<div class="tabla-scroll">
<table>
    <thead>
        <tr>
            <th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th>
            <th>Estado</th><th>Proveedor / Categoría</th><th>Acciones</th>
        </tr>
    </thead>
    <tbody>
    <% if (productos == null || productos.isEmpty()) { %>
        <tr><td colspan="7">No hay productos para mostrar.</td></tr>
    <% } else {
           for (Producto p : productos) { %>
        <tr>
            <td><%= p.getIdProducto() %></td>
            <td><%= esc(p.getNombre()) %></td>
            <td><%= esc(p.getDescripcion()) %></td>
            <td>$ <%= String.format("%,.2f", p.getPrecio()) %></td>
            <td><%= esc(p.getEstado()) %></td>
            <td><%= p.getIdProveedor() %> / <%= p.getIdCategoria() %></td>
            <td class="acciones">
                <a href="<%= request.getContextPath() %>/productos?accion=editar&id=<%= p.getIdProducto() %>">Editar</a>
                <%-- Eliminar se envía con el método POST --%>
                <form action="<%= request.getContextPath() %>/productos" method="post"
                      onsubmit="return confirm('¿Eliminar este producto?');">
                    <input type="hidden" name="accion" value="eliminar">
                    <input type="hidden" name="id" value="<%= p.getIdProducto() %>">
                    <button type="submit" class="peligro">Eliminar</button>
                </form>
            </td>
        </tr>
    <%     }
       } %>
    </tbody>
</table>
</div>
<p class="total">Total mostrado: <%= productos == null ? 0 : productos.size() %> producto(s)</p>
<%@ include file="includes/pie.jspf" %>
