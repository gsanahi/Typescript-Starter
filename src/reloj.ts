/* 1. Crear una nueva pagina (con el nombre que quieras para el reloj), que tenga su html y ts/js. 
El objetivo de la pagina va a ser mostrar el reloj y que te diga en que franja estas. 
Agregar al menu (de todas las paginas) la navegacion, para que puedas ir a esa pagina

2. Leer el siguiente codigo y tratar de entender que hace:
https://www.toptal.com/developers/hastebin/tolojexeju.js (Pasalo antes al visual studio asi se ve mas lindo). 
Tratar de entender que hace, y luego correrlo en la terminal. (Primero trata de entenderlo jaja) Hace lo que esperabas? Que hace?

3. Si llegas, escribir en la consola lo siguiente `fecha = new Date()` que devuelve? que metodos tiene? 
Como nos puede servir? Mas info aca (https://www.w3schools.com/jsref/jsref_obj_date.asp)
*/
enum Tramo {
    VALLE = 'Valle',
    LLANO = 'Llano',
    PUNTA = 'Punta',
}

const feriados = {
    1: [1, 6],
    4: [15,18],
    6: [6,24],
    8: [15],
    9: [24,26],
    10: [12],
    11: [1],
    12: [6, 8, 26]
}

function isNonWorkingDay(date: Date): boolean {
   if(date.getDay() === 6 || date.getDay() === 0) {                                      
       return true;
   }
   if (feriados[date.getMonth() + 1]?.includes(date.getDate())) {
       return true;
   }
   return false;
}

function getTramoL(date: Date): Tramo {
    if (isNonWorkingDay(date)) {
        return Tramo.VALLE; 
    }
    const hours = date.getHours()
    if (hours < 8) {
        return Tramo.VALLE; 
    }
    if((hours >= 10 && hours < 14) || (hours >= 18 && hours < 22)) {
        return Tramo.PUNTA; 
    }
    return Tramo.LLANO;
}

function setTramo(date: Date) {
    const tramo = getTramoL(date);
    const $tramo = document.querySelector<HTMLSpanElement>("#tramo");
    $tramo.innerHTML = tramo.toUpperCase();
    
    const $card = document.querySelector<HTMLDivElement>("#tramo-card");
    $card.classList.remove("orange", "green", "red");
        
    if (tramo === Tramo.VALLE) {
        $card.classList.add("green");    
    }
    if (tramo === Tramo.LLANO) {
        $card.classList.add("orange");       
    }
    if (tramo === Tramo.PUNTA) {
        $card.classList.add("red");        
    }

}

function selecionDeInfoTramo(tramo: Tramo): void {
    const instance = M.Tabs.getInstance(document.querySelector<HTMLUListElement>("#tabs-franjas"));
    if (tramo === Tramo.VALLE) {
        instance.select("valle");
    }
    if (tramo === Tramo.LLANO) {
        instance.select("llano");
    }
    if (tramo === Tramo.PUNTA) {
        instance.select("punta");
    }
}

function setTime(date: Date): void {
    const hour = date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const minutes = date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const seconds = date.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2 });

    const $hour = document.querySelector<HTMLSpanElement>("#hora");
    $hour.innerHTML = `${hour}:${minutes}:${seconds}`;
}

function setDate(date: Date): void {
    const dayToday = date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const $date = document.querySelector<HTMLSpanElement>("#date");
    $date.innerHTML = dayToday;
}


function clockUpdate() {
    const date = new Date();
    setTime(date);
    setDate(date);
    setTramo(date);
}

// function fondoDePantalla(date: Date): void {
//     const hora = date.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2 });
//     if(hora> 9 && hora < 6) {
        
//     }
// }


M.AutoInit();
clockUpdate();
setInterval(clockUpdate, 1000);
selecionDeInfoTramo(getTramoL(new Date())); 