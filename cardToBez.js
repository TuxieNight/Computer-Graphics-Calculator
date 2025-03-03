// get user input through HTML
let cToB1x = document.getElementById("cToB1x");
let cToB1y = document.getElementById("cToB1y");

let cToB2x = document.getElementById("cToB2x");
let cToB2y = document.getElementById("cToB2y");

let cToB3x = document.getElementById("cToB3x");
let cToB3y = document.getElementById("cToB3y");

let cToB4x = document.getElementById("cToB4x");
let cToB4y = document.getElementById("cToB4y");

let cToBScale = document.getElementById("cToBScale");
let isFraction = document.getElementById("cToBFraction");

// get the output element
let cToBResult1x = document.getElementById("cToBResult1x");
let cToBResult1y = document.getElementById("cToBResult1y");
let cToBResult2x = document.getElementById("cToBResult2x");
let cToBResult2y = document.getElementById("cToBResult2y");
let cToBResult3x = document.getElementById("cToBResult3x");
let cToBResult3y = document.getElementById("cToBResult3y");
let cToBResult4x = document.getElementById("cToBResult4x");
let cToBResult4y = document.getElementById("cToBResult4y");

// get the button element
let convert = document.getElementById("cToB");

convert.onclick = function() {
    // calculate the cubic control points
    cardToBez();
}

function cardToBez() {
    let scale;
    // get the scale
    if (isFraction.checked) {
        scale = parseFraction(cToBScale.value);
    } else {
        scale = parseFloat(cToBScale.value);
    }

    // get the cardinal control points
    let c0x = parseFloat(cToB1x.value);
    let c0y = parseFloat(cToB1y.value);

    let c1x = parseFloat(cToB2x.value);
    let c1y = parseFloat(cToB2y.value);

    let c2x = parseFloat(cToB3x.value);
    let c2y = parseFloat(cToB3y.value);

    let c3x = parseFloat(cToB4x.value);
    let c3y = parseFloat(cToB4y.value);

    // calculate the cubic bezier control points
    let b0x = c1x;
    let b0y = c1y;

    let b1x = c1x + 1/3 * scale * (c2x - c0x);
    let b1y = c1y + 1/3 * scale * (c2y - c0y);

    let b2x = c2x - 1/3 * scale * (c3x - c1x);
    let b2y = c2y - 1/3 * scale * (c3y - c1y);

    let b3x = c2x;
    let b3y = c2y;



    // display the cubic control points
    cToBResult1x.value = b0x;
    cToBResult1y.value = b0y;
    cToBResult2x.value = b1x;
    cToBResult2y.value = b1y;
    cToBResult3x.value = b2x;
    cToBResult3y.value = b2y;
    cToBResult4x.value = b3x;
    cToBResult4y.value = b3y;
}

function parseFraction(fraction) {
    let parts = fraction.split('/');
    if (parts.length === 2) {
        let numerator = parseFloat(parts[0]);
        let denominator = parseFloat(parts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
        }
    }
    return parseFloat(fraction); // fallback to parseFloat if not a fraction
}