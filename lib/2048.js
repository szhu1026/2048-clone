const Board = require("./board.js");

let a = new Board();

window.addEventListener("DOMContentLoaded", function(){

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
