// get user input through HTML
let cToH1x = document.getElementById("cToH1x");
let cToH1y = document.getElementById("cToH1y");

let cToH2x = document.getElementById("cToH2x");
let cToH2y = document.getElementById("cToH2y");

let cToH3x = document.getElementById("cToH3x");
let cToH3y = document.getElementById("cToH3y");

let cToH4x = document.getElementById("cToH4x");
let cToH4y = document.getElementById("cToH4y");

let cToHScale = document.getElementById("cToHScale");
let isFraction = document.getElementById("cToHFraction");

// get the output element
let cToHResult1x = document.getElementById("cToHResult1x");
let cToHResult1y = document.getElementById("cToHResult1y");
let cToHResult2x = document.getElementById("cToHResult2x");
let cToHResult2y = document.getElementById("cToHResult2y");
let cToHResult3x = document.getElementById("cToHResult3x");
let cToHResult3y = document.getElementById("cToHResult3y");
let cToHResult4x = document.getElementById("cToHResult4x");
let cToHResult4y = document.getElementById("cToHResult4y");

// get the button element
let convert = document.getElementById("cToH");

convert.onclick = function() {
    // calculate the cubic control points
    cardToBez();
}

function cardToBez() {
    let scale;
    // get the scale
    if (isFraction.checked) {
        scale = parseFraction(cToHScale.value);
    } else {
        scale = parseFloat(cToHScale.value);
    }

    // get the cardinal control points
    let c0x = parseFloat(cToH1x.value);
    let c0y = parseFloat(cToH1y.value);

    let c1x = parseFloat(cToH2x.value);
    let c1y = parseFloat(cToH2y.value);

    let c2x = parseFloat(cToH3x.value);
    let c2y = parseFloat(cToH3y.value);

    let c3x = parseFloat(cToH4x.value);
    let c3y = parseFloat(cToH4y.value);

    // calculate the hermite control points
    let h0x = c1x;
    let h0y = c1y;

    let h1x = c2x;
    let h1y = c2y;

    let h2x = scale * (c2x - c0x);
    let h2y = scale * (c2y - c0y);

    let h3x = scale * (c3x - c1x);
    let h3y = scale * (c3y - c1y);

    // display the cubic control points
    cToHResult1x.value = h0x;
    cToHResult1y.value = h0y;
    cToHResult2x.value = h1x;
    cToHResult2y.value = h1y;
    cToHResult3x.value = h2x;
    cToHResult3y.value = h2y;
    cToHResult4x.value = h3x;
    cToHResult4y.value = h3y;
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