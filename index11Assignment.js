/*Zeke 2023*/
/*Coding Steps:
> Create a Tic-Tac-Toe game grid using your HTML element of choice.
> When a cell in the grid is clicked, an X or O should appear in that 
  spot depending on whose turn it is.
> A heading should say whether it is X's or O's turn and change with 
  each move made.
> A button should be available to clear the grid and restart the game.
> When a player has won, or the board is full and the game results in 
  a draw, a Bootstrap alert or similar Bootstrap component should appear 
  across the screen announcing the winner. */


//Creating variables for X and O turns
const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";

//Array showing all possible winning combos
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Manipulating the DOM and finding HTML elements using their id tags
const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");

const headingInfoElement = document.getElementById("headingInfo");
const headingInfoTextElement = document.getElementById("headingInfoText");

let Player_O_Turn = false;

console.log(restartButton);

//Starting the game
startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  Player_O_Turn = false; //ensuring that player with X starts the game
  cellElements.forEach((cell) => { 
/*Removing all X's and O's at the start of each game by using the remove method, 
which removes all the elements with all its children from the dom*/
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);

/*Removing event listener from every cell to prevent the event from getting
triggered multiple times with mouse clicks unnecessarily*/
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true }); //users can only click on cell once
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = Player_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS; //adding variable to save current player's play

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) { //creating function to end the game and prompt message of win or draw
  if (draw) {
    winningMessageTextElement.innerText = "It is a draw!";
  } else {
    winningMessageTextElement.innerText = `Player ${
      Player_O_Turn ? "O" : "X"
    } wins! Play again!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() { //creating function to apply draw
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
    );
  });
}

//Accessing content of cell and adding play made
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

//Function to switch player turn so a player doesn't go twice
function swapTurns() {
  Player_O_Turn = !Player_O_Turn;
}

//Function to show X or O While hovering over each cell with the mouse cursor before taking turn
function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (Player_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
  }
  displayCurrentPlayer(Player_O_Turn);
}

//Function will check if the board has any of the winning combinations previously defined above
function checkWin(currentClass) {
  return WINNING_COMBOS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// Function to display who the current player is, qhich changes as the game progresses
function displayCurrentPlayer(isPlayer) {
  headingInfoTextElement.innerText = `It is Player ${
    Player_O_Turn ? "O" : "X"
  }'s turn!`;
}