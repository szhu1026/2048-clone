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
<<<<<<< HEAD

        for (let time = 0; time < 4; time++){
          a.moveUpRow();
          a.drawSquares();
        }

=======
        a.moveUpRow();
        a.drawSquares();
>>>>>>> master
        if (a.emptyBoard() === false) {
          a.addSquare();
        }
        a.drawSquares();
        if (a.lost() === true) {
          var container = document.getElementById("Board");
          container.style.opacity = ".2";
<<<<<<< HEAD

=======
          
>>>>>>> master
          var ctx = document.getElementById("wintext");
          ctx.innerHTML = "You Lose"
        }

        if (a.won() === true) {
          console.log("you won");
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
<<<<<<< HEAD

        for (let time = 0; time < 4; time++){
          a.moveDownRow();
          a.drawSquares();
        }

=======
        a.moveDownRow();
        a.drawSquares();
>>>>>>> master
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
<<<<<<< HEAD

       for (let time = 0; time < 4; time++){
         a.moveLeftRow();
         a.drawSquares();
       }
=======
       // left arrow
       a.moveLeftRow();
       a.drawSquares();
>>>>>>> master
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
<<<<<<< HEAD
      for (let time = 0; time < 4; time++){
       a.moveRightRow();
       a.drawSquares();
      }
=======
       a.moveRightRow();
       a.drawSquares();
>>>>>>> master
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
