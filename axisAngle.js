// GLOBAL AXIS ANGLE ROTATION CALCULATOR
let axisGx = document.getElementById("axisGx");
let axisGy = document.getElementById("axisGy");
let axisGz = document.getElementById("axisGz");
let vectorGx = document.getElementById("vectorGx");
let vectorGy = document.getElementById("vectorGy");
let vectorGz = document.getElementById("vectorGz");
let axisGangle = document.getElementById("axisGangle");
let axisGresultX = document.getElementById("axisResultGx");
let axisGresultY = document.getElementById("axisResultGy");
let axisGresultZ = document.getElementById("axisResultGz");
let axisGconvert = document.getElementById("axisGconvert");

axisGconvert.onclick = function() {

    // convert angle from degree to radians
    let angle = parseFloat(axisGangle.value) * Math.PI / 180;

    // parse the axis and vector values from the input fields
    let axis = [parseFloat(axisGx.value), parseFloat(axisGy.value), parseFloat(axisGz.value)];
    let vector = [parseFloat(vectorGx.value), parseFloat(vectorGy.value), parseFloat(vectorGz.value)];

    let result = rotateVectorAxisAngle(vector, axis, angle);

    axisGresultX.value = result[0].toFixed(2);
    axisGresultY.value = result[1].toFixed(2);
    axisGresultZ.value = result[2].toFixed(2);
}

// LOCAL AXIS ANGLE ROTATION CALCULATOR
let axisLx = document.getElementById("axisLx");
let axisLy = document.getElementById("axisLy");
let axisLz = document.getElementById("axisLz");
let vectorLx = document.getElementById("vectorLx");
let vectorLy = document.getElementById("vectorLy");
let vectorLz = document.getElementById("vectorLz");
let axisLangle = document.getElementById("axisLangle");
let centerLx = document.getElementById("centerLx");
let centerLy = document.getElementById("centerLy");
let centerLz = document.getElementById("centerLz");
let axisLresultX = document.getElementById("axisResultLx");
let axisLresultY = document.getElementById("axisResultLy");
let axisLresultZ = document.getElementById("axisResultLz");
let axisLconvert = document.getElementById("axisLconvert");

axisLconvert.onclick = function() {

    // convert angle from degree to radians
    let angle = parseFloat(axisLangle.value) * Math.PI / 180;

    // parse the axis and vector values from the input fields
    let axis = [parseFloat(axisLx.value), parseFloat(axisLy.value), parseFloat(axisLz.value)];
    let vector = [parseFloat(vectorLx.value), parseFloat(vectorLy.value), parseFloat(vectorLz.value)];
    let center = [parseFloat(centerLx.value), parseFloat(centerLy.value), parseFloat(centerLz.value)];

    // Translate the vector to the origin
    let translatedVector = [
        vector[0] - center[0],
        vector[1] - center[1],
        vector[2] - center[2]
    ];

    let result = rotateVectorAxisAngle(translatedVector, axis, angle);

    // Translate the rotated vector back to the original position
    result[0] += center[0];
    result[1] += center[1];
    result[2] += center[2];

    axisLresultX.value = result[0].toFixed(2);
    axisLresultY.value = result[1].toFixed(2);
    axisLresultZ.value = result[2].toFixed(2);
}

/**
 * Rotates a vector around an axis by a given angle using the axis-angle formula.
 * @param {Array<number>} vector - The vector to rotate [x, y, z].
 * @param {Array<number>} axis - The axis of rotation [x, y, z].
 * @param {number} angle - The angle of rotation in radians.
 * @returns {Array<number>} - The rotated vector [x', y', z'].
 */
function rotateVectorAxisAngle(vector, axis, angle) {
    // Normalize the axis of rotation
    const axisLength = Math.sqrt(axis[0] ** 2 + axis[1] ** 2 + axis[2] ** 2);
    const u = axis[0] / axisLength;
    const v = axis[1] / axisLength;
    const w = axis[2] / axisLength;

    // Extract vector components
    const x = vector[0];
    const y = vector[1];
    const z = vector[2];

    // Precompute trigonometric values
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);

    // Compute the rotated vector components
    const rotatedX =
        u * (u * x + v * y + w * z) * (1 - cosTheta) +
        x * cosTheta +
        (-w * y + v * z) * sinTheta;

    const rotatedY =
        v * (u * x + v * y + w * z) * (1 - cosTheta) +
        y * cosTheta +
        (w * x - u * z) * sinTheta;

    const rotatedZ =
        w * (u * x + v * y + w * z) * (1 - cosTheta) +
        z * cosTheta +
        (-v * x + u * y) * sinTheta;

    return [rotatedX, rotatedY, rotatedZ];
}

// Example usage:
// const vector = [1, 0, 0]; // Vector to rotate
// const axis = [0, 1, 0];   // Axis of rotation (e.g., y-axis)
// const angle = Math.PI / 2; // 90 degrees in radians

// const rotatedVector = rotateVectorAxisAngle(vector, axis, angle);
// rotatedVector[0] = rotatedVector[0].toFixed(2);
// rotatedVector[1] = rotatedVector[1].toFixed(2);
// rotatedVector[2] = rotatedVector[2].toFixed(2);
// console.log("Rotated Vector:", rotatedVector);