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
// var rockIcon = document.getElementById("rockIcon");
// var paperIcon = document.getElementById("paperIcon");
// var scissorsIcon = document.getElementById("scissorsIcon");


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
  if (event.target.closest('#classicGameButton')) {
    gameType = 'Classic'
    toggle(gameModeContainer);
    toggle(fighterContainer);
    toggle(chooseFighterMessage);
    toggle(chooseModeMessage);
  } else if (event.target.closest('#variantGameButton')) {
    gameType = 'Variant'
    toggle(gameModeContainer);
    toggle(fighterContainer);
    toggle(chooseFighterMessage);
    toggle(chooseModeMessage);
  }
});

fighterContainer.addEventListener('click', function (event) {
  var clickedFighter = event.target.closest('.choose-fighter-button');
  if (clickedFighter) {
    console.log("clickedFighter:", clickedFighter);
    console.log("clickedFighter dataset:", clickedFighter.dataset);
    createGame(user, computer, gameBoard, gameType, clickedFighter);
    console.log("game: ", game);
    displayFighters(game);
    console.log(user.wins)
    console.log(computer.wins)
    checkWinConditions(game);
    console.log(user.wins);
    console.log(computer.wins);
    resetGameBoard();
    console.log(game);
    show(changeGameButton);
  } 
});

changeGameButton.addEventListener('click', function () {
  messageContainer.innerHTML = chooseModeMessage.innerHTML;
  hide(winnerContainer);
  show(gameModeContainer);
  show(chooseFighterMessage);
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


function createGame(user, computer, gameBoard, gameType, clickedFighter) {
  gameBoard = createGameBoard(gameType)
  game = {
    user: user,
    computer: computer,
    gameBoard: gameBoard,
    gameType: gameType
  }
  console.log("createGame clickedFighter:", clickedFighter);
  selectFighters(clickedFighter, game);
  return game;
}


function selectFighters(clickedFighter, game) {
  console.log("selectFighters clickedFighter:", clickedFighter);
  createUserFighter(clickedFighter, game);
  generateComputerFighter(game);

}

function createUserFighter(clickedFighter, game) {
  userFighter = clickedFighter.dataset.fighter;
  console.log("userFighter:", userFighter);
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
  displayWinTotal(user, computer);
  displayWinnerMessage();
}
function addWins(player) {
  player.wins++
}

function determineDraw() {
  winner = null;
}

function displayFighters(game) {
  var userFighterIcon = document.getElementById('userFighterIcon');
  var computerFighterIcon = document.getElementById('computerFighterIcon');
  var winnerContainer = document.getElementById('winnerContainer');

 hide(fighterContainer);

  show(winnerContainer);
  show(userFighterIcon);
  show(computerFighterIcon);

  userFighterIcon.src = `assets/${game.gameBoard.userFighter}.png`;
  computerFighterIcon.src = `assets/${game.gameBoard.computerFighter}.png`;
  userFighterIcon.alt = `User's Fighter: ${game.gameBoard.userFighter}`;
  computerFighterIcon.alt = `Computer's Fighter: ${game.gameBoard.computerFighter}`;
}



function displayWinTotal(user, computer) {
  userWinsDisplayed.innerHTML = `Wins: ${user.wins}`;
  computerWinsDisplayed.innerHTML = `Wins: ${computer.wins}`;
}
function displayWinnerMessage() {
  if (winner === user) {
    messageContainer.innerHTML = `<p class="winner-message">${user.token}${user.name} won this round!${user.token}</p>`
  } else if (winner === computer) {
    messageContainer.innerHTML = `<p class="winner-message">${computer.token}${computer.name} won this round!${computer.token}</p>`
  } else if (winner === null) {
    messageContainer.innerHTML = `<p class="winner-message">🥹It's a draw!🥹<p>`;
  }

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
