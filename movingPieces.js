
//REMINDER: FINISH MOVING FROM REPLIT TO GIT HUB
//REMINDER: FIGURE OUT WHY IT WORKS IN REPLIT AND NOT GITHUB

var canvas = document.getElementById("layer1");
var ctx = canvas.getContext("2d");
let imgx = 225;
let imgy = 455;
var hasWon = false;
let counter = 0;
var jit = false;

window.addEventListener("keydown", moveRect, false);

var img = new Image();
img.onload = function() {
  ctx.drawImage(img, imgx, imgy, 32, 40);
}

img.src = "pictures/pixels.png";


var ch = new Image();
ch.onload = function() {
  ctx.drawImage(ch, 220, 5, 35, 25);
}

ch.src = "pictures/chest.png";

var casee = new Image();
casee.onload = function() {
  ctx.drawImage(casee, 220, 5, 0, 0);
}
casee.src = "pictures/caseoh.png";

var caselost = new Image();
caselost.onload = function() {
  ctx.drawImage(caselost, 220, 5, 0, 0);
}
caselost.src = "pictures/caseohlost.png";

let Rectangle = {
  x: 0,
  y: 0,
  counter: 0,

  drawRectangle: function() {
    ctx.beginPath();
    ctx.rect(Rectangle.x, Rectangle.y, 500, 50);
    Rectangle.fillColor();
    ctx.stroke();
  },

  fillColor: function() {
    if (counter % 2 == 0) {
      ctx.fillStyle = 'blue';
    } else {
      ctx.fillStyle = 'lightBlue';
    }
    ctx.fill();
  },

  drawBackground: function() {
    Rectangle.y = 0;
    while (Rectangle.y < canvas.height) {
      Rectangle.drawRectangle();
      Rectangle.y += 50;
      counter++;
    }
  }
}

function moveRect(e) {
  if (jit == false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Rectangle.drawBackground();
    switch (e.keyCode) {
      case 37:
        console.log("LEFT");
        if (imgx - 10 >= 0) {
          imgx -= 10
        }
        break;
      case 38:
        console.log("UP");
        if (imgy - 10 >= 0) {
          imgy -= 10
        }
        break;
      case 39:
        console.log("RIGHT");
        if (imgx + 10 <= canvas.width - img.width) {
          imgx += 10
        }
        break;
      case 40:
        console.log("DOWN");
        if (imgy + 10 <= canvas.height - img.height) {
          imgy += 10
        }
        break;
    }

    ctx.drawImage(img, imgx, imgy, 32, 40);
    ctx.drawImage(ch, 220, 5, 35, 25);

    if (imgx >= 195 && imgx <= 250 && imgy >= 5 && imgy <= 30) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(casee, 0, 0, canvas.width, canvas.height);
      // start.style.visibility = "visible";
      hasWon = true;
      jit = true;
      arenaCloser();
      but.removeAttribute("hidden");
    }
  }
}
Rectangle.drawBackground();

var sentinel = 0;

function move(elem, height, time) {
  if (hasWon == false) {
    var ypos = height;
    var xpos = canvas.width - 60;
    var ymover = .1, xmover = 1,

      timer = setInterval(function() {
        //elem.style.rotate = "180deg";
        xpos = xpos + xmover;
        ypos = ypos + ymover;
        elem.style.left = xpos + "px";
        elem.style.top = ypos + "px";
        if (xpos == canvas.width - elem.width || xpos == 0) {
          xmover *= -1;
          if ((elem == document.getElementById('shark1') || elem == document.getElementById('shark2') || elem == document.getElementById('shark3') || elem == document.getElementById('shark4'))) {
            if (elem.style.rotate == "0deg") {
              elem.style.rotate = "180deg";
            }
            else {
              elem.style.rotate = "0deg";
            }
          }
        }
        if (ypos <= height || ypos >= height + 10 || ypos >= 500) {
          ymover *= -1;
        }
        var elemLeftCoord = parseInt(elem.style.left);
        var elemTopCoord = parseInt(elem.style.top);

        if ((imgy >= elemTopCoord && imgy <= elemTopCoord + elem.height - 22) || (imgy + img.height <= elemTopCoord + elem.height - 22 && imgy + img.height >= elemTopCoord)) {
          if ((imgx >= elemLeftCoord && imgx <= elemLeftCoord + elem.width - 28) || (imgx + img.width >= elemLeftCoord && imgx + img.width <= elemLeftCoord + elem.width - 28)) {
            if (hasWon == false) {
              ctx.drawImage(caselost, 0, 0, canvas.width, canvas.height);
            }
            // start.style.visibility = "visible";
            arenaCloser();
            but.removeAttribute("hidden");
            jit = true;
            hasWon = true;
          }
        }
      }, time);
    elem.width = 56;
    elem.height = 45;
  }
} //sharks

// var start = document.getElementByID("start");
var elem1 = document.getElementById('shark1');
var elem2 = document.getElementById('shark2');
var elem3 = document.getElementById('shark3');
var elem4 = document.getElementById('shark4');

var elem11 = document.getElementById('crab1');
var elem22 = document.getElementById('crab2');
var elem33 = document.getElementById('crab3');
var elem44 = document.getElementById('crab4');
let but = document.getElementById("start");
let hidden = but.getAttribute("hidden");

move(elem1, 55, 5);
move(elem2, 155, .1);
move(elem3, 255, 6.7);
move(elem4, 355, 3.2);

move(elem11, 105, 10);
move(elem22, 205, 6);
move(elem33, 305, 5.5);
move(elem44, 405, 12);

function restart() {
  jit = false;
  but.setAttribute("hidden", "hidden");
  // start.style.visibility = "hidden";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Rectangle.drawBackground();
  ctx.drawImage(ch, 220, 5, 35, 25);
  imgx = 225;
  imgy = 455;
  ctx.drawImage(img, imgx, imgy, 32, 40);
  arenaOpener();
}

function arenaCloser() {
  elem1.style.visibility = "hidden";
  elem2.style.visibility = "hidden";
  elem3.style.visibility = "hidden";
  elem4.style.visibility = "hidden";
  elem11.style.visibility = "hidden";
  elem22.style.visibility = "hidden";
  elem33.style.visibility = "hidden";
  elem44.style.visibility = "hidden";
}
function arenaOpener() {
  jit = false;
  hasWon = false;
  elem1.style.visibility = "visible";
  elem2.style.visibility = "visible";
  elem3.style.visibility = "visible";
  elem4.style.visibility = "visible";
  elem11.style.visibility = "visible";
  elem22.style.visibility = "visible";
  elem33.style.visibility = "visible";
  elem44.style.visibility = "visible";
}
