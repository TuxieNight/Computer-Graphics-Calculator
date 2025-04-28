// get number of values to interpolate
let numPointsBox = document.getElementById("barycentricNum");

// get values known for all points
// vertex known values
let v1_knownX = document.getElementById("v1_knownX");
let v1_knownY = document.getElementById("v1_knownY");
let v1_knownZ = document.getElementById("v1_knownZ");
let v2_knownX = document.getElementById("v2_knownX");
let v2_knownY = document.getElementById("v2_knownY");
let v2_knownZ = document.getElementById("v2_knownZ");
let v3_knownX = document.getElementById("v3_knownX");
let v3_knownY = document.getElementById("v3_knownY");
let v3_knownZ = document.getElementById("v3_knownZ");
// interpolated point known values
let v_knownX = document.getElementById("v_knownX");
let v_knownY = document.getElementById("v_knownY");
let v_knownZ = document.getElementById("v_knownZ");

// get divider for values known only for vertices
let v1_divider = document.getElementById("v1_unknown");
let v2_divider = document.getElementById("v2_unknown");
let v3_divider = document.getElementById("v3_unknown");

// get the button element
let interpolateButton = document.getElementById("interpolateBarycentric");

// get divider for values to calculate for interpolated point
let v_divider = document.getElementById("v_unknown");

// if numPointsBox is changed, update the points
numPointsBox.onchange = function() {
    updatePoints();
}

// Add keydown event to handle "Enter" key
numPointsBox.onkeydown = function(event) {
    if (event.key === "Enter") {
        updatePoints();
    }
};

// if interpolateButton is clicked, interpolate
interpolateButton.onclick = function() {
    interpolate();
}

function interpolate() {
    // get the number of points
    let numPoints = parseFloat(numPointsBox.value);

    // find the alpha, beta, and gamma values using the values we know of the interpolated point
    let values = findAlphaBetaGamma(v_knownX.value, v_knownY.value, v_knownZ.value);
    let alpha = values[0];
    let beta = values[1];
    let gamma = values[2];

    // get the vertices' values of unknown length
    let v1_unknown_points = [];
    let v2_unknown_points = [];
    let v3_unknown_points = [];

    for (let i = 0; i < numPoints; i++) {
        // get the vertex values
        let v1_val = parseFraction(document.getElementById("v1_unknown_" + i).value);
        let v2_val = parseFraction(document.getElementById("v2_unknown_" + i).value);
        let v3_val = parseFraction(document.getElementById("v3_unknown_" + i).value);

        // add the points
        v1_unknown_points.push(v1_val);
        v2_unknown_points.push(v2_val);
        v3_unknown_points.push(v3_val);
    }

    // interpolate the points
    interpolatePoints(v1_unknown_points, v2_unknown_points, v3_unknown_points, alpha, beta, gamma, numPoints);
}

function findAlphaBetaGamma(x, y, z) {
    // parse the values
    x = parseFraction(x);
    y = parseFraction(y);
    z = parseFraction(z);

    // get the known points
    let v1_known = [parseFraction(v1_knownX.value), parseFraction(v1_knownY.value), parseFraction(v1_knownZ.value)];
    let v2_known = [parseFraction(v2_knownX.value), parseFraction(v2_knownY.value), parseFraction(v2_knownZ.value)];
    let v3_known = [parseFraction(v3_knownX.value), parseFraction(v3_knownY.value), parseFraction(v3_knownZ.value)];

    // calculate the vectors
    let v0 = [v2_known[0] - v1_known[0], v2_known[1] - v1_known[1], v2_known[2] - v1_known[2]];
    let v1 = [v3_known[0] - v1_known[0], v3_known[1] - v1_known[1], v3_known[2] - v1_known[2]];
    let v2 = [x - v1_known[0], y - v1_known[1], z - v1_known[2]];

    // calculate dot products
    let d00 = dot(v0, v0);
    let d01 = dot(v0, v1);
    let d11 = dot(v1, v1);
    let d20 = dot(v2, v0);
    let d21 = dot(v2, v1);

    // calculate the denominator
    let denom = d00 * d11 - d01 * d01;

    // calculate barycentric coordinates
    let beta = (d11 * d20 - d01 * d21) / denom;
    let gamma = (d00 * d21 - d01 * d20) / denom;
    let alpha = 1.0 - beta - gamma;

    return [alpha, beta, gamma];
}

function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

/*
 * Interpolates the points using barycentric interpolation
 * vertex_unknown_points - the points to interpolate
 */
function interpolatePoints(v1, v2, v3, alpha, beta, gamma, numPoints) {
    // interpolate the points
    for (let i = 0; i < numPoints; i++) {
        // get the vertex holder
        let v_ele = document.getElementById("v_unknown_" + i);


        // calculate and set the interpolated point
        v_ele.value =  alpha * v1[i] + beta * v2[i] + gamma * v3[i];
    }
}

function updatePoints() {
    // clear all dividers
    v1_divider.innerHTML = "";
    v2_divider.innerHTML = "";
    v3_divider.innerHTML = "";
    v_divider.innerHTML = "";

    // get the number of points
    let numPoints = parseFloat(numPointsBox.value);

    // create the points for each divider
    for (let i = 0; i < numPoints; i++) {
        // create the input elements
        let v1_ele = document.createElement("input");
        let v2_ele = document.createElement("input");
        let v3_ele = document.createElement("input");
        let v_ele = document.createElement("input");

        // set the type
        v1_ele.type = "text";
        v2_ele.type = "text";
        v3_ele.type = "text";
        v_ele.type = "text";

        // set the id
        v1_ele.id = "v1_unknown_" + i;
        v2_ele.id = "v2_unknown_" + i;
        v3_ele.id = "v3_unknown_" + i;
        v_ele.id = "v_unknown_" + i;

        // add elements and spaces
        v1_divider.appendChild(v1_ele);
        v1_divider.appendChild(document.createTextNode(" "));

        v2_divider.appendChild(v2_ele);
        v2_divider.appendChild(document.createTextNode(" "));

        v3_divider.appendChild(v3_ele);
        v3_divider.appendChild(document.createTextNode(" "));

        v_divider.appendChild(v_ele);
        v_divider.appendChild(document.createTextNode(" "));

        // make the v_divider elements un-editable
        v_ele.readOnly = true;
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
