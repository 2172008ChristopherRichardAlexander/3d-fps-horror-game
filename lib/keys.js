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
    antialias: true
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0xaaaaaa);

const controls = new OrbitControls(cam, renderer.domElement);

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

new GLTFLoader().load('../models/key2/scene.gltf', function (result) {
    let key = result.scene.children[0];
    key.scale.set(0.1, 0.1, 0.1);
    key.position.set(-10, 0, -100);
    key.rotation.y = Math.PI / 2.5;
    key.rotation.z = Math.PI / 2;
    scene.add(key);

    const clock = new THREE.Clock();
    function update() {
        requestAnimationFrame(update);
        const delta = clock.getDelta();
        key.rotation.z += delta;
        renderer.render(scene, cam);
    }
    update();

}, undefined, function (error) {
    console.error(error);
});



window.addEventListener('resize', function () {
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    cam.aspect = this.window.innerWidth / this.window.innerHeight;
    cam.updateProjectionMatrix();
});
