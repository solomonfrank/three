import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
<<<<<<< HEAD
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
=======
>>>>>>> fd19f0c32c96fe153ced71f14e2f78734a4e09e4
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

<<<<<<< HEAD
// model

// const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
// gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load("/models/Fox/glTF/Fox.gltf", (gltf) => {
  console.log("Loaded", gltf);
  gltf.scene.scale.set(0.025, 0.025, 0.025);
  scene.add(gltf.scene);

  // const children = [...gltf.scene.children];

  // for (let child of children) {
  //   scene.add(child);
  // }
});
// gltfLoader.load(
//   "/models/FlightHelmet/glTF/FlightHelmet.gltf",
//   (gltf) => {
//     console.log(gltf);
//     // while (gltf.scene.children.length) {
//     //   console.log("Entered");
//     //   scene.add(gltf.scene.children[0]);
//     // }
//   },
//   () => {},
//   (err) => {
//     console.log(err);
//   }
// );

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

=======
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
>>>>>>> fd19f0c32c96fe153ced71f14e2f78734a4e09e4
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
<<<<<<< HEAD
camera.position.set(2, 2, 2);
=======
camera.position.z = 3;
>>>>>>> fd19f0c32c96fe153ced71f14e2f78734a4e09e4
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
<<<<<<< HEAD
controls.target.set(0, 0.75, 0);
=======
>>>>>>> fd19f0c32c96fe153ced71f14e2f78734a4e09e4
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

<<<<<<< HEAD
  // Update controls
  controls.update();
=======
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = particleGeometry.attributes.position.array[i3];
    particleGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x
    );
  }
>>>>>>> fd19f0c32c96fe153ced71f14e2f78734a4e09e4

  controls.update();

  // Render
  particleGeometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
