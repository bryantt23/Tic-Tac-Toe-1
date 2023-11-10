//Global scope
let board = [
  [, ,],
  [, ,],
  [, ,]
];
let tiles = document.querySelectorAll('.tile');
let gameOver = false;
let players = [];
let currentPlayer;
let player1Turn = true;
let announcements = document.querySelector('.announcement');

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
  announcements = document.querySelector('.announcement');
  announcements.textContent = '';
  resetBoard();
  restartGame();
  enableGameBoard();
});

function disableGameBoard() {
  //add class disabled to container
  let box = document.querySelector('.container');
  box.classList.add('disabled');
}

function enableGameBoard() {
  let box = document.querySelector('.container');
  box.classList.remove('disabled');
}

function announce(text) {
  announcements.textContent = text;
}

function hasWinner() {
  // Define the winning combinations using cell coordinates
  const winningCombo = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2]
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2]
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2]
    ],

    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0]
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1]
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2]
    ],

    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2]
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0]
    ]
  ];

  // Check for a winner
  for (const combo of winningCombo) {
    const [a, b, c] = combo;
    const [x1, y1] = a;
    const [x2, y2] = b;
    const [x3, y3] = c;

    if (
      board[x1][y1] === currentPlayer.symbol &&
      board[x2][y2] === currentPlayer.symbol &&
      board[x3][y3] === currentPlayer.symbol
    ) {
      gameOver = true;

      announce(`${currentPlayer.name} wins!`);
      disableGameBoard();
      return true;
    }
  }
  return false;
}

// Check for a tie
function hasTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (!board[row][col]) {
        return false; // There is an empty cell, so it's not a tie yet
      }
    }
  }
  gameOver = true;
  announce("It's a tie!");
  disableGameBoard();
  return true;
}

//Game play logic
tiles.forEach((tile, index) => {
  tile.addEventListener('click', () => {
    //update board array
    const row = Math.floor(index / 3);
    const col = index % 3;

    //Checks for taken tiles, adds symbol
    if (!board[row][col]) {
      board[row][col] = currentPlayer.symbol;
      tile.textContent = currentPlayer.symbol;
      tile.classList.add(
        currentPlayer.symbol === 'X' ? 'x-symbol' : 'o-symbol'
      );

      if (!hasWinner() && !hasTie()) {
        currentPlayer = player1Turn ? players[0] : players[1];
        announce(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
        //switch turns
        player1Turn = !player1Turn;
      }
    }
  });
});

//Player logic
const createPlayers = (name, symbol) => {
  return { name, symbol };
};

function restartGame() {
  players = [
    createPlayers(document.querySelector('#player1').value, 'X'),
    createPlayers(document.querySelector('#player2').value, 'O')
  ];
  currentPlayer = player1Turn ? players[0] : players[1];
  //show who's turn it is in text
  announce(`It's ${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
  //switch turns
  player1Turn = !player1Turn;
}

function resetBoard() {
  board = [
    [, ,],
    [, ,],
    [, ,]
  ];
  // Remove symbols from tiles and reset their class
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.classList.remove('x-symbol', 'o-symbol');
  });
  // Reset game state
  gameOver = false;
  currentPlayer = players[0];
  player1Turn = true;
}

restartGame();
