// get number of control points
let numPointsEle = document.getElementById("bezierNumPoints");
// get size of points
let sizePointsEle = document.getElementById("bezierPointSize");

// get divider for control points
let point_divider = document.getElementById("bezTanControlPoints");

// get the button element
let bezTanButton = document.getElementById("getBezierTangents");

// get result dividers
let begTanDiv = document.getElementById("bezierTangentBeg");
let endTanDiv = document.getElementById("bezierTangentEnd");

// begin by updating the points with some default
updatePoints();

// if numPointsEle is changed, update the points
numPointsEle.onchange = function() {
    updatePoints();
}

// Add keydown event to handle "Enter" key
numPointsEle.onkeydown = function(event) {
    if (event.key === "Enter") {
        updatePoints();
    }
};

// if sizePointsEle is changed, update the points
sizePointsEle.onchange = function() {
    updatePoints();
}

// Add keydown event to handle "Enter" key
sizePointsEle.onkeydown = function(event) {
    if (event.key === "Enter") {
        updatePoints();
    }
};

// if bezTanButton is clicked, compute the u-value
bezTanButton.onclick = function() {
    compute();
}

function compute() {
    // get the number of functions
    let numPoints = parseFloat(numPointsEle.value);
    // get the size of the points
    let sizePoints = parseFloat(sizePointsEle.value);

    // control points
    let controlPoints = [];

    // get the control points
    for (let i = 0; i < numPoints; i++) {
        // get one set of control points
        let points = [];
        for (let j = 0; j < sizePoints; j++) {
            // get the vertex values
            let val = parseFraction(document.getElementById("pointTan_" + i + "_" + j).value);

            // add the points
            points.push(val);
        }

        // add the points to the control points
        controlPoints.push(points);
    }

    // determine the values using the control points
    for (let i = 0; i < sizePoints; i++) {
        // get value for first point
        let p0 = controlPoints[0][i];
        // get value for second point
        let p1 = controlPoints[1][i];

        // get value for second to last point
        let p2 = controlPoints[numPoints - 2][i];
        // get value for last point
        let p3 = controlPoints[numPoints - 1][i];

        // if there are n points, then the degree is n - 1
        let tanMult = numPoints - 1;

        // get the beginning tangent
        let begTan = tanMult * (p1 - p0);
        // get the end tangent
        let endTan = tanMult * (p3 - p2);

        // store the value in the beginning result element
        let begTan_ele = document.getElementById("beg_" + i);
        begTan_ele.value = begTan;

        // store the value in the end result element
        let endTan_ele = document.getElementById("end_" + i);
        endTan_ele.value = endTan;
    }
}

function updatePoints() {
    // clear all dividers with input elements
    point_divider.innerHTML = "";
    begTanDiv.innerHTML = "";
    endTanDiv.innerHTML = "";

    // get the number of points
    let numPoints = parseFloat(numPointsEle.value);
    // get the size of the points
    let sizePoints = parseFloat(sizePointsEle.value);

    // create the points for each  input divider
    for (let i = 0; i < numPoints; i++) {
        // create divider for each set of control points
        let point_div = document.createElement("div");
        point_div.id = "point_divider_" + i;

        point_divider.appendChild(point_div);       

        // create the control point input elements
        for (let j = 0; j < sizePoints; j++) {
            let point_ele = document.createElement("input");

            // set the type
            point_ele.type = "text";

            // make the element smaller
            point_ele.size = 10;

            // set the id
            point_ele.id = "pointTan_" + i + "_" + j;
            // set placeholder
            point_ele.placeholder = "Point " + (i + 1);

            // add elements and spaces to the divider for this set of control points
            point_div.appendChild(point_ele);
            point_div.appendChild(document.createTextNode(" "));
            // create break between points
            point_div.appendChild(document.createElement("br"));
        }
    }

        // create the points for each result divider
    for (let i = 0; i < sizePoints; i++) {
        // create result input elements
        let begTan_ele = document.createElement("input");
        let endTan_ele = document.createElement("input");

        // set the type
        begTan_ele.type = "text";
        endTan_ele.type = "text";

        // set the id
        begTan_ele.id = "beg_" + i;
        endTan_ele.id = "end_" + i;

        // make results read only
        begTan_ele.readOnly = true;
        endTan_ele.readOnly = true;

        // add elements and spaces
        begTanDiv.appendChild(begTan_ele);
        begTanDiv.appendChild(document.createTextNode(" "));
        endTanDiv.appendChild(endTan_ele);
        endTanDiv.appendChild(document.createTextNode(" "));

        // create break
        begTanDiv.appendChild(document.createElement("br"));
        endTanDiv.appendChild(document.createElement("br"));
    }

}

function parseFraction(number) {
    let parts = number.split('/');
    if (parts.length === 2) {
        let numerator = parseFloat(parts[0]);
        let denominator = parseFloat(parts[1]);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
        }
    }
    return parseFloat(number); // fallback to parseFloat if not a fraction
}