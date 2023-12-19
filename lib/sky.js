// main.js
import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';

const texture = new THREE.TextureLoader().load('./img/sky.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(8, 5);

var skyGeometry = new THREE.CapsuleGeometry(15, 1, 6, 4);
var skyMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
var sky = new THREE.Mesh(skyGeometry, skyMaterial);
sky.rotation.y = Math.PI / 4;
init.scene.add(sky);

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
