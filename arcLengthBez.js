// @ts-check

/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [150, 450],
  [450, 450],
  [450, 150]
];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas2"));
//let context = canvas.getContext("2d");

/** @type {HTMLInputElement} */
let uParam = document.getElementById("arclengthRange");

let arcLengthResult = document.getElementById("arclengthResult");
arcLengthResult.innerHTML = "Arc Length:<br>Position [ , ];<br>Derivative: [ , ] *constant magnitude WIP*<br>";

let simpleLengthResult = document.getElementById("simplelengthResult");
simpleLengthResult.innerHTML = "Simple Length:<br>Position [ , ];<br>Derivative: [ , ]<br>";

let convert = document.getElementById("arclengthConvert");

convert.onclick = function() {
  let u = parseFloat(uParam.value);

  let [arcPoints, simplePoints] = draw(canvas, u);

  // update the results to fixed 3rd decimal places
  let arcx = arcPoints[0].x.toFixed(3);
  let arcy = arcPoints[0].y.toFixed(3);
  let arcdx = arcPoints[1].x.toFixed(3);
  let arcdy = arcPoints[1].y.toFixed(3);

  let simplex = simplePoints[0].x.toFixed(3);
  let simpley = simplePoints[0].y.toFixed(3);
  let simpledx = simplePoints[1].x.toFixed(3);
  let simpledy = simplePoints[1].y.toFixed(3);
   

  arcLengthResult.innerHTML = "Arc Length:<br>Position [" + arcx + ", " + arcy + "];<br>Derivative: [" + arcdx + ", " + arcdy + "] *constant magnitude WIP*<br>";
  simpleLengthResult.innerHTML = "Simple Length:<br>Position [" + simplex + ", " + simpley + "];<br>Derivative: [" + simpledx + ", " + simpledy + "]<br>";
}

let tracks = [];
let lookUpTable = [];

class TrackSegment {
  /**
   * @param {Point} p1 
   * @param {Point} p2 
   * @param {Point} p3 
   * @param {Point} p4
   */
  constructor(p1,p2,p3,p4) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
    this.pts = [p1,p2,p3,p4];
    this.length = approximateLength(this);
  }
  
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {

    tracks = [];
    lookUpTable = [];

    let x1 = document.getElementById("arcLength1x");
    let y1 = document.getElementById("arcLength1y");
    let x2 = document.getElementById("arcLength2x");
    let y2 = document.getElementById("arcLength2y");
    let x3 = document.getElementById("arcLength3x");
    let y3 = document.getElementById("arcLength3y");
    let x4 = document.getElementById("arcLength4x");
    let y4 = document.getElementById("arcLength4y");

    let p1 = new Point(parseFloat(x1.value), parseFloat(y1.value));
    let p2 = new Point(parseFloat(x2.value), parseFloat(y2.value));
    let p3 = new Point(parseFloat(x3.value), parseFloat(y3.value));
    let p4 = new Point(parseFloat(x4.value), parseFloat(y4.value));

    tracks[0] = new TrackSegment(p1,p2,p3,p4);

    let arclength = arcLengthPosition(param);
    let simpleLength = simpleParameterizationPosition(param);

    return [arclength, simpleLength];

}

function arcLengthPosition(param) {
    let newPosition = new Point(0,0);
    let derivative = new Point(0,0);

    // the param is in terms of the number of control points

    // Step 1: Compute the total length of the track
    let perimeter = 0;

    for (let i = 0; i < tracks.length; i++) {
         perimeter += tracks[i].length;
    }

    // Step 2: Reparameterize
    let u = param*perimeter/tracks.length;

    // Step 3: Find the segment that contains the point
    let currTrackLength = 0;

    for (let i = 0; i < tracks.length; i++) {
        let trackLength = tracks[i].length;

        currTrackLength += trackLength;

        if (u <= currTrackLength) {

            // Step 4: Compute the new position and derivative
            for (let j = 1; j < lookUpTable.length; j++) {
                let currU = lookUpTable[j].u;

                if (u == currU) {
                    newPosition = lookUpTable[j].pt;
                    derivative = lookUpTable[j].derivative;
                    break;
                }
                else if (u < currU) {
                    let prev = lookUpTable[j-1];
                    let curr = lookUpTable[j];
                    let u1 = prev.u;
                    let u2 = curr.u;
                    let p1 = prev.pt;
                    let p2 = curr.pt;
                    let d1 = prev.derivative;
                    let d2 = curr.derivative;
                    
                    let t = (u-u1)/(u2-u1);
                    newPosition.x = p1.x*(1-t) + p2.x*t;
                    newPosition.y = p1.y*(1-t) + p2.y*t;
                    derivative.x = d1.x*(1-t) + d2.x*t;
                    derivative.y = d1.y*(1-t) + d2.y*t;
                    break;
                    
                }
            }

            break;
        }
    }
    return [newPosition, derivative];
}

function simpleParameterizationPosition(param) {
    let newPosition = new Point(0,0);
    let derivative = new Point(0,0);

    if (param == 0) {
        newPosition = tracks[0].p1;
        derivative = bernsteinDerivative(tracks[0],3,0);
        return [newPosition, derivative];
    }
    else if (param == tracks.length) {
        newPosition = tracks[tracks.length-1].p4;
        derivative = bernsteinDerivative(tracks[tracks.length-1],3,1);
        return [newPosition, derivative];
    }

    for (let i = 0; i < tracks.length; i++) {
        // if param is between i and i+1, we know track[i] is the segment
        if (param >= i && param < i+1) {
            newPosition = bernstein(tracks[i],3,param-i);
            derivative = bernsteinDerivative(tracks[i],3,param-i);
            break;
        }
    }

    return [newPosition, derivative];
}

/**
 * Finds approximate length of a Bezier curve
 * 
 * @param {TrackSegment} track - control points of a Bezier curve representing a track segment
 * @return {Number} the approximate length of the Bezier curve
 */
function approximateLength(track) {

    let step = 100;

    // add end points to the list to use to approximate with

    /** @type {Point[]} */
    let appxPts = [track.p1];

    let trackLength = 0;
    for (let i = 0; i < tracks.length; i++) {
        trackLength += tracks[i].length;
    }

    let appxLength = 0;

    // Get more points along the curve, in addition to start and end points
    // approximate distance between them
    for (let u = 1; u <= step; u++) {
        appxPts[u] = bernstein(track,3,u/step);
        let derivativeAtU = bernsteinDerivative(track,3,u/step);
        appxLength += distance(appxPts[u].x, appxPts[u-1].x,appxPts[u].y, appxPts[u-1].y);

        // add this point and its length along the curve to the look-up table
        // note that appxPts[0] is not added to the look-up table, because it will have
        // been added as the end point of the previous segment
        // the very first point of the very first segment is added to the look-up table before
        // this function is called in the formCardinalTrack function
        lookUpTable.push({pt: appxPts[u], u: appxLength+trackLength, derivative: derivativeAtU});
    }

    return appxLength;
}

/**
* Computes the distance between (x1,y1) and (x2,y2)
* 
* @param {Number} x1 
* @param {Number} x2 
* @param {Number} y1 
* @param {Number} y2 
* @returns the distance between (x1,y1) and (x2,y2)
*/
function distance(x1, x2, y1, y2) {
  return Math.sqrt( Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
}

/**
* Bernstein basis polynomial
* determine the position of a point on a Bezier curve given parameter u
* 
* @param {TrackSegment} track - the control points of the Bezier curve
* @param {Number} degree - the degree of the curve
* @param {Number} u - the parameter indicating a position on the curve
* @returns {Point} the position of a point on the Bezier curve at parameter u
*/
function bernstein(track, degree, u) {
  let posAtU = new Point(0,0)
  let nChoosek = 1;

  for (let k = 0; k <= degree; k++) {
      nChoosek = choose(degree, k);
      posAtU.x += nChoosek * Math.pow(1-u, degree-k) * Math.pow(u, k) * track.pts[k].x;
      posAtU.y += nChoosek * Math.pow(1-u, degree-k) * Math.pow(u, k) * track.pts[k].y;
  }

  return posAtU;
}

/**
 * Computes the derivative of a Bezier curve at parameter u
 * 
 * @param {TrackSegment} track - the Bezier curve
 * @param {Number} degree - the degree of the Bezier curve
 * @param {Number} u - the parameter indicating a position on the curve; between 0 and 1
 * @returns 
 */
function bernsteinDerivative(track, degree, u) {

  if (u == 0) {
    return new Point(3*(track.pts[1].x - track.pts[0].x), 3*(track.pts[1].y - track.pts[0].y));
  }

  if (u == 1) {
    return new Point(3*(track.pts[3].x - track.pts[2].x), 3*(track.pts[3].y - track.pts[2].y));
  }

  let posAtU = new Point(0,0)
  let nChoosek = 1;

  for (let k = 0; k <= degree; k++) {
      nChoosek = choose(degree, k);
      posAtU.x += (nChoosek*Math.pow(u, k-1)*Math.pow(1-u,degree-k-1) *(-(degree-k)*u+k*(1-u))) * track.pts[k].x;
      posAtU.y += (nChoosek*Math.pow(u, k-1)*Math.pow(1-u,degree-k-1) *(-(degree-k)*u+k*(1-u))) * track.pts[k].y;
  }

  return posAtU;
}

/**
 * Computes the binomial coefficient
 * 
 * @param {Number} n - the total number
 * @param {Number} k - how many to choose
 * @returns 
 */
function choose(n, k) {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

/**
 * Computes factorials
 * 
 * @param {Number} n 
 * @returns the factorial of n
 */
function factorial(n) {
  if (n <= 1) {
      return 1;
  }
  return n * factorial(n - 1);
}




// function formCurves() {

//     // get tangent at the first point
//     let oldDx = 3*(thePoints[1][0] - thePoints[0][0]);
//     let oldDy = 3*(thePoints[1][1] - thePoints[0][1]);

//     // add very first point to the look-up table
//     lookUpTable.push({pt: new Point(thePoints[0][0], thePoints[0][1]), u: 0, derivative: new Point(oldDx, oldDy)});

//     // create track segments
//     for (let i = 1; i <= thePoints.length; i++) {
//         let prev = thePoints[(i - 1 + thePoints.length) % thePoints.length];
//         let curr = thePoints[i%thePoints.length];
//         let next = thePoints[(i + 1) % thePoints.length];

//         // find tangent at curr using the vector between prev and next
//         // divide by 3 to convert to cubic Bezier
//         let dx = 3*(next[0]-curr[0]);
//         let dy = 3*(next[1]-curr[1]);

//         // remember this curve for the train
//         let p1 = new Point(prev[0], prev[1]);
//         let p2 = new Point(prev[0] + oldDx, prev[1] + oldDy);
//         let p3 = new Point(curr[0] - dx, curr[1] - dy);
//         let p4 = new Point(curr[0], curr[1]);
        
//         tracks[i-1] = new TrackSegment(p1, p2, p3, p4);
        
//         oldDx = dx;
//         oldDy = dy;
//   }
// }

// function drawTracks() {



//         context.beginPath();
//         context.moveTo(thePoints[0][0], thePoints[0][1]);
        
//         for (let i = 1; i <= thePoints.length; i++) {
//             context.bezierCurveTo(tracks[i-1].p2.x, tracks[i-1].p2.y, tracks[i-1].p3.x, tracks[i-1].p3.y,tracks[i-1].p4.x, tracks[i-1].p4.y);
//         }

//         context.stroke();


// }