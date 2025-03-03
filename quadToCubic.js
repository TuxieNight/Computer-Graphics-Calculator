// get user input through HTML
let qToc1x = document.getElementById("qToc1x");
let qToc1y = document.getElementById("qToc1y");

let qToc2x = document.getElementById("qToc2x");
let qToc2y = document.getElementById("qToc2y");

let qToc3x = document.getElementById("qToc3x");
let qToc3y = document.getElementById("qToc3y");

// get the output element
let qTocResult1x = document.getElementById("qTocResult1x");
let qTocResult1y = document.getElementById("qTocResult1y");
let qTocResult2x = document.getElementById("qTocResult2x");
let qTocResult2y = document.getElementById("qTocResult2y");
let qTocResult3x = document.getElementById("qTocResult3x");
let qTocResult3y = document.getElementById("qTocResult3y");
let qTocResult4x = document.getElementById("qTocResult4x");
let qTocResult4y = document.getElementById("qTocResult4y");

// get the button element
let convert = document.getElementById("cAtQEnd");

convert.onclick = function() {
    // calculate the cubic control points
    quadToCubic();
}

function quadToCubic() {
    // get the quadratic control points
    let q0x = parseFloat(qToc1x.value);
    let q0y = parseFloat(qToc1y.value);

    let q1x = parseFloat(qToc2x.value);
    let q1y = parseFloat(qToc2y.value);

    let q2x = parseFloat(qToc3x.value);
    let q2y = parseFloat(qToc3y.value);

    // calculate the cubic control points
    let b0x = q0x;
    let b0y = q0y;

    let b1x = q0x + 2/3 * (q1x - q0x);
    let b1y = q0y + 2/3 * (q1y - q0y);

    let b2x = q2x - 2/3 * (q2x - q1x);
    let b2y = q2y - 2/3 * (q2y - q1y);

    let b3x = q2x;
    let b3y = q2y;



    // display the cubic control points
    qTocResult1x.value = b0x;
    qTocResult1y.value = b0y;
    qTocResult2x.value = b1x;
    qTocResult2y.value = b1y;
    qTocResult3x.value = b2x;
    qTocResult3y.value = b2y;
    qTocResult4x.value = b3x;
    qTocResult4y.value = b3y;
}


