import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as dat from "dat.gui";

// // debugger
// const gui = new dat.GUI({ closed: true });

// //loading texture 1

// // const image = new Image();

// // const texture = new THREE.Texture(image);

// // image.onload = () => {
// //   texture.needsUpdate = true;
// // };

// // image.src = "/textures/door/color.jpg";

// const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("start");
// };

// loadingManager.onLoad = () => {
//   console.log("loaded");
// };

// loadingManager.onProgress = (e) => {
//   console.log("Porgress", e);
// };

// const textureLoader = new THREE.TextureLoader(loadingManager);
// const texture = textureLoader.load("/textures/door/color.jpg");

// const scene = new THREE.Scene();
// // const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2);
// // const geometry = new THREE.BufferGeometry();
// // const count = 100;

// // const positionArr = new Float32Array(count * 3 * 3); //  [x, y, z, x, y, z]
// // console.log("position before", positionArr);
// // for (let i = 0; i < count * 3 * 3; i++) {
// //   positionArr[i] = (Math.random() - 0.5) * 4;
// // }

// // console.log("position", positionArr);

// // const positionArribute = new THREE.BufferAttribute(positionArr, 3);

// // geometry.setAttribute("position", positionArribute);

// // const materal = new THREE.MeshBasicMaterial({
// //   map: texture,
// //   wireframe: true,
// // });
// // const mesh = new THREE.Mesh(geometry, materal);

// // mesh.position.z = -1;
// // mesh.position.x = 3;
// // mesh.position.y = -1;

// // or
// // mesh.position.set(3, -1, -1);
// // scene.add(mesh);

// // const material = new THREE.MeshNormalMaterial();

// const material = new THREE.MeshStandardMaterial();
// material.roughness = 0.45;
// material.metalness = 0.65;

// const sphereMesh = new THREE.Mesh(
//   new THREE.SphereBufferGeometry(0.5, 16, 16),
//   material
// );

// sphereMesh.position.z = 3;

// scene.add(sphereMesh);

// gui
//   .add(sphereMesh.position, "y", -3, 3, 0.01)
//   .min(-3)
//   .max(3)
//   .step(0.01)
//   .name("elevation");

// gui.add(sphereMesh, "visible");

// gui.add(material, "wireframe");

// const parameters = {
//   color: 0xff0000,
//   spin: () => {
//     gsap.to(sphereMesh.rotation, { y: "+=45" });
//   },
// };

// gui.addColor(parameters, "color").onChange(() => {
//   material.color.set(parameters.color);
// });

// gui.add(parameters, "spin");
// // gui.add(mesh.position, "x", -3, 3, 0.01);
// // gui.add(mesh.position, "z", -3, 3, 0.01);
// // const axesHelper = new THREE.AxesHelper();

// // scene.add(axesHelper);

// const size = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// const cursor = {
//   x: 0,
//   y: 0,
// };

// window.addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX / size.width - 0.5;
//   cursor.y = -(e.clientY / size.height - 0.5);
// });

// const camera = new THREE.PerspectiveCamera(
//   75,
//   size.width / size.height,
//   0.01,
//   100
// );
// camera.position.z = 3;
// // camera.position.z = 2;
// // camera.position.x = 2;

// camera.lookAt(sphereMesh.position);
// scene.add(camera);

// // controls
// const canvas = document.querySelector(".webgl");
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// // Render the scene

// const renderer = new THREE.WebGLRenderer({ canvas });

// renderer.setSize(size.width, size.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// window.addEventListener("resize", () => {
//   size.width = window.innerWidth;
//   size.height = window.innerHeight;

//   camera.aspect = size.width / size.height;
//   camera.updateProjectionMatrix();

//   renderer.setSize(size.width, size.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// window.addEventListener("dblclick", (event) => {
//   console.log(document.fullscreenElement);
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullscreenElement; // for safari user we add webkit

//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else {
//       canvas.webkitRequestFullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else {
//       document.webkitExitFullscreen();
//     }
//   }
// });

// const clock = new THREE.Clock();

// const moveX = () => {
//   // const elapsed = clock.getElapsedTime();
//   // camera.position.y = cursor.y * 2;
//   // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
//   // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;

//   // camera.lookAt(mesh.position);

//   controls.update();

//   renderer.render(scene, camera);

//   requestAnimationFrame(moveX);
// };

// moveX();

const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Frontend Developer", {
    font: font,
    size: 0.5,
    height: 0.2,
    bevelEnabled: true,
    curveSegments: 4,
    bevelThickness: 0.03,
    bevelSegments: 2,
    bevelOffset: 0,
    bevelSize: 0.02,
  });

  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = matcapTexture;
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);

  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  // );

  textGeometry.center();
  console.log(textGeometry.boundingBox);

  scene.add(textMesh);

  console.time("donut");

  for (let i = 0; i < 100; i++) {
    const donutGeometry = new THREE.TorusBufferGeometry(0.35, 0.2, 20, 45);
    const donutmaterial = new THREE.MeshMatcapMaterial();
    donutmaterial.matcap = matcapTexture;
    const donutMesh = new THREE.Mesh(donutGeometry, donutmaterial);
    donutMesh.position.x = (Math.random() - 0.5) * 10;
    donutMesh.position.y = (Math.random() - 0.5) * 10;
    donutMesh.position.z = (Math.random() - 0.5) * 10;

    donutMesh.rotation.x = Math.random() * Math.PI;
    donutMesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();

    donutMesh.scale.set(scale, scale, scale);
    scene.add(donutMesh);
  }

  console.timeEnd("donut");
});

// axes helper

// const axesHelper = new THREE.AxesHelper();

// scene.add(axesHelper);

// object creation
// const geometry = new THREE.BoxGeometry(1, 1, 1);

// const material = new THREE.MeshBasicMaterial();
// const cubeMesh = new THREE.Mesh(geometry, material);

// scene.add(cubeMesh);

// camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);

// camera.position.z = 2;
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;

scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGL1Renderer({ canvas });

renderer.setSize(size.width, size.height);

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;

  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});
