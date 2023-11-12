// Query Selectors

var gameModeContainer = document.querySelector('.game-mode-container');
var fighterContainer = document.querySelector('.fighter-container');
var messageContainer = document.querySelector('.message-container');
var chooseModeMessage = document.querySelector('.choose-mode-message');
var chooseFighterMessage = document.querySelector('.choose-fighter-message');
var winnerMessage = document.querySelector('.winner-message');
var changeGameButton = document.querySelector('.change-game-button');
var userWinsDisplayed = document.querySelector('.user-wins');
var computerWinsDisplayed = document.querySelector('.computer-wins');
var chosenFightersContainer = document.querySelector('.chosen-fighters-container');
// var rockIcon = document.getElementById("rockIcon");
// var paperIcon = document.getElementById("paperIcon");
// var scissorsIcon = document.getElementById("scissorsIcon");

// Global Variables

var winner = "";
var user = {};
var computer = {};
var gameType;
var gameBoard = {};
var game = {};
var userFighter;

// Event Listeners

document.addEventListener('DOMContentLoaded', function () {
  user = createPlayer('User', '🙋‍♀️');
  computer = createPlayer('Computer', '💻');
});

gameModeContainer.addEventListener('click', function (event) {
  var clickedGameMode = event.target.closest('.game-mode-button');
  if(clickedGameMode) {
  gameType = assignGameType(event.target);
  displayChooseFighterView(gameType)
  }
});

fighterContainer.addEventListener('click', function (event) {
  var clickedFighter = event.target.closest('.choose-fighter-button');
  if (clickedFighter) {
    createGame(user, computer, gameBoard, gameType, clickedFighter);
    checkWinConditions(game);
    updateDisplay();
    displayChosenFighters(game);
    resetGameBoard();
  }
});

changeGameButton.addEventListener('click', function () {
  displayHomeView();
});

// Data Model / Gameplay Functions

function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins,
  }
  return player;
}

function assignGameType(target) {
  if (target.closest('#classicGameButton')) {
    return 'Classic';
  } else if (target.closest('#variantGameButton')) {
    return 'Variant';
  }
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


function createGame(user, computer, gameBoard, gameType, clickedFighter) {
  gameBoard = createGameBoard(gameType)
  game = {
    user: user,
    computer: computer,
    gameBoard: gameBoard,
    gameType: gameType
  }
  selectFighters(clickedFighter, game);
  return game;
}

function selectFighters(clickedFighter, game) {
  createUserFighter(clickedFighter, game);
  generateComputerFighter(game);

}

function createUserFighter(clickedFighter, game) {
  userFighter = clickedFighter.dataset.fighter;
  game.gameBoard.userFighter = userFighter;
}

function generateComputerFighter(game) {
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
}

function addWins(player) {
  player.wins++
}

function determineDraw() {
  winner = null;
}

function resetGameBoard() {
  gameBoard = {};
  game = {};
}

function toggle(element) {
  element.classList.toggle('hidden');
}
function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden')
}

function displayChosenFighters(game) {
  var userFighterIcon = document.getElementById('userFighterIcon');
  var computerFighterIcon = document.getElementById('computerFighterIcon');
  var chosenFightersContainer = document.getElementById('chosenFightersContainer');

  userFighterIcon.src = `assets/${game.gameBoard.userFighter}.png`;
  computerFighterIcon.src = `assets/${game.gameBoard.computerFighter}.png`;
  userFighterIcon.alt = `User's Fighter: ${game.gameBoard.userFighter}`;
  computerFighterIcon.alt = `Computer's Fighter: ${game.gameBoard.computerFighter}`;
  
  hide(fighterContainer);
  show(chosenFightersContainer);
  setTimeout(function () {
    hide(winnerMessage);
    displayChooseFighterView(game.gameType);
    show(changeGameButton);
  }, 2000);
}


function updateDisplay() {
  displayWinTotal(user, computer);
  displayWinnerMessage();
}

function displayWinTotal(user, computer) {
  userWinsDisplayed.innerHTML = `Wins: ${user.wins}`;
  computerWinsDisplayed.innerHTML = `Wins: ${computer.wins}`;
}

function displayWinnerMessage() {
  if (winner === user) {
    winnerMessage.innerHTML = `<p class="winner-message">${user.token}${user.name} won this round!${user.token}</p>`
  } else if (winner === computer) {
    winnerMessage.innerHTML = `<p class="winner-message">${computer.token}${computer.name} won this round!${computer.token}</p>`
  } else if (winner === null) {
    winnerMessage.innerHTML = `<p class="winner-message">🥹It's a draw!🥹<p>`;
  }
  hide(chooseFighterMessage);
  show(winnerMessage);
}

function displayHomeView() {
  hide(changeGameButton);
  hide(fighterContainer);
  hide(chosenFightersContainer);
  hide(chooseFighterMessage);
  hide(winnerMessage);
  show(chooseModeMessage);
  show(gameModeContainer);
}

function displayChooseFighterView(gameType) {
  if (gameType === 'Classic') {
    hide(changeGameButton);
    hide(chooseModeMessage);
    hide(gameModeContainer);
    hide(chosenFightersContainer);
    hide(winnerMessage);
    show(fighterContainer);
    show(chooseFighterMessage);
  }
}