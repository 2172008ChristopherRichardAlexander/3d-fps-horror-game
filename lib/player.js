import * as THREE from "../node_modules/three/build/three.module.js";
import { scene, camera } from "./init.js";
import { PointerLockControls } from "pointers";

const senterBox = new THREE.BoxGeometry(0.2, 0.1, 0.5);
const senterMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const senter = new THREE.Mesh(senterBox, senterMat);
senter.position.set(0.25, 0.75, 0);
scene.add(senter);

let counter = true;
let stamina = 100;

var spotLight = new THREE.SpotLight(0xffffff, 2.0, 20, Math.PI * 0.2, 0, 2);
spotLight.position.set(0, 1, 0);
spotLight.penumbra = 0.3;
scene.add(spotLight);
camera.add(spotLight.target);

// Group
const cameraAndSenterGroup = new THREE.Group();
cameraAndSenterGroup.add(camera);
cameraAndSenterGroup.add(senter);

scene.add(cameraAndSenterGroup);

export var control = new PointerLockControls(cameraAndSenterGroup, document.body);
window.addEventListener("click", () => {
  control.lock();
});

var ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(ambientLight);

document.addEventListener("mousedown", function (ev) {
  if (ev.which == 1) {
    if (counter == true) {
      scene.remove(spotLight);
      counter = false;
    } else {
      scene.add(spotLight);
      counter = true;
    }
  }
  console.log(cameraAndSenterGroup);
});

let keyboard = [];

document.body.onkeydown = function (e) {
  keyboard[e.key] = true;
};

document.body.onkeyup = function (e) {
  keyboard[e.key] = false;
};

function process_keyboard(delta) {
  let speed = 1.5;
  let actual_speed = delta * speed;
  if (keyboard["w"]) {
    control.moveForward(actual_speed);
  }
  if (keyboard["s"]) {
    control.moveForward(-actual_speed);
  }
  if (keyboard["a"]) {
    control.moveRight(-actual_speed);
  }
  if (keyboard["d"]) {
    control.moveRight(actual_speed);
  }
  if (keyboard["Shift"] && keyboard["w"]) {
    if (stamina > 0) {
      control.moveForward(actual_speed * 0.2 + actual_speed);
      stamina -= 0.5;
    }
  } else {
    if (stamina < 100) {
      setTimeout(function () {
        stamina += 0.5;
      }, 1000);
    }
  }
}

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();
  process_keyboard(delta);
  spotLight.position.x = control.camera.position.x;
  spotLight.position.z = control.camera.position.z;
  spotLight.target.position.z = control.camera.position.z - 4;
}

animate();
