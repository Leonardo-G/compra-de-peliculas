const menuNav = document.querySelector(".menuNav");
const navEnlaces = document.querySelector(".navegacion__enlaces");
const body = document.querySelector("#inicio");
const btnSubscripcion = document.querySelector("#subscribirse");

const formSubscripcion = document.querySelector("#formSubscribirse");

const main = document.querySelector("main")


formSubscripcion.addEventListener("submit", subscripcionPeliculas);
menuNav.addEventListener("click", abrirMenu);

//Funciones
function abrirMenu(){
    navEnlaces.classList.toggle("menuVisible");
    body.classList.toggle("scrollBody");
};

//Usuario cuando se subscribe
function subscripcionPeliculas(e){
    e.preventDefault();
    formSubscripcion.remove();
    
    const nombre = formSubscripcion["nombre"].value;
    const apellido = formSubscripcion["apellido"].value;

    const nombreSubscripto = document.createElement("h2");
    nombreSubscripto.textContent = `Gracias ${nombre} ${apellido} por subscribirte. Disfrute de nuestro contenido.`;
    nombreSubscripto.classList.add("tituloSubscripto");
    main.appendChild(nombreSubscripto);

    //Mandar informacion localStorage, cuando se subscribe
    const subscripcionAceptada = true;

    const subscripcionString = JSON.stringify(subscripcionAceptada);
    localStorage.setItem("subscripcion", subscripcionString);

    //Ir al catalogo, luego de subscripbirse
    setTimeout(() => {
        localStorage.setItem('carrito', JSON.stringify([]));
        window.location.href = "../index.html"
    }, 3000)
}