const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "1";

let currentSymbol = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => alert(`Congratulations! Player${currentPlayer} wins`);

const drawMessage = () => alert(`Draw!`);

const currentPlayerTurn = () => `It's Player${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex - 1] = currentPlayer;

  clickedCell.innerHTML = currentSymbol;
}

const winningConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function handlePlayerChange() {
  currentPlayer = currentPlayer === "1" ? "2" : "1";
  currentSymbol = currentSymbol == "O" ? "X" : "O";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  //Check for each winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];

    let a = gameState[condition[0] - 1];
    let b = gameState[condition[1] - 1];
    let c = gameState[condition[2] - 1];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerHTML = `Congratulations! Player${currentPlayer} wins`;
    winningMessage();
    gameActive = false;
    return;
  }

  //Handle Draw Condition
  let roundDraw = !gameState.includes("");
  if (roundDraw && !roundWon) {
    statusDisplay.innerHTML = "Draw!";
    drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.id);

  //if game is over or that cell has already been marked
  if (gameState[clickedCellIndex - 1] !== "" || !gameActive) {
    return;
  }

  // If everything is fine

  //change the state of cell
  //check if somebody won after that click
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "1";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);