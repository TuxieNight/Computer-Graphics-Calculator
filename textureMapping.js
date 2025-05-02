import * as T from "./CS559-Three/build/three.module.js";

let renderer = new T.WebGLRenderer();
renderer.setSize(200, 200); // was (window.innerWidth, window.innerHeight );
document.getElementById("textureMapping").appendChild(renderer.domElement);

// the aspect ratio is set to 1 - since we're making the window 200x200
let camera = new T.PerspectiveCamera(50, 1, 0.1, 1000);

let scene = new T.Scene();

let geometry = new T.BufferGeometry();

// make a plane
let upLeft = new T.Vector3(-1, 1, 0);
let upRight = new T.Vector3(1, 1, 0);
let downLeft = new T.Vector3(-1, -1, 0);
let downRight = new T.Vector3(1, -1, 0);

// choose the order of the vertices
let vertices = new Float32Array([
    upLeft.x, upLeft.y, upLeft.z,
    upRight.x, upRight.y, upRight.z,
    downLeft.x, downLeft.y, downLeft.z,
    downRight.x, downRight.y, downRight.z
]);

geometry.setAttribute("position", new T.BufferAttribute(vertices, 3));

// make the texture coordinates
let uvs = new Float32Array([
    0, 1,
    1, 1,
    0, 0,
    1, 0
]);

geometry.setAttribute("uv", new T.BufferAttribute(uvs, 2));

// make the indices
let indices = new Uint16Array([
    0, 2, 1,
    1, 2, 3
]);

geometry.setIndex(new T.BufferAttribute(indices, 1));

// get texture
let textureLoader = new T.TextureLoader();
let texture = textureLoader.load("./texture.png", function (texture) {
    // make the material
    let material = new T.MeshStandardMaterial({
        map: texture,
    });

    // make the mesh and add it to the scene
    let plane = new T.Mesh(geometry, material);
    scene.add(plane);

    // render the scene
    renderer.render(scene, camera);
});

// we don't see anything if there is no light
let ambientLight = new T.AmbientLight(0xffffff, 10.0);
scene.add(ambientLight);

camera.position.z = 2;