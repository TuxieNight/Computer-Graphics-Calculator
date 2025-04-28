// a d g j 
// b e h k
// c f i l
// 0 0 0 1
class Matrix {
    constructor(a, b, c, d, e, f, g, h, i, j, k, l) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
        this.j = j;
        this.k = k;
        this.l = l;
    }

    /**
     * 
     * @param {Matrix} mtx 
     */
    multiplyLeft(mtx) {
        let a = this.a * mtx.a   +   this.b * mtx.d +   this.c * mtx.g; // + 0 * mtx.j;
        let b = this.a * mtx.b   +   this.b * mtx.e +   this.c * mtx.h; // + 0 * mtx.k;
        let c = this.a * mtx.c   +   this.b * mtx.f +   this.c * mtx.i; // + 0 * mtx.l;

        let d = this.d * mtx.a   +   this.e * mtx.d +   this.f * mtx.g; // + 0 * mtx.j;
        let e = this.d * mtx.b   +   this.e * mtx.e +   this.f * mtx.h; // + 0 * mtx.k;
        let f = this.d * mtx.c   +   this.e * mtx.f +   this.f * mtx.i; // + 0 * mtx.l;

        let g = this.g * mtx.a   +   this.h * mtx.d +   this.i * mtx.g; // + 0 * mtx.j;
        let h = this.g * mtx.b   +   this.h * mtx.e +   this.i * mtx.h; // + 0 * mtx.k;
        let i = this.g * mtx.c   +   this.h * mtx.f +   this.i * mtx.i; // + 0 * mtx.l;

        let j = this.j * mtx.a   +   this.k * mtx.d +   this.l * mtx.g  + 1 * mtx.j;
        let k = this.j * mtx.b   +   this.k * mtx.e +   this.l * mtx.h  + 1 * mtx.k;
        let l = this.j * mtx.c   +   this.k * mtx.f +   this.l * mtx.i  + 1 * mtx.l;

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
        this.j = j;
        this.k = k;
        this.l = l;
    }

    applyToPoint(x, y, z) {
        let x1 = this.a * x + this.d * y + this.g * z + this.j;
        let y1 = this.b * x + this.e * y + this.h * z + this.k;
        let z1 = this.c * x + this.f * y + this.i * z + this.l;

        return [x1.toFixed(3), y1.toFixed(3), z1.toFixed(3)];
    }
}

let mtx = new Matrix(1, 0, 0,  0, 1, 0,  0, 0, 1,  0, 0, 0);

// get matrix elements
let t1x = document.getElementById("3dt1x");
let t1y = document.getElementById("3dt1y");
let t1z = document.getElementById("3dt1z");

let t2x = document.getElementById("3dt2x");
let t2y = document.getElementById("3dt2y");
let t2z = document.getElementById("3dt2z");

let t3x = document.getElementById("3dt3x");
let t3y = document.getElementById("3dt3y");
let t3z = document.getElementById("3dt3z");

let t4x = document.getElementById("3dt4x");
let t4y = document.getElementById("3dt4y");
let t4z = document.getElementById("3dt4z");

let t5x = document.getElementById("3dt5x");
let t5y = document.getElementById("3dt5y");
let t5z = document.getElementById("3dt5z");

let t6x = document.getElementById("3dt6x");
let t6y = document.getElementById("3dt6y");
let t6z = document.getElementById("3dt6z");

let t7x = document.getElementById("3dt7x");
let t7y = document.getElementById("3dt7y");
let t7z = document.getElementById("3dt7z");

let t8x = document.getElementById("3dt8x");
let t8y = document.getElementById("3dt8y");
let t8z = document.getElementById("3dt8z");

let t9x = document.getElementById("3dt9x");
let t9y = document.getElementById("3dt9y");
let t9z = document.getElementById("3dt9z");

let t10x = document.getElementById("3dt10x");
let t10y = document.getElementById("3dt10y");
let t10z = document.getElementById("3dt10z");

// get matrix type
let t1 = document.getElementById("3dt1");
let t2 = document.getElementById("3dt2");
let t3 = document.getElementById("3dt3");
let t4 = document.getElementById("3dt4");
let t5 = document.getElementById("3dt5");
let t6 = document.getElementById("3dt6");
let t7 = document.getElementById("3dt7");
let t8 = document.getElementById("3dt8");
let t9 = document.getElementById("3dt9");
let t10 = document.getElementById("3dt10");

let transformList = [[t1x, t1y, t1z], [t2x, t2y, t2z], [t3x, t3y, t3z], [t4x, t4y, t4z], [t5x, t5y, t5z],
                    [t6x, t6y, t6z], [t7x, t7y, t7z], [t8x, t8y, t8z], [t9x, t9y, t9z], [t10x, t10y, t10z]];

let typeList = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];

// get input point elements
let p1x = document.getElementById("3dpx");
let p1y = document.getElementById("3dpy");
let p1z = document.getElementById("3dpz");

// get the output element [x,y]
let resultPoint1 = document.getElementById("3dresultPx");
let resultPoint2 = document.getElementById("3dresultPy");
let resultPoint3 = document.getElementById("3dresultPz");

// get the button element
let convert = document.getElementById("3dtransformButton");

// determine the enlarge factors
let enlarge = [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1] ];

convert.onclick = function() {

    for (let i = 0; i < transformList.length; i++) {

        if (typeList[i].value == "E") {
    
            let x = parseFloat(transformList[i][0].value);
            let y = parseFloat(transformList[i][1].value);
            let z = parseFloat(transformList[i][2].value);
    
            enlarge[i] = [x, y, z];
        }
    }

    transform();
}

function transform() {
    
    for (let i = transformList.length - 1; i >= 0; i--) {

        let x = parseFloat(transformList[i][0].value);
        let y = parseFloat(transformList[i][1].value);
        let z = parseFloat(transformList[i][2].value);

        if (typeList[i].value == "T") {

            let [enlargeX, enlargeY, enlargeZ] = determineEnlarge(i);

            translate(enlargeX * x, enlargeY * y, enlargeZ * z);
        }
        else if (typeList[i].value == "S") {
            scale(x, y, z);
        }
        else if (typeList[i].value == "R") {
            x = x * Math.PI / 180;
            y = y * Math.PI / 180;
            z = z * Math.PI / 180;

            rotate(x, y, z);
        }
    }

    // apply to point
    let x = parseFloat(p1x.value);
    let y = parseFloat(p1y.value);
    let z = parseFloat(p1z.value);

    let [rx, ry, rz] = mtx.applyToPoint(x, y, z);

    // output the result [x,y,z]
    resultPoint1.value = rx;
    resultPoint2.value = ry;
    resultPoint3.value = rz;

    mtx = new Matrix(1, 0, 0,  0, 1, 0,  0, 0, 1,  0, 0, 0);
}

function translate(x, y, z) {
    console.log("Translate", x, y, z);
    mtx.multiplyLeft(new Matrix(1, 0, 0,  0, 1, 0,  0, 0, 1,  x, y, z));
}

function scale(x, y, z) {
    console.log("Scale", x,y,z);
    mtx.multiplyLeft(new Matrix(x, 0, 0,  0, y, 0,  0, 0, z,  0, 0, 0));
}

function determineEnlarge(i) {

    let currEnlarge = [1, 1, 1];

    for (let j = 0; j < i; j++) {
        currEnlarge[0] *= enlarge[j][0];
        currEnlarge[1] *= enlarge[j][1];
        currEnlarge[2] *= enlarge[j][2];
    }

    return currEnlarge;
}

function rotate(x, y, z) {
    console.log("Rotate",x,y,z);

    // rotate around x-axis
    mtx.multiplyLeft(new Matrix(1, 0, 0,  0, Math.cos(x), Math.sin(x),  0, -Math.sin(x), Math.cos(x),  0, 0, 0));
    
    // rotate around y-axis
    mtx.multiplyLeft(new Matrix(Math.cos(y), 0, -Math.sin(y),  0, 1, 0,  Math.sin(y), 0, Math.cos(y),  0, 0, 0));
    
    // rotate around z-axis
    mtx.multiplyLeft(new Matrix(Math.cos(z), Math.sin(z), 0,  -Math.sin(z), Math.cos(z), 0,  0, 0, 1,  0, 0, 0));
}