"use strict";
const MINE = "💣";
const FLAG = "🚩";
const HEART = "❤️";
var hints = 3;
var isFirst = true;
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};
var gLevel = {
  size: 4,
  mines: 2,
};
var life = 1;
var gBoard;

function inIt() {
  gBoard = buildBoard();
  console.log(gBoard);

  renderBoard(gBoard, ".board-container");
}
// var cell = {
//   minesAroundCount: 0,
//   isShown: true,
//   isMine: false,
//   isMarked: true,
// };

function buildBoard() {
  var minedArray = geMinesLocations();
  console.log("minedArray", minedArray);
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board.push([]);
    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = {
        minesAroundCount: 0, // how many mine neighboars
        isShown: false, // can we see the value
        isMine: false, // if mine
        isMarked: false, // if flagged
        value: "*",
      };

      for (let k = 0; k < minedArray.length; k++) {
        if (i == minedArray[k][0] && j == minedArray[k][1]) {
          board[i][j].isMine = true;
        }
      }
    }
  }
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      findingNeighbors(board, i, j);
    }
  }

  return board;
}

function getRandomTupleLocation() {
  var iMine = getRandomInt(0, gLevel.size - 1);
  var jMine = getRandomInt(0, gLevel.size - 1);
  return [iMine, jMine];
}

function geMinesLocations() {
  var minesLocations = [];
  for (let i = 0; i < gLevel.mines; i++) {
    minesLocations.push(getRandomTupleLocation());
  }
  return minesLocations;
}
function easy() {
  gLevel = {
    size: 4,
    mines: 2,
  };
  life = 1;
  hints = 3;
  renderlives();
  inIt();
}

function hard() {
  gLevel.size = 8;
  gLevel.mines = 12;
  life = 3;
  hints = 3;

  renderlives();
  inIt();
}

function expert() {
  gLevel.size = 12;
  gLevel.mines = 30;
  life = 3;
  hints = 3;

  renderlives();
  inIt();
}

function looseLife(i, j) {
  console.log("life", life);
  if (gBoard[i][j].isMine) {
    --life;
    renderlives();
    renderCell(i, j, MINE);
    if (life === 0) GameOver(i, j);
    if (condition) {
    }
  }
}

function addFlag(i, j) {
  gBoard[i][j].isMarked = true;
  gGame.markedCount++;
  renderCell(i, j, FLAG);
}
renderlives();
function renderlives() {
  var strHTML = "";
  for (var i = 0; i < life; i++) {
    strHTML += HEART;
  }
  var elImage = document.querySelector(".image");
  elImage.innerHTML = strHTML;
}
