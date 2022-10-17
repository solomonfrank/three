import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");

/**
 * Particles
 */
// const pointGeometry = new THREE.SphereGeometry(1, 32, 32);
// const pointMaterial = new THREE.PointsMaterial({
//   size: 0.02,
//   sizeAttenuation: true,
// });
// const point = new THREE.Points(pointGeometry, pointMaterial);

// scene.add(point);

//custom particle

const pointMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: "#ff88cc",
  alphaMap: particleTexture,
  transparent: true,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  vertexColors: true,
});

const particleGeometry = new THREE.BufferGeometry();
const count = 3000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const particles = new THREE.Points(particleGeometry, pointMaterial);
scene.add(particles);
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
  //particles.rotation.y = elapsedTime * 0.5;
  // Update controls

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = particleGeometry.attributes.position.array[i3];
    particleGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }

  controls.update();

  // Render
  particleGeometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
