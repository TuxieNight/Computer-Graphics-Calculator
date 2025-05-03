import * as T from "./libs/CS559-Three/build/three.module.js";
import { GrWorld } from "./libs/CS559-Framework/GrWorld.js";

// set up world
let div = document.getElementById("div2");

let world = new GrWorld({
    where: div,
    width: 800,
    height: 600,
    groundplanesize: 20 // make the ground plane big enough for a world of stuff
});

world.scene.background = new T.Color(0xFFFFFF);

let light = new T.DirectionalLight(0xffffff, 1);
light.position.set(0, 10, 0).normalize();
world.scene.add(light);

let c = document.getElementById("phongC");

c.onchange = function() {
    phong = new T.MeshPhongMaterial({
        color: c5,
        specular: c_arr[c.value],
        shininess: s_arr[s.value],
    });

    world.groundplane.mesh.material = phong;
    sphere.material = phong;
}

let s = document.getElementById("phongS");
s.onchange = function() {

    phong = new T.MeshPhongMaterial({
        color: c5,
        specular: c_arr[c.value],
        shininess: s_arr[s.value],
    });

    world.groundplane.mesh.material = phong;
    sphere.material = phong;
}


// CHOOSING THE NUMBER OF REPITITIONS
let c1 = "white";
let c2 = "red";
let c3 = "green";
let c4 = "blue";
let c5 = "black";
let s1 = 0;
let s2 = 25;
let s3 = 50;
let s4 = 75;
let s5 = 100;

let c_arr = [c1, c2, c3, c4, c5];
let s_arr = [s1, s2, s3, s4, s5];

// shader
let phong = new T.MeshPhongMaterial({
    color: c5,
    specular: c_arr[c.value],
    shininess: s_arr[s.value],
});

world.groundplane.mesh.material = phong;

// sphere
let sphereGeom = new T.SphereGeometry(8, 32, 32);

let sphere = new T.Mesh(
    sphereGeom,
    phong
);

sphere.position.set(0, 10, 0);

world.scene.add(sphere);

world.go();