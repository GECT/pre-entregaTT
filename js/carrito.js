document.addEventListener("DOMContentLoaded", () => {
    const renderizarProductos = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrito(carrito);
        let seccionProductos = document.getElementById("contenedor-carrito");
        seccionProductos.innerHTML = ""

        if (!carrito.length) {
            let mensajeCarrito = document.createElement("p");
            mensajeCarrito.classList.add("mensaje-carrito");
            mensajeCarrito.textContent = "El carrito está vacío";
            seccionProductos.appendChild(mensajeCarrito);
        } else {
            carrito.forEach((elemnto, index) => {
                let tarjetaProducto = document.createElement("article");
                tarjetaProducto.classList.add("tarjeta-producto");

                let imgProducto = document.createElement("img");
                imgProducto.src = elemnto.images[0];

                let tituloProducto = document.createElement("p");
                tituloProducto.textContent = elemnto.title;

                let precioProducto = document.createElement("p");
                precioProducto.textContent = `$${elemnto.price}`;

                let btnEliminar = document.createElement("button");
                btnEliminar.classList.add("btn-eliminar");
                btnEliminar.textContent = "Eliminar";

                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index);
                })
                tarjetaProducto.appendChild(imgProducto);
                tarjetaProducto.appendChild(tituloProducto);
                tarjetaProducto.appendChild(precioProducto);
                tarjetaProducto.appendChild(btnEliminar);

                seccionProductos.appendChild(tarjetaProducto);
            });
        }
        renderizarBotones();
    };

    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        let divAcciones = document.getElementById("acciones-carrito");
        divAcciones.innerHTML = ""
        if (carrito.length) {
            let btnVaciar = document.createElement("button");
            btnVaciar.textContent = "Vaciar carrito";
            btnVaciar.classList.add("btn-carrito");

            btnVaciar.addEventListener("click", () => {
                vaciaCarrito()
            });

            let btnFinalizar = document.createElement("button");
            btnFinalizar.textContent = "Realizar compra";
            btnFinalizar.classList.add("btn-carrito");

            btnFinalizar.addEventListener("click", () => {
                let confirmado = confirm("¿Deseas realizar la compra?");
                if (confirmado) {
                    alert("Gracias por tu compra");
                    localStorage.removeItem("carrito");
                    window.location.href = "../index.html";
                }
            })

            divAcciones.appendChild(btnVaciar);
            divAcciones.appendChild(btnFinalizar);
        }
    };


    const productosEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito");
        contadorCarrito.textContent = carrito.length;
    }
    const eliminarProducto = (index) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Eliminado");
        renderizarProductos()
    };
    const vaciaCarrito = () => {
        localStorage.removeItem("carrito");
        alert("Carrito vaciado");
        renderizarProductos();
    };


    renderizarProductos();
});