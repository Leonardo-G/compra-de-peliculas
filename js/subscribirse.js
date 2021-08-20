const btnSubscripcion = document.querySelector("#subscripcion");
btnSubscripcion.addEventListener("click", subscripcionPeliculas)

function subscripcionPeliculas(e){
    e.preventDefault();

    const subscripcionAceptada = true;


    const subscripcionString = JSON.stringify(subscripcionAceptada)
    localStorage.setItem("subscripcion", subscripcionString);

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);
}