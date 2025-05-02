// get user input through HTML

class Matrix {
    constructor(a, b, c, d, e, f) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }

    /**
     * Does matrix multiplication mtx * this
     * 
     * @param {Matrix} mtx 
     */
    multiplyLeft(mtx) {
        let a = this.a * mtx.a   +   this.b * mtx.c;
        let b = this.a * mtx.b   +   this.b * mtx.d;
        let c = this.c * mtx.a   +   this.d * mtx.c;
        let d = this.c * mtx.b   +   this.d * mtx.d;
        let e = this.e * mtx.a   +   this.f * mtx.c   +   mtx.e;
        let f = this.e * mtx.b   +   this.f * mtx.d   +   mtx.f;

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
    }

    applyToPoint(x, y) {
        let x1 = this.a * x + this.c * y + this.e;
        let y1 = this.b * x + this.d * y + this.f;

        return [x1.toFixed(3), y1.toFixed(3)];
    }
}

let mtx = new Matrix(1, 0, 0, 1, 0, 0);

// get matrix elements
let t1x = document.getElementById("t1x");
let t1y = document.getElementById("t1y");
let t2x = document.getElementById("t2x");
let t2y = document.getElementById("t2y");
let t3x = document.getElementById("t3x");
let t3y = document.getElementById("t3y");
let t4x = document.getElementById("t4x");
let t4y = document.getElementById("t4y");
let t5x = document.getElementById("t5x");
let t5y = document.getElementById("t5y");
let t6x = document.getElementById("t6x");
let t6y = document.getElementById("t6y");
let t7x = document.getElementById("t7x");
let t7y = document.getElementById("t7y");
let t8x = document.getElementById("t8x");
let t8y = document.getElementById("t8y");
let t9x = document.getElementById("t9x");
let t9y = document.getElementById("t9y");
let t10x = document.getElementById("t10x");
let t10y = document.getElementById("t10y");

// get matrix type
let t1 = document.getElementById("t1");
let t2 = document.getElementById("t2");
let t3 = document.getElementById("t3");
let t4 = document.getElementById("t4");
let t5 = document.getElementById("t5");
let t6 = document.getElementById("t6");
let t7 = document.getElementById("t7");
let t8 = document.getElementById("t8");
let t9 = document.getElementById("t9");
let t10 = document.getElementById("t10");

let transformList = [[t1x, t1y], [t2x, t2y], [t3x, t3y], [t4x, t4y], [t5x, t5y],
                    [t6x, t6y], [t7x, t7y], [t8x, t8y], [t9x, t9y], [t10x, t10y]];

let typeList = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10];

// get input point elements
let p1x = document.getElementById("px");
let p1y = document.getElementById("py");

// get the output element [x,y]
let resultPoint1 = document.getElementById("resultPx");
let resultPoint2 = document.getElementById("resultPy");

// get the button element
let convert = document.getElementById("transformButton");

convert.onclick = function() {
    transform();
}

function transform() {
    
    for (let i = transformList.length - 1; i >= 0; i--) {

        let x = parseFloat(transformList[i][0].value);
        let y = parseFloat(transformList[i][1].value);

        if (typeList[i].value == "T") {
            translate(x, y);
        }
        else if (typeList[i].value == "S") {
            scale(x, y);
        }
        else if (typeList[i].value == "R") {
            x = x * Math.PI / 180;
            rotate(x);
        }
    }

    // apply to point
    let x = parseFloat(p1x.value);
    let y = parseFloat(p1y.value);

    let [rx, ry] = mtx.applyToPoint(x, y);

    // output the result [x,y]
    resultPoint1.value = rx;
    resultPoint2.value = ry;

    mtx = new Matrix(1, 0, 0, 1, 0, 0);
}

function translate(x, y) {
    console.log("Translate", x, y);
    mtx.multiplyLeft(new Matrix(1, 0, 0, 1, x, y));
}

function scale(x, y) {
    console.log("Scale", x,y);
    mtx.multiplyLeft(new Matrix(x, 0, 0, y, 0, 0));
}

function rotate(r) {
    console.log("Rotate",r);
    mtx.multiplyLeft(new Matrix(Math.cos(r), Math.sin(r),-Math.sin(r), Math.cos(r), 0, 0));
}