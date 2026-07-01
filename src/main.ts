import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// ✅ Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// ✅ Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// ✅ Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✅ Light (important or model may appear black)
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// ✅ Load OBJ
const loader = new OBJLoader();

const url = 'Assets/ironman.obj'; // adjust path if needed

loader.load(
  url,

  // ✅ On load
  (object) => {
    console.log("✅ OBJ loaded");

    // scale model
    object.scale.set(0.5, 0.5, 0.5);

    // optional: fix orientation
    object.rotation.x = -Math.PI / 2;

    scene.add(object);
  },

  // ✅ Progress
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total * 100).toFixed(0)}%`);
  },

  // ✅ Error
  (error) => {
