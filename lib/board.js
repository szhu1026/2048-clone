const Tile = require("./tile.js");

const Board = function() {
  this.board = Array.apply(null, Array(4)).map(function() { return [undefined,undefined,undefined,undefined] });
  this.score = 0;
};

Board.prototype.moveRightRow = function() {
  for (let i = 0; i < this.board.length; i++) {
    moveOneRow(this.board[i]);
    addNumbersRow(this.board[i], this);
  }
}

Board.prototype.moveLeftRow = function() {
  for (let i = 0; i < this.board.length; i++) {
    moveOneRowLeft(this.board[i]);
    addNumbersRowLeft(this.board[i], this);
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

  var ctx = document.getElementById("score");
  ctx.innerHTML = this.score;
  
  for (let row = 0; row < this.board.length; row++) {
    for (let column = 0; column < this.board[row].length; column++) {
      let squarenum = (row * 4) + column;
      let square = "square" + squarenum;

      if (this.board[row][column] !== undefined && this.board[row][column].merged === true) {
        let show = this.board[row][column] === undefined ? "" : this.board[row][column].value
        draw(show, square);
        this.board[row][column].merged = false;
      }
      else {
        let show = this.board[row][column] === undefined ? "" : this.board[row][column].value
        draw(show, square);
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

  this.board[rand[0]][rand[1]] = new Tile(new_val);

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

Board.prototype.lost = function(){
  //swipe to right
  let boardcopyright = deepCopy(this.board);

  for (let i = 0; i < boardcopyright.length; i++) {
    moveOneRow(boardcopyright[i]);
    addNumbersRow(boardcopyright[i]);
  }

  boardcopyright =  boardcopyright.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //swipe to left
  let boardcopyleft = deepCopy(this.board);

  for (let i = 0; i < boardcopyleft.length; i++) {
    moveOneRowLeft(boardcopyleft[i]);
    addNumbersRowLeft(boardcopyleft[i]);
  }

  boardcopyleft =  boardcopyleft.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //swipe up
  let boardcopyup = deepCopy(this.board);

  boardcopyup = invertBoard(boardcopyup);

  for (let i = 0; i < boardcopyup.length; i++) {
    moveOneRowLeft(boardcopyup[i]);
    addNumbersRowLeft(boardcopyup[i]);
  }

  boardcopyup = invertBoard(boardcopyup);

  boardcopyup = boardcopyup.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //swipe down
  let boardcopydown = deepCopy(this.board);
  boardcopydown = invertBoard(boardcopydown);

  for (let i = 0; i < boardcopydown.length; i++) {
    moveOneRow(boardcopydown[i]);
    addNumbersRow(boardcopydown[i]);
  }

  boardcopydown = deepCopy(this.board);

  boardcopydown =  boardcopydown.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  return (array_compare(boardcopyup, boardcopydown) === true &&
          array_compare(boardcopyup, boardcopyleft) === true &&
          array_compare(boardcopyup, boardcopyright) === true);

}

Board.prototype.won = function(){
  let won = false;
  this.board.forEach(function(row) {
    row.forEach(function(el){
      if (el !== undefined && el.value === 2048) {
        won = true;
      }
    })
  })
  return won;
}

function array_compare(a1, a2) {
 if(a1.length != a2.length) {
  return false;
 }
 for(var i in a1) {
  // Don't forget to check for arrays in our arrays.
  if(a1[i] instanceof Array && a2[i] instanceof Array) {
   if(!array_compare(a1[i], a2[i])) {
    return false;
   }
  }
  else if(a1[i] != a2[i]) {
   return false;
  }
 }
 return true;
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

function addNumbersRow(arr, board) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== undefined && arr[i-1] !== undefined && arr[i].value === arr[i-1].value) {
      if (board) {board.score += arr[i].value;}
      arr[i].value = arr[i].value * 2;
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

function addNumbersRowLeft(arr, board) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] !== undefined && arr[i+1] !== undefined && arr[i].value === arr[i+1].value) {
      if (board) {board.score += arr[i].value;}
      arr[i].value = arr[i+1].value * 2;
      arr[i].merged = true;
      let shiftval = i + 1;
      while (shiftval < arr.length) {
        arr[shiftval] = arr[shiftval + 1];
        shiftval++;
      }
    }
  }
}

function deepCopy (arr) {
    let newarr = arr.map(function(row){
      return row.map(function(el){
        return (el === undefined ? undefined : {value: el.value})
      })
    })
    return newarr;
}

let colors = {
  "": {background: "#fff", textcolor: "#000" },
  0: {background: "#F3220A", textcolor: "#000" },
  1: {background: "#230AF3", textcolor: "#000" },
  2: {background: "#EFF30A", textcolor: "#000" },
  3: {background: "#000", textcolor: "#fff" }
}

function draw(val, square) {
  let updateval = (val === "") ? "" : (Math.log2(val)) % 4
  var ctx = document.getElementById(square);
  ctx.innerHTML = val;
  ctx.style.backgroundColor = colors[updateval].background;
  ctx.style.color = colors[updateval].textcolor;
}

function drawanimation(val, square) {
}

module.exports = Board;
