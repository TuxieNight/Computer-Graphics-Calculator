let perimeter = 0;
let distances = [];
let pts = [];

// get user input through HTML

// get matrix elements
let t1x = document.getElementById("a1x");
let t1y = document.getElementById("a1y");
let t2x = document.getElementById("a2x");
let t2y = document.getElementById("a2y");
let t3x = document.getElementById("a3x");
let t3y = document.getElementById("a3y");
let t4x = document.getElementById("a4x");
let t4y = document.getElementById("a4y");
let t5x = document.getElementById("a5x");
let t5y = document.getElementById("a5y");
let t6x = document.getElementById("a6x");
let t6y = document.getElementById("a6y");
let t7x = document.getElementById("a7x");
let t7y = document.getElementById("a7y");
let t8x = document.getElementById("a8x");
let t8y = document.getElementById("a8y");
let t9x = document.getElementById("a9x");
let t9y = document.getElementById("a9y");
let t10x = document.getElementById("a10x");
let t10y = document.getElementById("a10y");

// get matrix type
let t1 = document.getElementById("a1");
let t2 = document.getElementById("a2");
let t3 = document.getElementById("a3");
let t4 = document.getElementById("a4");
let t5 = document.getElementById("a5");
let t6 = document.getElementById("a6");
let t7 = document.getElementById("a7");
let t8 = document.getElementById("a8");
let t9 = document.getElementById("a9");
let t10 = document.getElementById("a10");

let transformList = [[t1x, t1y], [t2x, t2y], [t3x, t3y], [t4x, t4y], [t5x, t5y],
                    [t6x, t6y], [t7x, t7y], [t8x, t8y], [t9x, t9y], [t10x, t10y]];

let typeList = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];

// get u
let uEle = document.getElementById("aU");

// get the output element [x,y]
let resultPoint1 = document.getElementById("aresultPx");
let resultPoint2 = document.getElementById("aresultPy");

let perimeterEle = document.getElementById("aPerimeter");
let distancesEle = document.getElementById("aDistances");

// get the button element
let convert = document.getElementById("ptButton");

convert.onclick = function() {
    transform();
}

function transform() {
    perimeter = 0;
    distances = [];
    pts = [];

    let oldX = null;
    let oldY = null;
    let firstX = null;
    let firstY = null;
    
    for (let i = 0; i < transformList.length; i++) {

        if (typeList[i].value == "P") {

            let x = parseFloat(transformList[i][0].value);
            let y = parseFloat(transformList[i][1].value);

            if (oldX == null) {
                firstX = x;
                firstY = y;
                oldX = x;
                oldY = y;
                pts.push([x,y]);
            }
            else {
                let dist = distance(oldX, oldY, x, y);
                perimeter += dist;
                distances.push(dist);
                pts.push([x,y]);
                oldX = x;
                oldY = y;
            }
        }
    }

    // add the last segment
    if (oldX != null) {
        let dist = distance(oldX, oldY, firstX, firstY);
        perimeter += dist;
        distances.push(dist);
    }

    // apply perimeter
    perimeterEle.value = perimeter;
    distancesEle.value = distances;

    // apply to point
    let u = parseFloat(uEle.value);

    let uDist = u*perimeter;
    let uDistSum = 0;
    let rx = 0;
    let ry = 0;

   for (let i = 0; i < distances.length; i++) {
        uDistSum += distances[i];
        if (uDistSum >= uDist) {
            let ratio = (uDist - uDistSum + distances[i]) / distances[i];
            rx = ratio * pts[i+1][0] + (1 - ratio) * pts[i][0];
            ry = ratio * pts[i+1][1] + (1 - ratio) * pts[i][1];
            break;
        }
    }

    // output the result [x,y]
    resultPoint1.value = rx;
    resultPoint2.value = ry;
}

function distance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}