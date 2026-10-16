<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
         import="com.zeusshop.modelo.Producto" %>
<%@ include file="includes/encabezado.jspf" %>
<%
    Producto producto = (Producto) request.getAttribute("producto");
    boolean editando = (producto != null);
    String estado = editando ? producto.getEstado() : "Activo";
%>
<h1><%= editando ? "Editar producto" : "Nuevo producto" %></h1>

<%-- Formulario HTML enviado con el método POST al servlet --%>
<form class="formulario" action="<%= request.getContextPath() %>/productos" method="post">
    <input type="hidden" name="accion" value="guardar">
    <input type="hidden" name="idProducto" value="<%= editando ? producto.getIdProducto() : 0 %>">

    <label>Nombre *
        <input type="text" name="nombre" maxlength="150" required
               value="<%= editando ? esc(producto.getNombre()) : "" %>">
    </label>

    <label>Descripción
        <textarea name="descripcion" maxlength="255" rows="3"><%= editando ? esc(producto.getDescripcion()) : "" %></textarea>
    </label>

    <div class="fila">
        <label>Precio *
            <input type="number" name="precio" min="0" step="0.01" required
                   value="<%= editando ? producto.getPrecio() : "" %>">
        </label>
        <label>Estado *
            <select name="estado">
                <option value="ACTIVO" <%= "ACTIVO".equalsIgnoreCase(estado) ? "selected" : "" %>>Activo</option>
                <option value="INACTIVO" <%= "INACTIVO".equalsIgnoreCase(estado) ? "selected" : "" %>>Inactivo</option>
            </select>
        </label>
    </div>

    <div class="fila">
        <label>ID del proveedor * (debe existir)
            <input type="number" name="idProveedor" min="1" required
                   value="<%= editando ? producto.getIdProveedor() : "" %>">
        </label>
        <label>ID de la categoría * (debe existir)
            <input type="number" name="idCategoria" min="1" required
                   value="<%= editando ? producto.getIdCategoria() : "" %>">
        </label>
    </div>

    <div class="botones">
        <button type="submit"><%= editando ? "Actualizar" : "Guardar" %></button>
        <a class="cancelar" href="<%= request.getContextPath() %>/productos">Cancelar</a>
    </div>
</form>
<%@ include file="includes/pie.jspf" %>
