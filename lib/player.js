import * as THREE from "../node_modules/three/build/three.module.js";
import * as init from "./init.js";
import { OrbitControls } from "orbitcontrols";
import { PointerLockControls } from "pointers";

let counter = true;
let pos_x = 0;
let pos_y = 1;
let pos_z = -3;
let stamina = 100;

let clock = new THREE.Clock();
let control = new PointerLockControls(init.camera, document.body);
window.addEventListener("click", () => {
  control.lock();
});

var spotLight = new THREE.SpotLight(0xffffff, 1.0, 10, Math.PI * 0.1, 0, 1);
init.scene.add(spotLight);
init.camera.add(spotLight.target);

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
});

function updateTreeCollisions() {
  // Assuming all trees are stored in a variable named 'trees'
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];

    // Check for collision using bounding boxes
    if (
      control.object.position.x < tree.position.x + 1.5 && // Adjust the bounding box size as needed
      control.object.position.x > tree.position.x - 1.5 &&
      control.object.position.z < tree.position.z + 1.5 &&
      control.object.position.z > tree.position.z - 1.5
    ) {
      // Collision detected, you can handle it accordingly (e.g., stop the player)
      console.log("Collision with tree!");
    }
  }
}

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
