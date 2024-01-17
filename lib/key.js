import * as THREE from '../node_modules/three/build/three.module.js';
import * as init from './init.js';

const keys = [];
const keySeparation = 3; // Jarak minimum antar kunci

function createKey(x, y, z) {
    const keyGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.1);
    const keyMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 }); // Warna emas

    const key = new THREE.Mesh(keyGeometry, keyMaterial);
    key.position.set(x, y, z);

    init.scene.add(key);
    keys.push(key);
}

function generateRandomPosition() {
    const range = 18; // Sesuaikan range berdasarkan ukuran scene Anda
    const x = Math.random() * range - range / 2;
    const z = Math.random() * range - range / 2;
    const y = 0.5; // Sesuaikan ketinggian kunci dari tanah

    return { x, y, z };
}

function generateRandomKeys() {
    const numKeys = 8;

    for (let i = 0; i < numKeys; i++) {
        let position = generateRandomPosition();

        // Pastikan jarak antar kunci saling berjauhan
        for (let j = 0; j < i; j++) {
            const distance = keys[j].position.distanceTo(new THREE.Vector3(position.x, position.y, position.z));
            if (distance < keySeparation) {
                // Jika jarak kurang dari keySeparation, buat posisi baru
                position = generateRandomPosition();
                j = -1; // Ulangi pengecekan dengan kunci sebelumnya
            }
        }

        createKey(position.x, position.y, position.z);
    }
}

function checkCollisionWithCamera(object) {
    const playerPosition = init.camera.position;
    const objectBox = new THREE.Box3().setFromObject(object);
    return objectBox.containsPoint(playerPosition);
}

function checkKeyCollision() {
    const playerPosition = init.camera.position;

    keys.forEach((key, index) => {
        const keyBox = new THREE.Box3().setFromObject(key);

        if (keyBox.containsPoint(playerPosition)) {
            // Kunci terkumpul, atur logikanya sesuai kebutuhan
            init.scene.remove(key);
            keys.splice(index, 1); // Remove the key from the array
            // Anda dapat menambahkan logika di sini untuk menanggapi pengumpulan kunci.
        }
    });
}

function checkCameraCollision() {
    // Pastikan bahwa kamera tidak bersentuhan dengan objek selain kunci
    // (Tambahkan objek lain ke dalam array `objects` jika diperlukan)
    const objects = keys;
    for (const object of objects) {
        if (checkCollisionWithCamera(object)) {
            // Atur logika jika kamera bersentuhan dengan objek selain kunci
            // (misalnya, hentikan pergerakan kamera)
            console.log('Collision with object!');
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    init.renderer.render(init.scene, init.camera);
    checkKeyCollision();
    checkCameraCollision();
}

generateRandomKeys();
animate();
