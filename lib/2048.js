const Board = require("./board.js");

let a = new Board();

document.addEventListener("DOMContentLoaded", function(){
  a.addSquare();
  a.addSquare();
  a.drawSquares();
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        a.moveUpRow();
        a.drawSquares();
        if (a.emptyBoard() === false) {
          a.addSquare();
        }
        if (a.lost() === true) {
          console.log("you lost");
        }

        if (a.won() === true) {
          console.log("you won");
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
          console.log("you lost");
        }

        if (a.won() === true) {
          console.log("you won");
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
         console.log("you lost");
       }

       if (a.won() === true) {
         console.log("you won");
       }
    }
    else if (e.keyCode == '39') {
       a.moveRightRow();
       a.drawSquares();
       if (a.emptyBoard() === false) {
         a.addSquare();
       }
       a.drawSquares();

       if (a.lost() === true) {
         console.log("you lost");
       }

       if (a.won() === true) {
         console.log("you won");
       }
    }


}
