// //  Variables Globales y DOM 
// // Arrays para almacenar datos del quiz
 let respuestasUsuario = [];
 let respuestasCorrectasUsuario = [];
 let preguntasArray = [];
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
const startButton = document.getElementById("buttom-start"); 
const botonAnterior = document.getElementById("btn-anterior"); 
const botonSiguiente = document.getElementById("btn-siguiente"); 
const preguntaTitulo = document.getElementById("preguntas");
const botonResultado = document.getElementById("btn-resultados"); 
const vista3 = document.getElementById("vista3")
const botonVolverInicio = document.getElementById("btn-volver-inicio");
const totalAcertadas = document.getElementById("total-acertadas");
const botonRestart = document.getElementById("btn-restart");
const contadorPreguntas = document.getElementById('contadorPreguntas');
const botonesRespuesta = [respuesta1Btn, respuesta2Btn, respuesta3Btn, respuesta4Btn];


//vista 1
    const mostrarJuego = () => {
    vista1.classList.add("d-none")
    vista2.classList.remove("d-none")
    vista3.classList.add("d-none") 
    botonGo.classList.add("btn-btn-primary")
    botonHome.classList.remove("btn-btn-danger")
    indicePreguntaActual = 0
    
}
    //Resetea el juego a un estado inicial, similar a mostrarJuego
     const resetearJuego = () => {
     vista1.classList.add("d-none")
    vista2.classList.remove("d-none")
    vista3.classList.add("d-none") 
    botonGo.classList.add("btn-btn-primary")
    botonHome.classList.remove("btn-btn-danger")
    botonRestart.classList.remove("d-none")
     indicePreguntaActual = 0
     botonAnterior.classList.add('d-none');
    botonSiguiente.classList.add('d-none');
    botonResultado.classList.add('d-none');
    

     }
       

// vista 2
const mostrarHome = () => {
    vista1.classList.remove("d-none")
    vista2.classList.add("d-none")
    vista3.classList.add("d-none")
    botonGo.classList.remove("btn-btn-primary")
    botonHome.classList.add("btn-btn-danger")
    botonResultado.classList.add("btn-btn-success")
    
  }
// vista 3
    const mostrarResultados = () => {
    vista1.classList.add("d-none")
    vista2.classList.add("d-none")
    vista3.classList.remove("d-none")
     botonGo.classList.remove("btn-btn-primary")
    botonHome.classList.remove("btn-btn-danger")

    totalAcertadas.textContent = `¡Acertaste ${respuestasCorrectasUsuario.length} de ${preguntasArray.length} preguntas!`;
    
    }

// botones para mostrar vistas
botonGo.addEventListener("click", mostrarJuego);
botonHome.addEventListener("click", mostrarHome);
botonResultado.addEventListener("click", mostrarResultados);
botonVolverInicio.addEventListener("click", resetearJuego);




   

 // Variable para el estado de carga de preguntas,para evitar múltiples llamadas a la API

let estaCargandoPreguntas = false

// Obtener Preguntas de la API y se estan cargando que desaparezca el boton start, 
// y las guarda en un array
const getQuestions = async () => {
    if (estaCargandoPreguntas) {
        return;
    }
    estaCargandoPreguntas = true;
    startButton.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); //para que le de tiempo coger las preguntas de la api 

        //Realiza la solicitud a la API y espera mediante axios a que tengamos los datos
       const res = await axios.get(API_URL); 

        // Guarda las preguntas (que están en res.data.results) en nuestro array y que nos las muestre
        preguntasArray = res.data.results;
        console.log("Array de preguntas recibido:", preguntasArray);
        mostrarPregunta(indicePreguntaActual);
         
     
    } catch (error) {
        console.error("Error al obtener las preguntas:", error);
    } finally {
        estaCargandoPreguntas = false;
        startButton.disabled = false;
    }
};

const mostrarPregunta = (indice) => {
    resetearEstadoBotones(); 
    resetearEstilosBotones();
    resetearBotonesActivos();
    actualizarContadorPreguntas();
     botonAnterior.disabled = true; 
+    botonSiguiente.classList.remove('d-none');



     if (indice >= 0 && indice < preguntasArray.length) {
        // muestra  la pregunta segun el indice y que muestre a fututo el texto de 
// la pregunta actual
        const preguntaActual = preguntasArray[indice];
         preguntaTitulo.textContent = preguntaActual.question;
     // guardamos en una variable la pregunta correcta y las incorrectas
        const correcta = preguntaActual.correct_answer;
        const incorrectas = preguntaActual.incorrect_answers;
     // que me muestre las preguntas y respuestas de manera aleatoria
        const todasLasRespuestas = [correcta, ...incorrectas].sort(() => Math.random() - 0.5);


       //coge todas las respuestas en una sola constante 
const botonesRespuesta = [respuesta1Btn, respuesta2Btn, respuesta3Btn, respuesta4Btn];

//indica si la respuesta seleccionada es correcta o no
// y asigna el texto a cada botón de respuesta
botonesRespuesta.forEach((btn, i) => {
    btn.textContent = todasLasRespuestas[i] || '';
    btn.dataset.correcta = (btn.textContent === correcta).toString(); // Importante: .toString() para guardar "true" o "false" como string
});
     } else { // que si el indice es mayor que el array de preguntas, se finalice el juego 
    botonesRespuesta.forEach(btn => {
    btn.textContent = "";  // Vacía el texto del botón
    btn.disabled = true;   // Deshabilita el botón
});
       }
};


 // que al apretar boton start, se inicie el juego
startButton.addEventListener('click', () => {
    indicePreguntaActual = 0;
    preguntaTitulo.textContent = "Preguntas";
    getQuestions();
    startButton.classList.add('d-none'); 
    
});
// Botón "Reiniciar" para reiniciar el juego
botonRestart.addEventListener('click', () => {
    indicePreguntaActual = 0;
    preguntaTitulo.textContent = "Preguntas";
    getQuestions();
    botonRestart.classList.add('d-none'); 
    botonSiguiente.disabled = false;
    botonSiguiente.classList.remove('d-none'); 
    respuestasCorrectasUsuario = [];
     totalAcertadas.textContent = `¡Acertaste 0 de ${preguntasArray.length} preguntas!`;
});

// (el indice mas 1) se muestre la siguiente pregunta
const siguientePregunta = () => {
   
    indicePreguntaActual++;
    console.log("Índice de pregunta actual:", indicePreguntaActual);
    mostrarPregunta(indicePreguntaActual);
   
 // deshabilitar boton anterior si estamos en la primera pregunta
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
//  quita el estilo de los botones resetados
const resetearEstilosBotones = () => {

     botonesRespuesta.forEach(btn => {
        btn.classList.remove('btn-success', 'btn-danger'); 
        btn.style.backgroundColor = '';                   
        btn.style.boxShadow = 'none';                     
    });
};
    
// indice menos 1 para que al apretar el boton anterior, se muestre la pregunta anterior
const anteriorPregunta = () => {
    indicePreguntaActual--;
    console.log("Índice de pregunta actual:", indicePreguntaActual);
    mostrarPregunta(indicePreguntaActual);
    };

// Event listener para el botón "Siguiente"
botonSiguiente.addEventListener('click', siguientePregunta);
botonAnterior.addEventListener('click', anteriorPregunta);
totalAcertadas.innerHTML = ''; // Limpiar resultados anteriores totalAcertadas.innerHTML = ''; // Limpiar resultados anteriores


//1. Resetear estilos y deshabilitar todos los botones 
// 2. Aplicar el color correcto o incorrecto
    const aplicarEstilosRespuesta = (botonSeleccionado, correcta) => {
    botonesRespuesta.forEach(btn => {
        
        btn.classList.remove('active'); 
        btn.style.backgroundColor = ''; 
        btn.disabled = true;           

        
        if (btn.textContent === correcta) {
            btn.style.backgroundColor = 'lightgreen';
        } else if (btn === botonSeleccionado) {
            btn.style.backgroundColor = 'salmon'; // Respuesta incorrecta seleccionada
        }
        
    // Marca el botón seleccionado como activo
    botonSeleccionado.classList.add('active');
     });

    
};

// Event Listener para todos los botones de respuesta
    botonesRespuesta.forEach(button => {
    button.addEventListener('click', function() {
        const preguntaActual = preguntasArray[indicePreguntaActual];
        const correcta = preguntaActual.correct_answer; // Obtiene la respuesta correcta de la pregunta actual

        guardarRespuestaSeleccionada(this.textContent); // Guarda el texto del botón clickeado

// Si la respuesta seleccionada es correcta, agrégala al array de correctas
        if (this.dataset.correcta === "true") {
            respuestasCorrectasUsuario.push(this.textContent);
            console.log("Respuesta correcta:", this.textContent);
        }

        // Aplica los estilos de pintado (verde para la correcta, rojo para la incorrecta seleccionada)
        aplicarEstilosRespuesta(this, correcta); // Pasa el botón clickeado y la respuesta correcta
    });
});
//resetearEstadoBotones
 const resetearEstadoBotones = () => {
    resetearEstilosBotones(); 
    botonesRespuesta.forEach(btn => {
        btn.disabled = false; // Asegura que estén habilitados
    });
};

// resetearBotonesActivos
const resetearBotonesActivos = () => {
    botonesRespuesta.forEach(btn => {
        btn.classList.remove('active'); // Simplemente quita la clase 'active'
    });
};
// Guardamos la respuesta seleccionada en el array de respuestas del usuario
const guardarRespuestaSeleccionada = (respuesta) => {
    respuestasUsuario[indicePreguntaActual] = respuesta;
    console.log("Respuestas del usuario:", respuestasUsuario); // Para depuración
};
//PAGINACION
function actualizarContadorPreguntas() {
    // Si hay preguntas cargadas, muestra el contador actual; de lo contrario, "Cargando preguntas..."
    contadorPreguntas.textContent = (preguntasArray && preguntasArray.length > 0) ?
        `${indicePreguntaActual + 1} / ${preguntasArray.length}` :
        'Cargando preguntas...';
}
