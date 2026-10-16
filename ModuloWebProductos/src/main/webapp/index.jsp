<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    // Página de inicio: redirige al servlet de productos
    response.sendRedirect(request.getContextPath() + "/productos");
%>
