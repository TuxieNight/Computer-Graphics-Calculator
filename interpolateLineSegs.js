// get input
let numPointsBox = document.getElementById("numInterpolatingPoints");
let isLoopBox = document.getElementById("interpolatingLoop");
let interpolateButton = document.getElementById("interpolateButton");

let pointHolder = document.getElementById("interpolatingPoints");
let uBox = document.getElementById("interpolatingU");

// get output
let resultX = document.getElementById("interpolatingResultX");
let resultY = document.getElementById("interpolatingResultY");

// if numPointsBox is changed, update the points
numPointsBox.onchange = function() {
    updatePoints();
}

// if interpolateButton is clicked, interpolate
interpolateButton.onclick = function() {
    interpolate();
}

function interpolate() {
    // get the number of points
    let numPoints = parseFloat(numPointsBox.value);

    // get the u value
    let u = parseFloat(uBox.value);

    // create the points
    let points = [];
    for (let i = 0; i < numPoints; i++) {
        // get the x and y values
        let x = parseFloat(document.getElementById("interpolatingPointX" + i).value);
        let y = parseFloat(document.getElementById("interpolatingPointY" + i).value);

        // add the point
        points.push([x, y]);
    }

    // get the loop value
    let isLoop = isLoopBox.checked;

    // interpolate the points
    let result = interpolatePoints(points, isLoop, u);

    // output the result
    resultX.value = result[0];
    resultY.value = result[1];
}

function interpolatePoints(points, isLoop, u) {
    // get the number of points
    let numPoints = points.length;

    // get distance between points
    let distances = [];
    for (let i = 0; i < numPoints; i++) {
        // do not get distance between last point and first point if not looping
        if(!isLoop && i == numPoints - 1) {
            break;
        }

        // get the next point
        let nextIndex = (i + 1) % numPoints;

        // get the distance between the x and y
        let dx = points[nextIndex][0] - points[i][0];
        let dy = points[nextIndex][1] - points[i][1];

        // add the distance
        distances.push(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)));
    }

    // get the total distance
    let totalDistance = 0;
    for (let i = 0; i < distances.length; i++) {
        totalDistance += distances[i];
    }

    // get the distance traveled
    let distTraveled = totalDistance * u;

    // get the segment
    let segment = 0;
    let segmentDistance = 0;
    for (let i = 0; i < distances.length; i++) {
        segmentDistance += distances[i];

        if (segmentDistance >= distTraveled) {
            segment = i;
            break;
        }
    }

    // get the segment u value
    let segmentU = distTraveled;
    let distToSubtract = 0;
    for (let i = 0; i < segment; i++) {
        distToSubtract += distances[i];
    }

    // how much in segment
    let distInSeg = distTraveled - distToSubtract;

    // how much t for that one segment
    let t = distInSeg/distances[segment];

    // interpolate points of segment with t (first point is 0 + segment #, second point is 1 + segment #)
    let point_x = points[segment][0]*(1-t) + points[segment + 1][0]*t;
    let point_y = points[segment][1]*(1-t) + points[segment + 1][1]*t;

    return [point_x, point_y];
}

function updatePoints() {
    // clear the pointHolder
    pointHolder.innerHTML = "Points: <br>";

    // get the number of points
    let numPoints = parseFloat(numPointsBox.value);

    // create the points
    for (let i = 0; i < numPoints; i++) {
        // create the x and y input elements
        let x = document.createElement("input");
        let y = document.createElement("input");

        // set the type
        x.type = "text";
        y.type = "text";

        // set the id
        x.id = "interpolatingPointX" + i;
        y.id = "interpolatingPointY" + i;

        // set placeholder
        x.placeholder = "p" + i + "'s x";
        y.placeholder = "p" + i + "'s y";


        pointHolder.appendChild(x);
        pointHolder.appendChild(y);
        pointHolder.appendChild(document.createElement("br"));
    }
}
