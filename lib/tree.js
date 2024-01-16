import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';
import './player.js';
import '../node_modules/cannon/build/cannon.js';

console.log(init);
const textureTree = new THREE.TextureLoader().load('./img/tree.jpg');
textureTree.wrapS = THREE.RepeatWrapping;
textureTree.wrapT = THREE.RepeatWrapping;
textureTree.repeat.set(6, 3);

const textureLeaf = new THREE.TextureLoader().load('./img/leaf.jpg');
textureLeaf.wrapS = THREE.RepeatWrapping;
textureLeaf.wrapT = THREE.RepeatWrapping;
textureLeaf.repeat.set(5, 5);

const trees = [];

function createTree(radius, angle) {
    const treeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
    const treeMaterial = new THREE.MeshPhongMaterial({ map: textureTree });
    const tree = new THREE.Mesh(treeGeometry, treeMaterial);

    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);

    tree.position.set(x, 2, z);
    init.scene.add(tree);

    createLeaves(x, tree.position.y + (Math.floor(Math.random() * 2) + 1.5), z);

    const numRandomTrees = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < numRandomTrees; i++) {
        const randomAngle = Math.random() * Math.PI * 2;
        const randomRadius = Math.random() * radius * 1.2;
        createTreeInside(tree, randomRadius, randomAngle);
    }

    trees.push(tree); // Add the created tree to the array
}

function createTreeInside(parentTree, radius, angle) {
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

    init.scene.add(tree);
    createLeaves(x, parentTree.position.y + (Math.floor(Math.random() * 2) + 1.5), z);

    trees.push(tree); // Add the created tree to the array
}

function createLeaves(x, y, z) {
    const leavesGeometry = new THREE.ConeGeometry(1, 1.8, 8);
    const leavesMaterial = new THREE.MeshPhongMaterial({ map: textureLeaf });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, y, z);
    init.scene.add(leaves);
}

function checkTreeCollision() {
    const playerPosition = init.camera.position;

    for (const tree of trees) {
        // Simple bounding box collision check
        const treeBox = new THREE.Box3().setFromObject(tree);
        if (treeBox.containsPoint(playerPosition)) {
            // Collision detected, handle it accordingly
            player.process_keyboard(0);
            // You can add logic here to respond to the collision, for example, stop the player's movement.
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    init.renderer.render(init.scene, init.camera);
    checkTreeCollision();
}

window.addEventListener('resize', function () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    init.camera.aspect = newWidth / newHeight;
    init.camera.updateProjectionMatrix();

    init.renderer.setSize(newWidth, newHeight);
});

var numTrees = 20;
for (var i = 0; i < numTrees; i++) {
    var angle = (i / numTrees) * Math.PI * 2;
    createTree(6, angle);
}

animate();
