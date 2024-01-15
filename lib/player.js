import * as THREE from "../node_modules/three/build/three.module.js";
import * as dat from "../node_modules/dat.gui/build/dat.gui.module.js";
import * as init from "./init.js";
import { OrbitControls } from "orbitcontrols";
import { PointerLockControls } from "pointers";

let counter = true;
let pos_x = 0;
let pos_y = 1;
let pos_z = -3;
let stamina = 100;

let kendali = new Object();
kendali.x = pos_x;
kendali.z = pos_y;
kendali.y = pos_z;

let gui = new dat.GUI();
gui.add(kendali, "x", -4, 4, 0.1);
gui.add(kendali, "y", -4, 4);
gui.add(kendali, "z", -4, 4);
let clock = new THREE.Clock();
let control = new PointerLockControls(init.camera, document.body);
window.addEventListener("click", () => {
  control.lock();
});

var spotLight = new THREE.SpotLight(0xffffff, 1.0, 10, Math.PI * 0.1, 0, 1);
init.scene.add(spotLight);
init.camera.add(spotLight.target);

var gridHelper = new THREE.GridHelper(10, 10);
init.scene.add(gridHelper);

function checkTreeCollisions() {
    init.scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
            // Assuming trees have bounding boxes as well
            let treeBoundingBox = new THREE.Box3().setFromObject(child);

            // Check for collision between player and tree
            if (playerBoundingBox.intersectsBox(treeBoundingBox)) {
                // Collision detected, handle it here
                console.log("Collision with tree!");
                // You can perform actions like stopping player movement, reducing health, etc.
            }
        }
    });
}

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
