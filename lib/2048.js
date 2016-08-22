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

        for (let time = 0; time < 4; time++){
          a.moveUpRow();
          a.drawSquares();
        }

        if (a.emptyBoard() === false) {
          a.addSquare();
        }
        a.drawSquares();
        if (a.lost() === true) {
          var container = document.getElementById("Board");
          container.style.opacity = ".2";

          var ctx = document.getElementById("wintext");
          ctx.innerHTML = "You Lose"
        }

        if (a.won() === true) {
          console.log("you won");
        }
    }
    else if (e.keyCode == '40') {
        // down arrow

        for (let time = 0; time < 4; time++){
          a.moveDownRow();
          a.drawSquares();
        }

        if (a.emptyBoard() === false) {
          a.addSquare();
        }
        a.drawSquares();

        if (a.lost() === true) {
          var container = document.getElementById("Board");
          container.style.opacity = ".2";

          var ctx = document.getElementById("wintext");
          ctx.innerHTML = "You Lose"
        }

        if (a.won() === true) {
          console.log("you won");
        }
    }
    else if (e.keyCode == '37') {

       for (let time = 0; time < 4; time++){
         a.moveLeftRow();
         a.drawSquares();
       }
       if (a.emptyBoard() === false) {
         a.addSquare();
       }
       a.drawSquares();
       if (a.lost() === true) {
         var container = document.getElementById("Board");
         container.style.opacity = ".2";

         var ctx = document.getElementById("wintext");
         ctx.innerHTML = "You Lose"
       }

       if (a.won() === true) {
         console.log("you won");
       }
    }
    else if (e.keyCode == '39') {
      for (let time = 0; time < 4; time++){
       a.moveRightRow();
       a.drawSquares();
      }
       if (a.emptyBoard() === false) {
         a.addSquare();
       }
       a.drawSquares();

       if (a.lost() === true) {
         var container = document.getElementById("Board");
         container.style.opacity = ".2";

         var ctx = document.getElementById("wintext");
         ctx.innerHTML = "You Lose"
       }

       if (a.won() === true) {
         console.log("you won");
       }
    }


}
