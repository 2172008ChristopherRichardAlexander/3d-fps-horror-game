import { GLTFLoader } from 'gltfloader';
import { camera, renderer, scene } from './init.js';


function createSlenderman(x,y,z, slenderman){
    const slendermanGeometry = slenderman;
    slendermanGeometry.position.set(x,y,z);

    scene.add(slendermanGeometry);
}

function generateRandomPosition(){
    const range = 20;
    const x = Math.random() * range - range / 2;
    const z = Math.random() * range - range / 2;
    const y = 0;

    return { x, y, z};
}

function generateSlanderman(slenderman){
    let position = generateRandomPosition();
    createSlenderman(position.x, position.y, position.z, slenderman);
}

const gltfLoader = new GLTFLoader();
gltfLoader.load('slendermen/slenderman.gltf', function (result){
    const slenderman = result.scene.children[0];
    slenderman.scale.set(0.3,0.3,0.3);
    console.log('ada slendermen !')
    generateSlanderman(slenderman);

    function update(){
        requestAnimationFrame(update);
        renderer.render(scene,camera);
    }
    update()
}, undefined, function (error){
    console.error(error);
});

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// document.body.appendChild(renderer.domElement);

// scene.background = new THREE.Color(0xaaaaaa); // Ganti warna latar belakang

// const controls = new OrbitControls( cam, renderer.domElement );

// var ambientLight = new THREE.PointLight(0xffffff, 0.5);
// ambientLight.position.set(1,0,0)
// scene.add(ambientLight);

// let texture = new THREE.TextureLoader().load('img/slenderman-2.png');

// let slenderman;

// const loader = new GLTFLoader().load('slendermen/slenderman.gltf', function(result){

// 	slenderman = result.scene.children[0];

//     slenderman.position.set(1,-3,0)
// 	slenderman.castShadow = true;
// 	console.log(result);
// 	scene.add(slenderman);
// });



// window.addEventListener('resize', function(){
//     renderer.setSize(this.window.innerWidth, this.window.innerHeight);
//     cam.aspect = this.window.innerWidth/this.window.innerHeight;
//     cam.updateProjectionMatrix();
// });


// function update(){


//     requestAnimationFrame(update);
//     renderer.render(scene,cam);
// }
// update();