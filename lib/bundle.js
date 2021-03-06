/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(1);
	
	let a = new Board();
	
	document.addEventListener("DOMContentLoaded", function(){
	
	  a.addSquare();
	  a.addSquare();
	  a.drawSquares();
	  addKey();
	});
	
	
	function addKey(){
	  document.onkeydown = checkKey;
	}
	
	function checkKey(e) {
	
	    e = e || window.event;
	
	    if (e.keyCode == '38') {
	        // up arrow
	        a.moveUpRow();
	        a.drawSquares();
	        if (a.emptyBoard() === false) {
	          a.addSquare();
	        }
	        a.drawSquares();
	        if (a.lost() === true) {
	          var container = document.getElementById("Board");
	          container.style.opacity = ".2";
	
	          var ctx = document.getElementById("wintext");
	          ctx.innerHTML = "You Lose"
	
	          document.onkeydown = null;
	
	          a.clearSquares(addKey);
	        }
	
	        if (a.won() === true) {
	          document.body.style.backgroundImage = "url('confetti.gif')";
	        }
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	        a.moveDownRow();
	        a.drawSquares();
	        if (a.emptyBoard() === false) {
	          a.addSquare();
	        }
	        a.drawSquares();
	
	        if (a.lost() === true) {
	          var container = document.getElementById("Board");
	          container.style.opacity = ".2";
	
	          var ctx = document.getElementById("wintext");
	          ctx.innerHTML = "You Lose"
	
	          document.onkeydown = null;
	
	          a.clearSquares(addKey);
	        }
	
	
	        if (a.won() === true) {
	          document.body.style.backgroundImage = "url('confetti.gif')";
	        }
	    }
	    else if (e.keyCode == '37') {
	       // left arrow
	
	       a.moveLeftRow();
	       a.drawSquares();
	       if (a.emptyBoard() === false) {
	         a.addSquare();
	       }
	       a.drawSquares();
	       if (a.lost() === true) {
	         var container = document.getElementById("Board");
	         container.style.opacity = ".2";
	
	         var ctx = document.getElementById("wintext");
	         ctx.innerHTML = "You Lose"
	
	         document.onkeydown = null;
	
	         a.clearSquares(addKey);
	       }
	
	       if (a.won() === true) {
	         document.body.style.backgroundImage = "url('confetti.gif')";
	       }
	    }
	
	    else if (e.keyCode == '39') {
	       a.moveRightRow();
	       a.drawSquares();
	       if (a.emptyBoard() === false) {
	         a.addSquare();
	       }
	       a.drawSquares();
	      //  debugger
	
	       if (a.lost() === true) {
	         var container = document.getElementById("Board");
	         container.style.opacity = ".2";
	
	         var ctx = document.getElementById("wintext");
	         ctx.innerHTML = "You Lose"
	
	         document.onkeydown = null;
	
	         a.clearSquares(addKey);
	       }
	
	       if (a.won() === true) {
	         document.body.style.backgroundImage = "url('confetti.gif')";
	       }
	     }
	
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Tile = __webpack_require__(2);
	
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
	
	Board.prototype.clearSquares = function(resetkeys) {
	
	  let container = document.getElementById("wincontainer");
	  let btn = document.createElement("p");        // Create a <button> element
	  btn.id = "newgame";
	  btn.className = "newgamebutton"
	  let t = document.createTextNode("Restart");
	  btn.appendChild(t);
	  container.appendChild(btn);
	
	  let context = this;
	  btn.addEventListener('click', function(e){
	    context.board = Array.apply(null, Array(4)).map(function() { return [undefined,undefined,undefined,undefined] });
	    context.score = 0;
	    context.addSquare();
	    context.addSquare();
	    context.drawSquares();
	
	    var container = document.getElementById("Board");
	    container.style.opacity = "1";
	
	    var ctx = document.getElementById("wintext");
	    ctx.innerHTML = ""
	    document.getElementById("newgame").remove();
	    resetkeys();
	  });
	
	
	}
	
	Board.prototype.drawSquares = function(){
	
	  if (localStorage["highscore"] === undefined) {
	      localStorage.setItem('highscore', 0);
	  }
	
	  var highscore = document.getElementById("highscore");
	  highscore.innerHTML = localStorage["highscore"];
	
	  if (parseInt(localStorage["highscore"]) <= this.score) {
	    localStorage.setItem('highscore', this.score);
	    var highscore = document.getElementById("highscore");
	    highscore.innerHTML = localStorage["highscore"];
	  }
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	const Tile = function(value) {
	  this.value = value;
	  this.merged = false;
	};
	
	module.exports = Tile;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map