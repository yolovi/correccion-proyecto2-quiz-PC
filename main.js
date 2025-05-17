// DOM
const botonGo = document.getElementById("buttom-go");
const botonHome = document.getElementById("button-home");
const vista1 = document.getElementById("vista1");
const vista2 = document.getElementById("vista2");

const mostrarJuego = () => {
    vista1.classList.add("d-none")
    vista2.classList.remove("d-none")
    botonGo.classList.add("btn btn-primary")
    botonHome.classList.remove("btn btn-danger")
   
    }
const mostrarHome = () => {
    vista1.classList.remove("d-none")
    vista2.classList.add("d-none")
    botonGo.classList.remove("btn btn-primary")
    botonHome.classList.add("btn btn-danger")
    
}

botonGo.addEventListener("click", mostrarJuego);
botonHome.addEventListener("click", mostrarHome);