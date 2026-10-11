/* =====================================================
   ZEUSSHOP EXPRESS
   JAVASCRIPT - INICIO DE SESIÓN
   ===================================================== */


/* -------------------------
   FORMULARIO DE LOGIN
------------------------- */

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Evita que la página se recargue
        event.preventDefault();


        // Obtener valores del formulario
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();
        const rol = document.getElementById("rol").value;
        const recordar = document.getElementById("recordar").checked;


        // Limpiar mensaje anterior
        loginMessage.innerHTML = "";
        loginMessage.className = "mt-3";


        /* -------------------------
           VALIDACIÓN
        ------------------------- */

        if (correo === "" || password === "") {

            loginMessage.innerHTML =
                "Por favor, complete todos los campos.";

            loginMessage.classList.add("login-error");

            return;
        }


        // Validación básica del correo
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(correo)) {

            loginMessage.innerHTML =
                "Ingrese un correo electrónico válido.";

            loginMessage.classList.add("login-error");

            return;
        }


        /* -------------------------
           SIMULACIÓN DE INICIO
           DE SESIÓN
        ------------------------- */

        const usuario = {
            correo: correo,
            rol: rol
        };


        // Guardar usuario para la sesión actual
        sessionStorage.setItem(
            "zeusshopUsuario",
            JSON.stringify(usuario)
        );


        // Recordar usuario
        if (recordar) {

            localStorage.setItem(
                "zeusshopCorreo",
                correo
            );

        } else {

            localStorage.removeItem(
                "zeusshopCorreo"
            );
        }


        /* -------------------------
           MENSAJE DE ÉXITO
        ------------------------- */

        loginMessage.innerHTML =
            "Inicio de sesión exitoso. Cargando...";

        loginMessage.classList.add("login-success");


        /* -------------------------
           REDIRECCIÓN
        ------------------------- */

        setTimeout(function () {

            window.location.href =
                "pages/dashboard.html";

        }, 1000);

    });

}


/* =====================================================
   RECUPERACIÓN DE CONTRASEÑA
   ===================================================== */

const forgotPassword =
    document.getElementById("forgotPassword");


if (forgotPassword) {

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        alert(
            "La recuperación de contraseña estará disponible próximamente."
        );

    });

}


/* =====================================================
   CARGAR CORREO RECORDADO
   ===================================================== */

const savedEmail =
    localStorage.getItem("zeusshopCorreo");


if (savedEmail) {

    const correoInput =
        document.getElementById("correo");

    const recordarInput =
        document.getElementById("recordar");


    if (correoInput) {
        correoInput.value = savedEmail;
    }


    if (recordarInput) {
        recordarInput.checked = true;
    }

}
/* =====================================================
   ZEUSSHOP EXPRESS
   JAVASCRIPT - DASHBOARD
   ===================================================== */


/* -------------------------
   MENÚ LATERAL
------------------------- */

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");


if (sidebar && sidebarToggle) {

    sidebarToggle.addEventListener("click", function () {

        sidebar.classList.toggle("open");

    });

}


/* -------------------------
   CERRAR SIDEBAR AL
   SELECCIONAR UNA OPCIÓN
   EN CELULAR
------------------------- */

if (sidebar) {

    const menuItems =
        sidebar.querySelectorAll(".menu-item");

    menuItems.forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 992) {

                sidebar.classList.remove("open");

            }

        });

    });

}


/* -------------------------
   CERRAR SESIÓN
------------------------- */

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener("click", function (event) {

        event.preventDefault();


        const confirmar =
            confirm("¿Está seguro de que desea cerrar sesión?");


        if (confirmar) {

            // Eliminar sesión actual
            sessionStorage.removeItem(
                "zeusshopUsuario"
            );


            // Volver al login
            window.location.href =
                "../index.html";

        }

    });

}


/* -------------------------
   PROTECCIÓN DEL DASHBOARD
------------------------- */

if (
    window.location.pathname.includes("dashboard.html")
) {

    const usuario =
        sessionStorage.getItem("zeusshopUsuario");


    if (!usuario) {

        window.location.href =
            "../index.html";

    }

}
/* =====================================================
   ZEUSSHOP EXPRESS
   MÓDULO PRODUCTOS - FUNCIONALIDAD
   ===================================================== */

const productsTableBody =
    document.getElementById("productsTableBody");

const productSearch =
    document.getElementById("productSearch");

const categoryFilter =
    document.getElementById("categoryFilter");

const statusFilter =
    document.getElementById("statusFilter");

const clearFilters =
    document.getElementById("clearFilters");

const newProductButton =
    document.getElementById("newProductButton");

const productForm =
    document.getElementById("productForm");

const productCounter =
    document.getElementById("productCounter");

const refreshProducts =
    document.getElementById("refreshProducts");


/* =====================================================
   DATOS INICIALES
   ===================================================== */

const defaultProducts = [
    {
        code: "P-001",
        name: "Audífonos Bluetooth",
        description: "Audífonos inalámbricos",
        category: "Electrónica",
        price: 89900,
        stock: 35,
        status: "Activo",
        icon: "bi-headphones"
    },
    {
        code: "P-002",
        name: "Teclado mecánico",
        description: "Teclado gaming RGB",
        category: "Computación",
        price: 159900,
        stock: 5,
        status: "Activo",
        icon: "bi-keyboard"
    },
    {
        code: "P-003",
        name: "Mouse inalámbrico",
        description: "Mouse ergonómico",
        category: "Accesorios",
        price: 64900,
        stock: 7,
        status: "Activo",
        icon: "bi-mouse"
    },
    {
        code: "P-004",
        name: "Soporte para celular",
        description: "Soporte ajustable",
        category: "Accesorios",
        price: 39900,
        stock: 28,
        status: "Activo",
        icon: "bi-phone"
    },
    {
        code: "P-005",
        name: "Base para portátil",
        description: "Base refrigerante",
        category: "Computación",
        price: 119900,
        stock: 18,
        status: "Activo",
        icon: "bi-laptop"
    },
    {
        code: "P-006",
        name: "Parlante Bluetooth",
        description: "Parlante portátil",
        category: "Electrónica",
        price: 129900,
        stock: 14,
        status: "Activo",
        icon: "bi-speaker"
    },
    {
        code: "P-007",
        name: "Memoria USB 64GB",
        description: "Memoria USB 3.0",
        category: "Computación",
        price: 29900,
        stock: 42,
        status: "Activo",
        icon: "bi-usb-drive"
    },
    {
        code: "P-008",
        name: "Smartwatch",
        description: "Reloj inteligente",
        category: "Electrónica",
        price: 199900,
        stock: 3,
        status: "Activo",
        icon: "bi-watch"
    }
];


/* =====================================================
   CARGAR PRODUCTOS
   ===================================================== */

function getProducts() {

    const savedProducts =
        localStorage.getItem("zeusshopProductos");

    if (savedProducts) {

        return JSON.parse(savedProducts);

    }

    localStorage.setItem(
        "zeusshopProductos",
        JSON.stringify(defaultProducts)
    );

    return defaultProducts;
}


/* =====================================================
   GUARDAR PRODUCTOS
   ===================================================== */

function saveProducts(products) {

    localStorage.setItem(
        "zeusshopProductos",
        JSON.stringify(products)
    );

}


/* =====================================================
   FORMATEAR PRECIO
   ===================================================== */

function formatPrice(price) {

    return "$" + Number(price).toLocaleString("es-CO");

}


/* =====================================================
   ICONO SEGÚN CATEGORÍA
   ===================================================== */

function getProductIcon(category) {

    if (category === "Electrónica") {

        return "bi-headphones";

    }

    if (category === "Computación") {

        return "bi-laptop";

    }

    if (category === "Accesorios") {

        return "bi-phone";

    }

    return "bi-box-seam";

}


/* =====================================================
   STOCK
   ===================================================== */

function getStockClass(stock) {

    if (stock <= 3) {

        return "stock-danger-text";

    }

    if (stock <= 7) {

        return "stock-warning-text";

    }

    return "stock-normal";

}


/* =====================================================
   MOSTRAR PRODUCTOS
   ===================================================== */

function renderProducts(products) {

    if (!productsTableBody) {

        return;

    }


    productsTableBody.innerHTML = "";


    if (products.length === 0) {

        productsTableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="text-center py-5"
                >

                    <i
                        class="bi bi-search"
                        style="font-size: 25px;"
                    ></i>

                    <div class="mt-2">
                        No se encontraron productos.
                    </div>

                </td>

            </tr>

        `;

        updateProductCounter(0);

        return;

    }


    products.forEach(function(product) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${product.code}
            </td>


            <td>

                <div class="product-name-cell">

                    <div class="product-image">

                        <i class="bi ${
                            product.icon ||
                            getProductIcon(product.category)
                        }"></i>

                    </div>


                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <small>
                            ${product.description}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${product.category}
            </td>


            <td>
                ${formatPrice(product.price)}
            </td>


            <td>

                <span class="${getStockClass(product.stock)}">

                    ${product.stock}

                </span>

            </td>


            <td>

                <span class="status ${
                    product.status === "Activo"
                        ? "completed"
                        : "pending"
                }">

                    ${product.status}

                </span>

            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action edit"
                        title="Editar"
                        data-code="${product.code}"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        class="product-action delete"
                        title="Eliminar"
                        data-code="${product.code}"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>

        `;


        productsTableBody.appendChild(row);

    });


    updateProductCounter(products.length);

}


/* =====================================================
   CONTADOR
   ===================================================== */

function updateProductCounter(count) {

    if (!productCounter) {

        return;

    }


    productCounter.textContent =
        count === 1
            ? "1 producto encontrado"
            : `${count} productos encontrados`;

}


/* =====================================================
   FILTRAR PRODUCTOS
   ===================================================== */

function filterProducts() {

    const products =
        getProducts();


    const search =
        productSearch
            ? productSearch.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        categoryFilter
            ? categoryFilter.value
            : "todos";


    const status =
        statusFilter
            ? statusFilter.value
            : "todos";


    const filteredProducts =
        products.filter(function(product) {


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search) ||

                product.code
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "todos" ||
                product.category === category;


            const matchesStatus =
                status === "todos" ||
                product.status.toLowerCase() ===
                    status.toLowerCase();


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );

        });


    renderProducts(filteredProducts);

}


/* =====================================================
   BUSCADOR
   ===================================================== */

if (productSearch) {

    productSearch.addEventListener(
        "input",
        filterProducts
    );

}


/* =====================================================
   FILTRO CATEGORÍA
   ===================================================== */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


/* =====================================================
   FILTRO ESTADO
   ===================================================== */

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterProducts
    );

}


/* =====================================================
   LIMPIAR FILTROS
   ===================================================== */

if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        function() {

            if (productSearch) {

                productSearch.value = "";

            }


            if (categoryFilter) {

                categoryFilter.value = "todos";

            }


            if (statusFilter) {

                statusFilter.value = "todos";

            }


            filterProducts();

        }
    );

}


/* =====================================================
   ABRIR MODAL NUEVO PRODUCTO
   ===================================================== */

if (newProductButton) {

    newProductButton.addEventListener(
        "click",
        function() {

            if (!productForm) {

                return;

            }


            productForm.reset();


            productForm.dataset.mode =
                "create";


            productForm.dataset.editCode =
                "";


            const modalElement =
                document.getElementById(
                    "productModal"
                );


            if (modalElement) {

                const modal =
                    new bootstrap.Modal(
                        modalElement
                    );

                modal.show();

            }

        }
    );

}


/* =====================================================
   GUARDAR / CREAR PRODUCTO
   ===================================================== */

if (productForm) {

    productForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const code =
                document.getElementById(
                    "productCode"
                ).value.trim();


            const name =
                document.getElementById(
                    "productName"
                ).value.trim();


            const category =
                document.getElementById(
                    "productCategory"
                ).value;


            const price =
                Number(
                    document.getElementById(
                        "productPrice"
                    ).value
                );


            const stock =
                Number(
                    document.getElementById(
                        "productStock"
                    ).value
                );


            const status =
                document.getElementById(
                    "productStatus"
                ).value;


            if (
                !code ||
                !name ||
                !category ||
                price < 0 ||
                stock < 0
            ) {

                alert(
                    "Por favor complete correctamente todos los campos."
                );

                return;

            }


            let products =
                getProducts();


            const mode =
                productForm.dataset.mode;


            /* ================================
               CREAR
            ================================= */

            if (mode !== "edit") {


                const exists =
                    products.some(
                        function(product) {

                            return (
                                product.code
                                    .toLowerCase() ===
                                code.toLowerCase()
                            );

                        }
                    );


                if (exists) {

                    alert(
                        "Ya existe un producto con ese código."
                    );

                    return;

                }


                products.push({

                    code: code,

                    name: name,

                    description:
                        "Producto registrado",

                    category: category,

                    price: price,

                    stock: stock,

                    status: status,

                    icon:
                        getProductIcon(
                            category
                        )

                });


                alert(
                    "Producto creado correctamente."
                );

            }


            /* ================================
               EDITAR
            ================================= */

            else {


                const editCode =
                    productForm.dataset.editCode;


                const product =
                    products.find(
                        function(item) {

                            return (
                                item.code ===
                                editCode
                            );

                        }
                    );


                if (product) {

                    product.name = name;

                    product.category =
                        category;

                    product.price =
                        price;

                    product.stock =
                        stock;

                    product.status =
                        status;

                    product.icon =
                        getProductIcon(
                            category
                        );

                }


                alert(
                    "Producto actualizado correctamente."
                );

            }


            saveProducts(products);


            productForm.reset();


            productForm.dataset.mode =
                "create";


            productForm.dataset.editCode =
                "";


            const modalElement =
                document.getElementById(
                    "productModal"
                );


            if (modalElement) {

                const modal =
                    bootstrap.Modal
                        .getInstance(
                            modalElement
                        );

                if (modal) {

                    modal.hide();

                }

            }


            filterProducts();

        }
    );

}


/* =====================================================
   EDITAR / ELIMINAR
   ===================================================== */

if (productsTableBody) {

    productsTableBody.addEventListener(
        "click",
        function(event) {


            const editButton =
                event.target.closest(
                    ".product-action.edit"
                );


            const deleteButton =
                event.target.closest(
                    ".product-action.delete"
                );


            /* ================================
               EDITAR
            ================================= */

            if (editButton) {


                const code =
                    editButton.dataset.code;


                const products =
                    getProducts();


                const product =
                    products.find(
                        function(item) {

                            return (
                                item.code ===
                                code
                            );

                        }
                    );


                if (!product) {

                    return;

                }


                document.getElementById(
                    "productCode"
                ).value =
                    product.code;


                document.getElementById(
                    "productCode"
                ).readOnly = true;


                document.getElementById(
                    "productName"
                ).value =
                    product.name;


                document.getElementById(
                    "productCategory"
                ).value =
                    product.category;


                document.getElementById(
                    "productPrice"
                ).value =
                    product.price;


                document.getElementById(
                    "productStock"
                ).value =
                    product.stock;


                document.getElementById(
                    "productStatus"
                ).value =
                    product.status;


                productForm.dataset.mode =
                    "edit";


                productForm.dataset.editCode =
                    product.code;


                const modalElement =
                    document.getElementById(
                        "productModal"
                    );


                const modal =
                    new bootstrap.Modal(
                        modalElement
                    );


                modal.show();

            }


            /* ================================
               ELIMINAR
            ================================= */

            if (deleteButton) {


                const code =
                    deleteButton.dataset.code;


                const products =
                    getProducts();


                const product =
                    products.find(
                        function(item) {

                            return (
                                item.code ===
                                code
                            );

                        }
                    );


                if (!product) {

                    return;

                }


                const confirmDelete =
                    confirm(
                        `¿Está seguro de eliminar "${product.name}"?`
                    );


                if (!confirmDelete) {

                    return;

                }


                const updatedProducts =
                    products.filter(
                        function(item) {

                            return (
                                item.code !==
                                code
                            );

                        }
                    );


                saveProducts(
                    updatedProducts
                );


                alert(
                    "Producto eliminado correctamente."
                );


                filterProducts();

            }

        }
    );

}


/* =====================================================
   ACTUALIZAR PRODUCTOS
   ===================================================== */

if (refreshProducts) {

    refreshProducts.addEventListener(
        "click",
        function() {

            filterProducts();

        }
    );

}


/* =====================================================
   INICIALIZAR PRODUCTOS
   ===================================================== */

if (productsTableBody) {

    renderProducts(
        getProducts()
    );

}
/* =====================================================
   CLIENTES - FUNCIONALIDAD
   ===================================================== */

const clientsTableBody =
    document.getElementById("clientsTableBody");

const clientSearch =
    document.getElementById("clientSearch");

const clientTypeFilter =
    document.getElementById("clientTypeFilter");

const clientStatusFilter =
    document.getElementById("clientStatusFilter");

const clearClientFilters =
    document.getElementById("clearClientFilters");

const newClientButton =
    document.getElementById("newClientButton");

const clientForm =
    document.getElementById("clientForm");

const clientCounter =
    document.getElementById("clientCounter");

const refreshClients =
    document.getElementById("refreshClients");


const defaultClients = [
    {
        document: "1023456789",
        name: "Carlos Rodríguez",
        phone: "300 456 7890",
        email: "carlos@email.com",
        type: "Persona",
        status: "Activo",
        address: "Bogotá",
        orders: 12
    },
    {
        document: "9004561231",
        name: "Tecnología del Norte S.A.S.",
        phone: "601 555 2233",
        email: "compras@tecnorte.com",
        type: "Empresa",
        status: "Activo",
        address: "Bogotá",
        orders: 25
    },
    {
        document: "1011234567",
        name: "Laura Martínez",
        phone: "310 222 3344",
        email: "laura@email.com",
        type: "Persona",
        status: "Activo",
        address: "Medellín",
        orders: 8
    },
    {
        document: "9017894562",
        name: "Comercializadora Zeus S.A.S.",
        phone: "601 444 8899",
        email: "ventas@zeus.com",
        type: "Empresa",
        status: "Activo",
        address: "Bogotá",
        orders: 31
    },
    {
        document: "1098765432",
        name: "Andrés Gómez",
        phone: "315 555 6677",
        email: "andres@email.com",
        type: "Persona",
        status: "Activo",
        address: "Cali",
        orders: 5
    },
    {
        document: "9002223334",
        name: "Distribuciones Central S.A.S.",
        phone: "601 777 1122",
        email: "pedidos@discentral.com",
        type: "Empresa",
        status: "Activo",
        address: "Bogotá",
        orders: 18
    },
    {
        document: "1012345678",
        name: "Daniela Torres",
        phone: "320 333 4455",
        email: "daniela@email.com",
        type: "Persona",
        status: "Activo",
        address: "Bogotá",
        orders: 3
    },
    {
        document: "1034567890",
        name: "Miguel Sánchez",
        phone: "301 444 5566",
        email: "miguel@email.com",
        type: "Persona",
        status: "Inactivo",
        address: "Pereira",
        orders: 7
    }
];


function getClients() {

    const saved =
        localStorage.getItem("zeusshopClientes");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "zeusshopClientes",
        JSON.stringify(defaultClients)
    );

    return defaultClients;
}


function saveClients(clients) {

    localStorage.setItem(
        "zeusshopClientes",
        JSON.stringify(clients)
    );

}


function renderClients(clients) {

    if (!clientsTableBody) {
        return;
    }

    clientsTableBody.innerHTML = "";


    clients.forEach(client => {

        const row =
            document.createElement("tr");

        const icon =
            client.type === "Empresa"
                ? "bi-building"
                : "bi-person";


        row.innerHTML = `

            <td>${client.document}</td>

            <td>

                <div class="product-name-cell">

                    <div class="product-image">
                        <i class="bi ${icon}"></i>
                    </div>

                    <div>

                        <strong>
                            ${client.name}
                        </strong>

                        <small>
                            ${client.type === "Empresa"
                                ? "Cliente empresarial"
                                : "Cliente particular"}
                        </small>

                    </div>

                </div>

            </td>


            <td class="client-contact">

                <strong>
                    ${client.phone}
                </strong>

                <small>
                    ${client.email}
                </small>

            </td>


            <td>
                ${client.type}
            </td>


            <td>
                ${client.orders}
            </td>


            <td>

                <span class="status ${
                    client.status === "Activo"
                        ? "completed"
                        : "pending"
                }">

                    ${client.status}

                </span>

            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action edit client-edit"
                        data-document="${client.document}"
                        title="Editar"
                    >

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        class="product-action delete client-delete"
                        data-document="${client.document}"
                        title="Eliminar"
                    >

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>

        `;


        clientsTableBody.appendChild(row);

    });


    if (clientCounter) {

        clientCounter.textContent =
            `${clients.length} clientes encontrados`;

    }

}


function filterClients() {

    const clients =
        getClients();


    const search =
        clientSearch
            ? clientSearch.value.toLowerCase().trim()
            : "";


    const type =
        clientTypeFilter
            ? clientTypeFilter.value
            : "todos";


    const status =
        clientStatusFilter
            ? clientStatusFilter.value
            : "todos";


    const filtered =
        clients.filter(client => {

            const matchesSearch =
                client.name
                    .toLowerCase()
                    .includes(search) ||

                client.document
                    .toLowerCase()
                    .includes(search) ||

                client.email
                    .toLowerCase()
                    .includes(search);


            const matchesType =
                type === "todos" ||
                client.type === type;


            const matchesStatus =
                status === "todos" ||
                client.status === status;


            return (
                matchesSearch &&
                matchesType &&
                matchesStatus
            );

        });


    renderClients(filtered);

}


if (clientSearch) {

    clientSearch.addEventListener(
        "input",
        filterClients
    );

}


if (clientTypeFilter) {

    clientTypeFilter.addEventListener(
        "change",
        filterClients
    );

}


if (clientStatusFilter) {

    clientStatusFilter.addEventListener(
        "change",
        filterClients
    );

}


if (clearClientFilters) {

    clearClientFilters.addEventListener(
        "click",
        () => {

            clientSearch.value = "";

            clientTypeFilter.value = "todos";

            clientStatusFilter.value = "todos";

            filterClients();

        }
    );

}


/* =====================================================
   NUEVO CLIENTE
   ===================================================== */

if (newClientButton) {

    newClientButton.addEventListener(
        "click",
        () => {

            clientForm.reset();

            clientForm.dataset.mode = "create";

            clientForm.dataset.editDocument = "";

            document.getElementById(
                "clientDocument"
            ).readOnly = false;


            new bootstrap.Modal(
                document.getElementById(
                    "clientModal"
                )
            ).show();

        }
    );

}


/* =====================================================
   GUARDAR CLIENTE
   ===================================================== */

if (clientForm) {

    clientForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const documentValue =
                document.getElementById(
                    "clientDocument"
                ).value.trim();


            const name =
                document.getElementById(
                    "clientName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "clientPhone"
                ).value.trim();


            const email =
                document.getElementById(
                    "clientEmail"
                ).value.trim();


            const type =
                document.getElementById(
                    "clientType"
                ).value;


            const status =
                document.getElementById(
                    "clientStatus"
                ).value;


            const address =
                document.getElementById(
                    "clientAddress"
                ).value.trim();


            let clients =
                getClients();


            if (
                clientForm.dataset.mode !== "edit"
            ) {

                const exists =
                    clients.some(
                        client =>
                            client.document ===
                            documentValue
                    );


                if (exists) {

                    alert(
                        "Ya existe un cliente con ese documento."
                    );

                    return;

                }


                clients.push({

                    document: documentValue,

                    name,

                    phone,

                    email,

                    type,

                    status,

                    address,

                    orders: 0

                });


                alert(
                    "Cliente creado correctamente."
                );

            } else {

                const oldDocument =
                    clientForm.dataset.editDocument;


                const client =
                    clients.find(
                        item =>
                            item.document ===
                            oldDocument
                    );


                if (client) {

                    client.name = name;

                    client.phone = phone;

                    client.email = email;

                    client.type = type;

                    client.status = status;

                    client.address = address;

                }


                alert(
                    "Cliente actualizado correctamente."
                );

            }


            saveClients(clients);


            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "clientModal"
                    )
                );


            if (modal) {
                modal.hide();
            }


            filterClients();

        }
    );

}


/* =====================================================
   EDITAR / ELIMINAR CLIENTE
   ===================================================== */

if (clientsTableBody) {

    clientsTableBody.addEventListener(
        "click",
        event => {

            const edit =
                event.target.closest(
                    ".client-edit"
                );


            const remove =
                event.target.closest(
                    ".client-delete"
                );


            if (edit) {

                const documentValue =
                    edit.dataset.document;


                const client =
                    getClients().find(
                        item =>
                            item.document ===
                            documentValue
                    );


                if (!client) return;


                document.getElementById(
                    "clientDocument"
                ).value =
                    client.document;


                document.getElementById(
                    "clientDocument"
                ).readOnly = true;


                document.getElementById(
                    "clientName"
                ).value =
                    client.name;


                document.getElementById(
                    "clientPhone"
                ).value =
                    client.phone;


                document.getElementById(
                    "clientEmail"
                ).value =
                    client.email;


                document.getElementById(
                    "clientType"
                ).value =
                    client.type;


                document.getElementById(
                    "clientStatus"
                ).value =
                    client.status;


                document.getElementById(
                    "clientAddress"
                ).value =
                    client.address;


                clientForm.dataset.mode =
                    "edit";


                clientForm.dataset.editDocument =
                    client.document;


                new bootstrap.Modal(
                    document.getElementById(
                        "clientModal"
                    )
                ).show();

            }


            if (remove) {

                const documentValue =
                    remove.dataset.document;


                const clients =
                    getClients();


                const client =
                    clients.find(
                        item =>
                            item.document ===
                            documentValue
                    );


                if (!client) return;


                if (
                    !confirm(
                        `¿Deseas eliminar a ${client.name}?`
                    )
                ) {
                    return;
                }


                const updated =
                    clients.filter(
                        item =>
                            item.document !==
                            documentValue
                    );


                saveClients(updated);

                filterClients();

                alert(
                    "Cliente eliminado correctamente."
                );

            }

        }
    );

}


if (refreshClients) {

    refreshClients.addEventListener(
        "click",
        filterClients
    );

}


/* =====================================================
   INICIALIZAR
   ===================================================== */

if (clientsTableBody) {

    renderClients(
        getClients()
    );

}
/* =====================================================
   INVENTARIO - FUNCIONALIDAD
===================================================== */

const inventoryTableBody =
    document.getElementById("inventoryTableBody");

const inventorySearch =
    document.getElementById("inventorySearch");

const inventoryCategory =
    document.getElementById("inventoryCategory");

const inventoryStockFilter =
    document.getElementById("inventoryStockFilter");

const clearInventoryFilters =
    document.getElementById("clearInventoryFilters");

const inventoryRefresh =
    document.getElementById("inventoryRefresh");

const newMovementButton =
    document.getElementById("newMovementButton");

const movementForm =
    document.getElementById("movementForm");

const movementProduct =
    document.getElementById("movementProduct");

const movementType =
    document.getElementById("movementType");

const movementQuantity =
    document.getElementById("movementQuantity");

const movementReason =
    document.getElementById("movementReason");


/* =====================================================
   PRODUCTOS BASE
===================================================== */

const inventoryDefaultProducts = [

    {
        id: "P001",
        name: "Audífonos Bluetooth",
        category: "Electrónica",
        stock: 35,
        minimum: 10
    },

    {
        id: "P002",
        name: "Teclado Mecánico",
        category: "Computación",
        stock: 18,
        minimum: 8
    },

    {
        id: "P003",
        name: "Mouse Inalámbrico",
        category: "Accesorios",
        stock: 7,
        minimum: 10
    },

    {
        id: "P004",
        name: "Monitor LED 24 pulgadas",
        category: "Computación",
        stock: 12,
        minimum: 5
    },

    {
        id: "P005",
        name: "Cámara Web HD",
        category: "Electrónica",
        stock: 4,
        minimum: 8
    },

    {
        id: "P006",
        name: "Cable HDMI",
        category: "Accesorios",
        stock: 0,
        minimum: 10
    },

    {
        id: "P007",
        name: "Parlante Bluetooth",
        category: "Electrónica",
        stock: 22,
        minimum: 6
    },

    {
        id: "P008",
        name: "Base para Laptop",
        category: "Accesorios",
        stock: 15,
        minimum: 5
    }

];


/* =====================================================
   OBTENER INVENTARIO
===================================================== */

function getInventoryProducts() {

    const saved =
        localStorage.getItem(
            "zeusshopInventario"
        );

    if (saved) {

        return JSON.parse(saved);

    }

    localStorage.setItem(
        "zeusshopInventario",
        JSON.stringify(
            inventoryDefaultProducts
        )
    );

    return inventoryDefaultProducts;

}


/* =====================================================
   GUARDAR INVENTARIO
===================================================== */

function saveInventoryProducts(products) {

    localStorage.setItem(
        "zeusshopInventario",
        JSON.stringify(products)
    );

}


/* =====================================================
   ESTADO DEL STOCK
===================================================== */

function getInventoryStatus(product) {

    if (product.stock <= 0) {

        return "agotado";

    }

    if (product.stock <= product.minimum) {

        return "bajo";

    }

    return "normal";

}


/* =====================================================
   TEXTO DEL ESTADO
===================================================== */

function getInventoryStatusText(product) {

    const status =
        getInventoryStatus(product);


    if (status === "agotado") {

        return "Agotado";

    }

    if (status === "bajo") {

        return "Stock bajo";

    }

    return "Normal";

}


/* =====================================================
   RENDERIZAR PRODUCTOS
===================================================== */

function renderInventory(products) {

    if (!inventoryTableBody) {

        return;

    }


    inventoryTableBody.innerHTML = "";


    products.forEach(product => {

        const status =
            getInventoryStatus(product);


        let statusClass =
            "inventory-stock-normal";


        if (status === "bajo") {

            statusClass =
                "inventory-stock-low";

        }


        if (status === "agotado") {

            statusClass =
                "inventory-stock-empty";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${product.id}
                </strong>
            </td>


            <td>

                <div class="inventory-product-cell">

                    <div class="product-image">

                        <i class="bi bi-box-seam"></i>

                    </div>


                    <div class="inventory-product-info">

                        <strong>
                            ${product.name}
                        </strong>

                        <small>
                            Mínimo: ${product.minimum} unidades
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${product.category}
            </td>


            <td>

                <span class="inventory-stock-number ${statusClass}">

                    ${product.stock}

                </span>

            </td>


            <td>

                <span class="status ${
                    status === "normal"
                        ? "completed"
                        : status === "bajo"
                            ? "pending"
                            : "cancelled"
                }">

                    ${getInventoryStatusText(product)}

                </span>

            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action edit inventory-entry"
                        data-id="${product.id}"
                        title="Registrar entrada">

                        <i class="bi bi-plus-lg"></i>

                    </button>


                    <button
                        class="product-action delete inventory-exit"
                        data-id="${product.id}"
                        title="Registrar salida">

                        <i class="bi bi-dash-lg"></i>

                    </button>

                </div>

            </td>

        `;


        inventoryTableBody.appendChild(row);

    });


    const counter =
        document.getElementById(
            "inventoryCounter"
        );


    if (counter) {

        counter.textContent =
            `${products.length} productos`;

    }


    updateInventoryStats();

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateInventoryStats() {

    const products =
        getInventoryProducts();


    const totalProducts =
        products.length;


    const lowStock =
        products.filter(
            product =>
                getInventoryStatus(product) ===
                "bajo"
        ).length;


    const totalUnits =
        products.reduce(
            (total, product) =>
                total + Number(product.stock),
            0
        );


    const totalProductsElement =
        document.getElementById(
            "inventoryTotalProducts"
        );


    const lowStockElement =
        document.getElementById(
            "inventoryLowStock"
        );


    const totalUnitsElement =
        document.getElementById(
            "inventoryTotalUnits"
        );


    if (totalProductsElement) {

        totalProductsElement.textContent =
            totalProducts;

    }


    if (lowStockElement) {

        lowStockElement.textContent =
            lowStock;

    }


    if (totalUnitsElement) {

        totalUnitsElement.textContent =
            totalUnits;

    }

}


/* =====================================================
   FILTROS
===================================================== */

function filterInventory() {

    const products =
        getInventoryProducts();


    const search =
        inventorySearch
            ? inventorySearch.value
                .toLowerCase()
                .trim()
            : "";


    const category =
        inventoryCategory
            ? inventoryCategory.value
            : "todos";


    const stockFilter =
        inventoryStockFilter
            ? inventoryStockFilter.value
            : "todos";


    const filtered =
        products.filter(product => {


            const matchesSearch =

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.id
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =

                category === "todos"

                ||

                product.category ===
                category;


            const matchesStock =

                stockFilter === "todos"

                ||

                getInventoryStatus(product) ===
                stockFilter;


            return (
                matchesSearch &&
                matchesCategory &&
                matchesStock
            );

        });


    renderInventory(filtered);

}


/* =====================================================
   EVENTOS DE FILTROS
===================================================== */

if (inventorySearch) {

    inventorySearch.addEventListener(
        "input",
        filterInventory
    );

}


if (inventoryCategory) {

    inventoryCategory.addEventListener(
        "change",
        filterInventory
    );

}


if (inventoryStockFilter) {

    inventoryStockFilter.addEventListener(
        "change",
        filterInventory
    );

}


if (clearInventoryFilters) {

    clearInventoryFilters.addEventListener(
        "click",
        () => {

            inventorySearch.value = "";

            inventoryCategory.value =
                "todos";

            inventoryStockFilter.value =
                "todos";

            filterInventory();

        }
    );

}


if (inventoryRefresh) {

    inventoryRefresh.addEventListener(
        "click",
        filterInventory
    );

}


/* =====================================================
   CARGAR PRODUCTOS EN EL SELECT
===================================================== */

function loadMovementProducts() {

    if (!movementProduct) {

        return;

    }


    const products =
        getInventoryProducts();


    movementProduct.innerHTML = `

        <option value="">
            Seleccionar producto
        </option>

    `;


    products.forEach(product => {

        const option =
            document.createElement("option");


        option.value =
            product.id;


        option.textContent =
            `${product.id} - ${product.name} (Stock: ${product.stock})`;


        movementProduct.appendChild(
            option
        );

    });

}


/* =====================================================
   ABRIR MODAL
===================================================== */

function openMovementModal(productId = "") {

    if (!movementForm) {

        return;

    }


    movementForm.reset();


    loadMovementProducts();


    if (productId) {

        movementProduct.value =
            productId;

    }


    new bootstrap.Modal(
        document.getElementById(
            "movementModal"
        )
    ).show();

}


if (newMovementButton) {

    newMovementButton.addEventListener(
        "click",
        () => {

            openMovementModal();

        }
    );

}


/* =====================================================
   BOTONES ENTRADA / SALIDA
===================================================== */

if (inventoryTableBody) {

    inventoryTableBody.addEventListener(
        "click",
        event => {


            const entry =
                event.target.closest(
                    ".inventory-entry"
                );


            const exit =
                event.target.closest(
                    ".inventory-exit"
                );


            if (entry) {

                openMovementModal(
                    entry.dataset.id
                );

                setTimeout(() => {

                    movementType.value =
                        "entrada";

                }, 100);

            }


            if (exit) {

                openMovementModal(
                    exit.dataset.id
                );

                setTimeout(() => {

                    movementType.value =
                        "salida";

                }, 100);

            }

        }
    );

}


/* =====================================================
   REGISTRAR MOVIMIENTO
===================================================== */

if (movementForm) {

    movementForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const productId =
                movementProduct.value;


            const type =
                movementType.value;


            const quantity =
                Number(
                    movementQuantity.value
                );


            const reason =
                movementReason.value.trim();


            if (
                !productId ||
                !type ||
                !quantity ||
                quantity <= 0 ||
                !reason
            ) {

                alert(
                    "Completa todos los campos."
                );

                return;

            }


            const products =
                getInventoryProducts();


            const product =
                products.find(
                    item =>
                        item.id ===
                        productId
                );


            if (!product) {

                alert(
                    "Producto no encontrado."
                );

                return;

            }


            /* ==============================
               SALIDA
            ============================== */

            if (type === "salida") {

                if (
                    quantity >
                    product.stock
                ) {

                    alert(
                        `No hay suficiente inventario. Stock disponible: ${product.stock}`
                    );

                    return;

                }


                product.stock -=
                    quantity;

            }


            /* ==============================
               ENTRADA
            ============================== */

            if (type === "entrada") {

                product.stock +=
                    quantity;

            }


            saveInventoryProducts(
                products
            );


            /* ==============================
               GUARDAR MOVIMIENTO
            ============================== */

            const movements =
                JSON.parse(
                    localStorage.getItem(
                        "zeusshopMovimientos"
                    )
                ) || [];


            movements.push({

                id:
                    "MOV-" +
                    Date.now(),

                productId:
                    product.id,

                product:
                    product.name,

                type,

                quantity,

                reason,

                date:
                    new Date()
                        .toLocaleString(
                            "es-CO"
                        )

            });


            localStorage.setItem(
                "zeusshopMovimientos",
                JSON.stringify(
                    movements
                )
            );


            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "movementModal"
                    )
                );


            if (modal) {

                modal.hide();

            }


            filterInventory();


            alert(
                type === "entrada"
                    ? "Entrada registrada correctamente."
                    : "Salida registrada correctamente."
            );

        }
    );

}


/* =====================================================
   INICIALIZAR INVENTARIO
===================================================== */

if (inventoryTableBody) {

    renderInventory(
        getInventoryProducts()
    );

    loadMovementProducts();

}
/* =====================================================
   VENTAS - FUNCIONALIDAD
===================================================== */

const salesTableBody =
    document.getElementById("salesTableBody");

const salesSearch =
    document.getElementById("salesSearch");

const salesStatusFilter =
    document.getElementById("salesStatusFilter");

const clearSalesFilters =
    document.getElementById("clearSalesFilters");

const refreshSales =
    document.getElementById("refreshSales");

const newSaleButton =
    document.getElementById("newSaleButton");

const saleForm =
    document.getElementById("saleForm");

const saleClient =
    document.getElementById("saleClient");

const saleProduct =
    document.getElementById("saleProduct");

const saleQuantity =
    document.getElementById("saleQuantity");

const salePrice =
    document.getElementById("salePrice");

const saleDiscount =
    document.getElementById("saleDiscount");

const saleTotal =
    document.getElementById("saleTotal");


/* =====================================================
   PRECIOS DE PRODUCTOS
===================================================== */

const saleProductPrices = {

    P001: 85000,

    P002: 145000,

    P003: 65000,

    P004: 520000,

    P005: 110000,

    P006: 28000,

    P007: 135000,

    P008: 95000

};


/* =====================================================
   OBTENER VENTAS
===================================================== */

function getSales() {

    const saved =
        localStorage.getItem(
            "zeusshopVentas"
        );

    if (saved) {

        return JSON.parse(saved);

    }

    return [];

}


/* =====================================================
   GUARDAR VENTAS
===================================================== */

function saveSales(sales) {

    localStorage.setItem(
        "zeusshopVentas",
        JSON.stringify(sales)
    );

}


/* =====================================================
   CARGAR CLIENTES
===================================================== */

function loadSaleClients() {

    if (!saleClient) {
        return;
    }


    const clients =
        JSON.parse(
            localStorage.getItem(
                "zeusshopClientes"
            )
        ) || [];


    saleClient.innerHTML = `

        <option value="">
            Seleccionar cliente
        </option>

    `;


    clients.forEach(client => {

        const option =
            document.createElement("option");


        option.value =
            client.document;


        option.textContent =
            client.name;


        saleClient.appendChild(
            option
        );

    });

}


/* =====================================================
   CARGAR PRODUCTOS
===================================================== */

function loadSaleProducts() {

    if (!saleProduct) {
        return;
    }


    const products =
        JSON.parse(
            localStorage.getItem(
                "zeusshopInventario"
            )
        ) || [];


    saleProduct.innerHTML = `

        <option value="">
            Seleccionar producto
        </option>

    `;


    products.forEach(product => {

        const option =
            document.createElement("option");


        option.value =
            product.id;


        option.textContent =
            `${product.name} - Stock: ${product.stock}`;


        if (product.stock <= 0) {

            option.disabled = true;

        }


        saleProduct.appendChild(
            option
        );

    });

}


/* =====================================================
   ACTUALIZAR PRECIO
===================================================== */

function updateSalePrice() {

    if (!saleProduct) {
        return;
    }


    const productId =
        saleProduct.value;


    const price =
        saleProductPrices[productId] || 0;


    salePrice.value =
        price;


    calculateSaleTotal();

}


/* =====================================================
   CALCULAR TOTAL
===================================================== */

function calculateSaleTotal() {

    const price =
        Number(
            salePrice.value
        ) || 0;


    const quantity =
        Number(
            saleQuantity.value
        ) || 0;


    const discount =
        Number(
            saleDiscount.value
        ) || 0;


    const subtotal =
        price * quantity;


    const total =
        Math.max(
            0,
            subtotal - discount
        );


    saleTotal.value =
        total.toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        );

}


/* =====================================================
   EVENTOS DE CÁLCULO
===================================================== */

if (saleProduct) {

    saleProduct.addEventListener(
        "change",
        updateSalePrice
    );

}


if (saleQuantity) {

    saleQuantity.addEventListener(
        "input",
        calculateSaleTotal
    );

}


if (saleDiscount) {

    saleDiscount.addEventListener(
        "input",
        calculateSaleTotal
    );

}


/* =====================================================
   ABRIR NUEVA VENTA
===================================================== */

if (newSaleButton) {

    newSaleButton.addEventListener(
        "click",
        () => {

            saleForm.reset();

            salePrice.value = "";

            saleTotal.value = "";

            loadSaleClients();

            loadSaleProducts();


            new bootstrap.Modal(
                document.getElementById(
                    "saleModal"
                )
            ).show();

        }
    );

}


/* =====================================================
   RENDERIZAR VENTAS
===================================================== */

function renderSales(sales) {

    if (!salesTableBody) {
        return;
    }


    salesTableBody.innerHTML = "";


    sales.forEach(sale => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <strong>
                    ${sale.id}
                </strong>

                <small class="d-block text-muted">
                    ${sale.date}
                </small>

            </td>


            <td>

                <div class="sale-client-cell">

                    <strong>
                        ${sale.client}
                    </strong>

                    <small>
                        ${sale.clientDocument}
                    </small>

                </div>

            </td>


            <td>

                <div class="sale-product-cell">

                    <strong>
                        ${sale.product}
                    </strong>

                    <small>
                        ${sale.productId}
                    </small>

                </div>

            </td>


            <td>
                ${sale.quantity}
            </td>


            <td>

                <strong class="sale-total-value">

                    ${Number(
                        sale.total
                    ).toLocaleString(
                        "es-CO",
                        {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0
                        }
                    )}

                </strong>

            </td>


            <td>

                <span class="status ${
                    sale.status === "Completada"
                        ? "completed"
                        : "cancelled"
                }">

                    ${sale.status}

                </span>

            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action delete sale-delete"
                        data-id="${sale.id}"
                        title="Anular venta">

                        <i class="bi bi-x-lg"></i>

                    </button>

                </div>

            </td>

        `;


        salesTableBody.appendChild(
            row
        );

    });


    const counter =
        document.getElementById(
            "salesCounter"
        );


    if (counter) {

        counter.textContent =
            `${sales.length} ventas`;

    }


    updateSalesStats();

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateSalesStats() {

    const sales =
        getSales();


    const completedSales =
        sales.filter(
            sale =>
                sale.status ===
                "Completada"
        );


    const totalValue =
        completedSales.reduce(
            (total, sale) =>
                total +
                Number(sale.total),
            0
        );


    const today =
        new Date()
            .toLocaleDateString(
                "es-CO"
            );


    const todaySales =
        completedSales.filter(
            sale =>
                sale.dateOnly ===
                today
        ).length;


    document.getElementById(
        "salesTotalCount"
    ).textContent =
        completedSales.length;


    document.getElementById(
        "salesTodayCount"
    ).textContent =
        todaySales;


    document.getElementById(
        "salesTotalValue"
    ).textContent =
        totalValue.toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        );

}


/* =====================================================
   FILTRAR VENTAS
===================================================== */

function filterSales() {

    const sales =
        getSales();


    const search =
        salesSearch
            ? salesSearch.value
                .toLowerCase()
                .trim()
            : "";


    const status =
        salesStatusFilter
            ? salesStatusFilter.value
            : "todos";


    const filtered =
        sales.filter(sale => {

            const matchesSearch =

                sale.id
                    .toLowerCase()
                    .includes(search)

                ||

                sale.client
                    .toLowerCase()
                    .includes(search)

                ||

                sale.product
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "todos"

                ||

                sale.status ===
                status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    renderSales(filtered);

}


/* =====================================================
   FILTROS
===================================================== */

if (salesSearch) {

    salesSearch.addEventListener(
        "input",
        filterSales
    );

}


if (salesStatusFilter) {

    salesStatusFilter.addEventListener(
        "change",
        filterSales
    );

}


if (clearSalesFilters) {

    clearSalesFilters.addEventListener(
        "click",
        () => {

            salesSearch.value = "";

            salesStatusFilter.value =
                "todos";

            filterSales();

        }
    );

}


if (refreshSales) {

    refreshSales.addEventListener(
        "click",
        filterSales
    );

}


/* =====================================================
   REGISTRAR VENTA
===================================================== */

if (saleForm) {

    saleForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const clientDocument =
                saleClient.value;


            const productId =
                saleProduct.value;


            const quantity =
                Number(
                    saleQuantity.value
                );


            const discount =
                Number(
                    saleDiscount.value
                ) || 0;


            const clients =
                JSON.parse(
                    localStorage.getItem(
                        "zeusshopClientes"
                    )
                ) || [];


            const products =
                JSON.parse(
                    localStorage.getItem(
                        "zeusshopInventario"
                    )
                ) || [];


            const client =
                clients.find(
                    item =>
                        item.document ===
                        clientDocument
                );


            const product =
                products.find(
                    item =>
                        item.id ===
                        productId
                );


            if (!client) {

                alert(
                    "Selecciona un cliente."
                );

                return;

            }


            if (!product) {

                alert(
                    "Selecciona un producto."
                );

                return;

            }


            if (
                quantity <= 0 ||
                !Number.isInteger(quantity)
            ) {

                alert(
                    "La cantidad debe ser un número entero mayor que cero."
                );

                return;

            }


            if (
                quantity >
                product.stock
            ) {

                alert(
                    `Stock insuficiente. Disponible: ${product.stock}`
                );

                return;

            }


            const price =
                saleProductPrices[
                    product.id
                ] || 0;


            const subtotal =
                price * quantity;


            const total =
                Math.max(
                    0,
                    subtotal - discount
                );


            /* ==============================
               DESCONTAR INVENTARIO
            ============================== */

            product.stock -=
                quantity;


            localStorage.setItem(
                "zeusshopInventario",
                JSON.stringify(products)
            );


            /* ==============================
               CREAR VENTA
            ============================== */

            const sales =
                getSales();


            const today =
                new Date();


            const sale = {

                id:
                    "VEN-" +
                    String(
                        Date.now()
                    ).slice(-6),

                client:
                    client.name,

                clientDocument:
                    client.document,

                product:
                    product.name,

                productId:
                    product.id,

                quantity,

                price,

                discount,

                subtotal,

                total,

                status:
                    "Completada",

                date:
                    today.toLocaleString(
                        "es-CO"
                    ),

                dateOnly:
                    today.toLocaleDateString(
                        "es-CO"
                    )

            };


            sales.unshift(
                sale
            );


            saveSales(
                sales
            );


            /* ==============================
               ACTUALIZAR PEDIDOS DEL CLIENTE
            ============================== */

            client.orders =
                Number(
                    client.orders || 0
                ) + 1;


            localStorage.setItem(
                "zeusshopClientes",
                JSON.stringify(clients)
            );


            /* ==============================
               CERRAR MODAL
            ============================== */

            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "saleModal"
                    )
                );


            if (modal) {

                modal.hide();

            }


            filterSales();


            alert(
                "Venta registrada correctamente."
            );

        }
    );

}


/* =====================================================
   ANULAR VENTA
===================================================== */

if (salesTableBody) {

    salesTableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".sale-delete"
                );


            if (!button) {
                return;
            }


            const saleId =
                button.dataset.id;


            const sales =
                getSales();


            const sale =
                sales.find(
                    item =>
                        item.id ===
                        saleId
                );


            if (!sale) {
                return;
            }


            if (
                sale.status !==
                "Completada"
            ) {

                return;

            }


            const confirmation =
                confirm(
                    `¿Deseas anular la venta ${sale.id}?`
                );


            if (!confirmation) {
                return;
            }


            /* ==============================
               DEVOLVER STOCK
            ============================== */

            const products =
                JSON.parse(
                    localStorage.getItem(
                        "zeusshopInventario"
                    )
                ) || [];


            const product =
                products.find(
                    item =>
                        item.id ===
                        sale.productId
                );


            if (product) {

                product.stock +=
                    Number(
                        sale.quantity
                    );


                localStorage.setItem(
                    "zeusshopInventario",
                    JSON.stringify(products)
                );

            }


            /* ==============================
               CAMBIAR ESTADO
            ============================== */

            sale.status =
                "Anulada";


            saveSales(
                sales
            );


            filterSales();


            alert(
                "Venta anulada y stock restaurado."
            );

        }
    );

}


/* =====================================================
   INICIALIZAR
===================================================== */

if (salesTableBody) {

    filterSales();

}
/* =====================================================
   PEDIDOS - FUNCIONALIDAD
===================================================== */

const ordersTableBody =
    document.getElementById("ordersTableBody");

const ordersSearch =
    document.getElementById("ordersSearch");

const ordersStatusFilter =
    document.getElementById("ordersStatusFilter");

const clearOrdersFilters =
    document.getElementById("clearOrdersFilters");

const refreshOrders =
    document.getElementById("refreshOrders");

const newOrderButton =
    document.getElementById("newOrderButton");

const orderForm =
    document.getElementById("orderForm");

const orderClient =
    document.getElementById("orderClient");

const orderProduct =
    document.getElementById("orderProduct");

const orderQuantity =
    document.getElementById("orderQuantity");

const orderPrice =
    document.getElementById("orderPrice");

const orderTotal =
    document.getElementById("orderTotal");

const orderNotes =
    document.getElementById("orderNotes");


/* =====================================================
   PRECIOS
===================================================== */

const orderProductPrices = {

    P001: 85000,
    P002: 145000,
    P003: 65000,
    P004: 520000,
    P005: 110000,
    P006: 28000,
    P007: 135000,
    P008: 95000

};


/* =====================================================
   OBTENER PEDIDOS
===================================================== */

function getOrders() {

    const saved =
        localStorage.getItem(
            "zeusshopPedidos"
        );

    if (saved) {

        return JSON.parse(saved);

    }

    return [];

}


/* =====================================================
   GUARDAR PEDIDOS
===================================================== */

function saveOrders(orders) {

    localStorage.setItem(
        "zeusshopPedidos",
        JSON.stringify(orders)
    );

}


/* =====================================================
   CARGAR CLIENTES
===================================================== */

function loadOrderClients() {

    if (!orderClient) {
        return;
    }


    const clients =
        JSON.parse(
            localStorage.getItem(
                "zeusshopClientes"
            )
        ) || [];


    orderClient.innerHTML = `

        <option value="">
            Seleccionar cliente
        </option>

    `;


    clients.forEach(client => {

        const option =
            document.createElement("option");


        option.value =
            client.document;


        option.textContent =
            client.name;


        orderClient.appendChild(
            option
        );

    });

}


/* =====================================================
   CARGAR PRODUCTOS
===================================================== */

function loadOrderProducts() {

    if (!orderProduct) {
        return;
    }


    const products =
        JSON.parse(
            localStorage.getItem(
                "zeusshopInventario"
            )
        ) || [];


    orderProduct.innerHTML = `

        <option value="">
            Seleccionar producto
        </option>

    `;


    products.forEach(product => {

        const option =
            document.createElement("option");


        option.value =
            product.id;


        option.textContent =
            `${product.name} - Stock: ${product.stock}`;


        if (product.stock <= 0) {

            option.disabled = true;

        }


        orderProduct.appendChild(
            option
        );

    });

}


/* =====================================================
   ACTUALIZAR PRECIO
===================================================== */

function updateOrderPrice() {

    const productId =
        orderProduct.value;


    const price =
        orderProductPrices[
            productId
        ] || 0;


    orderPrice.value =
        price;


    calculateOrderTotal();

}


/* =====================================================
   CALCULAR TOTAL
===================================================== */

function calculateOrderTotal() {

    const price =
        Number(
            orderPrice.value
        ) || 0;


    const quantity =
        Number(
            orderQuantity.value
        ) || 0;


    const total =
        price * quantity;


    orderTotal.value =
        total.toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        );

}


/* =====================================================
   EVENTOS DE CÁLCULO
===================================================== */

if (orderProduct) {

    orderProduct.addEventListener(
        "change",
        updateOrderPrice
    );

}


if (orderQuantity) {

    orderQuantity.addEventListener(
        "input",
        calculateOrderTotal
    );

}


/* =====================================================
   ABRIR MODAL
===================================================== */

if (newOrderButton) {

    newOrderButton.addEventListener(
        "click",
        () => {

            orderForm.reset();

            orderPrice.value = "";

            orderTotal.value = "";

            loadOrderClients();

            loadOrderProducts();


            new bootstrap.Modal(
                document.getElementById(
                    "orderModal"
                )
            ).show();

        }
    );

}


/* =====================================================
   ESTADO VISUAL
===================================================== */

function getOrderStatusClass(status) {

    if (status === "Completado") {

        return "completed";

    }

    if (status === "Pendiente") {

        return "pending";

    }

    if (status === "En proceso") {

        return "pending";

    }

    return "cancelled";

}


/* =====================================================
   RENDERIZAR PEDIDOS
===================================================== */

function renderOrders(orders) {

    if (!ordersTableBody) {
        return;
    }


    ordersTableBody.innerHTML = "";


    if (orders.length === 0) {

        ordersTableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="text-center py-4">

                    <span class="text-muted">
                        No hay pedidos registrados.
                    </span>

                </td>

            </tr>

        `;

    }


    orders.forEach(order => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <strong>
                    ${order.id}
                </strong>

                <small class="d-block text-muted">
                    ${order.date}
                </small>

            </td>


            <td>

                <div class="order-client-cell">

                    <strong>
                        ${order.client}
                    </strong>

                    <small>
                        ${order.clientDocument}
                    </small>

                </div>

            </td>


            <td>

                <div class="order-product-cell">

                    <strong>
                        ${order.product}
                    </strong>

                    <small>
                        ${order.productId}
                    </small>

                </div>

            </td>


            <td>
                ${order.quantity}
            </td>


            <td>

                <strong class="order-total-value">

                    ${Number(
                        order.total
                    ).toLocaleString(
                        "es-CO",
                        {
                            style: "currency",
                            currency: "COP",
                            maximumFractionDigits: 0
                        }
                    )}

                </strong>

            </td>


            <td>

                <select
                    class="order-status-select"
                    data-id="${order.id}">

                    <option
                        value="Pendiente"
                        ${order.status === "Pendiente" ? "selected" : ""}>
                        Pendiente
                    </option>

                    <option
                        value="En proceso"
                        ${order.status === "En proceso" ? "selected" : ""}>
                        En proceso
                    </option>

                    <option
                        value="Completado"
                        ${order.status === "Completado" ? "selected" : ""}>
                        Completado
                    </option>

                    <option
                        value="Cancelado"
                        ${order.status === "Cancelado" ? "selected" : ""}>
                        Cancelado
                    </option>

                </select>

            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action edit order-view"
                        data-id="${order.id}"
                        title="Ver detalle">

                        <i class="bi bi-eye"></i>

                    </button>


                    <button
                        class="product-action delete order-delete"
                        data-id="${order.id}"
                        title="Eliminar pedido">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>

        `;


        ordersTableBody.appendChild(
            row
        );

    });


    const counter =
        document.getElementById(
            "ordersCounter"
        );


    if (counter) {

        counter.textContent =
            `${orders.length} pedidos`;

    }


    updateOrderStats();

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateOrderStats() {

    const orders =
        getOrders();


    const pending =
        orders.filter(
            order =>
                order.status ===
                "Pendiente"
        ).length;


    const process =
        orders.filter(
            order =>
                order.status ===
                "En proceso"
        ).length;


    const completed =
        orders.filter(
            order =>
                order.status ===
                "Completado"
        ).length;


    document.getElementById(
        "ordersTotal"
    ).textContent =
        orders.length;


    document.getElementById(
        "ordersPending"
    ).textContent =
        pending;


    document.getElementById(
        "ordersProcess"
    ).textContent =
        process;


    document.getElementById(
        "ordersCompleted"
    ).textContent =
        completed;

}


/* =====================================================
   FILTRAR
===================================================== */

function filterOrders() {

    const orders =
        getOrders();


    const search =
        ordersSearch
            ? ordersSearch.value
                .toLowerCase()
                .trim()
            : "";


    const status =
        ordersStatusFilter
            ? ordersStatusFilter.value
            : "todos";


    const filtered =
        orders.filter(order => {


            const matchesSearch =

                order.id
                    .toLowerCase()
                    .includes(search)

                ||

                order.client
                    .toLowerCase()
                    .includes(search)

                ||

                order.product
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =

                status === "todos"

                ||

                order.status ===
                status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    renderOrders(filtered);

}


/* =====================================================
   FILTROS
===================================================== */

if (ordersSearch) {

    ordersSearch.addEventListener(
        "input",
        filterOrders
    );

}


if (ordersStatusFilter) {

    ordersStatusFilter.addEventListener(
        "change",
        filterOrders
    );

}


if (clearOrdersFilters) {

    clearOrdersFilters.addEventListener(
        "click",
        () => {

            ordersSearch.value = "";

            ordersStatusFilter.value =
                "todos";

            filterOrders();

        }
    );

}


if (refreshOrders) {

    refreshOrders.addEventListener(
        "click",
        filterOrders
    );

}


/* =====================================================
   CREAR PEDIDO
===================================================== */

if (orderForm) {

    orderForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const clientDocument =
                orderClient.value;


            const productId =
                orderProduct.value;


            const quantity =
                Number(
                    orderQuantity.value
                );


            const clients =
                JSON.parse(
                    localStorage.getItem(
                        "zeusshopClientes"
                    )
                ) || [];


            const products =
                JSON.parse(
                    localStorage.getItem(
                        "zeusshopInventario"
                    )
                ) || [];


            const client =
                clients.find(
                    item =>
                        item.document ===
                        clientDocument
                );


            const product =
                products.find(
                    item =>
                        item.id ===
                        productId
                );


            if (!client) {

                alert(
                    "Selecciona un cliente."
                );

                return;

            }


            if (!product) {

                alert(
                    "Selecciona un producto."
                );

                return;

            }


            if (
                quantity <= 0 ||
                !Number.isInteger(quantity)
            ) {

                alert(
                    "La cantidad debe ser un número entero mayor que cero."
                );

                return;

            }


            if (
                quantity >
                product.stock
            ) {

                alert(
                    `No hay suficiente stock. Disponible: ${product.stock}`
                );

                return;

            }


            const price =
                orderProductPrices[
                    product.id
                ] || 0;


            const total =
                price * quantity;


            const today =
                new Date();


            const orders =
                getOrders();


            const order = {

                id:
                    "PED-" +
                    String(
                        Date.now()
                    ).slice(-6),

                client:
                    client.name,

                clientDocument:
                    client.document,

                product:
                    product.name,

                productId:
                    product.id,

                quantity,

                price,

                total,

                notes:
                    orderNotes.value.trim(),

                status:
                    "Pendiente",

                date:
                    today.toLocaleString(
                        "es-CO"
                    ),

                dateOnly:
                    today.toLocaleDateString(
                        "es-CO"
                    )

            };


            orders.unshift(
                order
            );


            saveOrders(
                orders
            );


            /*

                IMPORTANTE:

                Crear el pedido NO descuenta
                el inventario todavía.

                El stock se descuenta cuando
                posteriormente se registre
                la venta.

            */


            client.orders =
                Number(
                    client.orders || 0
                ) + 1;


            localStorage.setItem(
                "zeusshopClientes",
                JSON.stringify(
                    clients
                )
            );


            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "orderModal"
                    )
                );


            if (modal) {

                modal.hide();

            }


            filterOrders();


            alert(
                `Pedido ${order.id} creado correctamente.`
            );

        }
    );

}


/* =====================================================
   CAMBIAR ESTADO
===================================================== */

if (ordersTableBody) {

    ordersTableBody.addEventListener(
        "change",
        event => {


            if (
                !event.target.classList.contains(
                    "order-status-select"
                )
            ) {

                return;

            }


            const orderId =
                event.target.dataset.id;


            const newStatus =
                event.target.value;


            const orders =
                getOrders();


            const order =
                orders.find(
                    item =>
                        item.id ===
                        orderId
                );


            if (!order) {
                return;
            }


            order.status =
                newStatus;


            saveOrders(
                orders
            );


            filterOrders();


            alert(
                `El pedido ${orderId} ahora está "${newStatus}".`
            );

        }
    );

}


/* =====================================================
   VER DETALLE
===================================================== */

function showOrderDetail(order) {

    const content =
        document.getElementById(
            "orderDetailContent"
        );


    if (!content) {
        return;
    }


    content.innerHTML = `

        <div class="order-detail-row">

            <span class="order-detail-label">
                Número de pedido
            </span>

            <span class="order-detail-value">
                ${order.id}
            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Fecha
            </span>

            <span class="order-detail-value">
                ${order.date}
            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Cliente
            </span>

            <span class="order-detail-value">
                ${order.client}
            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Documento
            </span>

            <span class="order-detail-value">
                ${order.clientDocument}
            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Producto
            </span>

            <span class="order-detail-value">
                ${order.product}
            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Cantidad
            </span>

            <span class="order-detail-value">
                ${order.quantity}
            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Precio unitario
            </span>

            <span class="order-detail-value">

                ${Number(
                    order.price
                ).toLocaleString(
                    "es-CO",
                    {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0
                    }
                )}

            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Total
            </span>

            <span class="order-detail-value">

                ${Number(
                    order.total
                ).toLocaleString(
                    "es-CO",
                    {
                        style: "currency",
                        currency: "COP",
                        maximumFractionDigits: 0
                    }
                )}

            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Estado
            </span>

            <span class="order-detail-value">

                ${order.status}

            </span>

        </div>


        <div class="order-detail-row">

            <span class="order-detail-label">
                Observaciones
            </span>

            <span class="order-detail-value">

                ${
                    order.notes ||
                    "Sin observaciones"
                }

            </span>

        </div>

    `;


    new bootstrap.Modal(
        document.getElementById(
            "orderDetailModal"
        )
    ).show();

}


/* =====================================================
   ACCIONES DE PEDIDOS
===================================================== */

if (ordersTableBody) {

    ordersTableBody.addEventListener(
        "click",
        event => {


            const viewButton =
                event.target.closest(
                    ".order-view"
                );


            const deleteButton =
                event.target.closest(
                    ".order-delete"
                );


            if (viewButton) {

                const orders =
                    getOrders();


                const order =
                    orders.find(
                        item =>
                            item.id ===
                            viewButton.dataset.id
                    );


                if (order) {

                    showOrderDetail(
                        order
                    );

                }

            }


            if (deleteButton) {

                const orderId =
                    deleteButton.dataset.id;


                const confirmation =
                    confirm(
                        `¿Deseas eliminar el pedido ${orderId}?`
                    );


                if (!confirmation) {
                    return;
                }


                const orders =
                    getOrders();


                const filtered =
                    orders.filter(
                        item =>
                            item.id !==
                            orderId
                    );


                saveOrders(
                    filtered
                );


                filterOrders();


                alert(
                    "Pedido eliminado correctamente."
                );

            }

        }
    );

}


/* =====================================================
   INICIALIZAR
===================================================== */

if (ordersTableBody) {

    filterOrders();

}
/* =====================================================
   REPORTES
===================================================== */

let salesChartInstance = null;
let ordersChartInstance = null;


/* =====================================================
   OBTENER INFORMACIÓN
===================================================== */

function getReportData(key) {

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


/* =====================================================
   FORMATO DE MONEDA
===================================================== */

function formatReportMoney(value) {

    return Number(value || 0).toLocaleString(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    );

}


/* =====================================================
   ACTUALIZAR INDICADORES
===================================================== */

function updateReportCards() {

    const sales =
        getReportData("zeusshopVentas");

    const orders =
        getReportData("zeusshopPedidos");

    const clients =
        getReportData("zeusshopClientes");


    let income = 0;


    sales.forEach(sale => {

        income +=
            Number(
                sale.total ||
                sale.amount ||
                sale.valor ||
                0
            );

    });


    document.getElementById(
        "reportIncome"
    ).textContent =
        formatReportMoney(income);


    document.getElementById(
        "reportSales"
    ).textContent =
        sales.length;


    document.getElementById(
        "reportOrders"
    ).textContent =
        orders.length;


    document.getElementById(
        "reportClients"
    ).textContent =
        clients.length;

}


/* =====================================================
   GRÁFICO DE VENTAS
===================================================== */

function createSalesChart() {

    const sales =
        getReportData("zeusshopVentas");


    const canvas =
        document.getElementById(
            "salesChart"
        );


    if (!canvas) {
        return;
    }


    const dailySales = {};


    sales.forEach(sale => {

        let date =
            sale.dateOnly ||
            sale.date ||
            new Date().toLocaleDateString(
                "es-CO"
            );


        if (!dailySales[date]) {

            dailySales[date] = 0;

        }


        dailySales[date] +=
            Number(
                sale.total ||
                sale.amount ||
                sale.valor ||
                0
            );

    });


    const labels =
        Object.keys(
            dailySales
        ).slice(-7);


    const values =
        labels.map(
            date =>
                dailySales[date]
        );


    if (salesChartInstance) {

        salesChartInstance.destroy();

    }


    salesChartInstance =
        new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels,

                    datasets: [

                        {

                            label:
                                "Ventas",

                            data:
                                values,

                            borderWidth:
                                2,

                            tension:
                                0.35,

                            fill:
                                false

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    plugins: {

                        legend: {

                            display:
                                false

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero:
                                true,

                            ticks: {

                                callback:
                                    function(value) {

                                        return "$" +
                                            Number(
                                                value
                                            ).toLocaleString(
                                                "es-CO"
                                            );

                                    }

                            }

                        }

                    }

                }

            }
        );

}


/* =====================================================
   GRÁFICO DE PEDIDOS
===================================================== */

function createOrdersChart() {

    const orders =
        getReportData(
            "zeusshopPedidos"
        );


    const canvas =
        document.getElementById(
            "ordersChart"
        );


    if (!canvas) {
        return;
    }


    const pending =
        orders.filter(
            order =>
                order.status ===
                "Pendiente"
        ).length;


    const process =
        orders.filter(
            order =>
                order.status ===
                "En proceso"
        ).length;


    const completed =
        orders.filter(
            order =>
                order.status ===
                "Completado"
        ).length;


    const cancelled =
        orders.filter(
            order =>
                order.status ===
                "Cancelado"
        ).length;


    if (ordersChartInstance) {

        ordersChartInstance.destroy();

    }


    ordersChartInstance =
        new Chart(
            canvas,
            {

                type:
                    "doughnut",

                data: {

                    labels: [

                        "Pendientes",
                        "En proceso",
                        "Completados",
                        "Cancelados"

                    ],

                    datasets: [

                        {

                            data: [

                                pending,
                                process,
                                completed,
                                cancelled

                            ],

                            borderWidth:
                                2

                        }

                    ]

                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    plugins: {

                        legend: {

                            position:
                                "bottom",

                            labels: {

                                font: {

                                    size:
                                        9

                                }

                            }

                        }

                    }

                }

            }

        );

}


/* =====================================================
   VENTAS RECIENTES
===================================================== */

function renderRecentSales() {

    const sales =
        getReportData(
            "zeusshopVentas"
        );


    const body =
        document.getElementById(
            "recentSalesBody"
        );


    if (!body) {
        return;
    }


    body.innerHTML = "";


    const recent =
        sales.slice(
            0,
            7
        );


    if (recent.length === 0) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="text-center text-muted py-4">

                    No hay ventas registradas.

                </td>

            </tr>

        `;

        return;

    }


    recent.forEach(sale => {

        const row =
            document.createElement(
                "tr"
            );


        const total =
            Number(
                sale.total ||
                sale.amount ||
                sale.valor ||
                0
            );


        row.innerHTML = `

            <td>

                <strong>
                    ${
                        sale.id ||
                        sale.saleId ||
                        "VEN-000000"
                    }
                </strong>

            </td>


            <td>

                ${
                    sale.client ||
                    sale.cliente ||
                    "Cliente"
                }

            </td>


            <td>

                <strong>
                    ${formatReportMoney(total)}
                </strong>

            </td>


            <td>

                ${
                    sale.date ||
                    sale.dateOnly ||
                    "-"
                }

            </td>

        `;


        body.appendChild(
            row
        );

    });

}


/* =====================================================
   PEDIDOS RECIENTES
===================================================== */

function renderRecentOrders() {

    const orders =
        getReportData(
            "zeusshopPedidos"
        );


    const body =
        document.getElementById(
            "recentOrdersBody"
        );


    if (!body) {
        return;
    }


    body.innerHTML = "";


    const recent =
        orders.slice(
            0,
            7
        );


    if (recent.length === 0) {

        body.innerHTML = `

            <tr>

                <td
                    colspan="3"
                    class="text-center text-muted py-4">

                    No hay pedidos registrados.

                </td>

            </tr>

        `;

        return;

    }


    recent.forEach(order => {

        const row =
            document.createElement(
                "tr"
            );


        row.innerHTML = `

            <td>

                <strong>
                    ${order.id}
                </strong>

            </td>


            <td>

                ${order.client}

            </td>


            <td>

                <span class="status-badge">

                    ${order.status}

                </span>

            </td>

        `;


        body.appendChild(
            row
        );

    });

}


/* =====================================================
   ACTUALIZAR TODO
===================================================== */

function updateReports() {

    updateReportCards();

    createSalesChart();

    createOrdersChart();

    renderRecentSales();

    renderRecentOrders();

}


/* =====================================================
   BOTÓN ACTUALIZAR
===================================================== */

const refreshReports =
    document.getElementById(
        "refreshReports"
    );


if (refreshReports) {

    refreshReports.addEventListener(
        "click",
        updateReports
    );

}


/* =====================================================
   INICIALIZAR REPORTES
===================================================== */

if (
    document.getElementById(
        "reportIncome"
    )
) {

    updateReports();

}
/* =====================================================
   USUARIOS
===================================================== */

const usersTableBody =
    document.getElementById("usersTableBody");

const usersSearch =
    document.getElementById("usersSearch");

const usersRoleFilter =
    document.getElementById("usersRoleFilter");

const clearUsersFilters =
    document.getElementById("clearUsersFilters");

const refreshUsers =
    document.getElementById("refreshUsers");

const newUserButton =
    document.getElementById("newUserButton");

const userForm =
    document.getElementById("userForm");


/* =====================================================
   USUARIOS INICIALES
===================================================== */

function initializeUsers() {

    let users =
        JSON.parse(
            localStorage.getItem(
                "zeusshopUsuarios"
            )
        );


    if (!users) {

        users = [

            {
                id: "USR-001",
                name: "Administrador",
                email: "admin@zeusshop.com",
                username: "admin",
                password: "123456",
                role: "Administrador",
                status: "Activo",
                lastAccess: "Hoy"
            }

        ];


        localStorage.setItem(
            "zeusshopUsuarios",
            JSON.stringify(users)
        );

    }

}


/* =====================================================
   OBTENER USUARIOS
===================================================== */

function getUsers() {

    return JSON.parse(
        localStorage.getItem(
            "zeusshopUsuarios"
        )
    ) || [];

}


/* =====================================================
   GUARDAR USUARIOS
===================================================== */

function saveUsers(users) {

    localStorage.setItem(
        "zeusshopUsuarios",
        JSON.stringify(users)
    );

}


/* =====================================================
   RENDERIZAR
===================================================== */

function renderUsers(users) {

    if (!usersTableBody) {
        return;
    }


    usersTableBody.innerHTML = "";


    if (users.length === 0) {

        usersTableBody.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="text-center text-muted py-4">

                    No hay usuarios registrados.

                </td>

            </tr>

        `;

        updateUserStats();

        return;

    }


    users.forEach(user => {

        const row =
            document.createElement("tr");


        const statusClass =
            user.status === "Activo"
                ? "user-active-badge"
                : "user-inactive-badge";


        row.innerHTML = `

            <td>

                <div class="user-table-name">

                    <strong>
                        ${user.name}
                    </strong>

                    <small>
                        @${user.username}
                    </small>

                </div>

            </td>


            <td>
                ${user.email}
            </td>


            <td>

                <span class="user-role-badge">

                    ${user.role}

                </span>

            </td>


            <td>

                <span class="${statusClass}">

                    ${user.status}

                </span>

            </td>


            <td>
                ${user.lastAccess || "Nunca"}
            </td>


            <td>

                <div class="product-actions">

                    <button
                        class="product-action edit user-edit"
                        data-id="${user.id}"
                        title="Editar">

                        <i class="bi bi-pencil"></i>

                    </button>


                    <button
                        class="product-action delete user-delete"
                        data-id="${user.id}"
                        title="Eliminar">

                        <i class="bi bi-trash"></i>

                    </button>

                </div>

            </td>

        `;


        usersTableBody.appendChild(row);

    });


    updateUserStats();

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateUserStats() {

    const users =
        getUsers();


    const active =
        users.filter(
            user =>
                user.status === "Activo"
        ).length;


    const admins =
        users.filter(
            user =>
                user.role === "Administrador"
        ).length;


    const totalElement =
        document.getElementById(
            "usersTotal"
        );


    const activeElement =
        document.getElementById(
            "usersActive"
        );


    const adminsElement =
        document.getElementById(
            "usersAdmins"
        );


    const counter =
        document.getElementById(
            "usersCounter"
        );


    if (totalElement) {
        totalElement.textContent =
            users.length;
    }


    if (activeElement) {
        activeElement.textContent =
            active;
    }


    if (adminsElement) {
        adminsElement.textContent =
            admins;
    }


    if (counter) {

        counter.textContent =
            `${users.length} usuarios`;

    }

}


/* =====================================================
   FILTROS
===================================================== */

function filterUsers() {

    const users =
        getUsers();


    const search =
        usersSearch
            ? usersSearch.value
                .toLowerCase()
                .trim()
            : "";


    const role =
        usersRoleFilter
            ? usersRoleFilter.value
            : "todos";


    const filtered =
        users.filter(user => {

            const matchesSearch =

                user.name
                    .toLowerCase()
                    .includes(search)

                ||

                user.username
                    .toLowerCase()
                    .includes(search)

                ||

                user.email
                    .toLowerCase()
                    .includes(search);


            const matchesRole =
                role === "todos" ||
                user.role === role;


            return (
                matchesSearch &&
                matchesRole
            );

        });


    renderUsers(filtered);

}


if (usersSearch) {

    usersSearch.addEventListener(
        "input",
        filterUsers
    );

}


if (usersRoleFilter) {

    usersRoleFilter.addEventListener(
        "change",
        filterUsers
    );

}


if (clearUsersFilters) {

    clearUsersFilters.addEventListener(
        "click",
        () => {

            usersSearch.value = "";

            usersRoleFilter.value =
                "todos";

            filterUsers();

        }
    );

}


if (refreshUsers) {

    refreshUsers.addEventListener(
        "click",
        filterUsers
    );

}


/* =====================================================
   NUEVO USUARIO
===================================================== */

if (newUserButton) {

    newUserButton.addEventListener(
        "click",
        () => {

            userForm.reset();

            document.getElementById(
                "userId"
            ).value = "";


            document.getElementById(
                "userModalTitle"
            ).textContent =
                "Nuevo usuario";


            new bootstrap.Modal(
                document.getElementById(
                    "userModal"
                )
            ).show();

        }
    );

}


/* =====================================================
   GUARDAR / EDITAR USUARIO
===================================================== */

if (userForm) {

    userForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const id =
                document.getElementById(
                    "userId"
                ).value;


            const name =
                document.getElementById(
                    "userName"
                ).value.trim();


            const email =
                document.getElementById(
                    "userEmail"
                ).value.trim();


            const username =
                document.getElementById(
                    "userUsername"
                ).value.trim();


            const password =
                document.getElementById(
                    "userPassword"
                ).value;


            const role =
                document.getElementById(
                    "userRole"
                ).value;


            const status =
                document.getElementById(
                    "userStatus"
                ).value;


            const users =
                getUsers();


            const duplicated =
                users.find(
                    user =>
                        user.username
                            .toLowerCase() ===
                        username.toLowerCase()
                        &&
                        user.id !== id
                );


            if (duplicated) {

                alert(
                    "Ese nombre de usuario ya existe."
                );

                return;

            }


            if (id) {

                const user =
                    users.find(
                        item =>
                            item.id === id
                    );


                if (!user) {
                    return;
                }


                user.name =
                    name;

                user.email =
                    email;

                user.username =
                    username;

                user.role =
                    role;

                user.status =
                    status;


                if (password) {

                    user.password =
                        password;

                }

            } else {

                const newUser = {

                    id:
                        "USR-" +
                        String(
                            Date.now()
                        ).slice(-6),

                    name,

                    email,

                    username,

                    password,

                    role,

                    status,

                    lastAccess:
                        "Nunca"

                };


                users.unshift(
                    newUser
                );

            }


            saveUsers(
                users
            );


            const modal =
                bootstrap.Modal.getInstance(
                    document.getElementById(
                        "userModal"
                    )
                );


            if (modal) {
                modal.hide();
            }


            filterUsers();


            alert(
                id
                    ? "Usuario actualizado correctamente."
                    : "Usuario creado correctamente."
            );

        }
    );

}


/* =====================================================
   EDITAR / ELIMINAR
===================================================== */

if (usersTableBody) {

    usersTableBody.addEventListener(
        "click",
        event => {

            const editButton =
                event.target.closest(
                    ".user-edit"
                );


            const deleteButton =
                event.target.closest(
                    ".user-delete"
                );


            /* EDITAR */

            if (editButton) {

                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>
                            item.id ===
                            editButton.dataset.id
                    );


                if (!user) {
                    return;
                }


                document.getElementById(
                    "userId"
                ).value =
                    user.id;


                document.getElementById(
                    "userName"
                ).value =
                    user.name;


                document.getElementById(
                    "userEmail"
                ).value =
                    user.email;


                document.getElementById(
                    "userUsername"
                ).value =
                    user.username;


                document.getElementById(
                    "userPassword"
                ).value =
                    "";


                document.getElementById(
                    "userPassword"
                ).required = false;


                document.getElementById(
                    "userRole"
                ).value =
                    user.role;


                document.getElementById(
                    "userStatus"
                ).value =
                    user.status;


                document.getElementById(
                    "userModalTitle"
                ).textContent =
                    "Editar usuario";


                new bootstrap.Modal(
                    document.getElementById(
                        "userModal"
                    )
                ).show();

            }


            /* ELIMINAR */

            if (deleteButton) {

                const users =
                    getUsers();


                const user =
                    users.find(
                        item =>
                            item.id ===
                            deleteButton.dataset.id
                    );


                if (!user) {
                    return;
                }


                if (
                    user.username ===
                    "admin"
                ) {

                    alert(
                        "El usuario administrador principal no puede eliminarse."
                    );

                    return;

                }


                const confirmation =
                    confirm(
                        `¿Deseas eliminar al usuario ${user.name}?`
                    );


                if (!confirmation) {
                    return;
                }


                const filtered =
                    users.filter(
                        item =>
                            item.id !==
                            user.id
                    );


                saveUsers(
                    filtered
                );


                filterUsers();


                alert(
                    "Usuario eliminado correctamente."
                );

            }

        }
    );

}


/* =====================================================
   RESTAURAR PASSWORD OBLIGATORIA AL CREAR
===================================================== */

if (newUserButton) {

    newUserButton.addEventListener(
        "click",
        () => {

            document.getElementById(
                "userPassword"
            ).required = true;

        }
    );

}


/* =====================================================
   INICIALIZAR
===================================================== */

if (usersTableBody) {

    initializeUsers();

    filterUsers();

}
/* =====================================================
   NOTIFICACIONES
===================================================== */

const notificationsList =
    document.getElementById("notificationsList");

const notificationSearch =
    document.getElementById("notificationSearch");

const notificationFilter =
    document.getElementById("notificationFilter");

const markAllNotifications =
    document.getElementById("markAllNotifications");

const clearNotificationFilters =
    document.getElementById("clearNotificationFilters");

const refreshNotifications =
    document.getElementById("refreshNotifications");


/* =====================================================
   NOTIFICACIONES INICIALES
===================================================== */

function initializeNotifications() {

    let notifications =
        JSON.parse(
            localStorage.getItem(
                "zeusshopNotificaciones"
            )
        );


    if (!notifications) {

        notifications = [

            {
                id: "NOT-001",

                title: "Bienvenido a ZeusShop Express",

                message:
                    "El sistema de gestión se encuentra listo para trabajar.",

                type: "system",

                time: "Ahora",

                read: false

            },

            {
                id: "NOT-002",

                title: "Nuevo pedido registrado",

                message:
                    "Se ha registrado un nuevo pedido en el sistema.",

                type: "order",

                time: "Hace 10 minutos",

                read: false

            },

            {
                id: "NOT-003",

                title: "Inventario bajo",

                message:
                    "Uno o varios productos tienen existencias inferiores al mínimo establecido.",

                type: "inventory",

                time: "Hace 30 minutos",

                read: false

            },

            {
                id: "NOT-004",

                title: "Venta registrada",

                message:
                    "Se ha registrado una nueva venta correctamente.",

                type: "sale",

                time: "Hace 1 hora",

                read: true

            },

            {
                id: "NOT-005",

                title: "Usuario actualizado",

                message:
                    "La información de un usuario fue modificada correctamente.",

                type: "user",

                time: "Ayer",

                read: true

            }

        ];


        localStorage.setItem(
            "zeusshopNotificaciones",
            JSON.stringify(notifications)
        );

    }

}


/* =====================================================
   OBTENER
===================================================== */

function getNotifications() {

    return JSON.parse(
        localStorage.getItem(
            "zeusshopNotificaciones"
        )
    ) || [];

}


/* =====================================================
   GUARDAR
===================================================== */

function saveNotifications(notifications) {

    localStorage.setItem(
        "zeusshopNotificaciones",
        JSON.stringify(notifications)
    );

}


/* =====================================================
   ICONOS
===================================================== */

function getNotificationIcon(type) {

    const icons = {

        system:
            "bi bi-info-circle",

        order:
            "bi bi-cart-check",

        inventory:
            "bi bi-box-seam",

        sale:
            "bi bi-cash-stack",

        user:
            "bi bi-person-check"

    };


    return (
        icons[type] ||
        "bi bi-bell"
    );

}


/* =====================================================
   RENDERIZAR
===================================================== */

function renderNotifications(
    notifications
) {

    if (!notificationsList) {
        return;
    }


    notificationsList.innerHTML = "";


    if (notifications.length === 0) {

        notificationsList.innerHTML = `

            <div class="notification-empty">

                <i class="bi bi-bell-slash"></i>

                <strong>
                    No hay notificaciones
                </strong>

                <span>
                    No encontramos notificaciones con los filtros seleccionados.
                </span>

            </div>

        `;

        updateNotificationStats();

        return;

    }


    notifications.forEach(notification => {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "notification-item" +
            (
                notification.read
                    ? ""
                    : " unread"
            );


        item.innerHTML = `

            <div class="notification-icon">

                <i class="${getNotificationIcon(
                    notification.type
                )}"></i>

            </div>


            <div class="notification-content">

                <h4>
                    ${notification.title}
                </h4>

                <p>
                    ${notification.message}
                </p>

                <span class="notification-time">

                    <i class="bi bi-clock"></i>

                    ${notification.time}

                </span>

            </div>


            <div class="notification-actions">

                ${
                    notification.read

                    ? ""

                    : `

                        <button
                            class="notification-action mark-read"
                            data-id="${notification.id}"
                            title="Marcar como leída">

                            <i class="bi bi-check2"></i>

                        </button>

                    `
                }


                <button
                    class="notification-action delete-notification"
                    data-id="${notification.id}"
                    title="Eliminar">

                    <i class="bi bi-trash"></i>

                </button>

            </div>

        `;


        notificationsList.appendChild(
            item
        );

    });


    updateNotificationStats();

}


/* =====================================================
   ESTADÍSTICAS
===================================================== */

function updateNotificationStats() {

    const notifications =
        getNotifications();


    const unread =
        notifications.filter(
            item =>
                !item.read
        ).length;


    const read =
        notifications.filter(
            item =>
                item.read
        ).length;


    const total =
        notifications.length;


    const totalElement =
        document.getElementById(
            "notificationsTotal"
        );


    const unreadElement =
        document.getElementById(
            "notificationsUnread"
        );


    const readElement =
        document.getElementById(
            "notificationsRead"
        );


    const counter =
        document.getElementById(
            "notificationsCounter"
        );


    const headerCount =
        document.getElementById(
            "headerNotificationCount"
        );


    if (totalElement) {
        totalElement.textContent =
            total;
    }


    if (unreadElement) {
        unreadElement.textContent =
            unread;
    }


    if (readElement) {
        readElement.textContent =
            read;
    }


    if (counter) {

        counter.textContent =
            `${total} notificaciones`;

    }


    if (headerCount) {

        headerCount.textContent =
            unread;

        headerCount.style.display =
            unread > 0
                ? "inline-flex"
                : "none";

    }

}


/* =====================================================
   FILTROS
===================================================== */

function filterNotifications() {

    const notifications =
        getNotifications();


    const search =
        notificationSearch
            ? notificationSearch.value
                .toLowerCase()
                .trim()
            : "";


    const filter =
        notificationFilter
            ? notificationFilter.value
            : "todas";


    const filtered =
        notifications.filter(
            notification => {

                const matchesSearch =

                    notification.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    notification.message
                        .toLowerCase()
                        .includes(search);


                let matchesFilter =
                    true;


                if (
                    filter ===
                    "no-leidas"
                ) {

                    matchesFilter =
                        !notification.read;

                }


                if (
                    filter ===
                    "leidas"
                ) {

                    matchesFilter =
                        notification.read;

                }


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    renderNotifications(
        filtered
    );

}


if (notificationSearch) {

    notificationSearch.addEventListener(
        "input",
        filterNotifications
    );

}


if (notificationFilter) {

    notificationFilter.addEventListener(
        "change",
        filterNotifications
    );

}


if (clearNotificationFilters) {

    clearNotificationFilters.addEventListener(
        "click",
        () => {

            notificationSearch.value =
                "";

            notificationFilter.value =
                "todas";

            filterNotifications();

        }
    );

}


/* =====================================================
   MARCAR TODAS COMO LEÍDAS
===================================================== */

if (markAllNotifications) {

    markAllNotifications.addEventListener(
        "click",
        () => {

            const notifications =
                getNotifications();


            notifications.forEach(
                notification => {

                    notification.read =
                        true;

                }
            );


            saveNotifications(
                notifications
            );


            filterNotifications();

        }
    );

}


/* =====================================================
   ACCIONES INDIVIDUALES
===================================================== */

if (notificationsList) {

    notificationsList.addEventListener(
        "click",
        event => {

            const markButton =
                event.target.closest(
                    ".mark-read"
                );


            const deleteButton =
                event.target.closest(
                    ".delete-notification"
                );


            /* MARCAR LEÍDA */

            if (markButton) {

                const notifications =
                    getNotifications();


                const notification =
                    notifications.find(
                        item =>
                            item.id ===
                            markButton.dataset.id
                    );


                if (notification) {

                    notification.read =
                        true;

                }


                saveNotifications(
                    notifications
                );


                filterNotifications();

            }


            /* ELIMINAR */

            if (deleteButton) {

                const notifications =
                    getNotifications();


                const filtered =
                    notifications.filter(
                        item =>
                            item.id !==
                            deleteButton.dataset.id
                    );


                saveNotifications(
                    filtered
                );


                filterNotifications();

            }

        }
    );

}


/* =====================================================
   ACTUALIZAR
===================================================== */

if (refreshNotifications) {

    refreshNotifications.addEventListener(
        "click",
        filterNotifications
    );

}


/* =====================================================
   INICIALIZAR
===================================================== */

if (notificationsList) {

    initializeNotifications();

    filterNotifications();

}
/* =====================================================
   CONFIGURACIÓN
===================================================== */

const storeSettingsForm =
    document.getElementById(
        "storeSettingsForm"
    );

const profileSettingsForm =
    document.getElementById(
        "profileSettingsForm"
    );

const savePreferences =
    document.getElementById(
        "savePreferences"
    );

const resetSettings =
    document.getElementById(
        "resetSettings"
    );


/* =====================================================
   CONFIGURACIÓN POR DEFECTO
===================================================== */

const defaultSettings = {

    storeName:
        "ZeusShop Express",

    storeEmail:
        "admin@zeusshop.com",

    storePhone:
        "300 000 0000",

    storeAddress:
        "Dirección principal",

    storeCity:
        "Bogotá",

    storeCurrency:
        "COP",

    notificationsEnabled:
        true,

    inventoryAlerts:
        true,

    deleteConfirmation:
        true,

    adminName:
        "Administrador",

    adminUsername:
        "admin",

    adminEmail:
        "admin@zeusshop.com"

};


/* =====================================================
   OBTENER CONFIGURACIÓN
===================================================== */

function getSettings() {

    return JSON.parse(
        localStorage.getItem(
            "zeusshopConfiguracion"
        )
    ) || defaultSettings;

}


/* =====================================================
   GUARDAR CONFIGURACIÓN
===================================================== */

function saveSettings(settings) {

    localStorage.setItem(
        "zeusshopConfiguracion",
        JSON.stringify(settings)
    );

}


/* =====================================================
   CARGAR CONFIGURACIÓN
===================================================== */

function loadSettings() {

    const settings =
        getSettings();


    const fields = {

        storeName:
            document.getElementById(
                "storeName"
            ),

        storeEmail:
            document.getElementById(
                "storeEmail"
            ),

        storePhone:
            document.getElementById(
                "storePhone"
            ),

        storeAddress:
            document.getElementById(
                "storeAddress"
            ),

        storeCity:
            document.getElementById(
                "storeCity"
            ),

        storeCurrency:
            document.getElementById(
                "storeCurrency"
            ),

        adminName:
            document.getElementById(
                "adminName"
            ),

        adminUsername:
            document.getElementById(
                "adminUsername"
            ),

        adminEmail:
            document.getElementById(
                "adminEmail"
            )

    };


    Object.keys(fields).forEach(
        key => {

            if (fields[key]) {

                fields[key].value =
                    settings[key] || "";

            }

        }
    );


    const notifications =
        document.getElementById(
            "notificationsEnabled"
        );

    const inventory =
        document.getElementById(
            "inventoryAlerts"
        );

    const deletion =
        document.getElementById(
            "deleteConfirmation"
        );


    if (notifications) {

        notifications.checked =
            settings.notificationsEnabled;

    }


    if (inventory) {

        inventory.checked =
            settings.inventoryAlerts;

    }


    if (deletion) {

        deletion.checked =
            settings.deleteConfirmation;

    }

}


/* =====================================================
   INFORMACIÓN DE LA TIENDA
===================================================== */

if (storeSettingsForm) {

    storeSettingsForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const settings =
                getSettings();


            settings.storeName =
                document.getElementById(
                    "storeName"
                ).value.trim();


            settings.storeEmail =
                document.getElementById(
                    "storeEmail"
                ).value.trim();


            settings.storePhone =
                document.getElementById(
                    "storePhone"
                ).value.trim();


            settings.storeAddress =
                document.getElementById(
                    "storeAddress"
                ).value.trim();


            settings.storeCity =
                document.getElementById(
                    "storeCity"
                ).value.trim();


            settings.storeCurrency =
                document.getElementById(
                    "storeCurrency"
                ).value;


            saveSettings(
                settings
            );


            alert(
                "La información de la tienda fue guardada correctamente."
            );

        }
    );

}


/* =====================================================
   PREFERENCIAS
===================================================== */

if (savePreferences) {

    savePreferences.addEventListener(
        "click",
        () => {

            const settings =
                getSettings();


            settings.notificationsEnabled =
                document.getElementById(
                    "notificationsEnabled"
                ).checked;


            settings.inventoryAlerts =
                document.getElementById(
                    "inventoryAlerts"
                ).checked;


            settings.deleteConfirmation =
                document.getElementById(
                    "deleteConfirmation"
                ).checked;


            saveSettings(
                settings
            );


            alert(
                "Las preferencias fueron guardadas correctamente."
            );

        }
    );

}


/* =====================================================
   PERFIL ADMINISTRADOR
===================================================== */

if (profileSettingsForm) {

    profileSettingsForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const settings =
                getSettings();


            settings.adminName =
                document.getElementById(
                    "adminName"
                ).value.trim();


            settings.adminUsername =
                document.getElementById(
                    "adminUsername"
                ).value.trim();


            settings.adminEmail =
                document.getElementById(
                    "adminEmail"
                ).value.trim();


            saveSettings(
                settings
            );


            alert(
                "El perfil fue actualizado correctamente."
            );

        }
    );

}


/* =====================================================
   RESTAURAR CONFIGURACIÓN
===================================================== */

if (resetSettings) {

    resetSettings.addEventListener(
        "click",
        () => {

            const confirmation =
                confirm(
                    "¿Deseas restaurar toda la configuración a sus valores iniciales?"
                );


            if (!confirmation) {
                return;
            }


            saveSettings(
                {
                    ...defaultSettings
                }
            );


            loadSettings();


            alert(
                "La configuración fue restaurada correctamente."
            );

        }
    );

}


/* =====================================================
   INICIALIZAR CONFIGURACIÓN
===================================================== */

if (storeSettingsForm) {

    loadSettings();

}
