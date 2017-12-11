document.addEventListener('DOMContentLoaded', startGame)
// Define your `board` object here!
let boardBlank = {
  cells:[],
}
let board = {
  cells: [
    // {row: 0, col: 0, isMine: true, hidden: true,},
    // {row: 0, col: 1, isMine: true, hidden: true,},
    // {row: 0, col: 3, isMine: false, hidden: true,},
    // {row: 1, col: 0, isMine: false, hidden: true,},
    // {row: 1, col: 1, isMine: false, hidden: true,},
    // {row: 1, col: 2, isMine: false, hidden: true,},
    // {row: 2, col: 0, isMine: false, hidden: true,},
    // {row: 2, col: 1, isMine: true, hidden: true,},
    // {row: 2, col: 3, isMine: false, hidden: true,},
  ],
}
let boardSize = 4;

function startGame () {
  // Don't remove this function call: it makes the game work!
  document.getElementById("difficulty").onchange = difficultyChange; //changed to difficulty change so it would not lose selected board size.
  setup();
  document.getElementById("reset").onclick = difficultyChange;
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  for(let i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
}

function difficultyChange() {
  var clear = document.getElementsByClassName("board")[0];
  clear.innerHTML = ''; // needed so the original board is removed.
  delete board.cells
  board.cells = [];
  startGame();
}


function setup(){
  boardSize = document.getElementById("difficulty").value;
  for (let i=0; i < boardSize; i++){
    for (let j=0; j <boardSize; j++){
      board.cells.push({row: i, col: j, hidden: true, isMarked: false, isMine:(Math.random() < 0.25)});
    }
  }
}
// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  let count = 0;
  let loss = 0;
  for (let i=0; i<board.cells.length; i++){
    if(board.cells[i].isMine === true && (!(board.cells[i].isMarked))){
      count ++;
    }
    else if(board.cells[i].isMine === false && board.cells[i].hidden === true){
      count ++;
    }
    else if(board.cells[i].isMine === true && (!(board.cells[i].hidden))){
      loss ++;
    }
  }
   if(count === 0){
    lib.displayMessage('You win!');
  //   setTimeout(function(){restart()}, 1500);
   }
  // if(loss === 0){
  //   setTimeout(function(){restart()}, 1500);
  // }
}

// function restart() {
//     location.reload();
// }
// Define this function to count the number of mines around the cells
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  let count = 0;
  let surrounding = lib.getSurroundingCells(cell.row, cell.col);
  for (let i=0; i<surrounding.length; i++){
    if(surrounding[i].isMine === true){
      count ++;
    }
  }
  return count;
}
