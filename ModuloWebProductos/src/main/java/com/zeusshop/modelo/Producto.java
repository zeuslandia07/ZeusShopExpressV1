package com.zeusshop.modelo;

import java.time.LocalDateTime;

/**
 * Representa un producto del catálogo (RF-003). Corresponde a la tabla producto.
 */
public class Producto {

    private int idProducto;
    private int idProveedor;
    private int idCategoria;
    private String nombre;
    private String descripcion;
    private double precio;
    private String estado;
    private LocalDateTime fechaRegistro;

    public Producto() {
    }

    public Producto(int idProveedor, int idCategoria, String nombre,
                    String descripcion, double precio, String estado) {
        this.idProveedor = idProveedor;
        this.idCategoria = idCategoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.estado = estado;
    }

    public int getIdProducto() { return idProducto; }
    public void setIdProducto(int idProducto) { this.idProducto = idProducto; }

    public int getIdProveedor() { return idProveedor; }
    public void setIdProveedor(int idProveedor) { this.idProveedor = idProveedor; }

    public int getIdCategoria() { return idCategoria; }
    public void setIdCategoria(int idCategoria) { this.idCategoria = idCategoria; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public double getPrecio() { return precio; }
    public void setPrecio(double precio) { this.precio = precio; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }

    @Override
    public String toString() {
        return String.format("%-4d %-30s $%,12.2f %-10s Prov:%-3d Cat:%-3d %s",
                idProducto, nombre, precio, estado, idProveedor, idCategoria,
                descripcion == null ? "" : descripcion);
    }
}
