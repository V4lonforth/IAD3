var canvasWidth;
var canvasHeight;
var offset = 10;

var arrowSize = 10;

var notchesAmount = 5;
var notchLength = 3.5;

var ctx;

var divWidth;
var divHeight;

function drawGraph() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if (isSelectionValid('r')) {
            drawArea(getValue('r'));
        }
        drawCoordinates();
        if (isSelectionValid('x') && isStringValid('y', -3, 5)) {
            drawPoint(getValue('x'), getValue('y'));
        }
        drawHistory();
    }
}
function init() {
    var canvas = document.getElementById("canvas");

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;

        divWidth = (canvasWidth / 2 - offset) / (notchesAmount + 1);
        divHeight = (canvasHeight / 2 - offset) / (notchesAmount + 1);

        document.getElementById("form:hidden_r").value = "1";
        var cells = $("div#input_r td");
        var rCheckBoxes = $("div#input_r input");
        var rValues = $(".dataR");
        if (rValues.length > 0) {
            var r = rValues[rValues.length - 1];
            for (var i = 0; i < rCheckBoxes.length; i++) {
                if (r.innerHTML.includes(cells[i].innerHTML)) {
                    checkSelection(rCheckBoxes[i]);
                    document.getElementById("form:hidden_r").value = cells[i].innerHTML;
                    break;
                }
            }
        }

        document.getElementById("form:hidden_x").value = "0";
        document.getElementById("form:input_y").value = "0";
        drawArea(parseFloat(1));

        drawCoordinates();
        if (isSelectionValid('x') && isStringValid('y', -3, 5)) {
            drawPoint(getValue('x'), getValue('y'));
        }

        drawHistory();
    }
}

function drawCoordinates() {
    drawAxes();
    drawNotches();
}

function drawAxes() {
    ctx.lineWidth = 1;
    ctx.fillStyle = "rgb(0, 0, 0)";

    drawLine(offset, canvasHeight / 2, canvasWidth - offset, canvasHeight / 2);
    drawLine(canvasWidth / 2, offset, canvasWidth / 2, canvasHeight - offset);

    drawLine(canvasWidth - offset, canvasHeight / 2, canvasWidth - offset - arrowSize, canvasHeight / 2 - arrowSize);
    drawLine(canvasWidth - offset, canvasHeight / 2, canvasWidth - offset - arrowSize, canvasHeight / 2 + arrowSize);

    drawLine(canvasWidth / 2, offset, canvasWidth / 2 - arrowSize, offset + arrowSize);
    drawLine(canvasWidth / 2, offset, canvasWidth / 2 + arrowSize, offset + arrowSize);
}

function drawNotches() {
    var fontSize = 8;
    ctx.font.size = fontSize;
    ctx.fillStyle = "rgb(0, 0, 0)";

    var xOffset = -4;
    var yOffset = 1;
    for (var i = -notchesAmount; i <= notchesAmount; i++) {
        if (i !== 0) {
            var x = canvasWidth / 2 + i * divWidth;
            drawLine(x, canvasHeight / 2 - notchLength, x, canvasHeight / 2 + notchLength);
            ctx.fillText(i.toString(), x + xOffset, canvasHeight / 2 + notchLength + fontSize + yOffset);
        } else {
            xOffset = -2;
        }
    }
    xOffset = 0;
    yOffset = 3;
    for (i = -notchesAmount; i <= notchesAmount; i++) {
        if (i !== 0) {
            var y = canvasHeight / 2 + i * divHeight;
            drawLine(canvasWidth / 2 - notchLength, y, canvasWidth / 2 + notchLength, y);
            ctx.fillText((-i).toString(), canvasWidth / 2 - notchLength - fontSize + xOffset, y + yOffset);
        } else {
            xOffset = -2;
        }
    }
}

function drawArea(r) {
    ctx.fillStyle = "rgb(51, 153, 255)";

    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2 + r * divHeight / 2);
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(canvasWidth / 2 + r / 2 * divWidth, canvasHeight / 2);
    ctx.arc(canvasWidth / 2, canvasHeight / 2, r * divWidth + 1, 0, Math.PI / 2);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(canvasWidth / 2 - r * divWidth, canvasHeight / 2, r * divWidth + 1, r * divHeight + 1);

    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, canvasHeight / 2);
    ctx.lineTo(canvasWidth / 2 - r * divWidth / 2, canvasHeight / 2);
    ctx.lineTo(canvasWidth / 2, canvasHeight / 2 - r * divHeight / 2);
    ctx.closePath();
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1 + 0.5, y1 + 0.5);
    ctx.lineTo(x2 + 0.5, y2 + 0.5);
    ctx.stroke();
}

function drawHistory() {
    var currentR = getValue('r');
    var dataX = $("td.dataX");
    var dataY = $("td.dataY");
    var dataR = $("td.dataR");
    var dataRes = $("td.dataRes");
    for (var i = 0; i < dataX.length; i++) {
        var x = dataX[i];
        var y = dataY[i];
        var r = dataR[i];
        var res = dataRes[i];
        if (+r.innerHTML != currentR) {
                ctx.fillStyle = "grey";
        } else {
            if (res.innerHTML.includes("In area")) {
                ctx.fillStyle = "rgb(0, 255, 0)";
            } else {
                ctx.fillStyle = "rgb(255, 0, 0)";
            }
        }
        drawPoint(parseFloat(x.innerHTML), parseFloat(y.innerHTML));
    }
}

function drawPoint(x, y) {
    ctx.beginPath();
    ctx.arc(canvasWidth / 2 + x * divWidth + 0.5, canvasHeight / 2 - y * divHeight + 0.5, 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}