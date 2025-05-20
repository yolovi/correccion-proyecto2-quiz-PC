// DOM
 let respuestasUsuario = [];
 let respuestasCorrectasUsuario = [];
 
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
const botonResultado = document.getElementById("btn-resultados"); 
const vista3 = document.getElementById("vista3")
const botonVolverInicio = document.getElementById("btn-volver-inicio");
const totalAcertadas = document.getElementById("total-acertadas");

const mostrarJuego = () => {
    vista1.classList.add("d-none")
    vista2.classList.remove("d-none")
    vista3.classList.add("d-none") 
    botonGo.classList.add("btn-btn-primary")
    botonHome.classList.remove("btn-btn-danger")
    
     
   
    }
const mostrarHome = () => {
    vista1.classList.remove("d-none")
    vista2.classList.add("d-none")
    vista3.classList.add("d-none")
    botonGo.classList.remove("btn-btn-primary")
    botonHome.classList.add("btn-btn-danger")
    botonResultado.clasSList.add("btn btn-success")
    
}

const mostrarResultados = () => {
    vista1.classList.add("d-none")
    vista2.classList.add("d-none")
    vista3.classList.remove("d-none")
     botonGo.classList.remove("btn-btn-primary")
    botonHome.classList.remove("btn-btn-danger")

    totalAcertadas.textContent = `¡Acertaste ${respuestasCorrectasUsuario.length} de ${preguntasArray.length} preguntas!`;
    
    }


botonGo.addEventListener("click", mostrarJuego);
botonHome.addEventListener("click", mostrarHome);
botonResultado.addEventListener("click", mostrarResultados);
botonVolverInicio.addEventListener("click",mostrarHome);



   

let preguntasArray = []; // Variable para almacenar el array de preguntas
let indicePreguntaActual = 0;
let estaCargandoPreguntas = false

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
      resetearEstadoBotones(); 
       // Deshabilita los botones al cargar la pregunta
    resetearEstilosBotones();
     resetearBotonesActivos();
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
 
startButton.addEventListener('click', () => {
    indicePreguntaActual = 0;
    getQuestions();
    startButton.classList.add('d-none'); // Añade la clase 'd-none' de Bootstrap para ocultar el botón
});


const siguientePregunta = () => {
   
    indicePreguntaActual++;
    console.log("Índice de pregunta actual:", indicePreguntaActual);
    mostrarPregunta(indicePreguntaActual);
    resetearEstilosBotones();
    // quito de prueba resetearEstilosBotones();
if (indicePreguntaActual > 0) {
        botonAnterior.disabled = false;
        botonAnterior.classList.remove('d-none');
    }

    // Deshabilitar "Siguiente" si estamos en la última pregunta
    if (indicePreguntaActual === preguntasArray.length - 1) {
        botonSiguiente.disabled = true;
        botonResultado.classList.remove('d-none'); // Muestra el botón "Resultados"
    }
};

const resetearEstilosBotones = () => {
    respuesta1Btn.classList.remove('btn-success', 'btn-danger');
    respuesta2Btn.classList.remove('btn-success', 'btn-danger');
    respuesta3Btn.classList.remove('btn-success', 'btn-danger');
    respuesta4Btn.classList.remove('btn-success', 'btn-danger');
    respuesta1Btn.style.boxShadow = 'none';
    respuesta2Btn.style.boxShadow = 'none';
    respuesta3Btn.style.boxShadow = 'none';
    respuesta4Btn.style.boxShadow = 'none';
    respuesta1Btn.style.backgroundColor = ''; // <--- AGREGADO
    respuesta2Btn.style.backgroundColor = ''; // <--- AGREGADO
    respuesta3Btn.style.backgroundColor = ''; // <--- AGREGADO
    respuesta4Btn.style.backgroundColor = '';

};
const anteriorPregunta = () => {
    indicePreguntaActual--;
    console.log("Índice de pregunta actual:", indicePreguntaActual);
    mostrarPregunta(indicePreguntaActual);
    // quito de prueba resetearEstilosBotones();

    // Deshabilitar "Anterior" si estamos en la primera pregunta
    if (indicePreguntaActual === 0) {
        botonAnterior.disabled = true;
    }

    // Habilitar "Siguiente" si no estamos en la última pregunta
    if (indicePreguntaActual < preguntasArray.length - 1) {
        botonSiguiente.disabled = false;
    }
};

// Event listener para el botón "Siguiente"
botonSiguiente.addEventListener('click', siguientePregunta);
//botonSiguiente.forEach(button => {
    //button.disabled = true; // Habilita el botón "Siguiente" al inicio
    
//});  // Selecciona el botón "Siguiente"

// Event listener para el botón "Anterior" (asegúrate de tenerlo)

botonAnterior.addEventListener('click', anteriorPregunta);





respuesta1Btn.addEventListener('click', () => {
    resetearEstilosBotones();
    resetearBotonesActivos();
    respuesta1Btn.classList.add('active');
    const preguntaActual = preguntasArray[indicePreguntaActual];
        
        const correcta = preguntaActual.correct_answer;

guardarRespuestaSeleccionada(respuesta1Btn.textContent);
resetearEstilosBotones();
    if(respuesta1Btn.dataset.correcta === "true") {
        respuestasCorrectasUsuario.push(respuesta1Btn.textContent);
        // pintar boton! verde
        respuesta1Btn.style.backgroundColor = 'lightgreen';
        console.log("Respuesta correcta:", respuesta1Btn.textContent);
    }else{

        if(respuesta2Btn.textContent === correcta){
            respuesta2Btn.style.backgroundColor = 'lightgreen';
            //pintar boton 2 verde
        }else if(respuesta3Btn.textContent === correcta){
            //pintar boton 3verde
            respuesta3Btn.style.backgroundColor = 'lightgreen';
        }else if(respuesta4Btn.textContent === correcta){
            //pintar boton 4 verde
            respuesta4Btn.style.backgroundColor = 'lightgreen';
        }
    }
 
});

respuesta2Btn.addEventListener('click', () => {
    resetearEstilosBotones();
    resetearBotonesActivos();
    respuesta2Btn.classList.add('active');

    const preguntaActual = preguntasArray[indicePreguntaActual];
        
        const correcta = preguntaActual.correct_answer;

    guardarRespuestaSeleccionada(respuesta2Btn.textContent);
    resetearEstilosBotones();
        if(respuesta2Btn.dataset.correcta === "true") {
        respuestasCorrectasUsuario.push(respuesta2Btn.textContent);
        console.log("Respuesta correcta:", respuesta2Btn.textContent);
    }else{

        if(respuesta1Btn.textContent === correcta){
            respuesta1Btn.style.backgroundColor = 'lightgreen';
            //pintar boton 2 verde
        }else if(respuesta3Btn.textContent === correcta){
            //pintar boton 3verde
            respuesta3Btn.style.backgroundColor = 'lightgreen';
        }else if(respuesta4Btn.textContent === correcta){
            //pintar boton 4 verde
            respuesta4Btn.style.backgroundColor = 'lightgreen';
        }
    }
    });




    
   


respuesta3Btn.addEventListener('click', () => {
    resetearEstilosBotones();
    resetearBotonesActivos();
    respuesta3Btn.classList.add('active');
    const preguntaActual = preguntasArray[indicePreguntaActual];
        
        const correcta = preguntaActual.correct_answer;

guardarRespuestaSeleccionada(respuesta3Btn.textContent);
resetearEstilosBotones();
    if(respuesta3Btn.dataset.correcta === "true") {
        respuestasCorrectasUsuario.push(respuesta3Btn.textContent);
        console.log("Respuesta correcta:", respuesta3Btn.textContent);
    }else{

        if(respuesta2Btn.textContent === correcta){
            respuesta2Btn.style.backgroundColor = 'lightgreen';
            //pintar boton 2 verde
        }else if(respuesta1Btn.textContent === correcta){
            //pintar boton 3verde
            respuesta1Btn.style.backgroundColor = 'lightgreen';
        }else if(respuesta4Btn.textContent === correcta){
            //pintar boton 4 verde
            respuesta4Btn.style.backgroundColor = 'lightgreen';
        }
    }
});
    
   
 


respuesta4Btn.addEventListener('click', () => {
    resetearEstilosBotones();
    resetearBotonesActivos();
    respuesta4Btn.classList.add('active');
const preguntaActual = preguntasArray[indicePreguntaActual];
        
        const correcta = preguntaActual.correct_answer;

    if(respuesta4Btn.dataset.correcta === "true") {
        respuestasCorrectasUsuario.push(respuesta4Btn.textContent);
        console.log("Respuesta correcta:", respuesta4Btn.textContent);
    }else{

        if(respuesta2Btn.textContent === correcta){
            respuesta2Btn.style.backgroundColor = 'lightgreen';
            //pintar boton 2 verde
        }else if(respuesta3Btn.textContent === correcta){
            //pintar boton 3verde
            respuesta3Btn.style.backgroundColor = 'lightgreen';
        }else if(respuesta1Btn.textContent === correcta){
            //pintar boton 4 verde
            respuesta1Btn.style.backgroundColor = 'lightgreen';
        }
    }
    //resetearEstilosBotones();
//guardarRespuestaSeleccionada(respuesta4SBtn.textContent);

});
     
    // Aquí podrías también agregar la lógica para verificar la respuesta


const mostrarPreguntaBoteonesDesactivados = (indice) => {
    resetearBotones(); // Esta línea remueve la clase 'active'
    if (indice >= 0 && indice < preguntasArray.length) {
        
 }
   
};


const resetearEstadoBotones = () => {
    resetearEstilosBotones(); // Remueve la clase 'active' y otros estilos visuales
    respuesta1Btn.disabled = false; // Habilita el botón
    respuesta2Btn.disabled = false; // Habilita el botón
    respuesta3Btn.disabled = false; // Habilita el botón
    respuesta4Btn.disabled = false; // Habilita el botón
};

const resetearBotonesActivos = () => {
    respuesta1Btn.classList.remove('active');
    respuesta2Btn.classList.remove('active');
    respuesta3Btn.classList.remove('active');
    respuesta4Btn.classList.remove('active');
};



    totalAcertadas.innerHTML = ''; // Limpiar resultados anteriores

  

const guardarRespuestaSeleccionada = (respuesta) => {
    respuestasUsuario[indicePreguntaActual] = respuesta;
    console.log("Respuestas del usuario:", respuestasUsuario); // Para depuración
};