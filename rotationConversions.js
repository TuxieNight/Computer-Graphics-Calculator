// AXIS ANGLE TO QUATERNION CONVERTER

let axisX = document.getElementById("axisQuatx");
let axisY = document.getElementById("axisQuaty");
let axisZ = document.getElementById("axisQuatz");
let axisAngle = document.getElementById("axisQuatAngle");

let axisQuatX = document.getElementById("axisQuatResultx");
let axisQuatY = document.getElementById("axisQuatResulty");
let axisQuatZ = document.getElementById("axisQuatResultz");
let axisQuatAngle = document.getElementById("axisQuatResultAngle");

let axisQuatButton = document.getElementById("axisQuatConvert");

axisQuatButton.onclick = function() {
    // parse the axis and angle values from the input fields
    let axis = [parseFloat(axisX.value), parseFloat(axisY.value), parseFloat(axisZ.value)];
    let angle = parseFloat(axisAngle.value) * Math.PI / 180; // Convert to radians

    let quaternion = axisAngleToQuaternion(axis, angle);

    axisQuatX.value = quaternion[1].toFixed(5);
    axisQuatY.value = quaternion[2].toFixed(5);
    axisQuatZ.value = quaternion[3].toFixed(5);
    axisQuatAngle.value = (quaternion[0]).toFixed(5); // Convert to degrees
}

// QUATERNION TO AXIS ANGLE CONVERTER

let quatW = document.getElementById("quatAxisw");
let quatX = document.getElementById("quatAxisx");
let quatY = document.getElementById("quatAxisy");
let quatZ = document.getElementById("quatAxisz");

let quatAxisX = document.getElementById("quatAxisResultx");
let quatAxisY = document.getElementById("quatAxisResulty");
let quatAxisZ = document.getElementById("quatAxisResultz");
let quatAxisAngle = document.getElementById("quatAxisResultAngle");

let quatAxisButton = document.getElementById("quatAxisConvert");

quatAxisButton.onclick = function() {

    // parse the quaternion values from the input fields
    let quaternion = [
        parseFloat(quatW.value),
        parseFloat(quatX.value),
        parseFloat(quatY.value),
        parseFloat(quatZ.value)
    ];

    // obtain the axis-angle representation
    let axisAngle = quaternionToAxisAngle(quaternion);

    // output the axis-angle representation
    quatAxisX.value = axisAngle[0].toFixed(5);
    quatAxisY.value = axisAngle[1].toFixed(5);
    quatAxisZ.value = axisAngle[2].toFixed(5);
    quatAxisAngle.value = (axisAngle[3] * 180 / Math.PI).toFixed(5); // Convert to degrees

}

// EULER ANGLE TO QUATERNION CONVERTER

let eulerX = document.getElementById("eulerQuatx");
let eulerY = document.getElementById("eulerQuaty");
let eulerZ = document.getElementById("eulerQuatz");
let eulerQuatButton = document.getElementById("eulerQuatConvert");

// final result elements
let eulerQuatX = document.getElementById("eulerQuatResultx");
let eulerQuatY = document.getElementById("eulerQuatResulty");
let eulerQuatZ = document.getElementById("eulerQuatResultz");
let eulerQuatAngle = document.getElementById("eulerQuatResultangle");

// intermediate result elements
let eulerQuatX1 = document.getElementById("eulerQuatResultx1");
let eulerQuatY1 = document.getElementById("eulerQuatResulty1");
let eulerQuatZ1 = document.getElementById("eulerQuatResultz1");
let eulerQuatAngle1 = document.getElementById("eulerQuatResultangle1");

let eulerQuatX2 = document.getElementById("eulerQuatResultx2");
let eulerQuatY2 = document.getElementById("eulerQuatResulty2");
let eulerQuatZ2 = document.getElementById("eulerQuatResultz2");
let eulerQuatAngle2 = document.getElementById("eulerQuatResultangle2");

let eulerQuatX3 = document.getElementById("eulerQuatResultx3");
let eulerQuatY3 = document.getElementById("eulerQuatResulty3");
let eulerQuatZ3 = document.getElementById("eulerQuatResultz3");
let eulerQuatAngle3 = document.getElementById("eulerQuatResultangle3");

eulerQuatButton.onclick = function() {
    // parse the axis and angle values from the input fields
    let eulerAngles = [
        parseFloat(eulerX.value) * Math.PI / 180, // Convert to radians
        parseFloat(eulerY.value) * Math.PI / 180, // Convert to radians
        parseFloat(eulerZ.value) * Math.PI / 180  // Convert to radians
    ];

    let quaternion = eulerToQuaternion(eulerAngles);

    eulerQuatX.value = quaternion[1].toFixed(5);
    eulerQuatY.value = quaternion[2].toFixed(5);
    eulerQuatZ.value = quaternion[3].toFixed(5);
    eulerQuatAngle.value = (Math.acos(quaternion[0])).toFixed(5); // Convert to degrees

    // Intermediate results
    let intermediateQuaternion1 = eulerToQuaternion([eulerAngles[0], 0, 0]);
    let intermediateQuaternion2 = eulerToQuaternion([0, eulerAngles[1], 0]);
    let intermediateQuaternion3 = eulerToQuaternion([0, 0, eulerAngles[2]]);

    eulerQuatX1.value = intermediateQuaternion1[1].toFixed(5);
    eulerQuatY1.value = intermediateQuaternion1[2].toFixed(5);
    eulerQuatZ1.value = intermediateQuaternion1[3].toFixed(5);
    eulerQuatAngle1.value = (intermediateQuaternion1[0]).toFixed(5); // Convert to degrees

    eulerQuatX2.value = intermediateQuaternion2[1].toFixed(5);
    eulerQuatY2.value = intermediateQuaternion2[2].toFixed(5);
    eulerQuatZ2.value = intermediateQuaternion2[3].toFixed(5);
    eulerQuatAngle2.value = (intermediateQuaternion2[0]).toFixed(5); // Convert to degrees

    eulerQuatX3.value = intermediateQuaternion3[1].toFixed(5);
    eulerQuatY3.value = intermediateQuaternion3[2].toFixed(5);
    eulerQuatZ3.value = intermediateQuaternion3[3].toFixed(5);
    eulerQuatAngle3.value = (intermediateQuaternion3[0]).toFixed(5); // Convert to degrees
}

// QUATERNION TO EULER ANGLE CONVERTER

let quatEulerW = document.getElementById("quatEulerw");
let quatEulerX = document.getElementById("quatEulerx");
let quatEulerY = document.getElementById("quatEulery");
let quatEulerZ = document.getElementById("quatEulerz");

let quatEulerButton = document.getElementById("quatEulerConvert");

// final result elements
let quatEulerXFinal = document.getElementById("quatEulerResultx");
let quatEulerYFinal = document.getElementById("quatEulerResulty");
let quatEulerZFinal = document.getElementById("quatEulerResultz");

// intermediate result elements
// let quatEulerW1 = document.getElementById("quatEulerResultw1");
// let quatEulerX1 = document.getElementById("quatEulerResultx1");
// let quatEulerY1 = document.getElementById("quatEulerResulty1");
// let quatEulerZ1 = document.getElementById("quatEulerResultz1");

// let quatEulerW2 = document.getElementById("quatEulerResultw2");
// let quatEulerX2 = document.getElementById("quatEulerResultx2");
// let quatEulerY2 = document.getElementById("quatEulerResulty2");
// let quatEulerZ2 = document.getElementById("quatEulerResultz2");

// let quatEulerW3 = document.getElementById("quatEulerResultw3");
// let quatEulerX3 = document.getElementById("quatEulerResultx3");
// let quatEulerY3 = document.getElementById("quatEulerResulty3");
// let quatEulerZ3 = document.getElementById("quatEulerResultz3");

quatEulerButton.onclick = function() {

    // parse the quaternion values from the input fields
    let quaternion = [
        parseFloat(quatEulerW.value),
        parseFloat(quatEulerX.value),
        parseFloat(quatEulerY.value),
        parseFloat(quatEulerZ.value)
    ];

    // obtain the euler angles representation
    let eulerAngles = quaternionToEuler(quaternion);

    // output the euler angles representation
    quatEulerXFinal.value = eulerAngles[0].toFixed(5);
    quatEulerYFinal.value = eulerAngles[1].toFixed(5);
    quatEulerZFinal.value = eulerAngles[2].toFixed(5);

    // Intermediate results
    // let intermediateQuaternion1 = eulerToQuaternion([eulerAngles[0], 0, 0]);
    // let intermediateQuaternion2 = eulerToQuaternion([0, eulerAngles[1], 0]);
    // let intermediateQuaternion3 = eulerToQuaternion([0, 0, eulerAngles[2]]);

    // quatEulerX1.value = intermediateQuaternion1[1].toFixed(5);
    // quatEulerY1.value = intermediateQuaternion1[2].toFixed(5);
    // quatEulerZ1.value = intermediateQuaternion1[3].toFixed(5);
    // quatEulerW1.value = (intermediateQuaternion1[0]).toFixed(5);

    // quatEulerX2.value = intermediateQuaternion2[1].toFixed(5);
    // quatEulerY2.value = intermediateQuaternion2[2].toFixed(5);
    // quatEulerZ2.value = intermediateQuaternion2[3].toFixed(5);
    // quatEulerW2.value = (intermediateQuaternion2[0]).toFixed(5);

    // quatEulerX3.value = intermediateQuaternion3[1].toFixed(5);
    // quatEulerY3.value = intermediateQuaternion3[2].toFixed(5);
    // quatEulerZ3.value = intermediateQuaternion3[3].toFixed(5);
    // quatEulerW3.value = (intermediateQuaternion3[0]).toFixed(5);

}

/**
 * Converts an axis-angle representation to a quaternion.
 * 
 * @param {*} axis 
 * @param {*} angle 
 * @returns the quaternion representation of the rotation
 *          [w, x, y, z] where w is the scalar part and x, y, z are the vector part
 */
function axisAngleToQuaternion(axis, angle) {
    let halfAngle = angle / 2;
    let sinHalfAngle = Math.sin(halfAngle);
    let cosHalfAngle = Math.cos(halfAngle);

    return [
        cosHalfAngle,
        axis[0] * sinHalfAngle,
        axis[1] * sinHalfAngle,
        axis[2] * sinHalfAngle,
    ];
}

/**
 * Converts a quaternion to an axis-angle representation.
 * 
 * @param {*} quaternion 
 * @returns the axis-angle representation of the rotation
 *          [x, y, z, angle] where x, y, z are the axis components and angle is the rotation angle in radians
 */
function quaternionToAxisAngle(quaternion) {
    let w = quaternion[0];
    let x = quaternion[1];
    let y = quaternion[2];
    let z = quaternion[3];

    let angle = 2 * Math.acos(w);
    let sinHalfAngle = Math.sqrt(1 - w * w);

    if (sinHalfAngle < 0.001) { // close to zero, axis is not defined
        return [0, 0, 0, angle]; // arbitrary axis
    }

    let axis = [
        x / sinHalfAngle,
        y / sinHalfAngle,
        z / sinHalfAngle,
    ];

    return [...axis, angle];
}

/**
 * Converts Euler angles to a quaternion.
 * 
 * @param {*} eulerAngles defines the rotation angles around the x, y, and z axes in radians
 * @returns the quaternion representation of the rotation
 *          [w, x, y, z] where w is the scalar part and x, y, z are the vector part
 */
function eulerToQuaternion(eulerAngles) {
    let [roll, pitch, yaw] = eulerAngles;

    let cy = Math.cos(yaw * 0.5);
    let sy = Math.sin(yaw * 0.5);
    let cp = Math.cos(pitch * 0.5);
    let sp = Math.sin(pitch * 0.5);
    let cr = Math.cos(roll * 0.5);
    let sr = Math.sin(roll * 0.5);

    return [
        cr * cp * cy + sr * sp * sy,
        sr * cp * cy - cr * sp * sy,
        cr * sp * cy + sr * cp * sy,
        cr * cp * sy - sr * sp * cy,
    ];
}

/**
 * Converts a quaternion to Euler angles.
 * 
 * @param {*} quaternion 
 * @returns the euler representation of the rotation
 *          [roll, pitch, yaw] where roll is the rotation around the x-axis,
 *          pitch is the rotation around the y-axis,
 *          and yaw is the rotation around the z-axis
 */
function quaternionToEuler(quaternion) {
    let w = quaternion[0];
    let x = quaternion[1];
    let y = quaternion[2];
    let z = quaternion[3];

    let roll = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
    let pitch = Math.asin(2 * (w * y - z * x));
    let yaw = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));

    return [roll, pitch, yaw].map(angle => angle * 180 / Math.PI); // Convert to degrees
}
