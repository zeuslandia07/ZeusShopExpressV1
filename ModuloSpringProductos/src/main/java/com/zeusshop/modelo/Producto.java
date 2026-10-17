package com.zeusshop.modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad que representa un producto del catálogo (RF-003).
 * Se mapea a la tabla "producto" que ya existe en la base zeusshop_express.
 */
@Entity
@Table(name = "producto")
public class Producto {

    /** Identificador autoincremental generado por la base de datos. */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducto")
    private Integer idProducto;

    /** Id del proveedor (debe existir en la tabla proveedor). */
    @NotNull(message = "El proveedor es obligatorio")
    @Min(value = 1, message = "El proveedor debe ser mayor a 0")
    @Column(name = "idProveedor", nullable = false)
    private Integer idProveedor;

    /** Id de la categoría (debe existir en la tabla categoria). */
    @NotNull(message = "La categoría es obligatoria")
    @Min(value = 1, message = "La categoría debe ser mayor a 0")
    @Column(name = "idCategoria", nullable = false)
    private Integer idCategoria;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 150, message = "El nombre admite máximo 150 caracteres")
    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Size(max = 255, message = "La descripción admite máximo 255 caracteres")
    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", message = "El precio no puede ser negativo")
    @Column(name = "precio", nullable = false, precision = 12, scale = 2)
    private BigDecimal precio;

    @NotBlank(message = "El estado es obligatorio")
    @Column(name = "estado", nullable = false, length = 20)
    private String estado;

    /** La asigna la base de datos (DEFAULT current_timestamp), por eso no se inserta ni se actualiza. */
    @Column(name = "fechaRegistro", insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    public Integer getIdProducto() { return idProducto; }
    public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }

    public Integer getIdProveedor() { return idProveedor; }
    public void setIdProveedor(Integer idProveedor) { this.idProveedor = idProveedor; }

    public Integer getIdCategoria() { return idCategoria; }
    public void setIdCategoria(Integer idCategoria) { this.idCategoria = idCategoria; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(LocalDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}
