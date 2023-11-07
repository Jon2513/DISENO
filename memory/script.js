var carta = null;
var cartas=["charmander","tapu","pajaros","articuno","pikachu","furioseta","charmander","tapu","pajaros","articuno","pikachu","furioseta"];
var baraja = document.querySelector('.baraja');
var fallos = 0;
var aciertos = 0;
var divAciertos = document.getElementById('aciertos');
var divFallos = document.getElementById('fallos');
function crearBaraja() {
    let contador = 0;
    while (cartas.length > 0) {
        
        var numeroAleatorio = Math.floor(Math.random() * cartas.length);

        var carta = document.createElement('div');
        carta.classList.add('carta');
        carta.setAttribute('name', cartas[numeroAleatorio]);
        carta.setAttribute('id', cartas[numeroAleatorio]);
        carta.addEventListener('click', function () {
            girarCarta(this);
        });
        var anverso = document.createElement('div');
        anverso.classList.add('anverso');
        var reverso = document.createElement('div');
        reverso.classList.add('reverso');
        carta.appendChild(anverso);
        carta.appendChild(reverso);
        baraja.appendChild(carta);
        cartas.splice(numeroAleatorio, 1);
       
    }
}

function recargar(){
    location.reload();
}

function compararCarta(cartaNueva) {
    if (carta === null) {
        carta = cartaNueva;
        return;
    }
    if (cartaNueva.attributes['name'].value == carta.attributes['name'].value) {
        carta.classList.add('correcta');
        cartaNueva.classList.add('correcta');
        aciertos++;
        divAciertos.innerHTML = aciertos;

    } else {
        carta.classList.remove('girada');
        cartaNueva.classList.remove('girada');
        fallos++;
        divFallos.innerHTML = fallos;
    }
    if (aciertos == 6) {
     
    }
    carta = null;
}

/**
 * @param {HTMLElement} cartaNueva - The date
 */
function girarCarta(cartaNueva) {
    if (!cartaNueva.classList.contains('girada')) {
        cartaNueva.classList.add('girada');
        setTimeout(compararCarta, 500, cartaNueva);
    } 
}
document.addEventListener('DOMContentLoaded', function () {
    const baraja = document.querySelector('.baraja');
    
    // Resto de tu código aquí...
    
    crearBaraja();
});
