import * as T from "./CS559-Three/build/three.module.js";

// get texture
let textureLoader = new T.TextureLoader();
textureLoader.load("./texture.png", function (texture) {

    let renderer = new T.WebGLRenderer();
    renderer.setSize(200, 200); // was (window.innerWidth, window.innerHeight );
    document.getElementById("textureMapping").appendChild(renderer.domElement);

    // the aspect ratio is set to 1 - since we're making the window 200x200
    let camera = new T.PerspectiveCamera(50, 1, 0.1, 1000);

    // set up scene
    let scene = new T.Scene();
    // we don't see anything if there is no light
    let ambientLight = new T.AmbientLight(0xffffff, 10.0);
    scene.add(ambientLight);
    // set up camera
    camera.position.z = 2;

    // get order of plane vertices
    let lowerLeftEle = document.getElementById("textureMappingLL");
    let lowerRightEle = document.getElementById("textureMappingLR");
    let upperLeftEle = document.getElementById("textureMappingUL");
    let upperRightEle = document.getElementById("textureMappingUR");

    // get the values of the vertices
    let v0u = document.getElementById("textureMapping0u");
    let v0v = document.getElementById("textureMapping0v");
    let v1u = document.getElementById("textureMapping1u");
    let v1v = document.getElementById("textureMapping1v");
    let v2u = document.getElementById("textureMapping2u");
    let v2v = document.getElementById("textureMapping2v");
    let v3u = document.getElementById("textureMapping3u");
    let v3v = document.getElementById("textureMapping3v");

    // get texture wrapping type
    let wrapType = document.getElementById("textureMappingWrap");

    // get result button
    let resultButton = document.getElementById("textureMappingButton");

    // when click the button, do computations
    resultButton.onclick = function () {
        compute();
    }

    // compute once to start
    compute();

    function compute() {
        // get type of wrapping
        let wrapTypeValue = wrapType.value;
        if (wrapTypeValue == "repeat") {
            // set the texture to repeat
            texture.wrapS = T.RepeatWrapping;
            texture.wrapT = T.RepeatWrapping;
        }
        else if (wrapTypeValue == "clamp") {
            // set the texture to clamp
            texture.wrapS = T.ClampToEdgeWrapping;
            texture.wrapT = T.ClampToEdgeWrapping;
        }
        else if (wrapTypeValue == "mirror") {
            // set the texture to mirror
            texture.wrapS = T.MirroredRepeatWrapping;
            texture.wrapT = T.MirroredRepeatWrapping;
        }
        texture.needsUpdate = true; // ensure the texture updates with the new wrapping

        let geometry = new T.BufferGeometry();

        // make a plane
        let upperLeft = new T.Vector3(-1, 1, 0);
        let upperRight = new T.Vector3(1, 1, 0);
        let lowerLeft = new T.Vector3(-1, -1, 0);
        let lowerRight = new T.Vector3(1, -1, 0);

        // determine ordering of vertices
        let ll = parseFloat(lowerLeftEle.value);
        let lr = parseFloat(lowerRightEle.value);
        let ul = parseFloat(upperLeftEle.value);
        let ur = parseFloat(upperRightEle.value);

        // set the vertex order based on their number
        let vertexOrder = [];
        vertexOrder[ll] = lowerLeft;
        vertexOrder[lr] = lowerRight;
        vertexOrder[ul] = upperLeft;
        vertexOrder[ur] = upperRight;

        // choose the order of the vertices
        let vertices = new Float32Array([
            vertexOrder[0].x, vertexOrder[0].y, vertexOrder[0].z,
            vertexOrder[1].x, vertexOrder[1].y, vertexOrder[1].z,
            vertexOrder[2].x, vertexOrder[2].y, vertexOrder[2].z,
            vertexOrder[3].x, vertexOrder[3].y, vertexOrder[3].z
        ]);

        geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));

        // get the texture coordinates
        let u0 = parseFraction(v0u.value);
        let v0 = parseFraction(v0v.value);
        let u1 = parseFraction(v1u.value);
        let v1 = parseFraction(v1v.value);
        let u2 = parseFraction(v2u.value);
        let v2 = parseFraction(v2v.value);
        let u3 = parseFraction(v3u.value);
        let v3 = parseFraction(v3v.value);

        // make the texture coordinates
        let uvs = new Float32Array([
            u0, v0,
            u1, v1,
            u2, v2,
            u3, v3
        ]);

        geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

        // make the indices
        let indices = new Uint16Array([
            ll, lr, ur,
            ll, ur, ul
        ]);

        geometry.setIndex(new T.BufferAttribute(indices, 1));

        // make the material
        let material = new T.MeshStandardMaterial({
            map: texture,
        });

        // make the mesh and add it to the scene
        let plane = new T.Mesh(geometry, material);
        scene.add(plane);

        // render the scene
        renderer.render(scene, camera);

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

});