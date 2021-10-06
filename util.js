"use strict";
function findingNeighbors(myArray, i, j) {
  var rowLimit = myArray.length - 1;
  var columnLimit = myArray[0].length - 1;
  var count = 0;

  for (var x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
    for (var y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
      if (x !== i || y !== j) {
        if (myArray[x][y].isMine) myArray[i][j].minesAroundCount++;
      }
    }
  }
}

function renderBoard(mat, selector) {
  var strHTML = '<table border="1"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j].value;
      var className = "cell cell" + i + "-" + j;
      strHTML +=
        `<td ondblclick="doSomething( ${i} , ${j} )" + onClick=" looseLife( ${i} , ${j} ) + handleClick( ${i} , ${j} ) " class="` +
        className +
        '"> ' +
        cell +
        " </td>";
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function handleClick(i, j) {
  doSomething();
  if (i < 0 || i > gLevel.size - 1 || j < 0 || j > gLevel.size - 1) return;

  if (gBoard[i][j].isMine === true) return;
  gBoard[i][j].isShown = true;
  gGame.shownCount++;
  if ((gBoard[i][j].isShown = true)) {
    // var elCell = document.querySelector(`.cell${i}-${j}`);
    // elCell.style.backroundColor = "white";
    // renderCell(i, j, "background-color: grey;");
  }
  renderCell(i, j, gBoard[i][j].minesAroundCount);
  if (gBoard[i][j].value === "*") {
    handleClick(i - 1, j + 1) +
      handleClick(i, j + 1) +
      handleClick(i + 1, j + 1) +
      handleClick(i + 1, j) +
      handleClick(i + 1, j - 1) +
      handleClick(i, j - 1) +
      handleClick(i - 1, j - 1) +
      handleClick(i - 1, j);
  }
}

// function recursiveFunction(i, j) {
//   if (gBoard[i][j].isMine === true) return;
// }

function GameOver(i, j) {
  console.log("zbbb", gBoard);
  console.log("GameOver", i, j);
  // gBoard[i][j].value === MINE;

  var strHTML = "<h1>bettet luck next time...</h1>";
  var elContainer = document.querySelector(".board-container");
  elContainer.innerHTML = strHTML;
}

function renderCell(i, j, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${i}-${j}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function doSomething(e) {
  var targ;

  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  console.log(targ.nodeType);
  if (targ.nodeType == 3)
    // defeat Safari bug
    targ = targ.parentNode;
}
