
let numPlaneta = 0;
let posicionesOcupadas = [];
let planeta = "";
let planetas = [];
let planetasAux = [];
let final = false;
let nave = null;
let energia = null;
let casco = null;
let supervivientes = null;
let calentamiento = document.getElementById("jump-progress");
let planetasPantalla = [];
let planetapulsado = null;
let posicionPlanetaPulsadoL = 0;
let posicionPlanetaPulsadoT = 0;
let alturaPlanetaPulsado = 0;
let anchuraPlanetaPulsado = 0;
let contadorSalto = 0;
let intervalo = null;
let intervaloEscudo = null;
let aleatorio = null;
let catchEjecutado = false;
let span = document.getElementById("cerrarModal");
let span2 = document.getElementById("closeInfo");
let modal = document.getElementsByClassName("modal")[0];
let ataqueEnemigoB = false;
let armaSeleccionada=1;
let naveEnemigaO = null;
let misiles = 5;
let contadorLaser=0;
let ammunition=document.getElementById("ammunition-meter");
ammunition.innerHTML = misiles;
let escudo=0;
let escudoM = document.getElementById("shield-control");
let escudoInfo = document.getElementsByClassName("shieldInfo")[0];
let aleatorioT = 0;
let pausa=false;
let aleatorioAux=0;

function mostrarEscudoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("shield-interface").style.display = "block";
    let boton = document.getElementById("shield");
    boton.style.transform = "scale(1.1)";
    boton.style.opacity = "1";
}

function mostrarPropulsorInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("propulsor-interface").style.display = "block";
    let boton = document.getElementById("propulsor");
    boton.style.transform = "scale(1.1)";
    boton.style.opacity = "1";
}

function mostrarArmaInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("arma-interface").style.display = "block";
    let boton = document.getElementById("arma");
    boton.style.transform = "scale(1.1)";
    boton.style.opacity = "1";
}



function mostrarMotorSaltoInterface() {
    ocultarTodasLasInterfaces();
    document.getElementById("motor-salto-interface").style.display = "block";
    let boton = document.getElementById("motor");
    boton.style.transform = "scale(1.1)";
    boton.style.opacity = "1";
}

function ocultarTodasLasInterfaces() {
    let boton = document.getElementById("arma");
    boton.style.transform = "scale(1)";
    boton.style.opacity = "0.5";
    let boton2 = document.getElementById("motor");
    boton2.style.transform = "scale(1)";
    boton2.style.opacity = "0.5";
    let boton3 = document.getElementById("propulsor");
    boton3.style.transform = "scale(1)";
    boton3.style.opacity = "0.5";
    let boton4 = document.getElementById("shield");
    boton4.style.transform = "scale(1)";
    boton4.style.opacity = "0.5";
    document.getElementById("shield-interface").style.display = "none";
    document.getElementById("propulsor-interface").style.display = "none";
    document.getElementById("arma-interface").style.display = "none";
    document.getElementById("motor-salto-interface").style.display = "none";
}
function cambiarArma(){
    let laser = document.getElementById("labelLaser");
    let misil = document.getElementById("labelMisil");
    let meterLaser = document.getElementById("laser-meter");
    let meterMisil = document.getElementById("ammunition-meter");

    if(armaSeleccionada === 1){
        misil.style.opacity = "1";
        laser.style.opacity = "0.5";
        meterLaser.style.opacity = "0.5";
        meterMisil.style.opacity = "1";
        armaSeleccionada=2;
    }else{
        misil.style.opacity = "0.5";
        laser.style.opacity = "1";
        meterLaser.style.opacity = "1";
        meterMisil.style.opacity = "0.5";
        armaSeleccionada=1;
    }
}
/*---MostrarPlanetas---*/
function mostrarPlanetas() {
    if (catchEjecutado === false) {
        let planet = numPlaneta;
        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        let colisionDetectada = false;

        do {
            let randomLeft = Math.random() * 31 + 35;
            let randomTop = Math.random() * 31 + 25;
            let randomWidth = Math.random() * 100 + 65;

            randomLeft = (randomLeft / 100) * viewportWidth;
            randomTop = (randomTop / 100) * viewportHeight;

            colisionDetectada = false;

            for (const posicion of posicionesOcupadas) {
                let [x, y, w, h] = posicion.split('_').map(parseFloat);
                if (colision(randomLeft, randomTop, randomWidth, randomWidth, x, y, w, h)) {
                    colisionDetectada = true;
                    break;
                }
            }

            if (!colisionDetectada) {
                let aleatorio = Math.floor(Math.random() * planetas.length);
                planeta = planetas[aleatorio];
                //coger nombre
                try {
                    let nombre = planeta.nombre;
                    planet = nombre;
                    posicionesOcupadas.push(`${randomLeft}_${randomTop}_${randomWidth}_${randomWidth}`);
                    let div = document.createElement("div");
                    div.style.position = "absolute";
                    div.style.left = randomLeft + "px";
                    div.style.top = randomTop + "px";
                    div.style.width = randomWidth + "px";
                    div.style.height = randomWidth + "px";
                    div.style.background = "url('recursos/" + nombre + ".png')";
                    div.onclick = function () {
                        encontrar(nombre);
                    };
                    div.className = "planeta";
                    div.style.backgroundSize = "contain";
                    div.style.backgroundRepeat = "no-repeat";
                    document.body.appendChild(div);
                    planetas.splice(aleatorio, 1);
                    planetasPantalla.push(planeta);
                } catch (error) {
                    final = true;
                    catchEjecutado = true;
                }
            }
        } while (colisionDetectada);
    }

}
function colision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
function encontrar(planeta) {
    let holo = document.getElementsByClassName("holo")[0];
    let card = document.getElementsByClassName("card")[0];
    //recorrer el array de planetas y encontrar el que tenga el nombre del planeta
    for (let i = 0; i < planetasAux.length; i++) {

        if (planeta === planetasAux[i].nombre) {
            planeta = planetasAux[i].nombre;
            energia = planetasAux[i].energia;
            supervivientes = planetasAux[i].supervivientes;
            piezas = planetasAux[i].piezas;
            guerra = planetasAux[i].guerra;

            break;
        }

    }
    let explicacion = document.getElementsByClassName("explicacion")[0];
    let piezaS = (parseInt(piezas) - Math.floor(Math.random() * 11));
    if (piezaS < 0) {
        piezaS = 0;
    }
    let piezasorpresa = "" + piezaS + "-" + (parseInt(piezas) + Math.floor(Math.random() * 11));
    let energiaS = (parseInt(energia) - Math.floor(Math.random() * 11));
    if (energiaS < 0) {
        energiaS = 0;
    }
    let energiasorpresa = "" + energiaS + "-" + (parseInt(energia) + Math.floor(Math.random() * 11));

    explicacion.innerHTML = "<h3>" + planeta + "</h3><p>La energía del planeta es: " + energiasorpresa + "</p><p>Las piezas del planeta son: " + piezasorpresa + "</p><p>Los supervivientes del planeta son: 0-5" + "</p><p>Probabilidad de ataque: " + guerra + "%</p>";
    holo.style.display = "block";
    card.style.display = "block";
    explicacion.style.display = "block";
    card.style.backgroundImage = "url(recursos/" + planeta + ".png)";
    mostrarMotorSaltoInterface();
    planetapulsado = planeta;
    let botonAterrizar = document.getElementById("botonSalto");
    botonAterrizar.disabled = false;


}

function salto() {
    for (let i = 0; i < 3; i++) {
        numPlaneta++;
        mostrarPlanetas();
    }
    numPlaneta = 0;
    posicionesOcupadas.length = 0;
}
const nombresDePlanetas = [
    'Alderion', 'Belthor', 'CaelumPrime', 'Denebria', 'ElysiumIX', 'Feronis', 'Galadria', 'HydrosBeta', 'IcarusMajor', 'JovionMinor',
    'KronosPrime', 'Luminara', 'Marsalis', 'NebulaeV', 'OrionisDelta', 'PolarisNova', 'Quintaris', 'RigelAlpha', 'StellarisGamma',
    'TerraNova', 'UmbraPrime', 'VesperaMinor', 'Wraithon', 'Xylophis', 'Yggdrasil', 'Zephyria', 'AlphaCentauri', 'BorealisPrime',
    'CelestiaMajor', 'Dreadnought'
];

// Función para obtener y eliminar un elemento aleatorio de un array
function obtenerYEliminarElementoAleatorio(array) {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array.splice(indiceAleatorio, 1)[0];
}

// Array de 40 planetas

function inicializarPlanetas() {
    for (let i = 0; i < 30; i++) {
        const nombre = obtenerYEliminarElementoAleatorio(nombresDePlanetas);
        const energia = Math.floor(Math.random() * 51);
        const piezas = Math.floor(Math.random() * 51);
        const supervivientes = Math.floor(Math.random() * 6);
        const guerra = Math.floor(Math.random() * 101);
        planetas.push(new Planeta(nombre, energia, piezas, supervivientes, guerra));
    }
    planetasAux = [...planetas];
}

/*--Temporizador--*/
let temporizador = 0;
let tiempo = document.getElementById("tiempo");

function cuentaRegresiva() {
  
    temporizador = 0;
    clearInterval(intervalo);
    let botonSalto = document.getElementsByClassName("salto-pushable")[0];
    botonSalto.style.display = "none";
    if(pausa==false){
        aleatorioT = Math.floor(Math.random() * 61) + 120;
    }else{
        aleatorioT=aleatorioAux;
    }
   
    tiempo.value = new Date(aleatorioT * 1000).toISOString().substr(11, 8);
    intervalo = setInterval(function () {
       let enfriamiento= enfriar();
       calentamiento.value = calentamiento.value - enfriamiento/10;
       let energiaM = document.getElementById("energy-meterD");
       energiaM.value = energiaM.value - enfriamiento/50;
        if (aleatorioT === 0) {
            clearInterval(intervalo);
            final = true;
            let cero=new Date(0).toISOString().substr(11, 8);
            tiempo.value = cero;
            tiempo.style.color = "red";
            tiempo.classList.remove("pocotiempo");
            
        }
        else if (aleatorioT == 30) {
            aleatorioT--;
            tiempo.value = new Date(aleatorioT * 1000).toISOString().substr(11, 8);
            tiempo.style.color = "red";
            tiempo.classList.add("pocotiempo");
        }
        else {
            aleatorioT--;
            
            if (calentamiento.value <= 50 && calentamiento.value > 25) {
                calentamiento.value = calentamiento.value - 1;
                calentamiento.classList.remove("tiempo");
                calentamiento.classList.add("tiempomedio");
            }
            else if (calentamiento.value <= 25) {
                calentamiento.classList.remove("tiempomedio");
                calentamiento.classList.remove("tiempo");
                calentamiento.classList.add("tiempobajo");
                calentamiento.value = calentamiento.value - 1;
                botonSalto.style.display = "block";
            }
            else {
                calentamiento.value = calentamiento.value - 1;
            }
            tiempo.value = new Date(aleatorioT * 1000).toISOString().substr(11, 8);

        }
    }, 1000);
}

/*--Generador de nave--*/
function generarNave() {

    nave = new Nave("Jugador", 75, 75, 150);
    energia = document.getElementById("energy-meterD");
    casco = document.getElementById("damage-meter");
    supervivientes = document.getElementById("survivor-meter");
    energia.value = nave.energia;
    casco.value = nave.casco;
    supervivientes.value = nave.supervivientes;
    return nave;

}

/*--Funciones de Aterrizar--*/
function sumarRecursos() {
    let planet = new Planeta();
    for (let i = 0; i < planetasAux.length; i++) {

        if (planetapulsado === planetasAux[i].nombre) {
            planet = planetasAux[i];
            break;
        }

    }
    let energia = document.getElementById("energy-meterD");
    let casco = document.getElementById("damage-meter");
    let supervivientes = document.getElementById("survivor-meter");
    energia.value = parseInt(energia.value) + parseInt(planet.energia);
    casco.value = parseInt(casco.value) + parseInt(planet.piezas);
    misiles = misiles + parseInt(planet.supervivientes);
    ammunition.innerHTML = misiles;
    supervivientes.value = parseInt(supervivientes.value) + parseInt(planet.supervivientes);
    let div = document.getElementsByClassName("planetaAterrizar")[0];
    const animacion = div.animate(
        [
            {
                width: '850px',
                height: '850px',
                position: 'absolute',
                top: '0',
                left: '0'
            },
            {
                height: alturaPlanetaPulsado,
                width: anchuraPlanetaPulsado,
                position: "absolute",
                top: posicionPlanetaPulsadoT,
                left: posicionPlanetaPulsadoL
            },
        ],
        {
            duration: 3000,
            fill: 'forwards',
        }
    );
    animacion;
    animacion.onfinish = function () {
        div.className.remove = "planetaAterrizar";
        div.className = "planeta";
        div.style.opacity = "0.8";
        div.style.cursor = "pointer";
        div.style.filter = "grayscale(100%)";
        div.onclick = function () { };


        //que no se vean el resto de planetas
        let div2 = document.getElementsByClassName("planeta");
        for (let i = 0; i < div2.length; i++) {
            div2[i].style.display = "block";
        }


    }
    let holo = document.getElementsByClassName("holo")[0];
    holo.style.display = "none";
    let card = document.getElementsByClassName("card")[0];
    card.style.display = "none";
    let explicacion = document.getElementsByClassName("explicacion")[0];
    explicacion.style.display = "none";
    modalSalir();
    planetapulsado = null;

}
function aterrizar() {
    let planet = new Planeta();
    for (let i = 0; i < planetasAux.length; i++) {

        if (planetapulsado === planetasAux[i].nombre) {
            planet = planetasAux[i];
            break;
        }

    }
    let probabilidad = Math.floor(Math.random() * 101);
    if (planet.guerra > probabilidad) {
        generarNaveEnemiga();
        //no mostar el resto de planetas
        let div = document.getElementsByClassName("planeta");
        for (let i = 0; i < div.length; i++) {
            div[i].style.display = "none";
        }
        //eliminar onclick del planeta
        let energia = document.getElementById("energy-meterD");
        energia.value = parseInt(energia.value) - 10;

        for (let i = 0; i < div.length; i++) {
            //recorrer el array de planetas y encontrar el que tenga el nombre del planeta
            if (planetapulsado === planetasPantalla[i].nombre) {
                div[i].style.cursor = "default";
                div[i].className.remove = "planeta";
                div[i].className = "planetaAterrizar";

                //que no se vean el resto de planetas
                let div2 = document.getElementsByClassName("planeta");
                for (let i = 0; i < div.length; i++) {
                    div2[i].style.display = "none";
                }
                break;
            }
        }
        cogerMedidas();
    }
    else {
        //eliminar onclick del planeta
        let energia = document.getElementById("energy-meterD");
        energia.value = parseInt(energia.value) - 10;
        let div = document.getElementsByClassName("planeta");

        for (let i = 0; i < div.length; i++) {
            //recorrer el array de planetas y encontrar el que tenga el nombre del planeta
            if (planetapulsado === planetasPantalla[i].nombre) {
                div[i].style.cursor = "default";
                div[i].className.remove = "planeta";
                div[i].className = "planetaAterrizar";

                //que no se vean el resto de planetas
                let div2 = document.getElementsByClassName("planeta");
                for (let i = 0; i < div.length; i++) {
                    div2[i].style.display = "none";
                }
                break;
            }
        }
        cogerMedidas();
    }
    let botonAterrizar = document.getElementById("botonSalto");
    botonAterrizar.disabled = true;

}
function cogerMedidas() {
    let divPlaneta = document.getElementsByClassName("planetaAterrizar")[0];
    posicionPlanetaPulsadoL = divPlaneta.style.left;
    posicionPlanetaPulsadoT = divPlaneta.style.top;
    alturaPlanetaPulsado = divPlaneta.style.height;
    anchuraPlanetaPulsado = divPlaneta.style.width;
}
/*--Salto*/
function saltar() {
    cambiarFondo();

    if (contadorSalto >= 5) {
      let ganado=  document.getElementsByClassName("ganado")[0];
        ganado.style.display = "block";
    } else {
        let planetas = document.getElementsByClassName("planeta");
        const planetaNumero = planetas.length;
        //recorrer y eliminar
        for (let i = 0; i < planetaNumero; i++) {
            planetas[0].remove();
        }
        planetapulsado = null;
        planetasPantalla = [];
        cuentaRegresiva();
        let holo = document.getElementsByClassName("holo")[0];
        holo.style.display = "none";
        let card = document.getElementsByClassName("card")[0];
        card.style.display = "none";
        let explicacion = document.getElementsByClassName("explicacion")[0];
        explicacion.style.display = "none";
        let porcentaje = document.getElementById("speed-slider");
        porcentaje.value=0;
        enfriar();
        salto();
        contadorSalto++;
    }
}
let botonSalto = document.getElementsByClassName("salto-pushable")[0];
botonSalto.onclick = function () {
    let energia = document.getElementById("energy-meterD");
    energia.value = parseInt(energia.value) - 20;
    saltar();
    calentamiento.value = 100;
    calentamiento.classList.remove("tiempomedio");
    calentamiento.classList.add("tiempo");
    calentamiento.classList.remove("tiempobajo");

}
/*--SaltoEmergencia--*/
let botonSaltoE = document.getElementsByClassName("saltoE-pushable")[0];
botonSaltoE.onclick = function () {
    let energia = document.getElementById("energy-meterD");
    energia.value = parseInt(energia.value) - 50;
    saltar();
    calentamiento.value = 100;
    calentamiento.classList.remove("tiempomedio");
    calentamiento.classList.add("tiempo");
    calentamiento.classList.remove("tiempobajo");
    let naveEnemigaD = document.getElementById("naveEnemiga");
    naveEnemigaD.style.display = "none";
    ataqueEnemigoB = false;
    let porcentaje = document.getElementById("speed-slider");
    porcentaje.value=0;
    enfriar();
}
/*--ModalRecursos--*/
function modalSalir() {
    modal.style.display = "block";
    let energiaP = document.getElementById("pEnergia");
    let piezasP = document.getElementById("pPiezas");
    let supervivientesP = document.getElementById("pSupervivientes");
    let planet = new Planeta();
    for (let i = 0; i < planetasAux.length; i++) {

        if (planetapulsado === planetasAux[i].nombre) {
            planet = planetasAux[i];
            break;
        }

    }
    energiaP.innerHTML = "Energia: " + planet.energia;
    piezasP.innerHTML = "Piezas: " + planet.piezas;
    supervivientesP.innerHTML = "Supervivientes: " + planet.supervivientes;
}
span.onclick = function () {
    modal.style.display = "none";
}
/*ModalInfo*/
function modalInfo() {
    let modal = document.getElementsByClassName("modalInfo")[0];
    modal.style.display = "block";
    let pausa= document.getElementsByClassName("fondoPausa")[0];
    pausa.style.display = "block";
   parar();
}
span2.onclick = function () {
    let modal = document.getElementsByClassName("modalInfo")[0];
    modal.style.display = "none";
    let pausa= document.getElementsByClassName("fondoPausa")[0];
    pausa.style.display = "none";
    reanudar();
}
function parar(){
  aleatorioAux=aleatorioT;
    pausa=true;
    
    clearInterval(intervalo);
}
function reanudar(){
   
    cuentaRegresiva();
}
/*--Funcion cambiar fondo--*/
//array del 1 al 10
let array = [ "fondo1", "fondo2", "fondo3", "fondo4", "fondo5", "fondo6", "fondo7", "fondo8", "fondo9"];
function cambiarFondo() {
    let fondoaleatorio = Math.floor(Math.random() * array.length);
    //body
    //asegurarse de que el numero esta en el array
   
    let fondo = document.getElementsByTagName("body")[0];
    
    fondo.style.backgroundImage = "url(recursos/fondo/" + array[fondoaleatorio] + ".avif)";
    
    //eliminar del array
    array.splice(fondoaleatorio, 1);
}
/*--GeneracioneEnemigos--*/
function generarNaveEnemiga() {
    let naveEnemigaD = document.getElementById("naveEnemiga");
    let aleatorio = Math.floor(Math.random() * 3);
    if (aleatorio === 0) {
        nave = new naveEnemiga("Caza", 10, 10);
        ataqueEnemigo(nave);
        naveEnemigaO = nave;
        ataqueEnemigoB = true;
        naveEnemigaD.classList.remove("galeon");
        naveEnemigaD.classList.remove("media");

        naveEnemigaD.classList.add("caza");
    }
    else if (aleatorio === 1) {
        nave = new naveEnemiga("Galeon", 30, 2);
        ataqueEnemigo(nave);
        naveEnemigaO = nave;
        ataqueEnemigoB = true;
        naveEnemigaD.classList.remove("caza");
        naveEnemigaD.classList.remove("media");

        naveEnemigaD.classList.add("galeon");

    }
    else {
        nave = new naveEnemiga("Media", 20, 5);
        ataqueEnemigo(nave);
        naveEnemigaO = nave;
        ataqueEnemigoB = true;
        naveEnemigaD.classList.remove("caza");
        naveEnemigaD.classList.remove("galeon");

        naveEnemigaD.classList.add("media");

    }
    naveEnemigaD.style.display = "block";
}
/*--AtaqueEnemigo--*/
function ataqueEnemigo(nave) {
    let interval =setInterval(function () {
        if(ataqueEnemigoB === true){
            let naveEnemigaD = document.getElementById("naveEnemiga");
            let casco = document.getElementById("damage-meter");
            let supervivientes = document.getElementById("survivor-meter");
            let escudoValue = escudoM.value;
            if(escudoValue == 0){
            casco.value = parseInt(casco.value) - (nave.daño/1);
            supervivientes.value = parseInt(supervivientes.value) - (nave.daño/2/1);
            }else if(escudoValue == 100){
                casco.value = (casco.value);
                supervivientes.value = (supervivientes.value);
            }
            else{
            casco.value = (casco.value) - (nave.daño/escudoValue);
            supervivientes.value = (supervivientes.value) - (nave.daño/2/escudoValue);
            casco.value = (casco.value);
            supervivientes.value = (supervivientes.value);
        }
            let dañoDiv = document.getElementsByClassName("dañoDiv")[0];
            if(dañoDiv.style.display === "none"){
                dañoDiv.style.display = "block";}
            else{
                dañoDiv.style.display = "none";
            }
        }else{
            clearInterval(interval);
            let dañoDiv = document.getElementsByClassName("dañoDiv")[0];
            dañoDiv.style.display = "none";
        }
  
    }, 1000);
}
/*--Disparos--*/
function disparar(){
    if(ataqueEnemigoB===true){
        if(armaSeleccionada === 1){
            if(contadorLaser === 5){
               let disparar=document.getElementById("disparar");
                disparar.disabled = true;
                disparar.classList.remove("habilitado");
                disparar.classList.add("deshabilitado");
            }else{
                dispararLaser();
                contadorLaser++;
            }
            
            
        }else{
            dispararMisil();
        }
    }
    
}
function dispararLaser(){
    if(naveEnemigaO.vida > 0){
        let vidaEnemigo=naveEnemigaO.vida;
        naveEnemigaO.vida = vidaEnemigo - 1;
    }else{
        let naveEnemigaD = document.getElementById("naveEnemiga");
        naveEnemigaD.style.display = "none";
        ataqueEnemigoB = false;
        sumarRecursos();
    }

}
function dispararMisil(){
    if(naveEnemigaO.vida > 0){
        let vidaEnemigo=naveEnemigaO.vida;
        ammunition.innerHTML = misiles;
        if(misiles === 0){
            misiles=0;
            ammunition.innerHTML = misiles;
            botonMisil.disabled = true;
        }else{
            misiles--;
            naveEnemigaO.vida = vidaEnemigo - 5;
            ammunition.innerHTML = misiles;
        }
    }else{
        let naveEnemigaD = document.getElementById("naveEnemiga");
        naveEnemigaD.style.display = "none";
        ataqueEnemigoB = false;
        sumarRecursos();
    }
}
function recargar(){
   contadorLaser=0; 
   let disparar=document.getElementById("disparar");
    disparar.classList.remove("deshabilitado");
    disparar.classList.add("habilitado");
   disparar.disabled = false;

}
/*--Escudo--*/
function activarEscudo(){
   
        if(intervaloEscudo != null){
            clearInterval(intervaloEscudo);
           }
           let energiaM = document.getElementById("energy-meterD");
            escudo=escudoM.value;
             intervaloEscudo = setInterval(function () {
                if(ataqueEnemigoB===true){
                if(escudo > 0){
                   energiaM.value = (energiaM.value) - (escudo/10);
                   
                   escudoInfo.innerHTML =  escudoM.value;
                   energiaM.innerHTML = energiaM.value;
                }else{
                    clearInterval(intervaloEscudo);
                }} else{
                    clearInterval(intervaloEscudo);
                    escudo=0;
            
                    escudoInfo.innerHTML =  0;
                    escudoM.value = 0;
                }

            },1000);
    }
escudoM.onchange = function(){
    activarEscudo();
}
/*--Enfriamiento del motor */
function enfriar(){
    let porcentaje = document.getElementById("speed-slider");
    let porcentajeValue = porcentaje.value;
    let enfriamientoInfo = document.getElementsByClassName("enfriamientoInfo")[0];
    enfriamientoInfo.innerHTML = porcentajeValue;
    return porcentajeValue;
}
/*--Comprobador--*/
function comprobar() {
    let energia = document.getElementById("energy-meterD");
    let casco = document.getElementById("damage-meter");
    let supervivientes = document.getElementById("survivor-meter");
    if (energia.value <= 0) {
        final = true;
    }
    else if (casco.value <= 0) {
        final = true;
    }
    else if (supervivientes.value <= 0) {
        final = true;
    }else{
        let labelE= document.getElementById("labelDatosE");
        let labelS= document.getElementById("labelDatosS");
        let labelD= document.getElementById("labelDatosD");
        labelE.innerHTML = energia.value;
        labelS.innerHTML = supervivientes.value;
        labelD.innerHTML = casco.value;
    }
    
}
function lanzarComporbador(){
    setInterval(function () {
        if (final === true) {
            clearInterval(intervalo);
        }else{
            comprobar();
        }
    }, 1000);
}
/*--comporbador de partida--*/
function comporbadorPartida(){
    let intervaloComporbrador = setInterval(function () {
        if (final === true) {
            clearInterval(intervaloComporbrador);
            let volveraJugar=document.getElementsByClassName("perdido")[0];
            volveraJugar.style.display = "block";
        }else{
            comprobar();
        }
    },100);
}
/*--volver a jugar--*/
function volverJugar(){
    location.reload();
    let volveraJugar=document.getElementsByClassName("perdido")[0];
}
/*--Aleatorio estrell*/
function mostrarEstrella(){
    intervaloEstrella = setInterval(function () {
        
    let uno = document.getElementsByClassName("star")[0];
    let dos = document.getElementsByClassName("star2")[0];
    let tres = document.getElementsByClassName("star3")[0];
    let cuatro = document.getElementsByClassName("star4")[0];
    //aleatorio
    let aleatorio = Math.floor(Math.random() * 4);
    if(aleatorio === 0){
       
        uno.style.display = "block";
    }
    else if(aleatorio === 1){
        dos.style.display = "block";
    }
    else if(aleatorio === 2){
        tres.style.display = "block";
    }
    else{
        cuatro.style.display = "block";
    }
   
}, 5000);
  
}
/*--Al cargar la web--*/
window.onload = function () {
    cuentaRegresiva();
    inicializarPlanetas();
    salto();
    generarNave();
    lanzarComporbador();
    comporbadorPartida();
    function startAnimation(element, delay) {
        setTimeout(function () {
          element.style.animationPlayState = "running";
          element.addEventListener("animationiteration", function () {
            // Detener la animación al final de cada ciclo
            element.style.animationPlayState = "paused";
            element.style.display = "none";
            // Reiniciar la animación después del retraso
            setTimeout(function () {
              element.style.animationPlayState = "running";
                element.style.display = "block";
            }, delay * 1000);
          });
        }, delay * 1000);
      }
    
      var starElements = document.querySelectorAll(".star, .star2, .star3, .star4");
    
      starElements.forEach(function (element, index) {
        startAnimation(element, index * 4); // 4 segundos para cada repetición
      });
  
}
