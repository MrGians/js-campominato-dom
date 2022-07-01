// TRACCIA
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella:
// SE il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero totalCell - bomb = n ).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// # MILESTONE 1
// Prepariamo "qualcosa" per tenere il punteggio dell'utente.
// Quando l'utente clicca su una cella, incrementiamo il punteggio.
// Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.

// # MILESTONE 2
// Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
// Generiamoli e stampiamo in console per essere certi che siano corretti

// # MILESTONE 3
// Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

// # MILESTONE 4
// Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
// (Ma come stabiliamo quale sia il punteggio massimo?)

// # MILESTONE 5
// Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

// #BONUS:
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;



// Variabili Globali DOM
const playBtn = document.getElementById("btn-play");



// Renderizzo la griglia e creo N elementi Cella (in base alla difficoltà scelta) al click del bottone "Play"
playBtn.addEventListener("click", () => {
  // Variabili Locali
  const grid = document.getElementById("grid");
  const gridChoice = document.getElementById("grid-choice");
  const userPointsCounter = document.getElementById("user-points-counter");

  // Creo una funzione che generi le celle con la relativa classe
  const createCell = (totalCells) => {
    // Creo l'elemento Cella
    const cell = document.createElement("div");

    // Assegno la classe "cell-[option-value]" in base al numero di totalCells
    if (totalCells === 100) cell.classList.add("cell-easy");
    else if (totalCells === 81) cell.classList.add("cell-classic");
    else if (totalCells === 49) cell.classList.add("cell-hard");

    // Restituisco l'elemento creato
    return cell;
  };

  // Creo una funzione che generi i numeri che diventeranno le bombe
  const createBomb = (min, max) => {
    max++;
    return Math.floor(Math.random() * (max - min)) + min;
  };


  // Rendo visibile la griglia
  grid.classList.remove("d-none");
  userPointsCounter.classList.remove("d-none");
  
  // Resetto gli elementi <div> dentro alla griglia (Utilità dal secondo click di "play" in poi)
  grid.innerHTML = "";
  
  // Creo variabili di appoggio per la griglia (Default: Easy)
  let rows = 10;
  let cells = 10;

  // Modifico variabili di appoggio per la griglia in base alla difficoltà selezionata
  switch (gridChoice.value) {
    // Se viene selezionata l'opzione "Hardcore"
    case "hard":
      rows = cells = 7;
      break;

    // Se viene selezionata l'opzione "Classic"
    case "classic":
      rows = cells = 9;
      break;

    // Se viene selezionata l'opzione "Easy" (Default)
    case "easy":
    default:
      rows = cells = 10;
      break;
  }

  // Determino il numero totale finale di Celle
  let totalCells = rows * cells; // Default: Easy

  // Creo una variabile che tenga conto del punteggio dell'utente durante il gioco
  let userPoints = 0;
  userPointsCounter.innerText = `Punteggio: ${userPoints}`;
  

  // Genero le celle tramite un ciclo FOR
  for (let i = 1; i <= totalCells; i++) {
  
    const cell = createCell(totalCells);

    // Inserisco un numero ad ogni cella
    cell.append(i);

    // Aggiungo evento al click della Cella
    cell.addEventListener("click", (event) => {

      // Verifico che la cella non sia già stata cliccata
      if (event.target.classList.contains("clicked")) {
        return;
      } else {
        // Aggiungo la classe "Clicked" alla cella
        event.target.classList.add("clicked");
        // Stampo il numero della cella cliccata in console
        console.log("Cell: " + event.target.innerText);
        
        // Aumento di 1 il punteggio utente
        userPoints++;
        userPointsCounter.innerText = `Punteggio: ${userPoints}`;
      }

    });

    // Inserisco le celle all'interno della griglia
    grid.appendChild(cell);
  }

  
  // Genero le bombe tramite un ciclo FOR e le inserisco nell'Array Bombs
  const bombs = [];
  for (let i = 1; i <= 16; i++) {

    // Creo il numero della "Bomba"
    let bomb = createBomb(1, totalCells);

    // SE il numero Bomba è già presente nell'array, ripeto il giro, altrimenti lo aggiungo
    if (bombs.includes(bomb))  {i--;} 
    else {
      bombs.push(bomb);
      console.log(bombs);  
    }
  }

  





});
