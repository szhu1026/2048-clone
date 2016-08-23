const Board = require("./board.js");

let a = new Board();

document.addEventListener("DOMContentLoaded", function(){
  a.addSquare();
  a.addSquare();
  a.drawSquares();

  var ctx = document.getElementById("highscore");
  if (window.localStorage["highscore"]){
    ctx.innerHTML = localStorage["highscore"];
  }
  else {
    ctx.innerHTML = 0;
  }

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
        a.drawSquares();
        if (a.lost() === true) {
          var container = document.getElementById("Board");
          container.style.opacity = ".2";

          var ctx = document.getElementById("wintext");
          ctx.innerHTML = "You Lose"

          if (parseInt(localStorage["highscore"]) < a.score) {
            localStorage.setItem('highscore', a.score);
            var highscore = document.getElementById("highscore");
            highscore.innerHTML = localStorage["highscore"];
          }
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

          if (parseInt(localStorage["highscore"]) < a.score) {
            localStorage.setItem('highscore', a.score);
            var highscore = document.getElementById("highscore");
            highscore.innerHTML = localStorage["highscore"];
          }
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

         if (parseInt(localStorage["highscore"]) < a.score) {
           localStorage.setItem('highscore', a.score);
           var highscore = document.getElementById("highscore");
           highscore.innerHTML = localStorage["highscore"];
         }
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

         if (parseInt(localStorage["highscore"]) < a.score) {
           localStorage.setItem('highscore', a.score);
           var highscore = document.getElementById("highscore");
           highscore.innerHTML = localStorage["highscore"];
         }
       }

       if (a.won() === true) {
         console.log("you won");
       }
    }


}
