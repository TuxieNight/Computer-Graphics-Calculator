// get tangent of beginning point
let arcTan_dx = document.getElementById("arcTan_dx");
let arcTan_dy = document.getElementById("arcTan_dy");

// get b2 and b3
let arcTan_b2x = document.getElementById("arcTan_b2x");
let arcTan_b2y = document.getElementById("arcTan_b2y");
let arcTan_b3x = document.getElementById("arcTan_b3x");
let arcTan_b3y = document.getElementById("arcTan_b3y");

// get the output elements
let result_dx = document.getElementById("arcTanResult_dx");
let result_dy = document.getElementById("arcTanResult_dy");

// get the button element
let convert = document.getElementById("arcTanConvert");

convert.onclick = function() {
    // calculate the tangent
    arcTan();
}

function arcTan() {
    // get the values
    let dx = parseFloat(arcTan_dx.value);
    let dy = parseFloat(arcTan_dy.value);
    let b2x = parseFloat(arcTan_b2x.value);
    let b2y = parseFloat(arcTan_b2y.value);
    let b3x = parseFloat(arcTan_b3x.value);
    let b3y = parseFloat(arcTan_b3y.value);


    // calculate the magnitude of the beginning point tangent
    let magBeg = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    // calculate the original tangent
    let tanX = b3x - b2x;
    let tanY = b3y - b2y;

    // this part not necessary, because we are going to make the magnitude 1 anyways
    // tanX *= 3;
    // tanY *= 3;

    // calculate the magnitude of the end point tangent
    let magEnd = Math.sqrt(Math.pow(tanX, 2) + Math.pow(tanY, 2));
    
    // the arc-length tangent at the end is the original tangent * beginning magitude / end magnitude
    let resultX = tanX * magBeg / magEnd;
    let resultY = tanY * magBeg / magEnd;

    // output the result
    result_dx.value = resultX;
    result_dy.value = resultY;
}
