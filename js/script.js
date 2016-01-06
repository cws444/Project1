var r2pi = 2 * Math.PI
var row = 20;
var canvas;
var ctx;
var ctx_gradient;
var xmax;
var border = 10;
var xSpacing = 25;
var maxrows = 10;
var rowWidth = 40;
var ypx;
var radiusLg = 10;
var radiusSm = 5;
var smoffset = 6;
var curRow = 0;
var curRowMinX;
var curRowMaxX;
var curRowMinY;
var curRowMaxY;
var codeLength;
var code = [];
var guess = [];
var score = [];
var colors = [];
var numOfColors;
var colorColMinX;
var colorColMaxX;
var colorColMinY;
var colorColMaxY;
var currCenterX;
var currCenterY;
var pickedColorIdx = -1;
var right = 0;
var same = 0;
var iSkipRight = [];;
var iSkipSame = [];;

/** selectLevel() capture the level of difficulty that the player selected.
 ** Difficult Level:-
 ** 1. Easy - Guess 3 colors & position
 ** 2. Medium - Guess 4 colors & position
 ** 3. Difficult - Guess 5 colors & position
 **/

function selectLevel(){
  var level = $('input[name="level"]:checked').val();
  colors = makeArray(10);
  assignColors();

  if(level === '1'){
    code = []
    numOfColors = 5
    // Initialize the Array variable, code[]
    initArray(code, 3);
    assignCode();
    // Initialize the Array variable, guess[]
    initArray(guess, 3);
    // Initialize the Array variable, score[]
    initArray(score, 3);
    // Initialize the Array variable, iSkipRight[]
    initArray(iSkipRight, 3);
    // Initialize the Array variable, iSkipSame[]
    initArray(iSkipSame, 3);
    //only display the canvas that is selected - Easy level
    document.getElementById("board-easy").style.visibility = "visible"
    document.getElementById("board-normal").style.visibility = "hidden"
    document.getElementById("board-hard").style.visibility = "hidden"
    document.getElementById("btnGuess").style.visibility = "visible"
    document.getElementById("btnReset").style.visibility = "visible"

    canvas = document.getElementById("board-easy");
    canvas.addEventListener("mousedown", getPosition, false);

    ctx = canvas.getContext("2d");

    xmax = canvas.width;
    ymax = canvas.height;
    ctx_gradient = ctx.createLinearGradient(0, 0, 0, ymax)
    ctx_gradient.addColorStop(0, '#f2e6d9')
    ctx_gradient.addColorStop(0.75, '#724d27')
    ctx.fillStyle = ctx_gradient
    ctx.fillRect(0, 0, xmax, ymax);

    for (var col = 0; col < numOfColors; col++) {
        var ypx = col * rowWidth + rowWidth / 2;
        drawCircle(140, ypx, radiusLg, colors[col], "black");
    }

    colorColMinX = 140 - radiusLg
    colorColMaxX = 140 + radiusLg;
    colorColMinY = 0;
    colorColMaxY = colors.length * rowWidth;
    currColorCenterX = 0;
    currColorCenterY = 0;

    drawCodeRow();
    drawRowStuff();

  } else if(level === '2'){
    code = []
    numOfColors = 6
    // Initialize the Array variable, code
    initArray(code, 4);
    assignCode();
    // Initialize the Array variable, guess[]
    initArray(guess, 4);
    // Initialize the Array variable, score[]
    initArray(score, 4);
    // Initialize the Array variable, iSkipRight[]
    initArray(iSkipRight, 4);
    // Initialize the Array variable, iSkipSame[]
    initArray(iSkipSame, 4);
    //only display the canvas that is selected - Normal level
    document.getElementById("board-easy").style.visibility = "hidden"
    document.getElementById("board-normal").style.visibility = "visible"
    document.getElementById("board-hard").style.visibility = "hidden"
    document.getElementById("btnGuess").style.visibility = "visible"
    document.getElementById("btnReset").style.visibility = "visible"

    canvas = document.getElementById("board-normal");
    canvas.addEventListener("mousedown", getPosition, false);

    ctx = canvas.getContext("2d");

    xmax = canvas.width;
    ymax = canvas.height;
    ctx_gradient = ctx.createLinearGradient(0, 0, 0, ymax)
    ctx_gradient.addColorStop(0, '#f2e6d9')
    ctx_gradient.addColorStop(0.75, '#724d27')
    ctx.fillStyle = ctx_gradient
    ctx.fillRect(0, 0, xmax, ymax);

    for (var col = 0; col < numOfColors; col++) {
        var ypx = col * rowWidth + rowWidth / 2;
        drawCircle(180, ypx, radiusLg, colors[col], "black");
    }

    colorColMinX = 180 - radiusLg
    colorColMaxX = 180 + radiusLg;
    colorColMinY = 0;
    colorColMaxY = colors.length * rowWidth;
    currColorCenterX = 0;
    currColorCenterY = 0;

    drawCodeRow();
    drawRowStuff();

  } else if (level === '3'){
    code = []
    numOfColors = 7
    // Initialize the Array variable, code
    initArray(code, 5);
    assignCode();
    // Initialize the Array variable, guess[]
    initArray(guess, 5);
    // Initialize the Array variable, score[]
    initArray(score, 5);
    // Initialize the Array variable, iSkipRight[]
    initArray(iSkipRight, 5);
    // Initialize the Array variable, iSkipSame[]
    initArray(iSkipSame, 5);
    //only display the canvas that is selected - Hard level
    document.getElementById("board-easy").style.visibility = "hidden"
    document.getElementById("board-normal").style.visibility = "hidden"
    document.getElementById("board-hard").style.visibility = "visible"
    document.getElementById("btnGuess").style.visibility = "visible"
    document.getElementById("btnReset").style.visibility = "visible"

    canvas = document.getElementById("board-hard");
    canvas.addEventListener("mousedown", getPosition, false);

    ctx = canvas.getContext("2d");

    xmax = canvas.width;
    ymax = canvas.height;
    ctx_gradient = ctx.createLinearGradient(0, 0, 0, ymax)
    ctx_gradient.addColorStop(0, '#f2e6d9')
    ctx_gradient.addColorStop(0.75, '#724d27')
    ctx.fillStyle = ctx_gradient
    ctx.fillRect(0, 0, xmax, ymax);

    for (var col = 0; col < numOfColors; col++) {
        var ypx = col * rowWidth + rowWidth / 2;
        drawCircle(220, ypx, radiusLg, colors[col], "black");
    }

    colorColMinX = 220 - radiusLg
    colorColMaxX = 220 + radiusLg;
    colorColMinY = 0;
    colorColMaxY = colors.length * rowWidth;
    currColorCenterX = 0;
    currColorCenterY = 0;

    drawCodeRow();
    drawRowStuff();

  } else {
    alert("No level is selected. Please choose a level.");
  }

}

function assignColors() {
    colors = new Array("#ff8080", "#80dfff", "#ffff80", "#80ff80", "#ffbf80", "#80bfff", "#dfff80", "#bf80ff", "#bf80ff", "#ff80ff");
}
function assignCode() {
    for (var i = 0; i < code.length; i++) {
        code[i] = Math.floor(Math.random() * numOfColors);
    }
}

function processKeyCode(event) {
    // http://www.asquare.net/javascript/tests/KeyCode.html   to get the event code for a key
    switch (event.keyCode) {
        case 72:
            update();
            break;

    }
}
function makeArray(size) {           //generic array creation and initialization
    this.length = size;
    for (var i = 0; i <= size; i++) {
        this[i] = -1;
    }
    return this
}
function initArray(arr, size) {           //generic array creation and initialization
    for (var i = 0; i < size; i++) {
        arr[i] = -1;
    }
}

function drawCodeRow() {
    ypx = ymax - rowWidth / 2;
    for (idx = 0; idx < code.length; idx++) {
        xval = border + idx * xSpacing + xSpacing / 2;
        drawCircle(xval, ypx, radiusLg, "#cfcfcf", "#666666");
    }
}
function fillCodeRow() {
    ypx = ymax - rowWidth / 2;
    for (idx = 0; idx < code.length; idx++) {
        xval = border + idx * xSpacing + xSpacing / 2;
        drawCircle(xval, ypx, radiusLg, colors[code[idx]], colors[code[idx]]);
    }
}



function drawCircle(x, y, radius, clr, strokeColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, r2pi);
    if (clr.length > 0) {
        ctx.fillStyle = clr;
        ctx.fill();
    }
    ctx.lineWidth = "1.2";
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
}

function update() {
    CheckScore();
    // mark score on curRow
    MarkScore();

    if (right < 4) {
        if (curRow >= 11) {
            fillCodeRow();
            alert("Game Over. Please try again.");
        }
        else {
            curRow++;
            drawRowStuff();
            var button = document.getElementById("btnGuess");
            button.disabled = "disabled";
            for (var idx = 0; idx < guess.length; idx++) {
                guess[idx] = -1;
            }
        }
    } else {
        fillCodeRow();
        alert('Congratulations!! You win!!');
    }
}

function drawRowStuff() {
    ypx = curRow * rowWidth + rowWidth / 2;
    curRowMinX = border;
    curRowMaxX = 95 + radiusLg;
    curRowMinY = curRow * rowWidth;
    curRowMaxY = (curRow + 1) * rowWidth;

    for (idx = 0; idx < code.length; idx++) {
        xval = border + idx * xSpacing + xSpacing / 2;
        drawCircle(xval, ypx, radiusLg, "#cfcfcf", "#666666");
    }

    if(code.length === 3){
      drawCircle(xval+25, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+40, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+25, ypx + (smoffset), radiusSm, "#cfcfcf", "#666666");
    } else if(code.length === 4){
      drawCircle(xval+25, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+40, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+25, ypx + (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+40, ypx + (smoffset), radiusSm, "#cfcfcf", "#666666");
    } else {
      drawCircle(xval+25, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+40, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+55, ypx - (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+25, ypx + (smoffset), radiusSm, "#cfcfcf", "#666666");
      drawCircle(xval+40, ypx + (smoffset), radiusSm, "#cfcfcf", "#666666");
    }
  }

function getPosition(event) {
    var evt = event ? event : window.event;
    var clickX = 0, clickY = 0;

    canoffset = $(canvas).offset();
    x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(canoffset.left);
    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(canoffset.top) + 1;

    var myX = x;
    var myY = y;

    // if myY is with the curRow bounds, then check for which circle got clicked - and highlight it.
    // if myY is with in the color picing column, check for which circle got clicked - and highlight it.
    // if two circles are highlighted, change the color of the one on the row to the selected one from the color column

    if (myY >= curRowMinY && myY <= curRowMaxY && myX >= curRowMinX && myX <= curRowMaxX) {
        var foundCell = false;
        if (currColorCenterX > 0) {  // only go here if a color has been selected
            for (var idx = 0; idx < code.length && !foundCell; idx++) {
                var cellMinX = border + idx * xSpacing;
                var cellMaxX = border + (idx + 1) * xSpacing;
                if (myY >= curRowMinY && myY <= curRowMaxY && myX >= cellMinX && myX <= cellMaxX) {
                    // change the circle color
                    currCenterX = border + idx * xSpacing + xSpacing / 2;
                    currCenterY = curRow * rowWidth + rowWidth / 2;

                    drawCircle(currCenterX, currCenterY, radiusLg, "", "white");
                    foundCell = true;

                    // assign color and unselect the code circle
                    drawCircle(currCenterX, currCenterY, radiusLg, colors[pickedColorIdx], "black");
                    currCenterX = 0;
                    currCenterY = 0;
                    guess[idx] = pickedColorIdx;

                    CheckNumColored();
                }
            }
        }
    }
    else if (myY >= colorColMinY && myY <= colorColMaxY && myX >= colorColMinX && myX <= colorColMaxX) {
        pickedColorIdx = -1;
        for (var idx = 0; idx < colors.length && pickedColorIdx < 0; idx++) {
            var cellMinY = idx * rowWidth;
            var cellMaxY = (idx + 1) * rowWidth;
            if (myY >= cellMinY && myY <= cellMaxY && myX >= colorColMinX && myX <= colorColMaxX) {

                // change the circle color
                if (currColorCenterX > 0) {
                    drawCircle(currColorCenterX, currColorCenterY, radiusLg, "", "black");
                }
                if (code.length === 3) {
                    currColorCenterX = 140;
                } else if (code.length === 4) {
                    currColorCenterX = 180;
                } else {
                  currColorCenterX = 220;
                }
                currColorCenterY = idx * rowWidth + rowWidth / 2;

                drawCircle(currColorCenterX, currColorCenterY, radiusLg, "", "white");
                pickedColorIdx = idx;

                if (currCenterX > 0) { // reset the code selection
                    drawCircle(currCenterX, currCenterY, radiusLg, "", "black");
                    currCenterX = 0;
                    currCenterY = 0;
                }
            }
        }

    }

    //return false;
}
function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curRow = 0;
    document.getElementById("board-easy").style.visibility = "hidden"
    document.getElementById("board-normal").style.visibility = "hidden"
    document.getElementById("board-hard").style.visibility = "hidden"
    document.getElementById("btnGuess").disabled = "disabled"
    document.getElementById("btnGuess").style.visibility = "hidden"
    document.getElementById("btnReset").style.visibility = "hidden"
}
function CheckNumColored() {
    var cntr = 0;
    for (var idx = 0; idx < guess.length; idx++) {
        if (guess[idx] >= 0) {
            cntr++;
        }
    }
    if (cntr == guess.length) {
        var button = document.getElementById("btnGuess");
        button.disabled = "";
    }
}

function CheckScore() {
    right = 0;
    same = 0;

    for (var i = 0; i < 4; i++) {
        iSkipRight[i] = 0;
        iSkipSame[i] = 0;
    }

    // compare Guesses with code
    for (var i = 0; i < 4; i++) {
        if (code[i] == guess[i]) {
            right++;
            iSkipRight[i] = 1;
            iSkipSame[i] = 1;
        }
    }

    for (var j = 0; j < 4; j++) {
        if (iSkipRight[j] == 0) {
            var NoMatch = true;
            for (var k = 0; k < 4 & NoMatch; k++) {
                if (iSkipSame[k] == 0) {
                    if (guess[j] == code[k]) {
                        same++;
                        iSkipSame[k] = 1;
                        NoMatch = false;
                    }
                }
            }
        }
    }
}
function MarkScore() {
    // assign "black" and "white" circles and the color them
    var cntr = 0;
    for (var i = 0; i < right; i++) {
        score[cntr] = "black";
        cntr++;
    }
    for (var i = 0; i < same; i++) {
        score[cntr] = "white";
        cntr++;
    }
    for (var i = cntr; i < score.length; i++) {
        score[cntr] = '#cfcfcf';

        cntr++;
    }

    ypx = curRow * rowWidth + rowWidth / 2;
    if(code.length === 3){
      drawCircle(xval+25, ypx - (smoffset), radiusSm, score[0], "#666666");
      drawCircle(xval+40, ypx - (smoffset), radiusSm, score[1], "#666666");
      drawCircle(xval+25, ypx + (smoffset), radiusSm, score[2], "#666666");
    } else if(code.length === 4){
      drawCircle(xval+25, ypx - (smoffset), radiusSm, score[0], "#666666");
      drawCircle(xval+40, ypx - (smoffset), radiusSm, score[1], "#666666");
      drawCircle(xval+25, ypx + (smoffset), radiusSm, score[2], "#666666");
      drawCircle(xval+40, ypx + (smoffset), radiusSm, score[3], "#666666");
    } else {
      drawCircle(xval+25, ypx - (smoffset), radiusSm, score[0], "#666666");
      drawCircle(xval+40, ypx - (smoffset), radiusSm, score[1], "#666666");
      drawCircle(xval+55, ypx - (smoffset), radiusSm, score[2], "#666666");
      drawCircle(xval+25, ypx + (smoffset), radiusSm, score[3], "#666666");
      drawCircle(xval+40, ypx + (smoffset), radiusSm, score[4], "#666666");
    }
}
