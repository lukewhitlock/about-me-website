const cell = tictactoe.querySelectorAll(".cell");
const status = document.querySelector("#status");
const winPatterns = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8],[0,4,8], [2,4,6] ];

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

cell.forEach((cell, index) => { //set up listener for each cell
    cell.addEventListener("click", () => cellClick(index));
});

function cellClick(index) { //action on click
  if (board[index] !== "" || !gameActive) return; //if game is over or cell is full, does nothing

  board[index] = currentPlayer; //fills board array with information
  cell[index].textContent = currentPlayer; //visually fills cell with player

  checkWinner();
}

function checkWinner() { //checks if any player has won
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  cell.forEach(cell => cell.textContent = "");
}