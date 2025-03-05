// get user input through HTML

// first curve
let c1_1x = document.getElementById("qBetw2C11x");
let c1_1y = document.getElementById("qBetw2C11y");

let c1_2x = document.getElementById("qBetw2C12x");
let c1_2y = document.getElementById("qBetw2C12y");

let c1_3x = document.getElementById("qBetw2C13x");
let c1_3y = document.getElementById("qBetw2C13y");

let c1_4x = document.getElementById("qBetw2C14x");
let c1_4y = document.getElementById("qBetw2C14y");

// second curve
let c2_1x = document.getElementById("qBetw2C21x");
let c2_1y = document.getElementById("qBetw2C21y");

let c2_2x = document.getElementById("qBetw2C22x");
let c2_2y = document.getElementById("qBetw2C22y");

let c2_3x = document.getElementById("qBetw2C23x");
let c2_3y = document.getElementById("qBetw2C23y");

let c2_4x = document.getElementById("qBetw2C24x");
let c2_4y = document.getElementById("qBetw2C24y");

// get the output element
let qBetw2CResult1x = document.getElementById("qBetw2CResult1x");
let qBetw2CResult1y = document.getElementById("qBetw2CResult1y");
let qBetw2CResult2x = document.getElementById("qBetw2CResult2x");
let qBetw2CResult2y = document.getElementById("qBetw2CResult2y");
let qBetw2CResult3x = document.getElementById("qBetw2CResult3x");
let qBetw2CResult3y = document.getElementById("qBetw2CResult3y");

// get the button element
let convert = document.getElementById("qBetw2C");

convert.onclick = function() {
    // calculate the cubic control points
    quadBetween2Cubics();
}

function quadBetween2Cubics() {
    // get the curve control values
    let c1_1xValue = parseFloat(c1_1x.value);
    let c1_1yValue = parseFloat(c1_1y.value);

    let c1_2xValue = parseFloat(c1_2x.value);
    let c1_2yValue = parseFloat(c1_2y.value);

    let c1_3xValue = parseFloat(c1_3x.value);
    let c1_3yValue = parseFloat(c1_3y.value);

    let c1_4xValue = parseFloat(c1_4x.value);
    let c1_4yValue = parseFloat(c1_4y.value);

    let c2_1xValue = parseFloat(c2_1x.value);
    let c2_1yValue = parseFloat(c2_1y.value);

    let c2_2xValue = parseFloat(c2_2x.value);
    let c2_2yValue = parseFloat(c2_2y.value);

    let c2_3xValue = parseFloat(c2_3x.value);
    let c2_3yValue = parseFloat(c2_3y.value);

    let c2_4xValue = parseFloat(c2_4x.value);
    let c2_4yValue = parseFloat(c2_4y.value);

    // calculate the cubic control points

    // (a_4 - a_3)
    let ax = c1_4xValue - c1_3xValue;
    let ay = c1_4yValue - c1_3yValue;

    // (c_2 - c_1)
    let bx = c2_2xValue - c2_1xValue;
    let by = c2_2yValue - c2_1yValue;

    // (c_1 - a_4)
    let cx = c2_1xValue - c1_4xValue;
    let cy = c2_1yValue - c1_4yValue;

    // x(a_4 - a_3) + y(c_2 - c_1) = c_1 - a_4
    let sol = solveLinearEquations(ax, bx, cx, ay, by, cy);

    if(sol.x === null || sol.y === null) {
        // no solution
        qBetw2CResult1x.value = "No solution";
        qBetw2CResult1y.value = "No solution";
        qBetw2CResult2x.value = "No solution";
        qBetw2CResult2y.value = "No solution";
        qBetw2CResult3x.value = "No solution";
        qBetw2CResult3y.value = "No solution";
        return; 
    } else if (sol.x*ax + c1_4xValue != c2_1xValue - sol.y*bx) {
        // no solution
        qBetw2CResult1x.value = "solution for x is wrong";
        qBetw2CResult1y.value = "solution for x is wrong";
        qBetw2CResult2x.value = "solution for x is wrong";
        qBetw2CResult2y.value = "solution for x is wrong";
        qBetw2CResult3x.value = "solution for x is wrong";
        qBetw2CResult3y.value = "solution for x is wrong";
        return; 
    } else if (sol.x*ay + c1_4yValue != c2_1yValue - sol.y*by) {
        // no solution
        qBetw2CResult1x.value = "solution for y is wrong";
        qBetw2CResult1y.value = "solution for y is wrong";
        qBetw2CResult2x.value = "solution for y is wrong";
        qBetw2CResult2y.value = "solution for y is wrong";
        qBetw2CResult3x.value = "solution for y is wrong";
        qBetw2CResult3y.value = "solution for y is wrong";
        return; 
    }


    // a_4
    let q0x = c1_4xValue;
    let q0y = c1_4yValue;

    // x(a_4 - a_3) + a_4
    let q1x = sol.x*ax + c1_4xValue;
    let q1y = sol.x*ay + c1_4yValue;

    // c_1
    let q2x = c2_1xValue;
    let q2y = c2_1yValue;

    // display the cubic control points
    qBetw2CResult1x.value = q0x;
    qBetw2CResult1y.value = q0y;
    qBetw2CResult2x.value = q1x;
    qBetw2CResult2y.value = q1y;
    qBetw2CResult3x.value = q2x;
    qBetw2CResult3y.value = q2y;
}

/**
 * Solves the system of linear equations:
 * a1 * x + b1 * y = c1
 * a2 * x + b2 * y = c2
 * @param {number} a1 - Coefficient of x in the first equation
 * @param {number} b1 - Coefficient of y in the first equation
 * @param {number} c1 - Constant term in the first equation
 * @param {number} a2 - Coefficient of x in the second equation
 * @param {number} b2 - Coefficient of y in the second equation
 * @param {number} c2 - Constant term in the second equation
 * @returns {Object} - An object containing the values of x and y
 */
function solveLinearEquations(a1, b1, c1, a2, b2, c2) {
    // Create the coefficient matrix
    let A = [
        [a1, b1],
        [a2, b2]
    ];

    // Create the constant matrix
    let B = [c1, c2];

    // Calculate the determinant of the coefficient matrix
    let detA = A[0][0] * A[1][1] - A[0][1] * A[1][0];

    // Check if the determinant is zero (no unique solution)
    if (detA === 0) {
        return { x: null, y: null, message: "No unique solution" };
    }

    // Calculate the inverse of the coefficient matrix
    let invA = [
        [A[1][1] / detA, -A[0][1] / detA],
        [-A[1][0] / detA, A[0][0] / detA]
    ];

    // Multiply the inverse matrix by the constant matrix to get the solution
    let x = invA[0][0] * B[0] + invA[0][1] * B[1];
    let y = invA[1][0] * B[0] + invA[1][1] * B[1];

    return { x: x, y: y, message: "Unique solution" };
}