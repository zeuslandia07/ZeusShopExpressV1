-- REFERENCIA: estructura de la tabla `producto` que YA existe en la base zeusshop_express.
-- No es necesario ejecutarla; sirve para documentar el módulo.
-- idProveedor e idCategoria apuntan a las tablas proveedor y categoria.
--
-- idProducto     int(11)       PK, auto_increment
-- idProveedor    int(11)       NOT NULL
-- idCategoria    int(11)       NOT NULL
-- nombre         varchar(150)  NOT NULL
-- descripcion    varchar(255)  NULL
-- precio         decimal(12,2) NOT NULL
-- estado         varchar(20)   NOT NULL
-- fechaRegistro  datetime      NOT NULL DEFAULT current_timestamp()

USE zeusshop_express;
DESCRIBE producto;
