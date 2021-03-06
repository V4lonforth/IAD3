$('document').ready(function () {
    $("canvas").on('mousedown', function (e) {
        if (checkR()) {
            var rect = document.getElementById("canvas").getBoundingClientRect();
            var x = ((e.clientX - rect.left - canvasWidth / 2) / divWidth).toFixed(3);
            var y = (-(e.clientY - rect.top - canvasHeight / 2) / divHeight).toFixed(3);
            document.getElementById("form:hidden_x").value = x;
            document.getElementById("form:input_y").value = y;
            shouldCheck = false;
            document.getElementById("form:submitButton").click();
        }
    })
});

var shouldCheck = true;

function submitForm() {
    return !shouldCheck || (checkX() && checkY() && checkR());
}
function checkX() {
	return isSelectionValid('x');
}
function checkY() {
    if (isStringValid('y', -3, 5)) {
        hideAlert();
        return true;
    } else {
        showAlert("Incorrect y value");
        return false;
    }
}
function checkR() {
    return isSelectionValid('r');
}

function isStringValid(arg, range1, range2) {
    var str = document.getElementById("form:input_" + arg).value.substring(0, 10).replace(",", ".");
    if (isNaN(str))
        return false;
	var value = parseFloat(str);
	return range1 < value && value < range2;

}
function isSelectionValid(arg) {
    var selectObjects = $("div#input_" + arg + " input");
    var count = 0;
    for (i = 0; i < selectObjects.length; i++) {
        if (selectObjects[i].checked) {
            count++;
        }
    }
    return count === 1;
}

function getValue(arg) {
    if (arg === 'y') {
        return parseFloat(document.getElementById("form:input_" + arg).value.substring(0, 10).replace(",", "."));
    } else {
        return +document.getElementById("form:hidden_" + arg).value;
    }
}
function showAlert(message) {
	var div = $("#alert")[0];
	div.style.visibility = "visible";
	div.innerHTML = message;
}
function hideAlert() {
    var div = $("#alert")[0];
    div.style.visibility = "hidden";
}

function checkSelection(selectObject) {
    if (selectObject.value) {
        var selectObjects = $("div#input_" + selectObject.id[0] + " input");
        for (i = 0; i < selectObjects.length; i++) {
            selectObjects[i].checked = false;
        }
    }
    var cells = $("div#input_" + selectObject.id[0] + " td");
    var index = +selectObject.id.substring(1);
    document.getElementById("form:hidden_" + selectObject.id[0]).value = cells[index].innerHTML;

    selectObject.checked = true;

    drawGraph();
    if (selectObject.id[0] === 'x') {
        checkX();
    } else {
        checkR();
    }
}