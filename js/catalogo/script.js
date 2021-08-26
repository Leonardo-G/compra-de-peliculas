//Importamos
//Variables
import {video, sonido, catalogoSeccion, iconoKart, number, carritoOpen, cerrarLista, fondo, lista, precioCarrito, formulario, buscadorGenero, buscandoYear, menuNav, navEnlaces, body } from "./variables.js";

//Clase
import { CarritoPeliculas } from "./CarritoPeliculas.js";
import { imprimirHTMLSubscripto } from "./subscripto.js";
let carrito = [];


//Eventos
document.addEventListener("DOMContentLoaded", () => {
    recibirLocalStorage();
    cargandoJSON();
    agregarYear();
});

menuNav.addEventListener("click", abrirMenu);
sonido.addEventListener("click", sonidoEnable)
iconoKart.addEventListener("click", aparecerLista);
document.querySelector(".btn--pagar").addEventListener("click", pagar)
document.querySelector("#vaciarCarrito").addEventListener("click", vaciarCarrito);

//Obtenemos la informacion en caso de que el usuario se subscribe
let subscripto = localStorage.getItem("subscripcion") || false;

//Funciones
//Sonido video de portada
function sonidoEnable(){
    if(video.muted){
        video.muted = false;
        return;
    }
    if(video.muted === false){
        video.muted = true;
        return;
    }
}

video.disabledPictureInPicture = true; //Todavia no soportado en Firefox 

//Menu de navegacion
function abrirMenu(){
    navEnlaces.classList.toggle("menuVisible");
    body.classList.toggle("scrollBody");
};

//Objeto para guardar los valores de la busqueda de los selects
let objBusqueda = {
    genero: "",
    genero2: "",
    year: ""
}

//Llamamos la informacion que contiene el JSON.
function cargandoJSON(){
    const url = "js/catalogo/peliculas.json";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //Imprimimos las peliculas al cargar el documento
            if(subscripto == "true"){
                imprimirHTMLSubscripto(resultado); // Imprimimos si el usuario esta subscripto
            }else{
                imprimirHTML(resultado); //Imprimims el catalogo con sus precios
            }

            //Imprimimos las peliculas segun el genero que selecciona el usuario
            buscadorGenero.addEventListener("change", (e) => {
                objBusqueda.genero = e.target.value;
                objBusqueda.genero2 = e.target.value;

                buscando(resultado);
            });

            //Buscando el año
            buscandoYear.addEventListener("change", (e) => {
                objBusqueda.year = e.target.value;

                buscando(resultado);
            });
        })
};

function buscando(resultado){

    spinnerBuscando();

    //Buscamos los resultados y lo guardamos en un arreglo
    let buscando = resultado.filter( buscarGenero1 )
    let buscando2 = resultado.filter( buscarGenero2);
    let resultadoBusqueda = [...buscando, ...buscando2];
    resultadoBusqueda = resultadoBusqueda.filter( buscarYear )


    //Aclaramos que no hay peliculas segun se busqueda
    if(resultadoBusqueda.length === 0){
        limpiarHTML(catalogoSeccion);

        const busquedaNula = document.createElement("h2");
        busquedaNula.textContent = "No encontramos lo que buscas... :/";
        catalogoSeccion.appendChild(busquedaNula);

        return;
    }

    //Simulamos una carga de 2s
    setTimeout(() => {
        //Mostrar resultado de la busqueda
        limpiarHTML(catalogoSeccion);
        if(subscripto == "true"){
            imprimirHTMLSubscripto(resultadoBusqueda)
        }else{
            imprimirHTML(resultadoBusqueda);
        }
    }, 2000);
};


/////////////////////FILTRANDO LA BUSQUEDA///////////////////
function buscarGenero1(pelicula){
    if( objBusqueda.genero ){
        return pelicula.genero === objBusqueda.genero;
    }
    //En caso de que el usuario no seleccione un genero, retornamos devuelta el arreglo completo
    return pelicula;
}

function buscarGenero2(pelicula){
    if( objBusqueda.genero2 ){
        return pelicula.genero2 === objBusqueda.genero2;
    }
    //En caso de que el usuario no seleccione un genero, no retornamos nada, porque ya lo hicimos en el filtro anterior en genero1
    return null;
}

function buscarYear(pelicula){
    if( objBusqueda.year ){
        return pelicula.year >= objBusqueda.year;
    }
    //En caso de que el usuario no seleccione un año, retornamos devuelta el arreglo completo
    return pelicula;
}
///////////////////// Fin del FILTRO de la BUSQUEDA///////////////////

//Spinner al buscar una pelicula
function spinnerBuscando(){
    //Limpiar html, para mostrar el spinner
    limpiarHTML(catalogoSeccion);

    const spinner = document.createElement("div");
    spinner.classList.add("sk-folding-cube", "position-center");
    spinner.innerHTML = `
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
    `
    catalogoSeccion.appendChild(spinner)
}

//Agregamos 5 años antes, segun en el año que estemos
function agregarYear(){
    const year = new Date().getFullYear();
    const year2 = year - 5;
    const selectYear = document.querySelector("#year");

    for(let i = year; i > year2; i--){
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option)
    }
}

//Agregamos el HTML
function imprimirHTML(peliculas){

    peliculas.forEach(pelicula => {
        
        const { nombre, year, minutos, precio, img, id} = pelicula;
        catalogoSeccion.innerHTML += `
            <div class="pelicula__seccion" data-id="${id}">
                <div class="bloque">
                    <img class="imgPelicula" src="${img}" alt="${nombre}">
                    <div class="descripcion">
                        <div>
                            <h3 class="tituloBloque">${nombre}</h3>
                            <p class="descripcion__year">${year}</p>
                        </div>
                        <div class="minutos">
                            <p>${minutos}min</p>
                        </div>
                    </div>
                </div>
                <div class="hover">
                    <div class="hover__fondo">
                        <h3 class="fondoTitulo">${nombre}</h3>
                    </div>
                    <div class="hover__descripcion">
                        <p class="precio">${precio}</p>
                    </div>
                </div>
            </div>
        `;
    });

    agregarBoton();
}

//Agregamos el boton para cada pelicula
function agregarBoton(){
    //Agregar btn por cada pelicula
    const agregarBotones = document.querySelectorAll(".hover__descripcion");

    agregarBotones.forEach(agregarBtn => {
        const btn = document.createElement("button");
        btn.classList.add("descripcon--btn" , "btn");
        btn.textContent = "Agregar al carrito";
        agregarBtn.appendChild(btn);

        btn.addEventListener("click", agregarCarrito);
    })
};

//Agregamos elementos al carrito
function agregarCarrito(e){
    e.target.textContent = "Agregado";
    const infoPelicula = e.target.parentElement.parentElement.parentElement;
    const objPelicula = creandoObjetoPelicula(infoPelicula);

    //En caso de que la pelicula no este en el carrito, se lo agrega
    if(contadorPelicula(carrito, objPelicula.id) < 1){
        notificacion("Pelicula agregado correctamente", "agregado");
        carrito.push(objPelicula);
        console.log(carrito)
    }else{
        notificacion("Ya agregaste esta pelicula al carrito", "error"); // No se puede agregar mas de una vez, sino una notificacin
        return;
    }

    //En caso de que el arreglo se agregue el primer elemento, aparece el icono del carrito
    if(carrito.length > 0){
        iconoKart.style.cssText = "opacity: 1; visibility: visible; cursor: pointer";
        number.textContent = carrito.length;
        listaCarrito();
    }
}

//Creamos un objeto para cada elemento que agregamos al carrito
function creandoObjetoPelicula(objeto){
    const nombre = objeto.querySelector(".tituloBloque").textContent;
    const precio = objeto.querySelector(".precio").textContent;
    const year = objeto.querySelector(".descripcion__year").textContent;
    const img = objeto.querySelector(".imgPelicula").getAttribute("src");
    const id = objeto.getAttribute("data-id");
    const pelicula = new CarritoPeliculas(nombre, precio, year, img, id);

    return pelicula;
}

//No permitir al usuario agregar dos veces la misma pelicula
function contadorPelicula(arreglo, idObjeto){
    let contador = 0;
    arreglo.forEach(element => {
        if(element.id === idObjeto){
           ++contador;
        }
    })
    return contador;
}

//Notificar al usuario al hacer click
function notificacion(mensaje, tipo){

    const alertaExiste = document.querySelector(".agregado");

    //Agregar la notificación, solamente cuando no exista
    if(!alertaExiste){
        const alerta = document.querySelector(".alerta");
        const textAlerta = document.createElement("p");
        alerta.classList.add("agregado"); 
            if(tipo === "agregado"){
                textAlerta.textContent = mensaje;
                alerta.innerHTML = `<ion-icon name="checkbox-outline" class="icon-check"></ion-icon>`
                
                alerta.style.backgroundColor = "#51be72";
                alerta.appendChild(textAlerta);
            }else{
                textAlerta.textContent = mensaje;
                alerta.innerHTML = `<ion-icon name="checkbox-outline" class="icon-check"></ion-icon>`;
                alerta.style.backgroundColor = "red";
                alerta.appendChild(textAlerta);
            };
        //Tiempo para eliminar la notificacion
        setTimeout(() => {
            alerta.classList.remove("agregado")
        }, 2000);
    }
}

//Aparecer la lista del carrito
function aparecerLista(){
    fondo.classList.toggle("fondoCarrito");
    carritoOpen.classList.toggle("aparicion");
    fondo.onclick = () => {
        fondo.classList.toggle("fondoCarrito");
        carritoOpen.classList.toggle("aparicion");
    }
    cerrarLista.onclick = () => {
        fondo.classList.toggle("fondoCarrito");
        carritoOpen.classList.toggle("aparicion");
    }
}

//Contenido de la lista del carrito
function listaCarrito(){
    //Limpiar las listas repetidas antes de imprimir de nuevo
    limpiarHTML(lista);

    //Cada elemento que se agrega al carrito, lo imprimos en la lista
    carrito.forEach(pelicula => {
        const li = document.createElement("li");
        li.classList.add("listaCarrito__pelicula");
        li.innerHTML = `
            <img class="imgCarrito" src="${pelicula.img}" alt="${pelicula.nombre}">
            <h3>${pelicula.nombre}</h3>
            <p class="precioCarrito">${pelicula.precio}</p>
        `;
        lista.appendChild(li);
        eliminarElemento(li, pelicula);
    });
    precioTotal();
    agregarLocalStorage();
}

//Limpiar elementos duplicados
function limpiarHTML(elemento){
    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild);
    }
}

//Boton para eliminar una pelicula del carrito
function eliminarElemento(li, pelicula){
    const eliminar = document.createElement("div");
    eliminar.classList.add("probar");
    eliminar.innerHTML = `
        <ion-icon name="close" class="eliminarPelicula" data-id=${pelicula.id}></ion-icon>
    `;
    li.appendChild(eliminar);

    eliminar.onclick = () => {
        carrito = carrito.filter( element => element.id !== pelicula.id);
        number.textContent = carrito.length;
        listaCarrito();
    };

}

//Precio total de los elementos del carrito
function precioTotal(){
    let gastado = carrito.reduce((total, gasto) =>{
        return total + (Number(gasto.precio) * 0.21) + Number(gasto.precio);
    }, 0);

    precioCarrito.textContent = gastado;
}

//PAGAR
function pagar(e){
    // recuperando la informacion de cuanto hay que pagar
    const precioTotalAPagar = document.querySelector(".precioLista #precio").textContent;

    //Si no hay elementos en el carrito, no se podra pagar.
    if(precioTotalAPagar === "0"){
        e.preventDefault()
        notificacion("No hay elementos en el carrito")
    }
}

//Eliminamos todos los elementos del carrito con el boton vaciar carrito
function vaciarCarrito(){
    carrito.splice(0, carrito.length);
    listaCarrito();

    const descripcionBtn = document.querySelectorAll(".descripcon--btn");
    descripcionBtn.forEach(btn => btn.textContent = "Agregar al carrito");

    document.querySelector(".kart-number .number").textContent = 0;
}

//Guardar los datos del Local Storage
function agregarLocalStorage(){
    const arregloString = JSON.stringify(carrito);
    localStorage.setItem('carrito', arregloString);
}

//Recibimos los datos del localStorage
function recibirLocalStorage(){
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    //Hacer visible el boton, en caso de que haya peliculas en la lista
    if(carrito.length > 0){
        iconoKart.style.cssText = "opacity: 1; visibility: visible; cursor: pointer";
        number.textContent = carrito.length;
        listaCarrito();
    }
}