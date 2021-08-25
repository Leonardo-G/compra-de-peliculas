const btnSubscripcion = document.querySelector("#subscribirse");
btnSubscripcion.addEventListener("click", subscripcionPeliculas);

function subscripcionPeliculas(e){
    e.preventDefault();

    const subscripcionAceptada = true;

    const subscripcionString = JSON.stringify(subscripcionAceptada)
    localStorage.setItem("subscripcion", subscripcionString);

    setTimeout(() => {
        localStorage.setItem('carrito', JSON.stringify([]));
        window.location.href = "../index.html"
    }, 2000)
}