// get user input through HTML
let cAtQEnd1x = document.getElementById("cAtQEnd1x");
let cAtQEnd1y = document.getElementById("cAtQEnd1y");

let cAtQEnd2x = document.getElementById("cAtQEnd2x");
let cAtQEnd2y = document.getElementById("cAtQEnd2y");

let cAtQEnd3x = document.getElementById("cAtQEnd3x");
let cAtQEnd3y = document.getElementById("cAtQEnd3y");

// get scale
let cAtQEndScale = document.getElementById("cAtQEndScale");
let isFraction = document.getElementById("cAtQEndFraction");

// get the output element
let cAtQEndResult1x = document.getElementById("cAtQEndResult1x");
let cAtQEndResult1y = document.getElementById("cAtQEndResult1y");
let cAtQEndResult2x = document.getElementById("cAtQEndResult2x");
let cAtQEndResult2y = document.getElementById("cAtQEndResult2y");

// get the button element
let convert = document.getElementById("cAtQEnd");

convert.onclick = function() {
    // calculate the cubic control points
    cubicAtEndQuad();
}

function cubicAtEndQuad() {
    // get the quadratic control points
    let q0x = parseFloat(cAtQEnd1x.value);
    let q0y = parseFloat(cAtQEnd1y.value);

    let q1x = parseFloat(cAtQEnd2x.value);
    let q1y = parseFloat(cAtQEnd2y.value);

    let q2x = parseFloat(cAtQEnd3x.value);
    let q2y = parseFloat(cAtQEnd3y.value);

    let scale;
    if (isFraction.checked) {
        scale = parseFraction(cAtQEndScale.value);
    }
    else {
        scale = parseFloat(cAtQEndScale.value);
    }

    // calculate the cubic control points
    let b0x = q2x;
    let b0y = q2y;

    let b1x = q2x + scale * (q2x - q1x);
    let b1y = q2y + scale * (q2y - q1y);

    // display the cubic control points
    cAtQEndResult1x.value = b0x;
    cAtQEndResult1y.value = b0y;
    cAtQEndResult2x.value = b1x;
    cAtQEndResult2y.value = b1y;
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