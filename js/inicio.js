const tituloInicial = $(".presentacion")
const imgNosotros = $(".imgNosotros")
const caja1 = $(".animation1");
const caja2 = $(".animation2");
const caja3 = $(".animation3");
const caja4 = $(".animation4");
const video = $(".video video");

$(document).on("scroll", subirElemento);
$(document).ready(() => {
    tituloInicial.css("transform", "translateY(0%)")
})

function subirElemento(){
    let ver = document.documentElement.scrollTop;

    if(ver > 400){
        imgNosotros.css("transform", "translateY(0%)")
    }

    if(ver > 1000){
        caja1.css("transform", "translateY(0%)")
        caja2.css("transform", "translateY(0%)")
        caja3.css("transform", "translateY(0%)")
        caja4.css("transform", "translateY(0%)")
    }

    if(ver > 1700){
        video[0].autoplay = true;
    }
}