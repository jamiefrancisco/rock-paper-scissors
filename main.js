// Query Selectors

var gameModeContainer = document.querySelector('.game-mode-container');
var fighterContainer = document.querySelector('.fighter-container');
var lizardButton = document.getElementById('lizardButton');
var spockButton = document.getElementById('spockButton');
var messageContainer = document.querySelector('.message-container');
var chooseModeMessage = document.querySelector('.choose-mode-message');
var chooseFighterMessage = document.querySelector('.choose-fighter-message');
var winnerMessage = document.querySelector('.winner-message');
var changeGameButton = document.querySelector('.change-game-button');
var userWinsDisplayed = document.querySelector('.user-wins');
var computerWinsDisplayed = document.querySelector('.computer-wins');
var chosenFightersContainer = document.querySelector('.chosen-fighters-container');
var userFighterIcon = document.getElementById('userFighterIcon');
var userFighterLabel = document.getElementById('userFighterLabel');
var computerFighterIcon = document.getElementById('computerFighterIcon');
var computerFighterLabel = document.getElementById('computerFighterLabel');

// Global Variables

var winner;
var user = {};
var computer = {};
var gameType;
var gameBoard = {};
var game = {};
var userFighter;
var computerFighter;

// Event Listeners

document.addEventListener('DOMContentLoaded', function () {
  user = createPlayer('User', '🙋‍♀️');
  computer = createPlayer('Computer', '💻');
});

gameModeContainer.addEventListener('click', function (event) {
  var clickedGameMode = event.target.closest('.game-mode-button');
  if (clickedGameMode) {
    gameType = assignGameType(event.target);
    displayChooseFighterView(gameType)
  }
});

fighterContainer.addEventListener('click', function (event) {
  var clickedFighter = event.target.closest('.choose-fighter-button');
  if (clickedFighter) {
    createGame(user, computer, gameBoard, gameType, clickedFighter);
    determineOutcome(game);
    addWins(winner);
    displayChosenFighters(game);
    updateDisplay();
    resetGameBoard();
  }
});

changeGameButton.addEventListener('click', function () {
  displayHomeView();
});

// Data Model & Gameplay Functions

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
  } else if (target.closest('#crazyGameButton')) {
    return 'Crazy';
  }
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

function createGameBoard(gameType) {
  if (gameType === 'Classic') {
    gameBoard = {
      fighters: ['rock', 'paper', 'scissors'],
      userFighter: "",
      computerFighter: ""
    }
  } else if (gameType === 'Crazy') {
    gameBoard = {
      fighters: ['rock', 'paper', 'scissors', 'lizard', 'spock'],
      userFighter: "",
      computerFighter: ""
    }
  }
  return gameBoard;
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
  computerFighter = game.gameBoard.fighters[Math.floor(Math.random() * game.gameBoard.fighters.length)];
  game.gameBoard.computerFighter = computerFighter;
}

function determineOutcome(game) {
  if (game.gameBoard.userFighter === game.gameBoard.computerFighter) {
    determineTie();
  } else {
    determineWinner();
  }
}

function determineTie() {
  return winner = null;
}

function determineWinner() {
  var winningCombos = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['paper', 'spock'],
    spock: ['rock', 'scissors']
  }

  if (winningCombos[userFighter].includes(computerFighter)) {
    winner = user;
  } else {
    winner = computer;
  }
  return winner;
}

function addWins(winner) {
  if (winner) {
    winner.wins++
  }
}

function resetGameBoard() {
  gameBoard = {};
  game = {};
}

// Display & Update DOM functions 

function displayChosenFighters(game) {

  userFighterIcon.src = `assets/${game.gameBoard.userFighter}1.png`;
  userFighterIcon.alt = `User's Fighter: ${game.gameBoard.userFighter}`;
  userFighterLabel.innerHTML = `${game.gameBoard.userFighter}`;
  computerFighterIcon.src = `assets/${game.gameBoard.computerFighter}1.png`;
  computerFighterIcon.alt = `Computer's Fighter: ${game.gameBoard.computerFighter}`;
  computerFighterLabel.innerHTML = `${game.gameBoard.computerFighter}`;

  hide(fighterContainer);
  show(chosenFightersContainer);
  hide(changeGameButton);

  setTimeout(function () {
    hide(winnerMessage);
    displayChooseFighterView(game.gameType);
    show(changeGameButton);
  }, 3000);
}

function displayChooseFighterView(gameType) {
  if (gameType === 'Classic') {
    displayClassicView();
  } else if (gameType === 'Crazy') {
    displayCrazyView();
  }
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
    winnerMessage.innerHTML = `<p class="winner-message">${user.token} ${user.name.toUpperCase()} WON THIS ROUND! ${user.token}</p>`
  } else if (winner === computer) {
    winnerMessage.innerHTML = `<p class="winner-message">${computer.token} ${computer.name.toUpperCase()} WON THIS ROUND! ${computer.token}</p>`
  } else if (!winner) {
    winnerMessage.innerHTML = `<p class="winner-message">🥹 IT'S A DRAW! 🥹<p>`;
  }
  hide(chooseFighterMessage);
  show(winnerMessage);
}

// Page Views & Helper Functions

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden')
}

function displayClassicView() {
  hide(lizardButton);
  hide(spockButton);
  hide(changeGameButton);
  hide(chooseModeMessage);
  hide(gameModeContainer);
  hide(chosenFightersContainer);
  hide(winnerMessage);
  show(fighterContainer);
  show(chooseFighterMessage);
}

function displayCrazyView() {
  show(lizardButton);
  show(spockButton);
  hide(changeGameButton);
  hide(chooseModeMessage);
  hide(gameModeContainer);
  hide(chosenFightersContainer);
  hide(winnerMessage);
  show(fighterContainer);
  show(chooseFighterMessage);
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