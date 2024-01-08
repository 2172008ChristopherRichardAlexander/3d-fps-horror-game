import * as THREE from '../node_modules/three/build/three.module.js';
import * as dat from '../node_modules/dat.gui/build/dat.gui.module.js';
import * as init from './init.js';
import { OrbitControls } from 'orbitcontrols';
import { PointerLockControls } from 'pointers';


let counter = true;
let pos_x = 0;
let pos_y = 1;
let pos_z = -3;

let kendali = new Object();
kendali.x = pos_x;
kendali.z = pos_y;
kendali.y = pos_z;

let gui = new dat.GUI();
gui.add(kendali, 'x', -4, 4, 0.1);
gui.add(kendali, 'y', -4, 4);
gui.add(kendali, 'z', -4, 4);
let clock = new THREE.Clock();
let control = new PointerLockControls(init.camera, init.renderer.domElement);
window.addEventListener('click', () => {
    control.lock();
});
// var ambient = new THREE.AmbientLight(0x404040, 1);
// init.scene.add(ambient)

// var spotLight = new THREE.SpotLight(0xffffff, 10, 5, Math.PI/10);
// spotLight.position.set(pos_x, pos_y, pos_z); 
// init.scene.add(spotLight);
// spotLight.target.position.set(7,1,-2);
// spotLight.rotation.y += Math.PI;
// spotLight.target.updateMatrixWorld();
// init.scene.add(new THREE.SpotLightHelper(spotLight,0.2,0x00ff00))

var spotLight = new THREE.PointLight(0xffffff, 0.5);
spotLight.position.set(pos_x, pos_y, pos_z);
init.scene.add(spotLight);
// init.scene.add(new THREE.PointLightHelper(spotLight, 0.2, 0x00ff00))

var gridHelper = new THREE.GridHelper(10, 10);
init.scene.add(gridHelper);

document.addEventListener("mousedown", function (ev) {
    if (ev.which == 1) {
        if (counter == true) {
            init.scene.remove(spotLight);
            counter = false
        } else {
            init.scene.add(spotLight);
            counter = true
        }
    }
})

let keyboard = [];

document.body.onkeydown = function (e) {
    keyboard[e.key] = true;
}

document.body.onkeyup = function (e) {
    keyboard[e.key] = false;
    spotLight.position.set(pos_x, pos_y, pos_z);
}

function process_keyboard(delta) {
    let speed = 1.5;
    let actual_speed = delta * speed;
    if (keyboard['w']) {
        control.moveForward(actual_speed);
    } if (keyboard['s']) {
        control.moveForward(-actual_speed);
    } if (keyboard['a']) {
        control.moveRight(-actual_speed);
    } if (keyboard['d']) {
        control.moveRight(actual_speed);
    }
}

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta();
    process_keyboard(delta);
    init.renderer.render(init.scene, init.camera);
}

window.addEventListener('resize', function () {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    init.camera.aspect = newWidth / newHeight;
    init.camera.updateProjectionMatrix();

    init.renderer.setSize(newWidth, newHeight);
});

animate();