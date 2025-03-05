// get tangent of beginning point
let dx = parseFloat(document.getElementById("arcTan_dx").value);
let dy = parseFloat(document.getElementById("arcTan_dy").value);

// get b2 and b3
let b2x = parseFloat(document.getElementById("arcTan_b2x").value);
let b2y = parseFloat(document.getElementById("arcTan_b2y").value);
let b3x = parseFloat(document.getElementById("arcTan_b3x").value);
let b3y = parseFloat(document.getElementById("arcTan_b3y").value);

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
