// call this as a function (so the variables have their own scope and do not conflict with those of other files)
(function() {
    // get user input through HTML

    // get first matrix elements
    let a1 = document.getElementById("4Dmatrix_a");
    let b1 = document.getElementById("4Dmatrix_b");
    let c1 = document.getElementById("4Dmatrix_c");
    let d1 = document.getElementById("4Dmatrix_d");
    let e1 = document.getElementById("4Dmatrix_e");
    let f1 = document.getElementById("4Dmatrix_f");
    let g1 = document.getElementById("4Dmatrix_g");
    let h1 = document.getElementById("4Dmatrix_h");
    let i1 = document.getElementById("4Dmatrix_i");
    let j1 = document.getElementById("4Dmatrix_j");
    let k1 = document.getElementById("4Dmatrix_k");
    let l1 = document.getElementById("4Dmatrix_l");
    let zero1_1st = document.getElementById("4Dmatrix_0_1st");
    let zero1_2nd = document.getElementById("4Dmatrix_0_2nd");
    let zero1_3rd = document.getElementById("4Dmatrix_0_3rd");
    let one1 = document.getElementById("4Dmatrix_1");

    // get vector elements
    let a2 = document.getElementById("4Dvector_a");
    let b2 = document.getElementById("4Dvector_b");
    let c2 = document.getElementById("4Dvector_c");
    let d2 = document.getElementById("4Dvector_d");

    // get the output vector
    let a_result = document.getElementById("4DvecResult_a");
    let b_result = document.getElementById("4DvecResult_b");
    let c_result = document.getElementById("4DvecResult_c");
    let d_result = document.getElementById("4DvecResult_d");

    // get the divided by w vector
    let x_result = document.getElementById("4DvecResult_x");
    let y_result = document.getElementById("4DvecResult_y");
    let z_result = document.getElementById("4DvecResult_z");

    // get the projected vector
    let x_projected = document.getElementById("4DvecResult_projectedX");
    let y_projected = document.getElementById("4DvecResult_projectedY");

    // get the button element
    let convert = document.getElementById("4DmatrixVectorButton");

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

        // calculate the result matrix elements
        let a = a1_val * a2_val + d1_val * b2_val + g1_val * c2_val + j1_val * d2_val;
        let b = b1_val * a2_val + e1_val * b2_val + h1_val * c2_val + k1_val * d2_val;
        let c = c1_val * a2_val + f1_val * b2_val + i1_val * c2_val + l1_val * d2_val;
        let d = zero1_1st_val * a2_val + zero1_2nd_val * b2_val + zero1_3rd_val * c2_val + one1_val * d2_val;

        // Output the result matrix
        a_result.value = a;
        b_result.value = b;
        c_result.value = c;
        d_result.value = d;

        // calculate the divided by w vector
        let x = a / d;
        let y = b / d;
        let z = c / d;

        // Output the divided by w vector
        x_result.value = x;
        y_result.value = y;
        z_result.value = z;

        // output the projected vector
        x_projected.value = x;
        y_projected.value = y;
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
})();