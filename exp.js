//import * as THREE from "/node_modules/three/build/three.module.js";
//import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
//import gsap from "/node_modules/gsap/dist/gsap.js";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Glass Material
const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    roughness: 0,
    transmission: 1, // Glass effect
    thickness: 0.5,
    metalness: 0
});

// Create Cube as Fragments
const cubeSize = 1;
const numFragments = 10; // Number of fragments
const fragments = [];

for (let i = 0; i < numFragments; i++) {
    const fragment = new THREE.Mesh(
        new THREE.BoxGeometry(cubeSize / 2, cubeSize / 2, cubeSize / 2),
        glassMaterial
    );

    fragment.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
    );
    
    scene.add(fragment);
    fragments.push(fragment);
}

// Shatter Animation
function shatter() {
    gsap.to(fragments.map(frag => frag.position), {
        duration: 1.5,
        x: () => (Math.random() - 0.5) * 5,
        y: () => (Math.random() - 0.5) * 5,
        z: () => (Math.random() - 0.5) * 5,
        ease: "power2.out",
        onComplete: reform
    });
}

// Reform Animation
function reform() {
    gsap.to(fragments.map(frag => frag.position), {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: "elastic.out(1, 0.5)"
    });
}

// Trigger the animation after 2 seconds
setTimeout(shatter, 2000);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

// Responsive Window Resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
