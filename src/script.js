import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { BufferAttribute } from "three";

const scene = new THREE.Scene();

// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2);

const geometry = new THREE.BufferGeometry();

const count = 100;

const positionArr = new Float32Array(count * 3 * 3); //  [x, y, z, x, y, z]
console.log("position before", positionArr);
for (let i = 0; i < count * 3 * 3; i++) {
  positionArr[i] = (Math.random() - 0.5) * 4;
}

console.log("position", positionArr);

const positionArribute = new THREE.BufferAttribute(positionArr, 3);

geometry.setAttribute("position", positionArribute);

const materal = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, materal);

// mesh.position.z = -1;
// mesh.position.x = 3;
// mesh.position.y = -1;

// or
// mesh.position.set(3, -1, -1);
scene.add(mesh);

// const axesHelper = new THREE.AxesHelper();

// scene.add(axesHelper);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / size.width - 0.5;
  cursor.y = -(e.clientY / size.height - 0.5);
});

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.01,
  100
);
camera.position.z = 3;
// camera.position.z = 2;
// camera.position.x = 2;

camera.lookAt(mesh.position);
scene.add(camera);

// controls
const canvas = document.querySelector(".webgl");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render the scene

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", (event) => {
  console.log(document.fullscreenElement);
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement; // for safari user we add webkit

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }
});

const clock = new THREE.Clock();

const moveX = () => {
  // const elapsed = clock.getElapsedTime();
  // camera.position.y = cursor.y * 2;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;

  // camera.lookAt(mesh.position);

  controls.update();

  renderer.render(scene, camera);

  requestAnimationFrame(moveX);
};

moveX();
