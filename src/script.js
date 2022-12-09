import "./style.css";
import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import fireflyShaderVertex from "./shaders/firefly/vertex.glsl";
import fireflyShaderFragment from "./shaders/firefly/fragment.glsl";

/**
 * Base
 */

const debugObj = {};
// Debug
const gui = new dat.GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 *
 * Material
 */

const bakedTexure = textureLoader.load("baked.jpg");
bakedTexure.flipY = false;
bakedTexure.encoding = THREE.sRGBEncoding; // color normalisation input

const poleLightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexure });

/**
 * Load model
 */
gltfLoader.load(
  "portal.glb",
  (gltf) => {
    gltf.scene.traverse((child) => {
      child.material = bakedMaterial;
    });

    const poleMeshA = gltf.scene.children.find(
      (child) => child.name === "poleLightA"
    );

    console.log("poleMeshA", poleMeshA);
    const poleMeshB = gltf.scene.children.find(
      (child) => child.name === "poleLightB"
    );

    const portalMesh = gltf.scene.children.find(
      (child) => child.name === "portalLight"
    );

    poleMeshA.material = poleLightMaterial;
    poleMeshB.material = poleLightMaterial;
    portalMesh.material = poleLightMaterial;
    scene.add(gltf.scene);
  },
  () => {}
);

/**
 * flyfliers
 */

const particleGeomtery = new THREE.BufferGeometry();
const flyflierCount = 30;
const positionArr = new Float32Array(flyflierCount * 3);
const scaleArr = new Float32Array(flyflierCount);

for (let i = 0; i < positionArr.length; i++) {
  positionArr[i * 3 + 0] = (Math.random() - 0.5) * 4;
  positionArr[i * 3 + 1] = Math.random() * 1.5;
  positionArr[i * 3 + 1] = (Math.random() - 0.5) * 4;

  scaleArr[i] = Math.random();
}
particleGeomtery.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArr, 3)
);

particleGeomtery.setAttribute("aScale", new THREE.BufferAttribute(scaleArr, 1));

// const flierflyMaterial = new THREE.PointsMaterial({
//   size: 0.1,
//   sizeAttenuation: true,
// });

const fireflyMaterial = new THREE.ShaderMaterial({
  vertexShader: fireflyShaderVertex,
  fragmentShader: fireflyShaderFragment,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms: {
    uPixelRatio: {
      value: Math.min(window.devicePixelRatio, 2),
    },
    uFireflySize: {
      value: 40,
    },
    uTime: {
      value: 0,
    },
  },
});

const fliers = new THREE.Points(particleGeomtery, fireflyMaterial);
scene.add(fliers);
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
  renderer.outputEncoding = THREE.sRGBEncoding; // color normalisation output

  fireflyMaterial.uniforms.uPixelRatio.value = Math.min(
    window.devicePixelRatio,
    2
  );
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
debugObj.clearColor = "#ff0000";

gui.addColor(debugObj, "clearColor").onChange(() => {
  renderer.setClearColor(debugObj.clearColor);
});

gui
  .add(fireflyMaterial.uniforms.uFireflySize, "value")
  .max(500)
  .min(0)
  .step(1)
  .name("uSize");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  fireflyMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
