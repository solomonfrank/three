import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { BufferAttribute, BufferGeometry, Points } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * generate galaxy
 */

let points = null;
let geometry = null;
let material = null;

const galaxyParameter = {};
galaxyParameter.count = 1000;
galaxyParameter.size = 0.02;
galaxyParameter.radius = 5;
galaxyParameter.branch = 3;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
  geometry = new BufferGeometry();
  material = new THREE.PointsMaterial({
    size: galaxyParameter.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const positions = new Float32Array(galaxyParameter.count * 3);

  for (let i = 0; i < galaxyParameter.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * galaxyParameter.radius;
    const angle =
      ((i % galaxyParameter.branch) / galaxyParameter.branch) * Math.PI * 2;
    positions[i3 + 0] = radius * Math.cos(angle);
    positions[i3 + 1] = 0;
    positions[i3 + 1] = radius * Math.sin(angle);
    // positions[i3 + 0] = (Math.random() - 0.5) * 3;
    // positions[i3 + 1] = (Math.random() - 0.5) * 3;
    // positions[i3 + 2] = (Math.random() - 0.5) * 3;
  }

  geometry.setAttribute("position", new BufferAttribute(positions, 3));
  points = new THREE.Points(geometry, material);

  scene.add(points);
};

gui
  .add(galaxyParameter, "count")
  .min(100)
  .step(500)
  .max(10000)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameter, "size")
  .min(0.01)
  .step(0.005)
  .max(0.5)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameter, "radius")
  .min(5)
  .step(2)
  .max(20)
  .onFinishChange(generateGalaxy);
gui
  .add(galaxyParameter, "branch")
  .min(2)
  .step(1)
  .max(5)
  .onFinishChange(generateGalaxy);

generateGalaxy();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
