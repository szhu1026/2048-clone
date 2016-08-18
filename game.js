class Board {
  constructor(){
    this.board = Array.apply(null, Array(4)).map(function() { return [2,2,2,2] });
  }
};


Board.prototype.moveRightRow = function() {
  for (let i = 0; i < this.board.length; i++) {
    moveOneRow(this.board[i]);
    addNumbersRow(this.board[i]);
  }
}

Board.prototype.moveLeftRow = function() {
  for (let i = 0; i < this.board.length; i++) {
    moveOneRow(this.board[i]);
    addNumbersRow(this.board[i]);
  }
}


// function emptyPositions(this.board){
//   let emptypos = [];
//
//   for (let i = 0; i < this.board.length - 1; i++) {
//     emptypos.push(i);
//   }
// }
//
// function addRandomSquare(this.board){
//
// }


// start from block to the right
function moveOneRow(arr) {
  for (let i = arr.length - 2; i >= 0; i--) {
    let altered = false;
    // if starting block is null or next block has value, look at next block
    // if next block is null, "shift" block 1 spot.  if shifted before, reset previous block.
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] !== undefined || arr[i] === undefined) {
        break;
      } else {
        if (altered === true){
          arr[j-1] = undefined;
        }
        arr[j] = arr[i];
        altered = true;
      }
    }
    // if altered, set starting block to null
    if (altered === true){
      arr[i] = undefined;
    }
  }
}

function addNumbersRow(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === arr[i-1] && arr[i] !== undefined && arr[i-1] !== undefined) {
      arr[i] = arr[i] * 2;
      let shiftval = i - 1;
      while (shiftval >= 0) {
        arr[shiftval] = arr[shiftval - 1];
        shiftval--;
      }
    }
  }
}
