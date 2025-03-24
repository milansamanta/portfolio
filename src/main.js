import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

import {load} from './loader.js';
import {updateCanvas, animate_chair, onIntersect} from './utility.js';

//initialize
const container = document.querySelector("div.container");
const scene = new THREE.Scene();
const raycastingObjects = await load(scene);
const chair = scene.getObjectByName('chairbase_raycast');
const screen = scene.getObjectByName('monitorscreen');
const div = document.querySelector('div.screen');
screen.removeFromParent();
console.log(screen);


//css3d renderer object
const box = new THREE.Box3().setFromObject(screen);
const size = new THREE.Vector3();

box.getSize(size);

console.log(screen);
console.log(div);
div.style.width = `${size.x * 100}px`;
div.style.height = `${(size.y * 100)+5}px`;
const object = new CSS3DObject(div);
console.log(object);
object.position.copy(screen.position);

object.scale.set(
  size.x / object.element.offsetWidth,
  size.y / object.element.offsetHeight,
);
scene.add(object);


// new monitor screen
const planeGeom = new THREE.PlaneGeometry(size.x, size.y);
const monitor = new THREE.Mesh(planeGeom);
monitor.position.copy(screen.position);
const material = monitor.material;
monitor.name = 'newscreen_raycast_pointer';
scene.add(monitor)
raycastingObjects.push(monitor);
console.log(raycastingObjects);


//camera
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth/container.clientHeight,
  .01,
  200
)
camera.position.z = 5;

//canvas and orbit controls
const canvas = document.querySelector('canvas.cnv');
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-2, -2);

//renderer
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, preserveDrawingBuffer:true})
renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));

renderer.setSize(container.clientWidth, container.clientHeight);


//cssrenderer
const cssrenderer = new CSS3DRenderer({element: document.querySelector('div.css3d')});
container.appendChild(cssrenderer.domElement);
cssrenderer.setSize(container.clientWidth, container.clientHeight);

//resize
window.addEventListener('resize', ()=>{
  renderer.setSize(container.clientWidth, container.clientHeight);
  cssrenderer.setSize(container.clientWidth, container.clientHeight);
  
  camera.aspect = container.clientWidth/container.clientHeight;
  camera.updateProjectionMatrix()
});


document.addEventListener('mousemove', event=>{
  pointer.x = ( event.clientX / container.clientWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
});


function render(){
  controls.update();
  // cssrenderer.render(scene,camera);
  renderer.render(scene, camera);
  updateCanvas(div, material);
  raycaster.setFromCamera( pointer, camera );
  onIntersect(raycaster,raycastingObjects);
}
animate_chair(chair);
renderer.setAnimationLoop(render);