//import * as THREE from '../node_modules/three/build/three.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

const controls = new OrbitControls( camera, renderer.domElement );

const loader = new GLTFLoader().setPath( 'models/Acknowledging.gltf' );
loader.load('models/Standing_2H_Magic_Area_Attack_01.gltf', async function(result){
    const model = result.scene;
    await renderer.compileAsync(model,cam,scene);
    scene.add(model);
    renderer();
});
