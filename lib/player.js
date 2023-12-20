import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';

let pos_x = 0;
let pos_y = 1;
let pos_z = -3;

var pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(pos_x, pos_y, pos_z);
init.scene.add(pointLight);
init.scene.add(new THREE.PointLightHelper(pointLight, 0.2, 0x00ff00))

document.addEventListener("mousedown", function (ev) {
    if (ev.which == 1) {
        if (counter == 0) {
            init.scene.remove(pointLight);
            counter = 1
        } else {
            init.scene.add(pointLight);
            counter = 0
        }
    }
})

document.addEventListener("keydown", function (ev) {
    if (ev.keyCode == 87) { //atas
        init.camera.position.z -= 0.1;
        pos_z -= 0.1;
    } else if (ev.keyCode == 65) { //kiri
        init.camera.position.x -= 0.1;
        pos_x -= 0.1;
    } else if (ev.keyCode == 68) { //kanan
        init.camera.position.x += 0.1;
        pos_x += 0.1;
    } else if (ev.keyCode == 83) { //bawah
        init.camera.position.z += 0.1;
        pos_z += 0.1;
    }
    pointLight.position.set(pos_x, pos_y, pos_z);
})

let rotateSpeed = 0.002;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function (event) {
    pos_x = (event.clientX / window.innerWidth) * 2 - 1;
    pos_y = -(event.clientY / window.innerHeight) * 2 + 2;

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

function updateCameraRotation() {
    init.camera.rotation.y -= (mouseX - init.camera.rotation.y) * rotateSpeed;
    init.camera.rotation.x += (mouseY - init.camera.rotation.x) * rotateSpeed;
}

function animate() {
    requestAnimationFrame(animate);
    updateCameraRotation();
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