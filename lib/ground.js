import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';

const texture = new THREE.TextureLoader().load('./img/ground.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(10, 10);

var groundGeometry = new THREE.PlaneGeometry(20, 20);
var groundMaterial = new THREE.MeshPhongMaterial({ map: texture });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
init.scene.add(ground);

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