const precioAPagar = document.querySelector("#precioAPagar");
const peliculaAPagar = document.querySelector(".agregarPelicula");
const divPago = document.querySelector(".pago__tarjeta");
const formTarjeta = document.querySelector(".form_tarjeta");
const numTarjeta = formTarjeta["numeroTarjeta"];
const nomTarjeta = formTarjeta["nombreTarjeta"];
const fechaTarjeta = formTarjeta["fechaTarjeta"];
const ccvTarjeta = formTarjeta["ccvTarjeta"];
const mensajeComprado = document.querySelector(".compraPendiente")
let carrito;

document.addEventListener("DOMContentLoaded", () => {
     recibirPelicula()

})

function recibirPelicula(){
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(carrito)
    imprimirPeliculas(carrito)
    let gastado = carrito.reduce((total, gasto) =>{
        return total + (Number(gasto.precio) * 0.21) + Number(gasto.precio);
    }, 0);
    precioAPagar.innerHTML = `Total: $ ${gastado}`;
}

function imprimirPeliculas(carrito){
    carrito.forEach(pelicula => {
        const li = document.createElement("li");
        li.classList.add("listaCarrito__pelicula");
        li.innerHTML = `
            <img class="imgCarrito" src="${pelicula.img}" alt="${pelicula.nombre}">
            <h3>${pelicula.nombre}</h3>
            <p class="precioCarrito">${pelicula.precio}</p>
        `;
        peliculaAPagar.appendChild(li)
    })
}

numTarjeta.addEventListener("blur", validarForm);
nomTarjeta.addEventListener("blur", validarForm);
ccvTarjeta.addEventListener("blur", validarForm);
formTarjeta.addEventListener("submit", pagado);

function validarForm(){
    if(numTarjeta.value.length === 16){
        numTarjeta.style.border = "1px solid green";
    }else{
        numTarjeta.style.border = "1px solid red";
    }

    if(nomTarjeta !== ""){
        nomTarjeta.style.border = "1px solid green";
    }else{
        nomTarjeta.style.border = "1px solid red";
    }

    if(ccvTarjeta.value.length === 3){
        ccvTarjeta.style.border = "1px solid green";
    }else{
        ccvTarjeta.style.border = "1px solid red";
    }
}

function pagado(e){
    e.preventDefault();

    if(numTarjeta.value.length === 16 && nomTarjeta !== "" && ccvTarjeta.value.length === 3){
        completarCompra();
    }else{
        mostrarError("Complete los campos correctamente");
    }
}

function mostrarError(mensaje){
    const comprobarError = document.querySelector(".error");

    if(!comprobarError){
        const error = document.createElement("div");
        error.classList.add("error");
        error.innerHTML = `
            <p>${mensaje}</p>
        `
        divPago.appendChild(error);
    
        setTimeout(() => {
            error.remove();
        }, 3000);
    }
}

function completarCompra(){
    document.querySelector("#pago").style.visibility = "hidden";
    const insertarSpinner = document.querySelector("main")

    const spinner = document.createElement("div");
    spinner.classList.add("sk-folding-cube", "position-center");
    spinner.innerHTML = `
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    `
    insertarSpinner.appendChild(spinner)

    setTimeout(() => {
        spinner.remove();
        mensajeComprado.classList.add("completarCompra")
        localStorage.removeItem("carrito");
    }, 5000);
}
