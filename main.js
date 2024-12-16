import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 50);
pointLight.position.set(0, 5, 5);
pointLight.castShadow = true;
scene.add(pointLight);

const mtlLoader = new MTLLoader();
mtlLoader.load(
  "./textures/bottle/14042_750_mL_Wine_Bottle_r_v1_L3.mtl",
  (materials) => {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      "./textures/bottle/14042_750_mL_Wine_Bottle_r_v1_L3.obj",
      (object) => {
        object.scale.set(1, 1, 1);
        object.position.set(0, 0, 0);
        object.castShadow = true;

        scene.add(object);
      },
      undefined,
      (error) => {
        console.error("Error loading the OBJ model:", error);
      }
    );
  },
  (error) => {
    console.error("Error loading the MTL file:", error);
  }
);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 5, 10);
controls.update();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
