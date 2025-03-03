// get user input through HTML

// first curve
let c1_1x = document.getElementById("cBetw2C11x");
let c1_1y = document.getElementById("cBetw2C11y");

let c1_2x = document.getElementById("cBetw2C12x");
let c1_2y = document.getElementById("cBetw2C12y");

let c1_3x = document.getElementById("cBetw2C13x");
let c1_3y = document.getElementById("cBetw2C13y");

let c1_4x = document.getElementById("cBetw2C14x");
let c1_4y = document.getElementById("cBetw2C14y");

// second curve
let c2_1x = document.getElementById("cBetw2C21x");
let c2_1y = document.getElementById("cBetw2C21y");

let c2_2x = document.getElementById("cBetw2C22x");
let c2_2y = document.getElementById("cBetw2C22y");

let c2_3x = document.getElementById("cBetw2C23x");
let c2_3y = document.getElementById("cBetw2C23y");

let c2_4x = document.getElementById("cBetw2C24x");
let c2_4y = document.getElementById("cBetw2C24y");

// get the output element
let cBetw2CResult1x = document.getElementById("cBetw2CResult1x");
let cBetw2CResult1y = document.getElementById("cBetw2CResult1y");
let cBetw2CResult2x = document.getElementById("cBetw2CResult2x");
let cBetw2CResult2y = document.getElementById("cBetw2CResult2y");
let cBetw2CResult3x = document.getElementById("cBetw2CResult3x");
let cBetw2CResult3y = document.getElementById("cBetw2CResult3y");
let cBetw2CResult4x = document.getElementById("cBetw2CResult4x");
let cBetw2CResult4y = document.getElementById("cBetw2CResult4y");

// get the button element
let convert = document.getElementById("cBetw2C");

convert.onclick = function() {
    // calculate the cubic control points
    quadToCubic();
}

function quadToCubic() {
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
    let b0x = c1_4xValue;
    let b0y = c1_4yValue;

    let b1x = c1_4xValue + (c1_4xValue - c1_3xValue);
    let b1y = c1_4yValue + (c1_4yValue - c1_3yValue);

    let b2x = c2_1xValue - (c2_2xValue - c2_1xValue);
    let b2y = c2_1yValue - (c2_2yValue - c2_1yValue);

    let b3x = c2_1xValue;
    let b3y = c2_1yValue;

    // display the cubic control points
    cBetw2CResult1x.value = b0x;
    cBetw2CResult1y.value = b0y;
    cBetw2CResult2x.value = b1x;
    cBetw2CResult2y.value = b1y;
    cBetw2CResult3x.value = b2x;
    cBetw2CResult3y.value = b2y;
    cBetw2CResult4x.value = b3x;
    cBetw2CResult4y.value = b3y;
}