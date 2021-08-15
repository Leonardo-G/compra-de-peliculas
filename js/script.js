//Clase
class CarritoPeliculas{
    constructor(nombre, precio, year, img, id){
        this.nombre = nombre;
        this.precio = precio;
        this.year = year;
        this.img = img;
        this.id = id;
    }
}

//Variables
const catalogoSeccion = document.querySelector(".pelicula");
const video = document.querySelector("video");
const sonido = document.querySelector(".sonido");

//variables de Carrito
const iconoKart = document.querySelector(".kart");
const number = document.querySelector(".number");
const carritoOpen = document.querySelector(".listaCarrito");
const fondo = document.querySelector("#fondo");
const lista = document.querySelector(".listaCarrito ul");
let precioCarrito = document.querySelector(".precioLista #precio");
let carrito = [];

video.disabledPictureInPicture = true; //Todavia no soportado en Firefox 

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

//Eventos
eventos();
function eventos(){
    document.addEventListener("DOMContentLoaded", () => {
        recibirLocalStorage();
        cargandoJSON();
        console.log(carrito)
    });
    sonido.addEventListener("click", sonidoEnable)
    iconoKart.addEventListener("click", aparecerLista)
}
//Buscar Pelicula
const buscadorGenero = document.querySelector("#genero")


let objBusqueda = {
    genero: "",
    genero2: ""
}

function buscarPelicula(peliculas){
    
    console.log(peliculas)
}
function cargandoJSON(){
    const url = "js/peliculas.json";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //Imprimimos las peliculas al cargar el documento
            imprimirHTML(resultado);

            //Imprimimos las peliculas segun el genero que selecciona el usuario
            buscadorGenero.addEventListener("change", (e) => {
                
                spinnerBuscando();

                objBusqueda.genero = e.target.value;
                objBusqueda.genero2 = e.target.value;
                let buscando = resultado.filter( pelicula => pelicula.genero === objBusqueda.genero );
                let buscando2 = resultado.filter(pelicula => pelicula.genero2 === objBusqueda.genero2);
                const resultadoBusqueda = [...buscando, ...buscando2];
                
                //Aclaramos que no hay peliculas segun se busqueda
                if(resultadoBusqueda.length === 0){
                    limpiarHTML(catalogoSeccion);
                    const busquedaNula = document.createElement("h2");
                    busquedaNula.textContent = "No encontramos lo que buscas... :/";
                    catalogoSeccion.appendChild(busquedaNula)
                    return;
                }

                setTimeout(() => {
                    //Mostrar resultado de la busqueda
                    limpiarHTML(catalogoSeccion);
                    imprimirHTML(resultadoBusqueda);
                }, 2000);
            });

        })
};

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

//Mas eventos
const btnPagar = document.querySelector(".btn--pagar").addEventListener("click", pagar)


function imprimirHTML(peliculas){
    
    peliculas.forEach(pelicula => {
        const { nombre, year, minutos, precio, img, id } = pelicula;
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
    agregarBoton("Agregar al carrito")
}

function agregarBoton(mensaje, tipo){

    //Agregar btn por cada pelicula
    const agregarBotones = document.querySelectorAll(".hover__descripcion");

    agregarBotones.forEach(agregarBtn => {
        const btn = document.createElement("button");
        btn.classList.add("descripcon--btn" , "btn");
        btn.textContent = mensaje;
        agregarBtn.appendChild(btn);

        btn.addEventListener("click", agregarCarrito);
    })

    if(tipo === "noAgregar"){
        btn.textContent = mensaje;
        return;
    }
    if(tipo === "subscrito"){
        btn.textContent = mensaje;
        //Luego agregar el link al btn con nombre para VER PELICULA
    }
}

function agregarCarrito(e){
    const infoPelicula = e.target.parentElement.parentElement.parentElement;
    const objPelicula = creandoObjetoPelicula(infoPelicula);

    if(contadorPelicula(carrito, objPelicula.id) < 1){
        notificacion("Pelicula agregado correctamente", "agregado");
        carrito.push(objPelicula);
        console.log(carrito)
    }else{
        notificacion("Ya agregaste esta pelicula al carrito", "error");
        return;
    }

    if(carrito.length > 0){
        iconoKart.style.cssText = "opacity: 1; visibility: visible; cursor: pointer";
        number.textContent = carrito.length;
        listaCarrito();
    }
}

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
           ++contador
        }
    })
    return contador
}

//Notificar al usuario al hacer click
function notificacion(mensaje, tipo){

    const alertaExiste = document.querySelector(".agregado");

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

function aparecerLista(){
    fondo.classList.toggle("fondoCarrito");
    carritoOpen.classList.toggle("aparicion");
    fondo.onclick = () =>{
        fondo.classList.toggle("fondoCarrito");
        carritoOpen.classList.toggle("aparicion");
    }
}

function listaCarrito(){
    //Limpiar las listas repetidas antes de imprimir de nuevo
    limpiarHTML(lista);

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

function precioTotal(){
    let gastado = carrito.reduce((total, gasto) =>{
        return total + (Number(gasto.precio) * 0.21) + Number(gasto.precio);
    }, 0);

    precioCarrito.textContent = gastado;
    console.log(gastado)
}

//Guardar los datos del Local Storage
function agregarLocalStorage(){
    const arregloString = JSON.stringify(carrito);
    localStorage.setItem('carrito', arregloString);
}

function recibirLocalStorage(){
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    //Hacer visible el boton, en caso de que haya peliculas en la lista
    if(carrito.length > 0){
        iconoKart.style.cssText = "opacity: 1; visibility: visible; cursor: pointer";
        number.textContent = carrito.length;
        listaCarrito();
    }
}

//PAGAR
function pagar(e){
    // recuperando la informacion de cuanto hay que pagar
    const precioTotalAPagar = document.querySelector("#precio").textContent;

    //Si no hay elementos en el carrito, no se podra pagar.
    if(precioTotalAPagar === "0"){
        e.preventDefault()
        notificacion("No hay elementos en el carrito")
    }
}
