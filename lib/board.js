const Tile = require("./tile.js");

const Board = function() {
  this.board = Array.apply(null, Array(4)).map(function() { return [undefined,undefined,undefined,undefined] });
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

      if (this.board[row][column] !== undefined && this.board[row][column].merged === true) {
        let show = this.board[row][column] === undefined ? "" : this.board[row][column].value
        draw(show, square);
        // animation(show, square);
        // this.board[row][column].merged === false;
        // animationback(show, square);
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
  let boardcopyright = this.board;

  for (let i = 0; i < boardcopyright.length; i++) {
    moveOneRow(boardcopyright[i]);
    addNumbersRow(boardcopyright[i]);
  }

  boardcopyright =  boardcopyright.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //swipe to left
  let boardcopyleft = this.board;

  for (let i = 0; i < boardcopyleft.length; i++) {
    moveOneRowLeft(boardcopyleft[i]);
    addNumbersRowLeft(boardcopyleft[i]);
  }

  boardcopyleft =  boardcopyleft.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //swipe up
  let boardcopyup = this.board;
  boardcopyup = invertBoard(boardcopyup);

  for (let i = 0; i < boardcopyup.length; i++) {
    moveOneRowLeft(boardcopyup[i]);
    addNumbersRowLeft(boardcopyup[i]);
  }

  boardcopyup = invertBoard(boardcopyup);

  boardcopyup = boardcopyup.map(function(row) {return row.map(function(el) {return el === undefined ? undefined : el.value} )})

  //swipe down
  let boardcopydown = this.board;
  boardcopydown = invertBoard(boardcopydown);

  for (let i = 0; i < boardcopydown.length; i++) {
    moveOneRow(boardcopydown[i]);
    addNumbersRow(boardcopydown[i]);
  }

  boardcopydown = invertBoard(boardcopydown);

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

function addNumbersRow(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== undefined && arr[i-1] !== undefined && arr[i].value === arr[i-1].value) {
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

function addNumbersRowLeft(arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] !== undefined && arr[i+1] !== undefined && arr[i].value === arr[i+1].value) {
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
//
// function preShake(square) {
//   var ctx = document.getElementById(square).getContext("2d");
//   ctx.save();
//   var dx = Math.random()*10;
//   var dy = Math.random()*10;
//   ctx.translate(dx, dy);
// }
//
// function postShake(square) {
//   var ctx = document.getElementById(square).getContext("2d");
//   ctx.restore();
// }
//
// function animate() {
//   var ctx = document.getElementById("square0").getContext("2d");
//   // keep animation alive
//   requestAnimationFrame(animate);
//   // erase
//   ctx.clearRect(0,0,document.getElementById("square0").width, document.getElementById("square0").height);
//   //
//   preShake("square0");
//   //
//   draw("5", "square0");
//   //
//   postShake("square0");
// }



function draw(val, square) {
  var ctx = document.getElementById(square)
  ctx.width = 107;
  ctx.height= 107;
  var con = ctx.getContext("2d");

  con.fillStyle = "#F5F5DC";
  con.fillRect(0,0, 200, 200);
  // draw font in red
  con.fillStyle = "red";
  con.font = "55pt Clear Sans";
  con.textAlign = "center"
  con.fillText(val, 50, 70);

}


function animation(val, square) {
  var ctx = document.getElementById(square)
  ctx.width = 150;
  ctx.height= 150;
  var con = ctx.getContext("2d");

  con.fillStyle = "#F5F5DC";
  con.fillRect(0,0, 200, 200);
  // draw font in red
  con.fillStyle = "red";
  con.font = "55pt Clear Sans";
  con.textAlign = "center"
  con.fillText(val, 50, 70);

}

function animationback(val, square) {
  var ctx = document.getElementById(square)
  ctx.width = 107;
  ctx.height= 107;
  var con = ctx.getContext("2d");

  con.fillStyle = "#F5F5DC";
  con.fillRect(0,0, 200, 200);
  // draw font in red
  con.fillStyle = "red";
  con.font = "55pt Clear Sans";
  con.textAlign = "center"
  con.fillText(val, 50, 70);

}
module.exports = Board;
