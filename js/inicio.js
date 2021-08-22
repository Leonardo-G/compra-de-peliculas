const menuNav = document.querySelector(".menuNav");
const navEnlaces = document.querySelector(".navegacion__enlaces");
const body = document.querySelector("#body");


const titulo = document.querySelector(".presentacion");
const animation1 = document.querySelector(".animation1");
const animation2 = document.querySelector(".animation2");
const animation3 = document.querySelector(".animation3");
const animation4 = document.querySelector(".animation4");

const imgPortada = document.querySelector(".divPortada");
const nosotros = document.querySelector(".nosotros");
const nosotrosImg = document.querySelector(".nosotros img");

const seccionAnimacion = [animation1, animation2, animation3, animation4];

menuNav.addEventListener("click", abrirMenu);
window.addEventListener("scroll", animacionSecciones);

//Funciones
function abrirMenu(){
    navEnlaces.classList.toggle("menuVisible");
    navegacion.classList.toggle("fixed");
    body.classList.toggle("scrollBody");
};

animacionPortada();
function animacionPortada(){
    const callback = entries => {
        if(entries[0].isIntersecting){
            titulo.style.transform = "translateY(0%)"
        };
    };
    const option = {
        treshold: 0.25
    };
    const observerInt = new IntersectionObserver(callback, option);
    observerInt.observe(imgPortada);
}

function animacionSecciones(){
    const scrollVer = nosotros.getBoundingClientRect().top;
    const ventana = window.innerHeight / 1.3;
    
    if(scrollVer < ventana){
        nosotrosImg.style.transform = "translateY(0%)";
    }
    
    if(scrollVer < 400){
        seccionAnimacion.forEach(elemento => {
            elemento.style.transform = "translate(0%)";
        });
    }
};

