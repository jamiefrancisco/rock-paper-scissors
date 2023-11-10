var gameModeContainer = document.querySelector('.game-mode-container');
var fighterContainer = document.querySelector('.fighter-container');
var chooseModeMessage = document.querySelector('.choose-mode-message');
var chooseFighterMessage = document.querySelector('.choose-fighter-message');
var changeGameButton = document.querySelector('.change-game-button');


var user = {};
var computer = {};
var gameType = "";
var gameBoard = {};
var game = {};
var userFighter = '';

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
    console.log("click");
  } else if (event.target.closest('#variantGameButton')) {
    gameType = 'Variant'
    toggle(gameModeContainer);
    toggle(fighterContainer);
    toggle(changeGameButton);
    toggle(chooseFighterMessage);
    toggle(chooseModeMessage);
    console.log("click");
  }
});

fighterContainer.addEventListener('click', function (event) {
  if (event.target.closest('#rockIcon')) {
    userFighter = 'rock';
    createGameBoard(gameType);
    createGame(user, computer, gameBoard, gameType)
    selectFighters(game, userFighter)
    console.log(game);
  } else if (event.target.closest('#paperIcon')) {
    userFighter = 'paper';
    createGameBoard(gameType);
    createGame(user, computer, gameBoard, gameType)
    selectFighters(game, userFighter)
    console.log(game);
  } else if (event.target.closest('#scissorsIcon')) {
    userFighter = 'scissors';
    console.log(gameType)
    createGameBoard(gameType);
    createGame(user, computer, gameBoard, gameType)
    selectFighters(game, userFighter)
    console.log(game);
  }
  console.log(user.wins);
  checkWinConditions(game);
  console.log(user.wins);
  console.log(computer.wins);
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
  return game;
}


function selectFighters(game, userFighter) {
  game.gameBoard.userFighter = userFighter;
  game.gameBoard.computerFighter = game.gameBoard.fighters[Math.floor(Math.random() * game.gameBoard.fighters.length)];
}


function checkWinConditions(game) {
  if (
    (game.gameBoard.userFighter === 'rock' && game.gameBoard.computerFighter === 'scissors') ||
    (game.gameBoard.userFighter === 'scissors' && game.gameBoard.computerFighter === 'paper') ||
    (game.gameBoard.userFighter === 'paper' && game.gameBoard.computerFighter === 'rock')
  ) {
    user.wins++;
  } else if (
    (game.gameBoard.computerFighter === 'rock' && game.gameBoard.userFighter === 'scissors') ||
    (game.gameBoard.computerFighter === 'scissors' && game.gameBoard.userFighter === 'paper') ||
    (game.gameBoard.computerFighter === 'paper' && game.gameBoard.userFighter === 'rock')
  ) {
    computer.wins++
  } else {
    determineDraw()
  }
}

function determineDraw() {
  console.log("It's a tie");
}

function resetGameBoard() {
}

function toggle(element) {
  element.classList.toggle('hidden');
}
