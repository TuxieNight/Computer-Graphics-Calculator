// get user input through HTML
let Decastlejau1x = document.getElementById("Decastlejau1x");
let Decastlejau1y = document.getElementById("Decastlejau1y");
let Decastlejau2x = document.getElementById("Decastlejau2x");
let Decastlejau2y = document.getElementById("Decastlejau2y");
let Decastlejau3x = document.getElementById("Decastlejau3x");
let Decastlejau3y = document.getElementById("Decastlejau3y");
let Decastlejau4x = document.getElementById("Decastlejau4x");
let Decastlejau4y = document.getElementById("Decastlejau4y");

let uInput = document.getElementById("pointUInput");
let isQuad = document.getElementById("DecastlejauCheckbox");
let isFraction = document.getElementById("DecastlejauFraction");

// get the output element
let D1_1x = document.getElementById("DecastlejauResult11x");
let D1_1y = document.getElementById("DecastlejauResult11y");
let D1_2x = document.getElementById("DecastlejauResult12x");
let D1_2y = document.getElementById("DecastlejauResult12y");
let D1_3x = document.getElementById("DecastlejauResult13x");
let D1_3y = document.getElementById("DecastlejauResult13y");
let D1_4x = document.getElementById("DecastlejauResult14x");
let D1_4y = document.getElementById("DecastlejauResult14y");

let D2_1x = document.getElementById("DecastlejauResult21x");
let D2_1y = document.getElementById("DecastlejauResult21y");
let D2_2x = document.getElementById("DecastlejauResult22x");
let D2_2y = document.getElementById("DecastlejauResult22y");
let D2_3x = document.getElementById("DecastlejauResult23x");
let D2_3y = document.getElementById("DecastlejauResult23y");
let D2_4x = document.getElementById("DecastlejauResult24x");
let D2_4y = document.getElementById("DecastlejauResult24y");

let uOutputX = document.getElementById("pointUOutputX");
let uOutputY = document.getElementById("pointUOutputY");

let howDoneX = document.getElementById("howDoneX");
let howDoneY = document.getElementById("howDoneY");

// get the button element
let convert = document.getElementById("Decastlejau");

convert.onclick = function() {
    // calculate the cubic control points
    decastlejau();
}

function decastlejau() {
    // clear how done
    howDoneX.textContent = "x: ";
    howDoneY.textContent = "y: ";

    // get u
    let u;
    if(isFraction.checked) {
        u = parseFraction(uInput.value);
    } else {
        u = parseFloat(uInput.value);
    }

    // get the x input values
    let x1 = parseFloat(Decastlejau1x.value);
    let x2 = parseFloat(Decastlejau2x.value);
    let x3 = parseFloat(Decastlejau3x.value);
    let x4 = parseFloat(Decastlejau4x.value);

    let xValues;
    // interpolate the x values
    if (isQuad.checked) {
        xValues = interpolateQuad(x1, x2, x3, u, howDoneX);
    } else {
        xValues = interpolateCubic(x1, x2, x3, x4, u, howDoneX);
    }

    

    // get the y input values
    let y1 = parseFloat(Decastlejau1y.value);
    let y2 = parseFloat(Decastlejau2y.value);
    let y3 = parseFloat(Decastlejau3y.value);
    let y4 = parseFloat(Decastlejau4y.value);

    let yValues;
    // interpolate the y values
    if (isQuad.checked) {
        yValues = interpolateQuad(y1, y2, y3, u, howDoneY);
    } else {
        yValues = interpolateCubic(y1, y2, y3, y4, u, howDoneY);
    }

    // display the first segment control points
    D1_1x.value = xValues[0][0];
    D1_1y.value = yValues[0][0];
    D1_2x.value = xValues[0][1];
    D1_2y.value = yValues[0][1];
    D1_3x.value = xValues[0][2];
    D1_3y.value = yValues[0][2];

    if(isQuad.checked) {
        D1_4x.value = "N/A";
        D1_4y.value = "N/A";
    } else {
        D1_4x.value = xValues[0][3];
        D1_4y.value = yValues[0][3];
    }


    // display the second segment control points
    D2_1x.value = xValues[1][0];
    D2_1y.value = yValues[1][0];
    D2_2x.value = xValues[1][1];
    D2_2y.value = yValues[1][1];
    D2_3x.value = xValues[1][2];
    D2_3y.value = yValues[1][2];

    if(isQuad.checked) {
        D2_4x.value = "N/A";
        D2_4y.value = "N/A";
    } else {
        D2_4x.value = xValues[1][3];
        D2_4y.value = yValues[1][3];
    }

    // display the interpolated point
    uOutputX.value = xValues[2];
    uOutputY.value = yValues[2];
}

function interpolateCubic(p1, p2, p3, p4, u, howDone) {
    // calculate the first level of interpolation
    let p12 = p1*(1-u) + p2*u;
    let p23 = p2*(1-u) + p3*u;
    let p34 = p3*(1-u) + p4*u;

    // calculate the second level of interpolation
    let p123 = p12*(1-u) + p23*u;
    let p234 = p23*(1-u) + p34*u;

    // calculate the third level of interpolation
    let p1234 = p123*(1-u) + p234*u;

    // store points of first segment
    let firstSegment = [p1, p12, p123, p1234];

    // store points of second segment
    let secondSegment = [p1234, p234, p34, p4];

    // store the interpolated point
    let interpolatedPoint = p1234;

    howDone.textContent += "["+p1+", "+p2+", "+p3+", "+p4+"] -> ["+p12+", "+p23+", "+p34+"] -> ["+p123+", "+p234+"] -> ["+p1234+"]";

    return [firstSegment, secondSegment, interpolatedPoint];
}

function interpolateQuad(p1, p2, p3, u, howDone) {
    // calculate the first level of interpolation
    let p12 = p1*(1-u) + p2*u;
    let p23 = p2*(1-u) + p3*u;

    // calculate the second level of interpolation
    let p123 = p12*(1-u) + p23*u;

    // store points of first segment
    let firstSegment = [p1, p12, p123];

    // store points of second segment
    let secondSegment = [p123, p23, p3];

    // store the interpolated point
    let interpolatedPoint = p123;

    howDone.textContent += "["+p1+", "+p2+", "+p3+"] -> ["+p12+", "+p23+"] -> ["+p123+"]";

    return [firstSegment, secondSegment, interpolatedPoint];
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