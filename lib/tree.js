import * as THREE from "../node_modules/three/build/three.module.js";
import { scene, camera, renderer } from "./init.js";
import * as cam from "./player.js";

const textureTree = new THREE.TextureLoader().load("./img/tree.jpg");
textureTree.wrapS = THREE.RepeatWrapping;
textureTree.wrapT = THREE.RepeatWrapping;
textureTree.repeat.set(6, 3);

const textureLeaf = new THREE.TextureLoader().load("./img/leaf.jpg");
textureLeaf.wrapS = THREE.RepeatWrapping;
textureLeaf.wrapT = THREE.RepeatWrapping;
textureLeaf.repeat.set(5, 5);

export const trees = [];

export function createTree(radius, angle) {
  const treeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
  const treeMaterial = new THREE.MeshPhongMaterial({ map: textureTree });
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);

  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  tree.position.set(x, 2, z);
  scene.add(tree);

  createLeaves(x, tree.position.y + (Math.floor(Math.random() * 2) + 1.5), z);

  const numRandomTrees = Math.floor(Math.random() * 6) + 1;
  for (let i = 0; i < numRandomTrees; i++) {
    const randomAngle = Math.random() * Math.PI * 2;
    const randomRadius = Math.random() * radius * 1.2;
    createTreeInside(tree, randomRadius, randomAngle);
  }

  trees.push(tree); // Add the created tree to the array
}

export function createTreeInside(parentTree, radius, angle) {
  const treeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
  const treeMaterial = new THREE.MeshPhongMaterial({ map: textureTree });
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);

  const x = radius * Math.cos(angle) + parentTree.position.x;
  const z = radius * Math.sin(angle) + parentTree.position.z;

  tree.position.set(
    Math.max(-9.5, Math.min(9.5, x)),
    2,
    Math.max(-9.5, Math.min(9.5, z))
  );

  scene.add(tree);
  createLeaves(
    x,
    parentTree.position.y + (Math.floor(Math.random() * 2) + 1.5),
    z
  );

  trees.push(tree); // Add the created tree to the array
}

export function createLeaves(x, y, z) {
  const leavesGeometry = new THREE.ConeGeometry(1, 1.8, 8);
  const leavesMaterial = new THREE.MeshPhongMaterial({ map: textureLeaf });
  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  leaves.position.set(x, y, z);
  scene.add(leaves);
}
export let collisionDetected = false;
export function checkTreeCollision(position) {
  for (const tree of trees) {
    const treePosition = tree.position.clone();
    treePosition.y = position.y;

    const distance = position.distanceTo(treePosition);
    if (distance < 0.7) {
      console.log("Collision detected with a tree");
      return true;
    }
  }
}
let keyboard = [];
let stamina = 100;
document.body.onkeydown = function (e) {
  keyboard[e.key] = true;
};

document.body.onkeyup = function (e) {
  keyboard[e.key] = false;
};

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var moveFaster = false;

var onKeyDown = function (event) {
  switch (event.keyCode) {
    case 38: // up arrow
    case 87: // W key
      moveForward = true;
      break;
    case 37: // left arrow
    case 65: // A key
      moveLeft = true;
      break;
    case 40: // down arrow
    case 83: // S key
      moveBackward = true;
      break;
    case 39: // right arrow
    case 68: // D key
      moveRight = true;
      break;
    case 16: // right arrow
      moveFaster = true;
      break;
  }
};

var onKeyUp = function (event) {
  switch (event.keyCode) {
    case 38: // up arrow
    case 87: // W key
      moveForward = false;
      break;
    case 37: // left arrow
    case 65: // A key
      moveLeft = false;
      break;
    case 40: // down arrow
    case 83: // S key
      moveBackward = false;
      break;
    case 39: // right arrow
    case 68: // D key
      moveRight = false;
      break;
    case 16: // right arrow
      moveFaster = false;
      break;
  }
};
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();
  if (cam.control.isLocked) {
    if (moveForward) {
      cam.control.moveForward(delta);
      if (checkTreeCollision(cam.control.getObject().position)) {
        cam.control.moveForward(-delta); // Move back to the previous position
      }
    }

    if (moveBackward) {
      cam.control.moveForward(-delta);
      if (checkTreeCollision(cam.control.getObject().position)) {
        cam.control.moveForward(delta); // Move back to the previous position
      }
    }

    if (moveLeft) {
      cam.control.moveRight(-delta);
      if (checkTreeCollision(cam.control.getObject().position)) {
        cam.control.moveRight(delta); // Move back to the previous position
      }
    }

    if (moveRight) {
      cam.control.moveRight(delta);
      if (checkTreeCollision(cam.control.getObject().position)) {
        cam.control.moveRight(-delta); // Move back to the previous position
      }
    }
    if(moveFaster){
      if (stamina > 0) {
        cam.control.moveForward(delta * 0.2 + delta);
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
  }


var numTrees = 20;
for (var i = 0; i < numTrees; i++) {
  var angle = (i / numTrees) * Math.PI * 2;
  createTree(6, angle);
}
animate();
