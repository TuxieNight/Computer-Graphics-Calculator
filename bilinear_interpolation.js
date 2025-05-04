/**
 * Performs bilinear interpolation.
 * @param {number} x - The x-coordinate of the point to interpolate.
 * @param {number} y - The y-coordinate of the point to interpolate.
 * @param {number} x1 - The x-coordinate of the top-left corner.
 * @param {number} y1 - The y-coordinate of the top-left corner.
 * @param {number} x2 - The x-coordinate of the bottom-right corner.
 * @param {number} y2 - The y-coordinate of the bottom-right corner.
 * @param {number} q11 - The value at (x1, y1).
 * @param {number} q21 - The value at (x2, y1).
 * @param {number} q12 - The value at (x1, y2).
 * @param {number} q22 - The value at (x2, y2).
 * @returns {number} - The interpolated value.
 */
function bilinearInterpolation(x, y, x1, y1, x2, y2, q11, q21, q12, q22) {
    const r1 = ((x2 - x) / (x2 - x1)) * q11 + ((x - x1) / (x2 - x1)) * q21;
    const r2 = ((x2 - x) / (x2 - x1)) * q12 + ((x - x1) / (x2 - x1)) * q22;
    return ((y2 - y) / (y2 - y1)) * r1 + ((y - y1) / (y2 - y1)) * r2;
}

let bilinearInterpolationButton = document.getElementById("bilinearInterpolate");
let x = document.getElementById("bilinearX");
let y = document.getElementById("bilinearY");
let xTopLeft = document.getElementById("bilinearTopLeftX");
let yTopLeft = document.getElementById("bilinearTopLeftY");
let xBottomRight = document.getElementById("bilinearBottomRightX");
let yBottomRight = document.getElementById("bilinearBottomRightY");
let q11 = document.getElementById("bilinearTopLeftValue");
let q21 = document.getElementById("bilinearTopRightValue");
let q12 = document.getElementById("bilinearBottomLeftValue");
let q22 = document.getElementById("bilinearBottomRightValue");
let bilinearResult = document.getElementById("bilinearResult");

bilinearInterpolationButton.onclick = function() {

    // parse the values
    let xVal = parseFloat(x.value);
    let yVal = parseFloat(y.value);
    let x1 = parseFloat(xTopLeft.value);
    let y1 = parseFloat(yTopLeft.value);
    let x2 = parseFloat(xBottomRight.value);
    let y2 = parseFloat(yBottomRight.value);
    let q11Val = parseFloat(q11.value);
    let q21Val = parseFloat(q21.value);
    let q12Val = parseFloat(q12.value);
    let q22Val = parseFloat(q22.value);

    // perform bilinear interpolation
    let result = bilinearInterpolation(xVal, yVal, x1, y1, x2, y2, q11Val, q21Val, q12Val, q22Val);

    // output the result
    bilinearResult.value = result;

}
