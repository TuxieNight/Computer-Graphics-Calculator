// get user input through HTML
let qAtCEnd1x = document.getElementById("qAtCEnd1x");
let qAtCEnd1y = document.getElementById("qAtCEnd1y");

let qAtCEnd2x = document.getElementById("qAtCEnd2x");
let qAtCEnd2y = document.getElementById("qAtCEnd2y");

let qAtCEnd3x = document.getElementById("qAtCEnd3x");
let qAtCEnd3y = document.getElementById("qAtCEnd3y");

let qAtCEnd4x = document.getElementById("qAtCEnd4x");
let qAtCEnd4y = document.getElementById("qAtCEnd4y");

// get scale
let qAtCEndScale = document.getElementById("qAtCEndScale");

// get the output element
let qAtCEndResult1x = document.getElementById("qAtCEndResult1x");
let qAtCEndResult1y = document.getElementById("qAtCEndResult1y");
let qAtCEndResult2x = document.getElementById("qAtCEndResult2x");
let qAtCEndResult2y = document.getElementById("qAtCEndResult2y");

// get the button element
let convert = document.getElementById("qAtCEnd");

convert.onclick = function() {
    // calculate the cubic control points
    quadToCubic();
}

function quadToCubic() {
    // get the quadratic control points
    let c0x = parseFloat(qAtCEnd1x.value);
    let c0y = parseFloat(qAtCEnd1y.value);

    let c1x = parseFloat(qAtCEnd2x.value);
    let c1y = parseFloat(qAtCEnd2y.value);

    let c2x = parseFloat(qAtCEnd3x.value);
    let c2y = parseFloat(qAtCEnd3y.value);

    let c3x = parseFloat(qAtCEnd4x.value);
    let c3y = parseFloat(qAtCEnd4y.value);

    let scale = parseFraction(qAtCEndScale.value);

    // calculate the cubic control points
    let q0x = c3x;
    let q0y = c3y;

    let q1x = c3x + scale * (c3x - c2x);
    let q1y = c3y + scale * (c3y - c2y);

    // display the cubic control points
    qAtCEndResult1x.value = q0x;
    qAtCEndResult1y.value = q0y;
    qAtCEndResult2x.value = q1x;
    qAtCEndResult2y.value = q1y;
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