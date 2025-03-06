// get user input through HTML
let x1 = document.getElementById("distX1");
let x2 = document.getElementById("distX2");
let y1 = document.getElementById("distY1");
let y2 = document.getElementById("distY2");

// get the output element
let dist = document.getElementById("distance");

// get the button element
let convert = document.getElementById("distanceButton");

convert.onclick = function() {
    // calculate distance
    distance();
}

function distance() {
    // get the distance controls
    let x1Val = parseFloat(x1.value);
    let x2Val = parseFloat(x2.value);
    let y1Val = parseFloat(y1.value);
    let y2Val = parseFloat(y2.value);

    if (isNaN(x1Val)) x1Val = 0;
    if (isNaN(x2Val)) x2Val = 0;
    if (isNaN(y1Val)) y1Val = 0;
    if (isNaN(y2Val)) y2Val = 0;

    // compute and display the distance result
    dist.value = Math.sqrt(Math.pow(x2Val - x1Val, 2) + Math.pow(y2Val - y1Val, 2));
}


