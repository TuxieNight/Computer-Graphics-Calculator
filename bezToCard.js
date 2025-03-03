// get user input through HTML
let bToC1x = document.getElementById("bToC1x");
let bToC1y = document.getElementById("bToC1y");

let bToC2x = document.getElementById("bToC2x");
let bToC2y = document.getElementById("bToC2y");

let bToC3x = document.getElementById("bToC3x");
let bToC3y = document.getElementById("bToC3y");

let bToC4x = document.getElementById("bToC4x");
let bToC4y = document.getElementById("bToC4y");

let bToCScale = document.getElementById("bToCScale");
let isFraction = document.getElementById("bToCFraction");

// get the output element
let bToCResult1x = document.getElementById("bToCResult1x");
let bToCResult1y = document.getElementById("bToCResult1y");
let bToCResult2x = document.getElementById("bToCResult2x");
let bToCResult2y = document.getElementById("bToCResult2y");
let bToCResult3x = document.getElementById("bToCResult3x");
let bToCResult3y = document.getElementById("bToCResult3y");
let bToCResult4x = document.getElementById("bToCResult4x");
let bToCResult4y = document.getElementById("bToCResult4y");

// get the button element
let convert = document.getElementById("bToC");

convert.onclick = function() {
    // calculate the cubic control points
    cardToBez();
}

function cardToBez() {
    let scale;
    // get the scale
    if (isFraction.checked) {
        scale = parseFraction(bToCScale.value);
    } else {
        scale = parseFloat(bToCScale.value);
    }

    // get the quadratic control points
    let b0x = parseFloat(bToC1x.value);
    let b0y = parseFloat(bToC1y.value);

    let b1x = parseFloat(bToC2x.value);
    let b1y = parseFloat(bToC2y.value);

    let b2x = parseFloat(bToC3x.value);
    let b2y = parseFloat(bToC3y.value);

    let b3x = parseFloat(bToC4x.value);
    let b3y = parseFloat(bToC4y.value);

    // calculate the cubic control points
    let c0x = b3x - 3*(1/scale)*(b1x - b0x);
    let c0y = b3y - 3*(1/scale)*(b1y - b0y);

    let c1x = b0x
    let c1y = b0y

    let c2x = b3x
    let c2y = b3y

    let c3x = b0x + 3*(1/scale)*(b3x - b2x);
    let c3y = b0y + 3*(1/scale)*(b3y - b2y);



    // display the cubic control points
    bToCResult1x.value = c0x;
    bToCResult1y.value = c0y;
    bToCResult2x.value = c1x;
    bToCResult2y.value = c1y;
    bToCResult3x.value = c2x;
    bToCResult3y.value = c2y;
    bToCResult4x.value = c3x;
    bToCResult4y.value = c3y;
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