import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);

const materal = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, materal);

// mesh.position.z = -1;
// mesh.position.x = 3;
// mesh.position.y = -1;

// or
mesh.position.set(3, -1, -1);

scene.add(mesh);

const axesHelper = new THREE.AxesHelper();

scene.add(axesHelper);

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;

scene.add(camera);

// Render the scene

const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(size.width, size.height);

// let time = Date.now();

const time = new THREE.Clock();

const moveX = () => {
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;

  // time = currentTime;
  const elapsed = time.getElapsedTime();
  console.log("elapsed", elapsed)
  mesh.rotation.y = time.getElapsedTime();

  renderer.render(scene, camera);

  requestAnimationFrame(moveX);
};

moveX();
