// get user input through HTML

// get matrix elements
let m1_1 = document.getElementById("matrix1");
let m1_2 = document.getElementById("matrix2");
let m1_3 = document.getElementById("matrix3");
let m2_1 = document.getElementById("matrix4");
let m2_2 = document.getElementById("matrix5");
let m2_3 = document.getElementById("matrix6");
let m3_1 = document.getElementById("matrix7");
let m3_2 = document.getElementById("matrix8");
let m3_3 = document.getElementById("matrix9");

// get input point elements
let p1x = document.getElementById("point1");
let p1y = document.getElementById("point2");
let p1w = document.getElementById("point3");

// get the output element [x,y,w]
let resultPoint1 = document.getElementById("resultPoint1");
let resultPoint2 = document.getElementById("resultPoint2");
let resultPoint3 = document.getElementById("resultPoint3");

// get output element [x,y]
let resultX = document.getElementById("resultX");
let resultY = document.getElementById("resultY");

// get the button element
let convert = document.getElementById("matrixButton");

convert.onclick = function() {
    // calculate the cubic control points
    matrixMult();
}

function matrixMult() {
    // multiply top row of matrix
    let x = m1_1.value * p1x.value + m1_2.value * p1y.value + m1_3.value * p1w.value;
    let y = m2_1.value * p1x.value + m2_2.value * p1y.value + m2_3.value * p1w.value;
    let w = m3_1.value * p1x.value + m3_2.value * p1y.value + m3_3.value * p1w.value;

    // output the result [x,y,w]
    resultPoint1.value = x;
    resultPoint2.value = y;
    resultPoint3.value = w;

    // output the result [x,y]
    resultX.value = x / w;
    resultY.value = y / w;
}