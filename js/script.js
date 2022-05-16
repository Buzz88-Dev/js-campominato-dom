// selezione elementi di contenimento
let gridElement = document.getElementById("grid");
let selectLevel = document.getElementById("level");
let myButton = document.querySelector("button"); // quando uso query selector inserisco fra le graffe il richiamo come se fosse nel file css

// creo la funzione che crea un elemento div
// gli passo come parametro classCells valorizzata nello switch; essa viene aggiunta come classe al div creato
const createMyElement = (classDiv) => {
    let node = document.createElement("div");
    node.className = classDiv;
    return node;
}

// creo la funzione che mi genera a random un numero compreso da rangMin a rangeMax
function getRandomNumMinMax(rangMin, rangeMax){
    let numero = Math.floor(Math.random() * (rangeMax - rangMin + 1)) + rangMin;
    return numero;
}

// creo una funzione in cui compongo un array da 0 a n elementi che non si ripetono fra loro
function createRandUniqueNumArray(numItems, min, max){
    let arrayIntero = [];
    while (arrayIntero.length < numItems) {
        let randNumInt = getRandomNumMinMax(min, max);
        if (!arrayIntero.includes(randNumInt)){
            arrayIntero.push(randNumInt);
        }
    }
    return arrayIntero;
}


// al click del button genero le griglia con tutte le regole annesse
myButton.addEventListener("click",

    // funzione di callback che conterrà tutte le operazioni
    () => {
        let nCells;
        let classCells;

        // svuoto la griglia ogni volta che clicco se no me li aggiunge di volta in volta
        gridElement.innerHTML = " ";

        // creo una variabile chooseLev e gli inserisco il valore di selectLevel
        let chooseLev = parseInt(selectLevel.value);

        // settare le variabili a seconda del livello scelto
        switch (chooseLev){

            case 2:
            nCells = 49;
            classCells = "square7";
            break;

            case 1:
            nCells = 64;
            classCells = "square8";
            break;

            case 0:
            nCells = 100;
            classCells = "square10";
            break;
        }

        // creo un array random che va da 1 a nCells a seconda del suo valore
        let myNewArrRandom = createRandUniqueNumArray(nCells, 1, nCells);
        console.log(myNewArrRandom);


        // con un for creo i elementi div tramite la chiamata della funzione createMyElement()
        // li appendo al div principale gridEl
        for (let i = 0; i < myNewArrRandom.length; i++){

            // richiamo funzione di generazione div quadrato
            let divEl = createMyElement(classCells);

            let arrayBombe = bombeGenerated();

            let arrItem = myNewArrRandom[i];


            divEl.addEventListener("click",
                function(){ 
                    divEl.append(arrItem);
                    console.log(this);
                    for (let j = 0; j <arrayBombe.length; j++){
                        let bomba = arrayBombe[j];
        
                        if(bomba[j] === divEl){
                            console.log("Bomba presente")
                        } else {
                            console.log("Bomba non presente")
                        }
                    }
                }
            )
            gridElement.append(divEl);
        }
    }
)


///////////////////////////////////////////////////
function generaNumBomba(){
    let bomba = Math.floor(Math.random() * 49) + 1; //sostituire 49 con nCells
    return bomba;
}

function bombeGenerated(){
    let arrayBombe = [];
    for (let i = 0; i < 16; i++){

        while (arrayBombe.length < 16) {
            let genero16bombe = generaNumBomba();
            if (!arrayBombe.includes(genero16bombe)){
                arrayBombe.push(genero16bombe);
            }
        }
    }
    return arrayBombe;
}
