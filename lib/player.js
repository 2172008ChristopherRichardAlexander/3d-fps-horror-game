import * as THREE from "../node_modules/three/build/three.module.js";
import { scene, camera } from "./init.js";
import { PointerLockControls } from "pointers";
import * as tree from "./tree.js";
import { GLTFLoader } from 'gltfloader';

let flashlight;

new GLTFLoader().load('../models/flashlight2/scene.gltf', function (result) {
  flashlight = result.scene.children[0];
  flashlight.position.set(0.2, 0.9, 0.05);
  flashlight.scale.set(3, 3, 3);
  flashlight.rotation.z -= Math.PI * 1.35;
  scene.add(flashlight);
  console.log(flashlight) // object 3D

}, undefined, function (error) {
  console.error(error);
});

console.log(flashlight); // undefined

const cameraAndSenterGroup = new THREE.Group();
cameraAndSenterGroup.add(camera);
if (flashlight) {
  cameraAndSenterGroup.add(flashlight);
}
scene.add(cameraAndSenterGroup);
export var control = new PointerLockControls(cameraAndSenterGroup, document.body);

window.addEventListener("click", () => {
  control.lock();
});

let counter = true;
let stamina = 100;

var spotLight = new THREE.SpotLight(0xffffff, 1.0, 10, Math.PI * 0.2, 0, 2);
spotLight.position.set(0, 1, 0);
spotLight.penumbra = 0.3;
scene.add(spotLight);
camera.add(spotLight.target);

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

const staminaBar = document.getElementById("stamina-bar");

function updateStaminaBar() {
  staminaBar.style.width = stamina + "%";
}

let keyboard = [];

document.body.onkeydown = function (e) {
  keyboard[e.key] = true;
};

document.body.onkeyup = function (e) {
  keyboard[e.key] = false;
};

export function process_keyboard(delta,status) {
  console.log(status);
  if (status) {
    return; // Don't process keyboard input if a collision is detected
  }else{
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
    if (stamina >= 100){
      stamina = 100;
    }
  }
  updateStaminaBar();
}


let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();
  process_keyboard(delta,status);
  spotLight.position.x = control.camera.position.x;
  spotLight.position.z = control.camera.position.z;
  spotLight.target.position.z = control.camera.position.z - 4;
}

animate();
