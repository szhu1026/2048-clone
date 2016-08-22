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

        setTimeout(function(){
          a.drawSquares();
        }, 10000);

        for (let time = 0; time < 4; time++){
          a.moveUpRow();
          a.drawSquares();
        }

=======
        a.moveUpRow();
        a.drawSquares();
>>>>>>> parent of a2d9df1... Refactor code, to move one column/row at a time
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
       a.moveRightRow();
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
       }

       if (a.won() === true) {
         console.log("you won");
       }
    }

    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }


}
