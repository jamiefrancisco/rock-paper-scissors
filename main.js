var user = {};
var computer = {};
var classicGameBoard = {};
var difficultGameBoard = {};
var classicGame = 'Classic Game';
var difficultGame = 'Difficult Game';


function createPlayer(name, token, wins = 0) {
  var player = {
    name: name,
    token: token,
    wins: wins
  }
  return player;
}
user = createPlayer('Jamie', '🙋‍♀️');
computer = createPlayer('Computer', '💻', 3);
console.log('user', user);
console.log('computer', computer);

function createGameBoard(gameType, userFighter) {
  if (gameType === classicGame) {
    var gameBoard = {
      fighters: ['rock', 'paper', 'scissors'],
      userFighter: userFighter 
    }
  } else if (gameType === difficultGame) {
    var gameBoard = {
      fighters: ['rock', 'paper', 'scissors', 'whatever'],
      userFighter: userFighter
    }
  }
  return gameBoard;
}

classicGameBoard = createGameBoard(classicGame, 'rock');
difficultGameBoard = createGameBoard(difficultGame, 'paper');
console.log('classicGameBoard', classicGameBoard);
console.log('difficultGameBoard', difficultGameBoard);
 

function createGame(user, computer, gameBoard, gameType) {
  var game = {
    user: user,
    computer: computer,
    gameBoard: gameBoard,
    gameType: gameType
  }
  return game;
}
classicGame = createGame(user, computer, classicGameBoard, 'Classic Game');
difficultGame = createGame(user, computer, difficultGameBoard, 'Difficult Game');
console.log('classicGame', classicGame);
console.log('difficultGame', difficultGame);

function determineWinner() {
}

function determineDraw() {
}

function resetGameBoard() {
}

function generateRandomFighter(gameBoard) {
  return gameBoard.fighters[Math.floor(Math.random() * gameBoard.fighters.length)]
  }

  var randomFighter = generateRandomFighter(classicGameBoard);
  console.log(randomFighter);