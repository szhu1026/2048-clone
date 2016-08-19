const Board = function() {
  this.board = Array.apply(null, Array(4)).map(function() { return [undefined,undefined,undefined,undefined] });
  this.merged = false;
};


Board.prototype.moveRightRow = function() {
  for (let i = 0; i < this.board.length; i++) {
    moveOneRow(this.board[i]);
    addNumbersRow(this.board[i]);
  }
}

Board.prototype.moveLeftRow = function() {
  for (let i = 0; i < this.board.length; i++) {
    moveOneRowLeft(this.board[i]);
    addNumbersRowLeft(this.board[i]);
  }
}

Board.prototype.moveDownRow = function() {

  this.board = invertBoard(this.board);
  this.moveRightRow();
  this.board = invertBoard(this.board);

}

Board.prototype.moveUpRow = function() {

  this.board = invertBoard(this.board);
  this.moveLeftRow();
  this.board = invertBoard(this.board);

}

Board.prototype.drawSquares = function(){
  for (let row = 0; row < this.board.length; row++) {
    for (let column = 0; column < this.board[row].length; column++) {
      let squarenum = (row * 4) + column;
      let square = "square" + squarenum;
      if (this.board[row][column].merged === true) {
        debugger
      }
      else {
        draw(this.board[row][column], square);
      }
    }
  }
}

Board.prototype.addSquare = function(){
  let empty_positions = [];
  for (let row = 0; row < this.board.length; row++) {
    for (let column = 0; column < this.board[row].length; column++) {
      if (this.board[row][column] === undefined) {
        empty_positions.push([row, column]);
      }
    }
  }
  let rand = empty_positions[Math.floor(Math.random() * empty_positions.length)];
  let new_val = [2,4][Math.floor(Math.random() * 2)];

  this.board[rand[0]][rand[1]] = new_val

}

Board.prototype.emptyBoard = function(){
  let empty_positions = [];
  for (let row = 0; row < this.board.length; row++) {
    for (let column = 0; column < this.board[row].length; column++) {
      if (this.board[row][column] === undefined) {
        empty_positions.push([row, column]);
      }
    }
  }

  return empty_positions.length === 0;
}

function invertBoard(arr){
  return arr[0].map(function(col, i) {
    return arr.map(function(row) {
      return row[i];
    })
  });
}
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
      arr[i].merged = true;
      let shiftval = i - 1;
      while (shiftval >= 0) {
        arr[shiftval] = arr[shiftval - 1];
        shiftval--;
      }
    }
  }
}

function moveOneRowLeft(arr) {
  for (let i = 1; i < arr.length; i++) {
    let altered = false;
    // if starting block is null or next block has value, look at next block
    // if next block is null, "shift" block 1 spot.  if shifted before, reset previous block.
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] !== undefined || arr[i] === undefined) {
        break;
      } else {
        if (altered === true){
          arr[j + 1] = undefined;
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

function addNumbersRowLeft(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] === arr[i+1] && arr[i] !== undefined && arr[i+1] !== undefined) {
      arr[i] = arr[i+1] * 2;
      arr[i].merged = true;
      let shiftval = i + 1;
      while (shiftval < arr.length) {
        arr[shiftval] = arr[shiftval + 1];
        shiftval++;
      }
    }
  }
}



function draw(val, square) {
  var ctx = document.getElementById(square)
  var con = ctx.getContext("2d");

  // var img = new Image();
  // img.onload = function(){
  //   con.drawImage(img,0,0);
  // };
  // img.src = 'img_the_scream.jpg';

  if (val === undefined) {
    con.fillStyle = "#BCB8AB";
    ctx.lineWidth="6";
    con.fillRect(0,0, 200, 200);
  }
  else {
    con.fillStyle = "#F5F5DC";
    con.fillRect(0,0, 200, 200);
    // draw font in red
    con.fillStyle = "red";
    con.font = "55pt Clear Sans";
    con.textAlign = "center"
    con.fillText(val, 50, 70);

    // con.beginPath();
    // con.rect(0, 0, 100, 100);
    // con.fillStyle = 'yellow';
    // con.fill();
    // con.lineWidth = 7;
    // con.strokeStyle = 'black';
    // con.stroke();
  }
}

module.exports = Board;
