// get user input through HTML

// get first matrix elements
let a1 = document.getElementById("4Dmatrix1st_a");
let b1 = document.getElementById("4Dmatrix1st_b");
let c1 = document.getElementById("4Dmatrix1st_c");
let d1 = document.getElementById("4Dmatrix1st_d");
let e1 = document.getElementById("4Dmatrix1st_e");
let f1 = document.getElementById("4Dmatrix1st_f");
let g1 = document.getElementById("4Dmatrix1st_g");
let h1 = document.getElementById("4Dmatrix1st_h");
let i1 = document.getElementById("4Dmatrix1st_i");
let j1 = document.getElementById("4Dmatrix1st_j");
let k1 = document.getElementById("4Dmatrix1st_k");
let l1 = document.getElementById("4Dmatrix1st_l");
let zero1_1st = document.getElementById("4Dmatrix1st_0_1st");
let zero1_2nd = document.getElementById("4Dmatrix1st_0_2nd");
let zero1_3rd = document.getElementById("4Dmatrix1st_0_3rd");
let one1 = document.getElementById("4Dmatrix1st_1");

// get second matrix elements
let a2 = document.getElementById("4Dmatrix2nd_a");
let b2 = document.getElementById("4Dmatrix2nd_b");
let c2 = document.getElementById("4Dmatrix2nd_c");
let d2 = document.getElementById("4Dmatrix2nd_d");
let e2 = document.getElementById("4Dmatrix2nd_e");
let f2 = document.getElementById("4Dmatrix2nd_f");
let g2 = document.getElementById("4Dmatrix2nd_g");
let h2 = document.getElementById("4Dmatrix2nd_h");
let i2 = document.getElementById("4Dmatrix2nd_i");
let j2 = document.getElementById("4Dmatrix2nd_j");
let k2 = document.getElementById("4Dmatrix2nd_k");
let l2 = document.getElementById("4Dmatrix2nd_l");
let zero2_1st = document.getElementById("4Dmatrix2nd_0_1st");
let zero2_2nd = document.getElementById("4Dmatrix2nd_0_2nd");
let zero2_3rd = document.getElementById("4Dmatrix2nd_0_3rd");
let one2 = document.getElementById("4Dmatrix2nd_1");

// get the output matrix
let a_result = document.getElementById("4DmatrixResult_a");
let b_result = document.getElementById("4DmatrixResult_b");
let c_result = document.getElementById("4DmatrixResult_c");
let d_result = document.getElementById("4DmatrixResult_d");
let e_result = document.getElementById("4DmatrixResult_e");
let f_result = document.getElementById("4DmatrixResult_f");
let g_result = document.getElementById("4DmatrixResult_g");
let h_result = document.getElementById("4DmatrixResult_h");
let i_result = document.getElementById("4DmatrixResult_i");
let j_result = document.getElementById("4DmatrixResult_j");
let k_result = document.getElementById("4DmatrixResult_k");
let l_result = document.getElementById("4DmatrixResult_l");
let zero_result_1st = document.getElementById("4DmatrixResult_0_1st");
let zero_result_2nd = document.getElementById("4DmatrixResult_0_2nd");
let zero_result_3rd = document.getElementById("4DmatrixResult_0_3rd");
let one_result = document.getElementById("4DmatrixResult_1");

// get the button element
let convert = document.getElementById("4DmatrixMatrixButton");

convert.onclick = function() {
    // calculate the cubic control points
    matrixMult();
};

function matrixMult() {
    // Convert input values to numbers
    let a1_val = parseFraction(a1.value);
    let b1_val = parseFraction(b1.value);
    let c1_val = parseFraction(c1.value);
    let d1_val = parseFraction(d1.value);
    let e1_val = parseFraction(e1.value);
    let f1_val = parseFraction(f1.value);
    let g1_val = parseFraction(g1.value);
    let h1_val = parseFraction(h1.value);
    let i1_val = parseFraction(i1.value);
    let j1_val = parseFraction(j1.value);
    let k1_val = parseFraction(k1.value);
    let l1_val = parseFraction(l1.value);
    let zero1_1st_val = parseFraction(zero1_1st.value);
    let zero1_2nd_val = parseFraction(zero1_2nd.value);
    let zero1_3rd_val = parseFraction(zero1_3rd.value);
    let one1_val = parseFraction(one1.value);
    
    let a2_val = parseFraction(a2.value);
    let b2_val = parseFraction(b2.value);
    let c2_val = parseFraction(c2.value);
    let d2_val = parseFraction(d2.value);
    let e2_val = parseFraction(e2.value);
    let f2_val = parseFraction(f2.value);
    let g2_val = parseFraction(g2.value);
    let h2_val = parseFraction(h2.value);
    let i2_val = parseFraction(i2.value);
    let j2_val = parseFraction(j2.value);
    let k2_val = parseFraction(k2.value);
    let l2_val = parseFraction(l2.value);
    let zero2_1st_val = parseFraction(zero2_1st.value);
    let zero2_2nd_val = parseFraction(zero2_2nd.value);
    let zero2_3rd_val = parseFraction(zero2_3rd.value);
    let one2_val = parseFraction(one2.value);

    // calculate the result matrix elements
    let a = a2_val * a1_val   +   b2_val * d1_val +   c2_val * g1_val  +  zero2_1st_val * j1_val;
    let b = a2_val * b1_val   +   b2_val * e1_val +   c2_val * h1_val  +  zero2_1st_val * k1_val;
    let c = a2_val * c1_val   +   b2_val * f1_val +   c2_val * i1_val  +  zero2_1st_val * l1_val;

    let d = d2_val * a1_val   +   e2_val * d1_val +   f2_val * g1_val  +  zero2_2nd_val * j1_val;
    let e = d2_val * b1_val   +   e2_val * e1_val +   f2_val * h1_val  +  zero2_2nd_val * k1_val;
    let f = d2_val * c1_val   +   e2_val * f1_val +   f2_val * i1_val  +  zero2_2nd_val * l1_val;

    let g = g2_val * a1_val   +   h2_val * d1_val +   i2_val * g1_val  +  zero2_3rd_val * j1_val;
    let h = g2_val * b1_val   +   h2_val * e1_val +   i2_val * h1_val  +  zero2_3rd_val * k1_val;
    let i = g2_val * c1_val   +   h2_val * f1_val +   i2_val * i1_val  +  zero2_3rd_val * l1_val;

    let j = j2_val * a1_val   +   k2_val * d1_val +   l2_val * g1_val  +  one2_val * j1_val;
    let k = j2_val * b1_val   +   k2_val * e1_val +   l2_val * h1_val  +  one2_val * k1_val;
    let l = j2_val * c1_val   +   k2_val * f1_val +   l2_val * i1_val  +  one2_val * l1_val;

    let firstZero = a2_val * zero1_1st_val   +   b2_val * zero1_2nd_val +   c2_val * zero1_3rd_val  +  zero2_1st_val * one1_val;
    let secondZero = d2_val * zero1_1st_val   +   e2_val * zero1_2nd_val +   f2_val * zero1_3rd_val  +  zero2_2nd_val * one1_val;
    let thirdZero = g2_val * zero1_1st_val   +   h2_val * zero1_2nd_val +   i2_val * zero1_3rd_val  +  zero2_3rd_val * one1_val;
    let one = j2_val * zero1_1st_val   +   k2_val * zero1_2nd_val +   l2_val * zero1_3rd_val  +  one2_val * one1_val;

    // Output the result matrix
    a_result.value = a;
    b_result.value = b;
    c_result.value = c;
    d_result.value = d;
    e_result.value = e;
    f_result.value = f;
    g_result.value = g;
    h_result.value = h;
    i_result.value = i;
    j_result.value = j;
    k_result.value = k;
    l_result.value = l;
    zero_result_1st.value = firstZero;
    zero_result_2nd.value = secondZero;
    zero_result_3rd.value = thirdZero;
    one_result.value = one;
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