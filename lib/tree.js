import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';

const textureTree = new THREE.TextureLoader().load('./img/tree.jpg');
textureTree.wrapS = THREE.RepeatWrapping;
textureTree.wrapT = THREE.RepeatWrapping;
textureTree.repeat.set(6, 3);

const textureLeaf = new THREE.TextureLoader().load('./img/leaf.jpg');
textureLeaf.wrapS = THREE.RepeatWrapping;
textureLeaf.wrapT = THREE.RepeatWrapping;
textureLeaf.repeat.set(5, 5);

function createTree(radius, angle) {
    var treeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
    var treeMaterial = new THREE.MeshPhongMaterial({ map: textureTree });
    var tree = new THREE.Mesh(treeGeometry, treeMaterial);

    var x = radius * Math.cos(angle);
    var z = radius * Math.sin(angle);

    tree.position.set(x, 2, z);
    init.scene.add(tree);

    createLeaves(x, tree.position.y + (Math.floor(Math.random() * 2) + 1.5), z);

    var numRandomTrees = Math.floor(Math.random() * 6) + 1;
    for (var i = 0; i < numRandomTrees; i++) {
        var randomAngle = Math.random() * Math.PI * 2;
        var randomRadius = Math.random() * radius * 1.2;
        createTreeInside(tree, randomRadius, randomAngle);
    }
}

function createTreeInside(parentTree, radius, angle) {
    var treeGeometry = new THREE.CylinderGeometry(0.2, 0.2, 4, 16);
    var treeMaterial = new THREE.MeshPhongMaterial({ map: textureTree });
    var tree = new THREE.Mesh(treeGeometry, treeMaterial);

    var x = radius * Math.cos(angle) + parentTree.position.x;
    var z = radius * Math.sin(angle) + parentTree.position.z;

    x = Math.max(-9.5, Math.min(9.5, x));
    z = Math.max(-9.5, Math.min(9.5, z));

    tree.position.set(x, 2, z);
    init.scene.add(tree);

    createLeaves(x, parentTree.position.y + (Math.floor(Math.random() * 2) + 1.5), z);
}

function createLeaves(x, y, z) {
    var leavesGeometry = new THREE.ConeGeometry(1, 1.8, 8);
    var leavesMaterial = new THREE.MeshPhongMaterial({ map: textureLeaf });
    var leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, y, z);
    init.scene.add(leaves);
}

var numTrees = 20;
for (var i = 0; i < numTrees; i++) {
    var angle = (i / numTrees) * Math.PI * 2;
    createTree(6, angle);
}

function animate() {
    requestAnimationFrame(animate);
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