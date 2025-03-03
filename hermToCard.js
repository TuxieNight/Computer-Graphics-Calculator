// get user input through HTML
let hToC1x = document.getElementById("hToC1x");
let hToC1y = document.getElementById("hToC1y");

let hToC2x = document.getElementById("hToC2x");
let hToC2y = document.getElementById("hToC2y");

let hToC3x = document.getElementById("hToC3x");
let hToC3y = document.getElementById("hToC3y");

let hToC4x = document.getElementById("hToC4x");
let hToC4y = document.getElementById("hToC4y");

let hToCScale = document.getElementById("hToCScale");
let isFraction = document.getElementById("hToCFraction");

// get the output element
let hToCResult1x = document.getElementById("hToCResult1x");
let hToCResult1y = document.getElementById("hToCResult1y");
let hToCResult2x = document.getElementById("hToCResult2x");
let hToCResult2y = document.getElementById("hToCResult2y");
let hToCResult3x = document.getElementById("hToCResult3x");
let hToCResult3y = document.getElementById("hToCResult3y");
let hToCResult4x = document.getElementById("hToCResult4x");
let hToCResult4y = document.getElementById("hToCResult4y");

// get the button element
let convert = document.getElementById("hToC");

convert.onclick = function() {
    // calculate the cubic control points
    hermToCard();
}

function hermToCard() {
    let scale;
    // get the scale
    if (isFraction.checked) {
        scale = parseFraction(hToCScale.value);
    } else {
        scale = parseFloat(hToCScale.value);
    }

    // get the hermite control points
    let h0x = parseFloat(hToC1x.value);
    let h0y = parseFloat(hToC1y.value);

    let h1x = parseFloat(hToC2x.value);
    let h1y = parseFloat(hToC2y.value);

    let h0dx = parseFloat(hToC3x.value);
    let h0dy = parseFloat(hToC3y.value);

    let h1dx = parseFloat(hToC4x.value);
    let h1dy = parseFloat(hToC4y.value);

    // calculate the cardinal control points
    let c0x = h1x - (1/scale) * h0dx;
    let c0y = h1y - (1/scale) * h0dy;

    let c1x = h0x;
    let c1y = h0y;

    let c2x = h1x;
    let c2y = h1y;

    let c3x = h0x + (1/scale) * h1dx;
    let c3y = h0y + (1/scale) * h1dy;

    // display the cubic control points
    hToCResult1x.value = c0x;
    hToCResult1y.value = c0y;
    hToCResult2x.value = c1x;
    hToCResult2y.value = c1y;
    hToCResult3x.value = c2x;
    hToCResult3y.value = c2y;
    hToCResult4x.value = c3x;
    hToCResult4y.value = c3y;
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