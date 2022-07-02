// TRACCIA
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella:
// SE il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero totalCell - bomb = n ).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.



// Variabili Globali DOM
const playBtn = document.getElementById("btn-play");


// Renderizzo la griglia e creo N elementi Cella (in base alla difficoltà scelta) al click del bottone "Play"
playBtn.addEventListener("click", () => {
  // Variabili Locali
  const grid = document.getElementById("grid");
  const gridChoice = document.getElementById("grid-choice");
  const userPointsCounter = document.getElementById("user-points-counter");

// ------------------------------------- FUNCTION ------------------------------------- //
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

  // Creo una funzione che generi le bombe
  const createBombs = (min, max) => {

    // Creo un array che andrà a contenere il totale delle bombe
    const bombsList = [];

    // Genero le bombe tramite un ciclo FOR
    for (let i = 1; i <= 16; i++) {
      // Creo un numero random da assegnare alla Bomba
      let randomBombNumber = Math.floor(Math.random() * (max + 1 - min)) + min;

      // SE il numero Bomba creato è già presente nell'array ripeto il giro
      if (bombsList.includes(randomBombNumber))  {i--;}
      // SE il numero Bomba creato NON è presente nell'array lo aggiungo e proseguo
      else {bombsList.push(randomBombNumber);}
    }

    // Restituisco un array contenente il totale delle bombe
    return bombsList;
  };

  // Creo una funzione che gestisca la difficoltà e di conseguenza le celle generate
  const chooseDifficulty = (selection) => {

    // Creo variabili di appoggio per la scelta della difficoltà in griglia (Default: Easy)
    let rows = 10;
    let cells = 10;

    // Modifico variabili di appoggio per la griglia in base alla difficoltà selezionata
    switch (selection.value) {
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
    const totalCells = rows * cells; // Default: Easy
    // Restituisco il valore di totalCells
    return totalCells;
  };

  // Creo una funzione che gestisca il messaggio di Vittoria / Game-over
  const hasWon = (hasWon = false) => {

    // Creo l'elemento messaggio e gli assegno la classe game-message
    const gameMessage = document.createElement("div");
    gameMessage.classList.add("game-message");
    
    // Se ha vinto Genero messaggio di Vittoria del giocatore
    if (hasWon) {gameMessage.innerHTML = `<h2>COMPLIMENTI! HAI VINTO!</h2>`;}
    // Se ha perso Genero messaggio di Game-Over
    else {gameMessage.innerHTML = `<h2>GAME OVER!</h2>`;}

    // Restituisco il messaggio finale
    return gameMessage;
  }

  // Creo una funzione per mostrare tutte le bombe sulla griglia al Game-Over
  const showAllBombs = (totalCells, bombsList, cellElements) => {
    // Confronto ogni numero cella con ogni numero bomba dell'array Bombs
    for (let i = 1; i <= totalCells; i++) {
      for (let j = 0; j < bombsList.length; j++) {
        // Se il numero della corrisponde al numero bomba diventa rossa
        if (i === bombsList[j]) {cellElements[bombsList[j] - 1].classList.add("clicked", "bomb");}
      }
    }
  }

// ------------------------------------- MINEFIELD GAME ------------------------------------- //

  // Il Bottone "Play" diventa "Ricomincia"
  playBtn.innerText = "Ricomincia";

  // Rendo visibile la griglia
  grid.classList.remove("d-none");
  
  // Resetto gli elementi <div> dentro alla griglia (Utilità dal secondo click di "play" in poi)
  grid.innerHTML = "";
  
  // Restituisco il corrispettivo di celle in base alla difficoltà scelta
  const totalCells = chooseDifficulty(gridChoice);

  // Creo una variabile che tenga conto del punteggio dell'utente durante il gioco
  let userPoints = 0;
  userPointsCounter.innerText = `Punteggio: ${userPoints}`;
  

  // Genero le celle tramite un ciclo FOR
  for (let i = 1; i <= totalCells; i++) {
    // Creo la cella tramite la funzione createCell
    const cell = createCell(totalCells);

    // Inserisco un numero ad ogni cella
    cell.append(i);

    // Aggiungo evento al click della Cella
    cell.addEventListener("click", (event) => {

      // Recupero gli elementi <div> cella dalla griglia
      const cellElements = [...grid.querySelectorAll("div")];  

      // SE la cella è già stata cliccata interrompe l'azione bloccando eventuali eventi al click
      if (event.target.classList.contains("clicked")) {return;}
      // // SE la cella non è stata ancora cliccata
      else {
        // Aggiungo la classe "Clicked" alla cella e ne stampo il numero in console
        event.target.classList.add("clicked");
        console.log("Cell: " + event.target.innerText);
        
        // SE l'utente ha cliccato una Bomba
        if (bombs.includes(parseInt(event.target.innerText))) {

          // Aggiungo la classe "bomb" alla cella
          event.target.classList.add("bomb");
          // Rendo visibili le caselle Bomba rimanenti sulla griglia
          const showBombs = showAllBombs(totalCells, bombs, cellElements);
          // Genero messaggio di Game-Over e la partita finisce
          grid.appendChild(hasWon(false));
          // Cambio il testo al Bottone "Play"
          playBtn.innerText = "Gioca ancora";

        }
        // SE l'utente NON ha cliccato una bomba
        else {
          // Aggiungo la classe "safe" alla cella
          event.target.classList.add("safe");
          // Incremento di 1 il punteggio dell'utente e stampo il risultato
          userPoints++;
          userPointsCounter.innerText = `Punteggio: ${userPoints}`;
        }

        // SE l'utente ha raggiunto il punteggio massimo la partita finisce
        if (userPoints === totalCells - bombs.length) {
          // Genero messaggio di Vittoria del giocatore
          grid.appendChild(hasWon(true));
          // Cambio il testo al Bottone "Play"
          playBtn.innerText = "Gioca ancora";
        }
      }

    });
    
    // Inserisco le celle all'interno della griglia
    grid.appendChild(cell);
  }

  // Genero le bombe tramite la funzione createBombs e le stampo in console
  const bombs = createBombs(1, totalCells);
  console.log(bombs);
});

