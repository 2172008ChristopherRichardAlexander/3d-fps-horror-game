import * as THREE from '../node_modules/three/build/three.module.js';
import * as LOAD from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / innerHeight,
    0.1,
    1000
);
var renderer = new THREE.WebGLRenderer({
    antialias : true
});

cam.position.z += 10
cam.position.y += 5;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xfafafa);

let loader = new LOAD.GLTFLoader();

loader.load('models/Standing_2H_Magic_Area_Attack_01.gltf', function(result){
    console.log(result);
});
