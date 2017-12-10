document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: [
    {row: 0, col: 0, isMine: true, hidden: true,},
    {row: 0, col: 1, isMine: true, hidden: true,},
    {row: 0, col: 3, isMine: false, hidden: true,},
    {row: 1, col: 0, isMine: false, hidden: true,},
    {row: 1, col: 1, isMine: false, hidden: true,},
    {row: 1, col: 2, isMine: false, hidden: true,},
    {row: 2, col: 0, isMine: false, hidden: true,},
    {row: 2, col: 1, isMine: true, hidden: true,},
    {row: 2, col: 3, isMine: false, hidden: true,},
  ],
}
function startGame () {
  // Don't remove this function call: it makes the game work!
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  for(var i=0; i<board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  let count = 0;
  for (i=0; i<board.cells.length; i++){
    if(board.cells[i].isMine === true && (!(board.cells[i].isMarked))){
      count ++;
    }
    else if(board.cells[i].isMine === false && board.cells[i].hidden === true){
      count ++;
    }
  }
  if(count === 0){
    lib.displayMessage('You win!');
  }
}









//   for (i=0; i<board.cells.length; i ++){
//     if(board.cells[i].isMine === true && board.cells[i].isMarked !== true){
//       break;
//     }
//     else if (board.cells[i].hidden === true && board.cells[i].isMine === true){
//       lib.displayMessage('You win!');
//     }
//     else {
//       break;
//     }
//   }
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
  for (var i=0; i<surrounding.length; i++){
    if(surrounding[i].isMine === true){
      count ++;
    }
  }
  return count;
}
