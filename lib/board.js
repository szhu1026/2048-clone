const Tile = require("./tile.js");

const Board = function() {
  this.board = Array.apply(null, Array(4)).map(function() { return [undefined,undefined,undefined,undefined] });
  this.score = 0;
};

Board.prototype.moveRightRow = function(){
  for (let row = 0; row < this.board.length; row++) {
    for (let column = this.board[row].length - 2; column >= 0; column--){
      if (this.board[row][column] !== undefined &&
        this.board[row][column + 1] !== undefined &&
        this.board[row][column + 1].value === this.board[row][column].value) {
        this.score += this.board[row][column].value;
        this.board[row][column + 1].value = this.board[row][column].value * 2;
        this.board[row][column] = undefined;
      }
      else if (this.board[row][column + 1] === undefined){
        this.board[row][column + 1] = this.board[row][column];
        this.board[row][column] = undefined;
      }
    }
  }
}

Board.prototype.moveLeftRow = function(){
  for (let row = 0; row < this.board.length; row++) {
    for (let column = 1; column <= this.board[row].length - 1; column++){
      if (this.board[row][column] !== undefined &&
        this.board[row][column - 1] !== undefined &&
        this.board[row][column - 1].value === this.board[row][column].value) {
        this.score += this.board[row][column].value;
        this.board[row][column - 1].value = this.board[row][column].value * 2;
        this.board[row][column] = undefined;
      }
      else if (this.board[row][column - 1] === undefined){
        this.board[row][column - 1] = this.board[row][column];
        this.board[row][column] = undefined;
      }
    }
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

Board.prototype.lost = function() {
  //right copy
  let newboard = new Board();
  newboard.board = deepCopy(this.board);

  for (let time = 0; time < 4; time++){
   newboard.moveRightRow();
  }

  boardcopyright =  newboard.board.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //leftcopy
  newboard = new Board();
  newboard.board = deepCopy(this.board);

  for (let time = 0; time < 4; time++){
   newboard.moveLeftRow();
  }

  boardcopyleft = newboard.board.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //upcopy
  newboard = new Board();
  newboard.board = deepCopy(this.board);

  for (let time = 0; time < 4; time++){
   newboard.moveUpRow();
  }

  boardcopyup = newboard.board.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //downcopy
  newboard = new Board();
  newboard.board = deepCopy(this.board);

  for (let time = 0; time < 4; time++){
   newboard.moveDownRow();
  }

  boardcopydown = newboard.board.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

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
