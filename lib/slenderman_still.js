import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';
import * as THREE from '../node_modules/three/build/three.module.js';

var scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
var renderer = new THREE.WebGLRenderer({
    antialias : true
});

cam.position.z += 12
cam.position.x += 0
cam.position.y += 10


renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xaaaaaa); // Ganti warna latar belakang

const controls = new OrbitControls( cam, renderer.domElement );

var ambientLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(ambientLight);

let texture = new THREE.TextureLoader().load('img/slenderman-2.png');

let slenderman;

const loader = new GLTFLoader().load('slendermen/slenderman.gltf', function(result){

	slenderman = result.scene.children[0];

    slenderman.position.set(1,-3,0)
	slenderman.castShadow = true;
	console.log(result);
	scene.add(slenderman);
});

window.addEventListener('resize', function(){
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    cam.aspect = this.window.innerWidth/this.window.innerHeight;
    cam.updateProjectionMatrix();
});


function update(){


    requestAnimationFrame(update);
    renderer.render(scene,cam);
}
update();