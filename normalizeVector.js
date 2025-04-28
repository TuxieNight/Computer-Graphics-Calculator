// get size of vector
let vecSizeEle = document.getElementById("vecSize");

// get divider for original vector
let original_divider = document.getElementById("vecToNormalize");

// get the button element
let normalizeButton = document.getElementById("normalizeVector");

// get divider for normalized vector
let normalized_divider = document.getElementById("normalizedVec");

// if numPointsBox is changed, update the points
vecSizeEle.onchange = function() {
    updatePoints();
}

// Add keydown event to handle "Enter" key
vecSizeEle.onkeydown = function(event) {
    if (event.key === "Enter") {
        updatePoints();
    }
};

// if interpolateButton is clicked, interpolate
normalizeButton.onclick = function() {
    normalize();
}

function normalize() {
    // get the number of points
    let vecSize = parseFloat(vecSizeEle.value);

    // get the vertices' values of unknown length
    let vector = [];

    for (let i = 0; i < vecSize; i++) {
        // get the vertex values
        let val = parseFraction(document.getElementById("original_" + i).value);

        // add the points
        vector.push(val);
    }

    // calculate the length of the vector
    let length = 0;
    for (let i = 0; i < vecSize; i++) {
        length += Math.pow(vector[i], 2);
    }
    length = Math.sqrt(length);

    // normalize the vector
    let normalized_vector = vector.map(function(val) {
        return val / length;
    });

    // set the normalized vector values
    for (let i = 0; i < vecSize; i++) {
        // set the normalized vector values
        document.getElementById("normalized_" + i).value = normalized_vector[i];
    }

}

function updatePoints() {
    // clear all dividers
    original_divider.innerHTML = "";
    normalized_divider.innerHTML = "";

    // get the vector size
    let vecSize = parseFloat(vecSizeEle.value);

    // create the points for each divider
    for (let i = 0; i < vecSize; i++) {
        // create the vector elements
        let original_ele = document.createElement("input");
        let normalized_ele = document.createElement("input");

        // set the type
        original_ele.type = "text";
        normalized_ele.type = "text";

        // set the id
        original_ele.id = "original_" + i;
        normalized_ele.id = "normalized_" + i;

        // add elements and spaces
        original_divider.appendChild(original_ele);
        original_divider.appendChild(document.createTextNode(" "));

        normalized_divider.appendChild(normalized_ele);
        normalized_divider.appendChild(document.createTextNode(" "));

        // make the v_divider elements un-editable
        normalized_ele.readOnly = true;
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
