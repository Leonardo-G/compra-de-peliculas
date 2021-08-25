//Agregamos el HTML
import { catalogoSeccion } from "./variables.js";
                
export function imprimirHTMLSubscripto(peliculas){

    peliculas.forEach(pelicula => {
        
        const { nombre, year, minutos, img, id, video:{link}} = pelicula;
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
                        <button class="descripcon--btn btn--verPelicula btn"><a href="${link}">Ver Pelicula</a></button>
                    </div>
                </div>
            </div>
        `;
    });
    agregarBotonPelicula()
}

//Agregamos el boton para cada pelicula
function agregarBotonPelicula(){
    const btnVerPelicula = document.querySelectorAll(".btn--verPelicula");
    btnVerPelicula.forEach(btnPelicula => {
        btnPelicula.addEventListener("click", verPelicula);
    })
};

function verPelicula(e){
    e.preventDefault();
    const divCine = document.querySelector("#verPeliculaSubscripto");
    
    const cinePelicula = document.createElement("div");
    cinePelicula.classList.add("fondoSubscripcion")

    const iframe = document.createElement("iframe");
    iframe.src = e.target.href;
    iframe.allowFullscreen = true

    const btnCerrar = document.createElement("p");
    btnCerrar.textContent = "X";
    btnCerrar.classList.add("cerrarVideo")

    cinePelicula.appendChild(btnCerrar)
    cinePelicula.appendChild(iframe);
    divCine.appendChild(cinePelicula);

    btnCerrar.onclick = () => {
        cinePelicula.remove()
    }
}