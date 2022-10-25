import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import vertexShader from "./shaders/water/vertex.glsl";
import fragmentShader from "./shaders/water/fragment.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });
const debugObj = {};
debugObj.depthColor = "#0000ff";
debugObj.surfaceDepth = "#8888ff";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);

// Material
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uBigWavesElevation: {
      value: 0.2,
    },
    uBigWavesFrequecy: {
      value: new THREE.Vector2(4, 1.5),
    },
    uTime: {
      value: 0,
    },
    uDepthColor: {
      value: new THREE.Color(debugObj.depthColor),
    },
    uSurfaceColor: {
      value: new THREE.Color(debugObj.surfaceDepth),
    },
    uColorOffset: {
      value: 0.05,
    },
    uColorMultiplier: {
      value: 0.5,
    },
  },
});

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

gui
  .add(waterMaterial.uniforms.uBigWavesElevation, "value")
  .min(0)
  .max(5)
  .step(0.001)
  .name("uBigWavesElevation");
gui
  .add(waterMaterial.uniforms.uBigWavesFrequecy.value, "x")
  .min(0)
  .max(10)
  .step(0.001)
  .name("uBigWavesFrequecyX");
gui
  .add(waterMaterial.uniforms.uBigWavesFrequecy.value, "y")
  .min(0)
  .max(10)
  .step(0.001)
  .name("uBigWavesFrequecyY");
gui
  .addColor(debugObj, "depthColor")
  .name("depthColor")
  .onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObj.depthColor);
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObj.surfaceDepth);
  });
gui
  .addColor(debugObj, "surfaceDepth")
  .name("surfaceDepth")
  .onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObj.surfaceDepth);
  });

gui
  .add(waterMaterial.uniforms.uColorOffset, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("uOffsetColor");

gui
  .add(waterMaterial.uniforms.uColorMultiplier, "value")
  .min(0)
  .max(10)
  .step(1)
  .name("uColorMultiplier");

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
camera.position.set(1, 1, 1);
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
  waterMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
