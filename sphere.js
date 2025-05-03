import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";

// set up world
let div = document.getElementById("div1");

let world = new GrWorld({
    where: div,
    width: 800,
    height: 600,
    groundplanesize: 20 // make the ground plane big enough for a world of stuff
});

let d = document.getElementById("shaderD");

d.onchange = function() {
    let shader = new T.ShaderMaterial({
        uniforms: {},
        vertexShader: vs,
        fragmentShader: "varying vec2 v_uv;\nvoid main() {\nvec3 dark = vec3(0.1, 0.1, 0.1);\nvec3 light = vec3(0.9, 0.9, 0.9);\n"+a_arr[a.value]+"\n"+d_arr[d.value]+"\nfloat e = fwidth(d) / 2.0;\nfloat dc = smoothstep(0.125 - e, 0.125 + e, d);\ngl_FragColor = vec4(mix(dark, light, dc), 1.0);\n}"
    });

    world.groundplane.mesh.material = shader;
    sphere.material = shader;
}

let a = document.getElementById("shaderA");
a.onchange = function() {

    let shader = new T.ShaderMaterial({
        uniforms: {},
        vertexShader: vs,
        fragmentShader: "varying vec2 v_uv;\nvoid main() {\nvec3 dark = vec3(0.1, 0.1, 0.1);\nvec3 light = vec3(0.9, 0.9, 0.9);\n"+a_arr[a.value]+"\n"+d_arr[d.value]+"\nfloat e = fwidth(d) / 2.0;\nfloat dc = smoothstep(0.125 - e, 0.125 + e, d);\ngl_FragColor = vec4(mix(dark, light, dc), 1.0);\n}"
    });

    world.groundplane.mesh.material = shader;
    sphere.material = shader;

}

let fsEdit = document.getElementById("fs_edit");
let vsEdit = document.getElementById("vs_edit");
let shaderEdit = document.getElementById("shaderEdit");

shaderEdit.onclick = function() {
    let fs = fsEdit.value;
    let vs = vsEdit.value;

    let shader = new T.ShaderMaterial({
        uniforms: {},
        vertexShader: vs,
        fragmentShader: fs
    });

    world.groundplane.mesh.material = shader;
    sphere.material = shader;
}

// CHOOSING THE NUMBER OF REPITITIONS
let a1 = "vec2 xy = abs(fract(v_uv / 0.25) - 0.5);"; // 4 repetitions
let a2 = "vec2 xy = abs(fract(v_uv / 0.5) - 0.5);"; // 2 repetition
let a3 = "vec2 xy = abs(fract(v_uv / 0.125) - 0.5);"; // 8 repetitions
let a4 = "vec2 xy = abs(fract(v_uv / 0.0625) - 0.5);"; // 16 repetitions
let a5 = "vec2 xy = abs(fract(v_uv / 0.25) - 0.25);"; // 4 repetitions
let a6 = "vec2 xy = abs(fract(v_uv / 0.5) - 0.25);"; // 2 repetition
let a7 = "vec2 xy = abs(fract(v_uv / 0.125) - 0.25);"; // 8 repetitions
let a8 = "vec2 xy = abs(fract(v_uv / 0.0625) - 0.25);"; // 16 repetitions
let a9 = "vec2 xy = abs(fract(v_uv / 0.25) - 0.0);"; // 4 repetitions

let a_arr = [a1, a2, a3, a4, a5, a6, a7, a8, a9];

// CHOOSING THE SHAPE
// square
let d1 = "float d = max(xy.x, xy.y);";

// diamond
let d2 = "float d = abs(xy.x) + abs(xy.y);";

// circle
let d3 = "float d = xy.x * xy.x + xy.y * xy.y;";

// circle 2
let d3b = "float d = length(xy);"; // equal to square root of d3

// ellipse
let d4 = "float d = length(xy) + 0.5 * (xy.x + xy.y);";

// square-circles
let d4b = "float d = xy.x*xy.x*xy.x + xy.y*xy.y;";
let d4c = "float d = xy.x*xy.x*xy.x + xy.y*xy.y*xy.y;";

// criss-cross
let d5 = "float d = max(xy.x, xy.y) - min(xy.x, xy.y);";

// 4 pointed star
let d6 = "float d = max(xy.x, xy.y) - min(xy.x, xy.y) + 0.5 * (xy.x + xy.y);";

let d_arr = [d1, d2, d3, d3b, d4, d4b, d4c, d5, d6];

let fs = "varying vec2 v_uv;\nvoid main() {\nvec3 dark = vec3(0.1, 0.1, 0.1);\nvec3 light = vec3(0.9, 0.9, 0.9);\n"+a_arr[a.value]+"\n"+d_arr[d.value]+"\nfloat e = fwidth(d) / 2.0;\nfloat dc = smoothstep(0.125 - e, 0.125 + e, d);\ngl_FragColor = vec4(mix(dark, light, dc), 1.0);\n}";

let vs = "varying vec2 v_uv;\nvoid main() {\nv_uv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";

// shader
let shader = new T.ShaderMaterial({
    uniforms: {},
    vertexShader: vs,
    fragmentShader: fs
});

world.groundplane.mesh.material = shader;

// sphere
let sphereGeom = new T.SphereGeometry(8, 32, 32);

let sphere = new T.Mesh(
    sphereGeom,
    shader
);

sphere.position.set(0, 10, 0);

world.scene.add(sphere);

world.go();