import * as THREE from "../node_modules/three/build/three.module.js";
import * as init from "./init.js";
import { OrbitControls } from "orbitcontrols";
import { PointerLockControls } from "pointers";

class Player {}

const senterBox = new THREE.BoxGeometry(0.2, 0.1, 0.5);
const senterMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const senter = new THREE.Mesh(senterBox, senterMat);

senter.position.set(0.25, 0.75, 0);

let counter = true;
let stamina = 100;

let clock = new THREE.Clock();

var spotLight = new THREE.SpotLight(0xffffff, 1.0, 10, Math.PI * 0.2, 0, 2);
spotLight.position.set(0, 1, 0);
spotLight.penumbra = 0.3;

init.scene.add(spotLight);
init.camera.add(spotLight.target);
init.scene.add(senter);

const cameraAndSenterGroup = new THREE.Group();
cameraAndSenterGroup.add(init.camera);
cameraAndSenterGroup.add(senter);

init.scene.add(cameraAndSenterGroup);

let control = new PointerLockControls(cameraAndSenterGroup, document.body);
window.addEventListener("click", () => {
  control.lock();
});

var ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
init.scene.add(ambientLight);

document.addEventListener("mousedown", function (ev) {
  if (ev.which == 1) {
    if (counter == true) {
      init.scene.remove(spotLight);
      counter = false;
    } else {
      init.scene.add(spotLight);
      counter = true;
    }
  }
  console.log(cameraAndSenterGroup);
});

let keyboard = [];
const trees = [];

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

function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();
  process_keyboard(delta);
  spotLight.position.x = control.camera.position.x;
  spotLight.position.z = control.camera.position.z;
  spotLight.target.position.z = control.camera.position.z - 4;

  init.renderer.render(init.scene, init.camera);
}

window.addEventListener("resize", function () {
  var newWidth = window.innerWidth;
  var newHeight = window.innerHeight;

  init.camera.aspect = newWidth / newHeight;
  init.camera.updateProjectionMatrix();

  init.renderer.setSize(newWidth, newHeight);
});

animate();
