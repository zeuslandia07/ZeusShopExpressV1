'use strict';


/**
 * productos-api.js
 * Conecta el módulo de Productos del front-end con la API REST.
 * Servicios: GET, POST, PUT y DELETE sobre /api/productos
 */


const API_PRODUCTOS = "http://localhost:8081/api/productos";


// La pantalla no tiene campo de proveedor: se usa este id (debe existir)
const ID_PROVEEDOR_POR_DEFECTO = 1;


// Categoría de la pantalla -> idCategoria de la base de datos
const CATEGORIAS_ID = {
    "Accesorios": 1,
    "Electrónica": 2,
    "Computación": 3,
    "Hogar": 4
};


// El stock no existe en la tabla producto, se guarda aparte en el navegador
const CLAVE_STOCK = "zeusshopStockProductos";




/* -------------------------
   FUNCIONES DE APOYO
------------------------- */


/** Devuelve el nombre de la categoría según su id. */
function nombreCategoria(id) {
    const nombres = Object.keys(CATEGORIAS_ID);
    return nombres.find(function (nombre) {
        return CATEGORIAS_ID[nombre] === id;
    }) || "Accesorios";
}


/** Lee el stock guardado: { idProducto: cantidad }. */
function leerStock() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_STOCK) || "{}");
    } catch (error) {
        return {};
    }
}


/** Convierte "ACTIVO" o "activo" en "Activo" (formato de la pantalla). */
function normalizarEstado(estado) {
    return String(estado).toLowerCase() === "activo" ? "Activo" : "Inactivo";
}


/** Convierte un producto de la API al formato que usa la pantalla. */
function convertirDesdeApi(producto, stock) {
    const categoria = nombreCategoria(producto.idCategoria);
    return {
        id: producto.idProducto,
        code: "P-" + String(producto.idProducto).padStart(3, "0"),
        name: producto.nombre,
        description: producto.descripcion || "",
        category: categoria,
        price: Number(producto.precio),
        stock: stock[producto.idProducto] || 0,
        status: normalizarEstado(producto.estado),
        icon: getProductIcon(categoria)
    };
}


/** Convierte un producto de la pantalla al formato que espera la API. */
function convertirHaciaApi(producto) {
    return {
        nombre: producto.name,
        descripcion: producto.description || null,
        precio: producto.price,
        estado: producto.status,
        idProveedor: ID_PROVEEDOR_POR_DEFECTO,
        idCategoria: CATEGORIAS_ID[producto.category] || 1
    };
}


/** Obtiene un texto legible del error devuelto por la API. */
function textoErrorApi(datos) {
    if (datos && datos.errores) {
        return Object.values(datos.errores).join(" | ");
    }
    return (datos && datos.mensaje) || "Ocurrió un error inesperado.";
}


/** Envía una petición a la API y devuelve { ok, datos }. */
async function llamarApi(ruta, metodo, cuerpo) {
    const opciones = { method: metodo, headers: {} };


    if (cuerpo) {
        opciones.headers["Content-Type"] = "application/json";
        opciones.body = JSON.stringify(cuerpo);
    }


    try {
        const respuesta = await fetch(API_PRODUCTOS + ruta, opciones);
        let datos = null;
        try {
            datos = await respuesta.json();
        } catch (error) {
            datos = null;
        }
        return { ok: respuesta.ok, datos: datos };
    } catch (error) {
        return { ok: false, datos: { mensaje: "No se pudo conectar con el servidor." } };
    }
}




/* -------------------------
   SINCRONIZACIÓN CON LA API
------------------------- */


/** Descarga los productos de la API y los deja listos para la pantalla. */
async function sincronizarProductosDesdeApi() {
    const resultado = await llamarApi("", "GET");


    if (!resultado.ok) {
        alert(textoErrorApi(resultado.datos));
        return false;
    }


    const stock = leerStock();
    const lista = resultado.datos.map(function (producto) {
        return convertirDesdeApi(producto, stock);
    });


    localStorage.setItem("zeusshopProductos", JSON.stringify(lista));
    return true;
}


/**
 * Compara la lista anterior con la nueva y envía a la API lo que cambió:
 * productos creados (POST), editados (PUT) y eliminados (DELETE).
 */
async function enviarCambiosProductosApi(anteriores, nuevos) {
    const stock = leerStock();
    const errores = [];
    const idsNuevos = nuevos.filter(function (p) { return p.id; })
                            .map(function (p) { return p.id; });
    const codigosAnteriores = anteriores.map(function (p) { return p.code; });


    // 1. Eliminados
    for (const anterior of anteriores) {
        if (anterior.id && !idsNuevos.includes(anterior.id)) {
            const r = await llamarApi("/" + anterior.id, "DELETE");
            if (!r.ok) {
                errores.push(textoErrorApi(r.datos));
            }
            delete stock[anterior.id];
        }
    }


    // 2. Creados y editados
    for (const item of nuevos) {


        if (!item.id) {
            // Solo se crea si es realmente nuevo (no un dato de ejemplo viejo)
            if (!codigosAnteriores.includes(item.code)) {
                const r = await llamarApi("", "POST", convertirHaciaApi(item));
                if (r.ok) {
                    stock[r.datos.idProducto] = item.stock;
                } else {
                    errores.push(textoErrorApi(r.datos));
                }
            }
            continue;
        }


        stock[item.id] = item.stock;


        const anterior = anteriores.find(function (p) { return p.id === item.id; });
        const huboCambio = !anterior ||
            JSON.stringify(convertirHaciaApi(anterior)) !==
            JSON.stringify(convertirHaciaApi(item));


        if (huboCambio) {
            const r = await llamarApi("/" + item.id, "PUT", convertirHaciaApi(item));
            if (!r.ok) {
                errores.push(textoErrorApi(r.datos));
            }
        }
    }


    localStorage.setItem(CLAVE_STOCK, JSON.stringify(stock));


    if (errores.length > 0) {
        alert(errores.join("\n"));
    }


    // Se vuelve a cargar la lista real de la base de datos y se pinta
    await sincronizarProductosDesdeApi();
    if (typeof filterProducts === "function") {
        filterProducts();
    }
}