import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera =  new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg') // instantiation

});

renderer.setPixelRatio(window.devicePixelRatio);//equalize the ratios
renderer.setSize( window.innerWidth,window.innerHeight) //full-screen canvas
camera.position.setZ(30); // centered camera is now positioned along the z axis for better perspective

renderer.render(scene,camera);

//object creation
const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff});
const torus = new THREE.Mesh(geometry,material);

scene.add(torus)

const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(5,5,5)
scene.add(pointlight)

const dirlight = new THREE.DirectionalLight(0xffffff)
dirlight.position.set(10,10,10)
scene.add(dirlight)

const amblight = new THREE.AmbientLight(0xffffff)
dirlight.position.set(20,20,20)
scene.add(amblight)

//helpers 
const lighthelp = new THREE.PointLightHelper(pointlight) // shows position of point light
const gridh = new THREE.GridHelper(50,50)
scene.add(lighthelp,gridh) 

const controls = new OrbitControls(camera,renderer.domElement) // hovering

// large object creation
function addstar(){
  const geometry = new THREE.SphereGeometry(0.25,32,16);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry,material)

  const[x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  scene.add(star)
}
Array(200).fill().forEach(addstar)


function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);

  
  torus.rotation.y+=0.01;
  torus.rotation.x+=0.01;
  
  controls.update()

}

animate()
