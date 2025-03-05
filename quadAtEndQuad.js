// get user input through HTML
let qAtQEnd1x = document.getElementById("qAtQEnd1x");
let qAtQEnd1y = document.getElementById("qAtQEnd1y");

let qAtQEnd2x = document.getElementById("qAtQEnd2x");
let qAtQEnd2y = document.getElementById("qAtQEnd2y");

let qAtQEnd3x = document.getElementById("qAtQEnd3x");
let qAtQEnd3y = document.getElementById("qAtQEnd3y");

// get scale
let qAtQEndScale = document.getElementById("qAtQEndScale");
let isFraction = document.getElementById("qAtQEndFraction");

// get the output element
let qAtQEndResult1x = document.getElementById("qAtQEndResult1x");
let qAtQEndResult1y = document.getElementById("qAtQEndResult1y");
let qAtQEndResult2x = document.getElementById("qAtQEndResult2x");
let qAtQEndResult2y = document.getElementById("qAtQEndResult2y");

// get the button element
let convert = document.getElementById("qAtQEnd");

convert.onclick = function() {
    // calculate the cubic control points
    quadAtEndQuad();
}

function quadAtEndQuad() {
    // get the quadratic control points
    let p0x = parseFloat(qAtQEnd1x.value);
    let p0y = parseFloat(qAtQEnd1y.value);

    let p1x = parseFloat(qAtQEnd2x.value);
    let p1y = parseFloat(qAtQEnd2y.value);

    let p2x = parseFloat(qAtQEnd3x.value);
    let p2y = parseFloat(qAtQEnd3y.value);

    let scale;
    if (isFraction.checked) {
        scale = parseFraction(qAtQEndScale.value);
    }
    else {
        scale = parseFloat(qAtQEndScale.value);
    }

    // calculate the connecting quadratic's control points
    let q0x = p2x;
    let q0y = p2y;

    let q1x = p2x + scale * (p2x - p1x);
    let q1y = p2y + scale * (p2y - p1y);

    // display the cubic control points
    qAtQEndResult1x.value = q0x;
    qAtQEndResult1y.value = q0y;
    qAtQEndResult2x.value = q1x;
    qAtQEndResult2y.value = q1y;
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