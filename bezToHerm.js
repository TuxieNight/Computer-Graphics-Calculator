// get user input through HTML
let bToH1x = document.getElementById("bToH1x");
let bToH1y = document.getElementById("bToH1y");

let bToH2x = document.getElementById("bToH2x");
let bToH2y = document.getElementById("bToH2y");

let bToH3x = document.getElementById("bToH3x");
let bToH3y = document.getElementById("bToH3y");

let bToH4x = document.getElementById("bToH4x");
let bToH4y = document.getElementById("bToH4y");

// get the output element
let bToHResult1x = document.getElementById("bToHResult1x");
let bToHResult1y = document.getElementById("bToHResult1y");
let bToHResult2x = document.getElementById("bToHResult2x");
let bToHResult2y = document.getElementById("bToHResult2y");
let bToHResult3x = document.getElementById("bToHResult3x");
let bToHResult3y = document.getElementById("bToHResult3y");
let bToHResult4x = document.getElementById("bToHResult4x");
let bToHResult4y = document.getElementById("bToHResult4y");

// get the button element
let convert = document.getElementById("bToH");

convert.onclick = function() {
    // calculate the cubic control points
    hermToBez();
}

function hermToBez() {

    // get the hermite control points
    let b0x = parseFloat(bToH1x.value) | 0;
    let b0y = parseFloat(bToH1y.value) | 0;

    let b1x = parseFloat(bToH2x.value) | 0;
    let b1y = parseFloat(bToH2y.value) | 0; 

    let b2x = parseFloat(bToH3x.value) | 0; // derivative of h0x
    let b2y = parseFloat(bToH3y.value) | 0; // derivative of h0y

    let b3x = parseFloat(bToH4x.value) | 0; // derivative of h1x
    let b3y = parseFloat(bToH4y.value) | 0; // derivative of h1y

    // calculate the bezier control points
    let h0x = b0x;
    let h0y = b0y;

    let h1x = b3x;
    let h1y = b3y

    let h2x = 3 * (b1x - b0x);
    let h2y = 3 * (b1y - b0y);

    let h3x = 3 * (b3x - b2x);
    let h3y = 3 * (b3y - b2y);

    // display the cubic control points
    bToHResult1x.value = h0x;
    bToHResult1y.value = h0y;
    bToHResult2x.value = h1x;
    bToHResult2y.value = h1y;
    bToHResult3x.value = h2x;
    bToHResult3y.value = h2y;
    bToHResult4x.value = h3x;
    bToHResult4y.value = h3y;
}