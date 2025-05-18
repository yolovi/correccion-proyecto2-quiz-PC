// DOM
const API_URL = "https://opentdb.com/api.php?amount=10&category=27&type=multiple";
const botonGo = document.getElementById("buttom-go");
const botonHome = document.getElementById("button-home");
const vista1 = document.getElementById("vista1");
const vista2 = document.getElementById("vista2");
const preguntas = document.getElementById("preguntas");
const respuesta1Btn = document.getElementById("respuesta1");
const respuesta2Btn = document.getElementById("respuesta2");
const respuesta3Btn = document.getElementById("respuesta3");
const respuesta4Btn = document.getElementById("respuesta4");
const startButton = document.getElementById("buttom-start"); // ¡Nuevo botón START!
const botonAnterior = document.getElementById("btn-anterior"); // Selecciona el botón "Anterior"
const botonSiguiente = document.getElementById("btn-siguiente"); // Selecciona el botón "Siguiente"
const preguntaTitulo = document.getElementById("preguntas");

const mostrarJuego = () => {
    vista1.classList.add("d-none")
    vista2.classList.remove("d-none")
    botonGo.classList.add("btn-btn-primary")
    botonHome.classList.remove("btn-btn-danger")
   
    }
const mostrarHome = () => {
    vista1.classList.remove("d-none")
    vista2.classList.add("d-none")
    botonGo.classList.remove("btn-btn-primary")
    botonHome.classList.add("btn-btn-danger")
    
}

botonGo.addEventListener("click", mostrarJuego);
botonHome.addEventListener("click", mostrarHome);

//async function getQuestions() {
    //try {
       // const response = await fetch(API_URL);
        //if (!response.ok) {
          //  throw new Error("Error en la respuesta de la API");
       // }
        //const data = await response.json();
        //return data.results;
   // }
   

let preguntasArray = []; // Variable para almacenar el array de preguntas
let indicePreguntaActual = 0;
let estaCargandoPreguntas = false

/*const getQuestions = async () => {
    try {
        const res = await axios.get(API_URL)
        const preguntas = res.data.results
       
        console.log(preguntas)
        
    } catch (error) {
        console.error("Error al obtener las preguntas:",error)
    }
}
getQuestions()*/




const getQuestions = async () => {
    if (estaCargandoPreguntas) {
        return;
    }
    estaCargandoPreguntas = true;
    startButton.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const res = await axios.get(API_URL);
        preguntasArray = res.data.results;
        console.log("Array de preguntas recibido:", preguntasArray);
        mostrarPregunta(indicePreguntaActual);
         botonAnterior.disabled = true; // Deshabilita "Anterior" al inicio // Muestra el botón "Anterior"
+        botonSiguiente.classList.remove('d-none'); // Muestra el botón "Siguiente"
     
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
    } finally {
        estaCargandoPreguntas = false;
        startButton.disabled = false;
    }
};

const mostrarPregunta = (indice) => {
    if (indice >= 0 && indice < preguntasArray.length) {
        const preguntaActual = preguntasArray[indice];
        preguntaTitulo.textContent = preguntaActual.question;

        const correcta = preguntaActual.correct_answer;
        const incorrectas = preguntaActual.incorrect_answers;
        const todasLasRespuestas = [correcta, ...incorrectas].sort(() => Math.random() - 0.5);

        respuesta1Btn.textContent = todasLasRespuestas[0] || '';
        respuesta2Btn.textContent = todasLasRespuestas[1] || '';
        respuesta3Btn.textContent = todasLasRespuestas[2] || '';
        respuesta4Btn.textContent = todasLasRespuestas[3] || '';

        respuesta1Btn.dataset.correcta = (respuesta1Btn.textContent === correcta);
        respuesta2Btn.dataset.correcta = (respuesta2Btn.textContent === correcta);
        respuesta3Btn.dataset.correcta = (respuesta3Btn.textContent === correcta);
        respuesta4Btn.dataset.correcta = (respuesta4Btn.textContent === correcta);
    } else {
        preguntaTitulo.textContent = "¡Quiz terminado!";
        respuesta1Btn.textContent = "";
        respuesta2Btn.textContent = "";
        respuesta3Btn.textContent = "";
        respuesta4Btn.textContent = "";
        respuesta1Btn.disabled = true;
        respuesta2Btn.disabled = true;
        respuesta3Btn.disabled = true;
        respuesta4Btn.disabled = true;
    }
};

indicePreguntaActual = 0;
    preguntaTitulo.textContent = "Preguntas";
    respuesta1Btn.disabled = false;
    respuesta2Btn.disabled = false;
    respuesta3Btn.disabled = false;
    respuesta4Btn.disabled = false;


// Event listener para el botón START
startButton.addEventListener('click', () => {
    indicePreguntaActual = 0;
    getQuestions();
});

// Event listener para el botón START
startButton.addEventListener('click', () => {
    indicePreguntaActual = 0;
    getQuestions();
    startButton.classList.add('d-none'); // Añade la clase 'd-none' de Bootstrap para ocultar el botón
});