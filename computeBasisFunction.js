// get number of functions and points
let numFuncsEle = document.getElementById("numBasisFunctions");
// get size of points
let pointsSizeEle = document.getElementById("basisVecSize");

// get u value
let u_ele = document.getElementById("basisUvalue");

// get divider for functions and control points
let func_divider = document.getElementById("basisFunctions");
let point_divider = document.getElementById("basisControlPoints");

// get the button element
let basisButton = document.getElementById("getBasisUvalue");

// if numFuncsEle is changed, update the points
numFuncsEle.onchange = function() {
    updatePoints();
}

// Add keydown event to handle "Enter" key
numFuncsEle.onkeydown = function(event) {
    if (event.key === "Enter") {
        updatePoints();
    }
};

// if pointsSizeEle is changed, update the points
pointsSizeEle.onchange = function() {
    updatePoints();
}

// Add keydown event to handle "Enter" key
pointsSizeEle.onkeydown = function(event) {
    if (event.key === "Enter") {
        updatePoints();
    }
};

// if basisButton is clicked, compute the u-value
basisButton.onclick = function() {
    compute();
}

function compute() {
    // get the number of functions
    let numFuncs = parseFloat(numFuncsEle.value);
    // get the size of the points
    let sizePoints = parseFloat(pointsSizeEle.value);

    // control points
    let controlPoints = [];

    // get the control points
    for (let i = 0; i < numFuncs; i++) {
        // get one set of control points
        let points = [];
        for (let j = 0; j < sizePoints; j++) {
            // get the vertex values
            let val = parseFraction(document.getElementById("point_" + i + "_" + j).value);

            // add the points
            points.push(val);
        }

        // add the points to the control points
        controlPoints.push(points);
    }

    // Get the u value
    let u_value = parseFraction(u_ele.value);

    // pass u_value to readFunc for each function
    for (let i = 0; i < numFuncs; i++) {
        // get the function text from the input field
        let funcText = document.getElementById("func_" + i).value;

        // Replace 'u' with its value in the function text (g means all instances)
        let result = evaluateMathExpression(funcText, u_value);

        console.log(`Result for function ${i}:`, result);
    }
}

function processExpression(expression) {
    const processedExpression = expression
    .replace(/(\d)([a-zA-Z])/g, '$1*$2') // Add * between numbers and variables
    .replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2') // Add * between variables
    .replace(/(\))(\d|[a-zA-Z])/g, '$1*$2') // Add * after closing parentheses
    .replace(/(\d)(\()/g, '$1*$2'); // Add * before opening parentheses

    return processedExpression;
}

function evaluateMathExpression(expression, u_value) {
    try {
        // Preprocess the expression:
        let processedExpression = processExpression(expression);

        // Compile the expression using math.js
        const compiledExpression = math.compile(processedExpression);

        // Evaluate the compiled expression with the given scope (e.g., u = u_value)
        const scope = { u: u_value };
        return compiledExpression.evaluate(scope);
    } catch (error) {
        console.error("Invalid math expression:", expression, error);
        return NaN; // Return NaN for invalid expressions
    }
}

function updatePoints() {
    // clear all dividers
    func_divider.innerHTML = "";
    point_divider.innerHTML = "";

    // get the number of funcsions and points
    let numFuncs = parseFloat(numFuncsEle.value);
    // get the size of the points
    let sizePoints = parseFloat(pointsSizeEle.value);


    // create the points for each divider
    for (let i = 0; i < numFuncs; i++) {
        // create the function input elements
        let func_ele = document.createElement("input");

        // set the type
        func_ele.type = "text";

        // set the id
        func_ele.id = "func_" + i;

        // add elements and spaces
        func_divider.appendChild(func_ele);
        func_divider.appendChild(document.createTextNode(" "));

        // create break between functions
        func_divider.appendChild(document.createElement("br"));

        // make the element longer
        func_ele.size = 60;

        // create the control point input elements
        for (let j = 0; j < sizePoints; j++) {
            let point_ele = document.createElement("input");

            // set the type
            point_ele.type = "text";

            // set the id
            point_ele.id = "point_" + i + "_" + j;

            // add elements and spaces
            point_divider.appendChild(point_ele);
            point_divider.appendChild(document.createTextNode(" "));
        }
        // create break between points
        point_divider.appendChild(document.createElement("br"));
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
