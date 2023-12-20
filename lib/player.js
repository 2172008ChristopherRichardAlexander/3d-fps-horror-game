import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';

let counter = true;
let pos_x = 0;
let pos_y = 1;
let pos_z = -3;

// var ambient = new THREE.AmbientLight(0x404040, 1);
// init.scene.add(ambient)

// var spotLight = new THREE.SpotLight(0xffffff, 10, 5, Math.PI/10);
// spotLight.position.set(pos_x, pos_y, pos_z); 
// init.scene.add(spotLight);
// spotLight.target.position.set(0,0,-2);
// spotLight.target.updateMatrixWorld();
// init.scene.add(new THREE.SpotLightHelper(spotLight,0.2,0x00ff00))

var spotLight = new THREE.PointLight(0xffffff, 0.5);
spotLight.position.set(pos_x, pos_y, pos_z);
init.scene.add(spotLight);
init.scene.add(new THREE.PointLightHelper(spotLight, 0.2, 0x00ff00))

var gridHelper = new THREE.GridHelper(10, 10);
init.scene.add(gridHelper);

document.addEventListener("mousedown", function(ev){
    if (ev.which == 1){
        if (counter == true){
            init.scene.remove(spotLight);
            counter = false
        } else {
            init.scene.add(spotLight);
            counter = true
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
    spotLight.position.set(pos_x,pos_y,pos_z);
    // spotLight.target.position.set(pos_x,pos_y,0);
    // spotLight.target.updateMatrixWorld(); 
    console.log(pos_x,pos_y);
})

let rotateSpeed = 0.002;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', function (event) {
    pos_x = (event.clientX / window.innerWidth) * 2 - 1;
    pos_y = -(event.clientY / window.innerHeight) * 2 + 2;

    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // spotLight.target.position.set(pos_x,pos_y,0);
    // spotLight.target.updateMatrixWorld(); 
});

function updateCameraRotation() {
    init.camera.rotation.y -= (mouseX - init.camera.rotation.y) * rotateSpeed;
    init.camera.rotation.x += (mouseY - init.camera.rotation.x) * rotateSpeed;
    // spotLight.rotation.x += (mouseY - init.camera.rotation.x) * rotateSpeed;
    // spotLight.rotation.y -= (mouseX - init.camera.rotation.y) * rotateSpeed;

    pos_x = mouseX * 2 + rotateSpeed; 
    pos_y = mouseY * 2 + 1 + rotateSpeed;
    spotLight.position.set(pos_x, pos_y, pos_z);
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