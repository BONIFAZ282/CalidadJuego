/* elementos dom */
const moveToNext = document.getElementById('moveToNext');
const moveToPrev = document.getElementById('moveToPrev');
const btnMostrarCalcu = document.getElementById('mostrarCalcu');
const btnOcultarCalcu = document.getElementById('ocultarCalcu');
const areaTrabajo = document.getElementById("areaTrabajo")
const nombreJugador = document.getElementById("nombreJugador")

const btnTogglePlaneta1 = document.getElementById('togglePlaneta1');
const btnTogglePregunta = document.getElementById('togglePregunta');
const planet1 = document.querySelector('.mundos');
let planet1Visible = false;
let preguntaVisible = false;


const btnComienzaAventura = document.getElementById('comienzaAventura');
const galaxia1 = document.querySelector('.galaxia1');


/* variables  */
let astro = null;
let planetasArray = []
let numeroplanetas = 18;
let index_planeta = -1;



/**
 * Declaracion de clases
 */

class Planeta {
  constructor(areaTrabajo, pos_x, pos_y){
    this.posX = pos_x
    this.posY = pos_y
    this.areaTrabajo = areaTrabajo
  }

  insertarElemento(nombre){
    console.log("Insertando planeta en: " + this.posX + ", " + this.posY)
    var planeta = document.createElement("div");
    planeta.classList.add("planeta")
    planeta.style.left = this.posX + "px"
    planeta.style.top = this.posY + "px"
    planeta.innerHTML = nombre
    this.areaTrabajo.append(planeta);
  }

  mostrarCoordenadas(){
    console.log("X: " + this.posX + ", Y:" + this.posY)
  }
}

class Astronauta {
  constructor(areaTrabajo, planetas){
    this.planetas = planetas
    this.posX = getRandom(0, 100)
    this.posY = getRandom(50, window.innerHeight - 250)
    this.astro = document.createElement("div");
    this.astro.classList.add("astronauta")
    this.astro.style.left = this.posX + "px"
    this.astro.style.top = this.posY + "px"
    this.astro.style.display = "none"

    // insertamos el astronauta en el dom
    areaTrabajo.append(this.astro);
  }

  mostrar(){
    this.astro.style.display = "block"
    this.astro.classList.add("bounce")
  }

  viajarAlPlaneta(index){
    console.log("El astronauta viaja al planeta "+index+"...")
    var planeta =  this.planetas[index]
    planeta.mostrarCoordenadas()

    var distanciaX = planeta.posX - this.posX
    var distanciaY = planeta.posY - this.posY

    console.log("El astronauta debe moverse: " + distanciaX + ", " + distanciaY)

    this.astro.classList.remove("bounce")
    setTimeout(() => {
      this.astro.style["transform"] = "translate("+distanciaX+"px, "+distanciaY+"px)";
    }, 500)
  }
}




function establecerAreaTrabajo(){
  // obtenemos el nombre almacenado en el navegador
  nombreJugador.innerHTML = "Hola " + localStorage.getItem("jugador") + " !!"

  // seteamos las dimensiones del area de trabajo
  areaTrabajo.style.height = (window.innerHeight-10) + "px"
  areaTrabajo.style.width = (window.innerWidth-10) + "px"
  areaTrabajo.style.top = "0px";
}

function poblarUniversoConPlanetasRandom(){
  let posX = 0;
  let posY = 0;
  for(let pla = 0; pla < numeroplanetas; pla ++){

    // obtenemos la posicion random
    posX = getRandom(0, window.innerWidth - 250)
    posY = getRandom(0, window.innerHeight - 350)

    // instancia del objeto
    var plaTemp = new Planeta(areaTrabajo, posX, posY)

    // insertamos en el array de planetas
    planetasArray.push(plaTemp)

    // insertamos el planeta y le ponemos un nombre
    plaTemp.insertarElemento(pla)      
  }

}


function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function iniciarJuego(){
  establecerAreaTrabajo()
  poblarUniversoConPlanetasRandom()
  astro = new Astronauta(areaTrabajo, planetasArray);
  astro.mostrar();
}

//visualizar la galaxia
btnComienzaAventura.addEventListener("click", function () {
  galaxia1.style.display = 'none';
});

//visibilidad del primer planeta

function togglePreguntaVisibility() {
  if (preguntaVisible) {
    pregunt.style.display = 'none';
    preguntaVisible = false;
  } else {
    pregunt.style.display = 'block';
    preguntaVisible = true;
  }
}

btnTogglePregunta.addEventListener("click", togglePreguntaVisibility);

function togglePlaneta1Visibility() {
  if (planet1Visible) {
    planet1.style.display = 'none';
    planet1Visible = false;
  } else {
    planet1.style.display = 'block';
    planet1Visible = true;
  }
}

btnTogglePlaneta1.addEventListener("click", togglePlaneta1Visibility);



/**
 * Binding de los controles
 */
moveToNext.addEventListener("click", function(){
  // validamos que no pase el numero maximo de planetas
  if (index_planeta < numeroplanetas -1){
    index_planeta ++;
  }
  astro.viajarAlPlaneta(index_planeta)
})

moveToPrev.addEventListener("click", function(){
  // validamos que no pase el numero maximo de planetas
  if (index_planeta > 0){
    index_planeta --;
  }
  astro.viajarAlPlaneta(index_planeta)
})

btnMostrarCalcu.addEventListener("click", function(){
  mostrarCalcu();
})

btnOcultarCalcu.addEventListener("click", function(){
  ocultarCalcu();
})

// evento para reconfigurar el tamaño de la pantalla
window.addEventListener("resize", () => {
  location.reload()
})



iniciarJuego();