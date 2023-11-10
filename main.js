var user = {};
var computer = {};
var classicGameBoard = {};
var difficultGameBoard = {};
var classicGame = 'Classic Game';
var difficultGame = 'Difficult Game';




  // create player, board, create game, take turns(select fighter)
  // use those turns to update the player's selected fighter.
  // then invoke determination functions
function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins,
  }
  return player;
}
user = createPlayer('Jamie', '🙋‍♀️');
computer = createPlayer('Computer', '💻', 3);

console.log(user);
console.log(computer);

function createGameBoard(gameType, userFighter) {
  if (gameType === classicGame) {
    var gameBoard = {
      fighters: ['rock', 'paper', 'scissors'],
      userFighter: userFighter,
      computerFighter: ""
    }
  } else if (gameType === difficultGame) {
    var gameBoard = {
      fighters: ['rock', 'paper', 'scissors', 'whatever'],
      userFighter: userFighter,
      computerFighter: ""
    }
  }
  return gameBoard;
}


classicGameBoard = createGameBoard(classicGame, 'rock');

console.log('classicGameBoard', classicGameBoard);
 
function createGame(user, computer, gameBoard, gameType) {
  var gameBoard = createGameBoard(gameType, 'rock')
  var game = {
    user: user,
    computer: computer,
    gameBoard: gameBoard,
    gameType: gameType
  }
  return game;
}
classicGame = createGame(user, computer, classicGameBoard, 'Classic Game');
console.log('classicGame', classicGame);

function fighterSelection (player, game) {
  if (player === user) {
    userFighterSelect(game, 'rock');
  } else if (player === computer) {
    computerFighterSelect(game);
  }
}

function userFighterSelect(game, fighter) {
  game.gameBoard.userFighter = fighter;
}

function computerFighterSelect(game) {
 var fighter = game.gameBoard.fighters[Math.floor(Math.random() * game.gameBoard.fighters.length)];
 game.gameBoard.computerFighter = fighter;
}


fighterSelection(user, classicGame);
fighterSelection(computer, classicGame);
console.log(classicGame);


function checkWinConditions(game) {
  if (game.gameBoard.userFighter === 'rock' && game.gameBoard.computerFighter === 'scissors') {
    user.wins++
  } else if (game.gameBoard.userFighter === 'scissors' && game.gameBoard.computerFighter === 'paper') {
    user.wins++
  } else if (game.gameBoard.userFighter === 'paper' && game.gameBoard.computerFighter === 'rock') {
    user.wins++
  } else if (game.gameBoard.computerFighter === 'rock' && game.gameBoard.userFighter === 'scissors') {
    computer.wins++
  } else if (game.gameBoard.computerFighter === 'scissors' && game.gameBoard.userFighter === 'paper') {
    computer.wins++
  } else if (game.gameBoard.computerFighter === 'paper' && game.gameBoard.userFighter === 'rock') {
    computer.wins++
  } else {
    console.log("It's a tie")
  }
}
checkWinConditions(classicGame);
console.log(user)
console.log(computer);

function determineDraw() {
}

function resetGameBoard() {
}