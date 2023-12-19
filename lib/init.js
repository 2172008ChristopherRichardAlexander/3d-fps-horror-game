import * as THREE from '../node_modules/three/build/three.module.js';

export var scene = new THREE.Scene();
export var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
export var renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(0, 1, 5);

let pos_x = 0;
let pos_y = 1;
let pos_z = 2;

var pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(pos_x,pos_y,pos_z); 
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight,0.2,0x00ff00))

document.addEventListener("mousedown", function(ev){
    if (ev.which == 1){
        if (counter == 0){
            scene.remove(pointLight);
            counter = 1
        } else {
            scene.add(pointLight);
            counter = 0
        }
    }
})

document.addEventListener("keydown", function(ev){
    if (ev.keyCode == 87){ //atas
        camera.position.z -= 0.1;
        pos_z -=0.1;
    } else if (ev.keyCode == 65){ //kiri
        camera.position.x-= 0.1;
        pos_x -=0.1;
    } else if (ev.keyCode == 68){ //kanan
        camera.position.x+= 0.1;
        pos_x +=0.1;
    } else if (ev.keyCode == 83){ //bawah
        camera.position.z += 0.1;   
        pos_z +=0.1;
    }else{
        console.log("Key not mapped to any action.");
    }
    pointLight.position.set(pos_x,pos_y,pos_z); 
    console.log(pos_x,pos_y);
})

document.addEventListener('mousemove', function(event) {
    console.log(pos_x,pos_y);
    pos_x  = (event.clientX / window.innerWidth) * 2 - 1;
    pos_y = -(event.clientY / window.innerHeight) * 2 + 2;
    
    pointLight.position.set(pos_x,pos_y,pos_z); 
  });

  function draw(){
    requestAnimationFrame(draw);
    renderer.render(scene, camera);
}

draw();