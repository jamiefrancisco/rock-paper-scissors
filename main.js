// Query Selectors

var gameModeContainer = document.querySelector('.game-mode-container');
var fighterContainer = document.querySelector('.fighter-container');
var messageContainer = document.querySelector('.message-container');
var chooseModeMessage = document.querySelector('.choose-mode-message');
var chooseFighterMessage = document.querySelector('.choose-fighter-message');
var changeGameButton = document.querySelector('.change-game-button');
var userWins = document.querySelector('.user-wins');
var computerWins = document.querySelector('.computer-wins');
var winner = "";


var user = {};
var computer = {};
var gameType;
var gameBoard = {};
var game = {};
var userFighter;

// Event Listeners

window.addEventListener('load', function () {
  user = createPlayer('User', '🙋‍♀️');
  computer = createPlayer('Computer', '💻');
});

gameModeContainer.addEventListener('click', function (event) {
  if (event.target.closest('#classicGameButton')) {
    gameType = 'Classic'
    toggle(gameModeContainer);
    toggle(fighterContainer);
    toggle(changeGameButton);
    toggle(chooseFighterMessage);
    toggle(chooseModeMessage);
  } else if (event.target.closest('#variantGameButton')) {
    gameType = 'Variant'
    toggle(gameModeContainer);
    toggle(fighterContainer);
    toggle(changeGameButton);
    toggle(chooseFighterMessage);
    toggle(chooseModeMessage);
  }
});

fighterContainer.addEventListener('click', function (event) {
  if (event.target.closest('#rockIcon')) {
    userFighter = 'rock';
    createGameBoard(gameType);
    // console.log("gameBoard: ", gameBoard);
    createGame(user, computer, gameBoard, gameType)
    // console.log("game: ", game);
    // console.log(user.wins);
    checkWinConditions(game);
    // console.log(user.wins);
    // console.log(computer.wins);
    resetGameBoard();
    // console.log(game);
  } else if (event.target.closest('#paperIcon')) {
    userFighter = 'paper';
    createGameBoard(gameType);
    // console.log("gameBoard: ", gameBoard);
    createGame(user, computer, gameBoard, gameType)
    // console.log("game: ", game);
    // console.log(user.wins);
    checkWinConditions(game);
    // console.log(user.wins);
    // console.log(computer.wins);
    resetGameBoard();
    // console.log(game);
  } else if (event.target.closest('#scissorsIcon')) {
    userFighter = 'scissors';
    createGameBoard(gameType);
    // console.log("gameBoard: ", gameBoard);
    createGame(user, computer, gameBoard, gameType)
    // console.log("game: ", game);
    // console.log(user.wins);
    checkWinConditions(game);
    // console.log(user.wins);
    // console.log(computer.wins);
    resetGameBoard();
    // console.log(game);
  }

  ;
});

changeGameButton.addEventListener('click', function () {
  toggle(fighterContainer);
  toggle(gameModeContainer);
  toggle(chooseFighterMessage);
  toggle(chooseModeMessage);
  toggle(changeGameButton);

});

function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins,
  }
  return player;
}

function createGameBoard(gameType) {
  if (gameType === 'Classic') {
    gameBoard = {
      fighters: ['rock', 'paper', 'scissors'],
      userFighter: "",
      computerFighter: ""
    }
  } else if (gameType === 'Variant') {
    gameBoard = {
      fighters: ['rock', 'paper', 'scissors', 'whatever'],
      userFighter: "",
      computerFighter: ""
    }
  }
  return gameBoard;
}


function createGame(user, computer, gameBoard, gameType) {
  gameBoard = createGameBoard(gameType)
  game = {
    user: user,
    computer: computer,
    gameBoard: gameBoard,
    gameType: gameType
  }
  selectFighters(userFighter, game);
  return game;
}


function selectFighters(userFighter, game) {
  game.gameBoard.userFighter = userFighter;
  game.gameBoard.computerFighter = game.gameBoard.fighters[Math.floor(Math.random() * game.gameBoard.fighters.length)];
}


function checkWinConditions(game) {
  if (
    (game.gameBoard.userFighter === 'rock' && game.gameBoard.computerFighter === 'scissors') ||
    (game.gameBoard.userFighter === 'scissors' && game.gameBoard.computerFighter === 'paper') ||
    (game.gameBoard.userFighter === 'paper' && game.gameBoard.computerFighter === 'rock')
  ) {
    winner = user;
  } else if (
    (game.gameBoard.computerFighter === 'rock' && game.gameBoard.userFighter === 'scissors') ||
    (game.gameBoard.computerFighter === 'scissors' && game.gameBoard.userFighter === 'paper') ||
    (game.gameBoard.computerFighter === 'paper' && game.gameBoard.userFighter === 'rock')
  ) {
    winner = computer;
  } else {
    determineDraw();
  }
  if (winner) {
    addWins(winner);
  }
  displayWinTotal(user, computer);
  displayWinnerMessage();
}
function addWins(player) {
  player.wins++
}

function determineDraw() {
  winner = null;
}
  


function displayWinTotal(user, computer) {
  userWins.innerHTML = `Wins: ${user.wins}`;
  computerWins.innerHTML = `Wins: ${computer.wins}`;
}
function displayWinnerMessage() {
  if (winner === user) {
    messageContainer.innerHTML = `<h2>${user.token}${user.name} won this round!${user.token}</h2>`
  } else if (winner === computer) {
    messageContainer.innerHTML = `<h2>${computer.token}${computer.name} won this round!${computer.token}</h2>`
  } else if (winner === null) {
    messageContainer.innerHTML = `<h2>🥹It's a draw!🥹<h2>`;
  }

}

function resetGameBoard() {
  gameBoard = {};
  game = {};
}

function toggle(element) {
  element.classList.toggle('hidden');
}
