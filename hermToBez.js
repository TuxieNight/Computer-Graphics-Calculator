// get user input through HTML
let hToB1x = document.getElementById("hToB1x");
let hToB1y = document.getElementById("hToB1y");

let hToB2x = document.getElementById("hToB2x");
let hToB2y = document.getElementById("hToB2y");

let hToB3x = document.getElementById("hToB3x");
let hToB3y = document.getElementById("hToB3y");

let hToB4x = document.getElementById("hToB4x");
let hToB4y = document.getElementById("hToB4y");

// get the output element
let hToBResult1x = document.getElementById("hToBResult1x");
let hToBResult1y = document.getElementById("hToBResult1y");
let hToBResult2x = document.getElementById("hToBResult2x");
let hToBResult2y = document.getElementById("hToBResult2y");
let hToBResult3x = document.getElementById("hToBResult3x");
let hToBResult3y = document.getElementById("hToBResult3y");
let hToBResult4x = document.getElementById("hToBResult4x");
let hToBResult4y = document.getElementById("hToBResult4y");

// get the button element
let convert = document.getElementById("hToB");

convert.onclick = function() {
    // calculate the cubic control points
    hermToBez();
}

function hermToBez() {

    // get the hermite control points
    let h0x = parseFloat(hToB1x.value);
    if (isNaN(h0x)) h0x = 0;
    let h0y = parseFloat(hToB1y.value);
    if (isNaN(h0y)) h0y = 0;

    let h1x = parseFloat(hToB2x.value);
    if (isNaN(h1x)) h1x = 0;
    let h1y = parseFloat(hToB2y.value);
    if (isNaN(h1y)) h1y = 0; 

    let h2x = parseFloat(hToB3x.value); // derivative of h0x
    if (isNaN(h2x)) h2x = 0;
    let h2y = parseFloat(hToB3y.value); // derivative of h0y
    if (isNaN(h2y)) h2y = 0;

    let h3x = parseFloat(hToB4x.value); // derivative of h1x
    if (isNaN(h3x)) h3x = 0;
    let h3y = parseFloat(hToB4y.value); // derivative of h1y
    if (isNaN(h3y)) h3y = 0;

    // calculate the bezier control points
    let b0x = h0x;
    let b0y = h0y;

    let b1x = h0x + h2x / 3;
    let b1y = h0y + h2y / 3;

    let b2x = h1x - h3x / 3;
    let b2y = h1y - h3y / 3;

    let b3x = h1x;
    let b3y = h1y;

    // display the cubic control points
    hToBResult1x.value = b0x;
    hToBResult1y.value = b0y;
    hToBResult2x.value = b1x;
    hToBResult2y.value = b1y;
    hToBResult3x.value = b2x;
    hToBResult3y.value = b2y;
    hToBResult4x.value = b3x;
    hToBResult4y.value = b3y;
}