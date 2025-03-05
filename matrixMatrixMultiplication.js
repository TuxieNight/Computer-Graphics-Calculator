// get user input through HTML

// get first matrix elements
let a1_1 = document.getElementById("matrix1st_1");
let a1_2 = document.getElementById("matrix1st_2");
let a1_3 = document.getElementById("matrix1st_3");
let a2_1 = document.getElementById("matrix1st_4");
let a2_2 = document.getElementById("matrix1st_5");
let a2_3 = document.getElementById("matrix1st_6");
let a3_1 = document.getElementById("matrix1st_7");
let a3_2 = document.getElementById("matrix1st_8");
let a3_3 = document.getElementById("matrix1st_9");

// get second matrix elements
let b1_1 = document.getElementById("matrix2nd_1");
let b1_2 = document.getElementById("matrix2nd_2");
let b1_3 = document.getElementById("matrix2nd_3");
let b2_1 = document.getElementById("matrix2nd_4");
let b2_2 = document.getElementById("matrix2nd_5");
let b2_3 = document.getElementById("matrix2nd_6");
let b3_1 = document.getElementById("matrix2nd_7");
let b3_2 = document.getElementById("matrix2nd_8");
let b3_3 = document.getElementById("matrix2nd_9");

// get the output matrix
let c1_1 = document.getElementById("resultMatrix1");
let c1_2 = document.getElementById("resultMatrix2");
let c1_3 = document.getElementById("resultMatrix3");
let c2_1 = document.getElementById("resultMatrix4");
let c2_2 = document.getElementById("resultMatrix5");
let c2_3 = document.getElementById("resultMatrix6");
let c3_1 = document.getElementById("resultMatrix7");
let c3_2 = document.getElementById("resultMatrix8");
let c3_3 = document.getElementById("resultMatrix9");

// get the button element
let convert = document.getElementById("matrixMatrixButton");

convert.onclick = function() {
    // calculate the cubic control points
    matrixMult();
}

function matrixMult() {
    // Convert input values to numbers
    let a11 = parseFloat(a1_1.value);
    let a12 = parseFloat(a1_2.value);
    let a13 = parseFloat(a1_3.value);
    let a21 = parseFloat(a2_1.value);
    let a22 = parseFloat(a2_2.value);
    let a23 = parseFloat(a2_3.value);
    let a31 = parseFloat(a3_1.value);
    let a32 = parseFloat(a3_2.value);
    let a33 = parseFloat(a3_3.value);

    let b11 = parseFloat(b1_1.value);
    let b12 = parseFloat(b1_2.value);
    let b13 = parseFloat(b1_3.value);
    let b21 = parseFloat(b2_1.value);
    let b22 = parseFloat(b2_2.value);
    let b23 = parseFloat(b2_3.value);
    let b31 = parseFloat(b3_1.value);
    let b32 = parseFloat(b3_2.value);
    let b33 = parseFloat(b3_3.value);

    // Calculate the result matrix elements
    let c11 = a11 * b11 + a12 * b21 + a13 * b31;
    let c12 = a11 * b12 + a12 * b22 + a13 * b32;
    let c13 = a11 * b13 + a12 * b23 + a13 * b33;

    let c21 = a21 * b11 + a22 * b21 + a23 * b31;
    let c22 = a21 * b12 + a22 * b22 + a23 * b32;
    let c23 = a21 * b13 + a22 * b23 + a23 * b33;

    let c31 = a31 * b11 + a32 * b21 + a33 * b31;
    let c32 = a31 * b12 + a32 * b22 + a33 * b32;
    let c33 = a31 * b13 + a32 * b23 + a33 * b33;

    // Output the result matrix
    c1_1.value = c11;
    c1_2.value = c12;
    c1_3.value = c13;
    c2_1.value = c21;
    c2_2.value = c22;
    c2_3.value = c23;
    c3_1.value = c31;
    c3_2.value = c32;
    c3_3.value = c33;
}