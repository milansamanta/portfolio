import * as THREE from 'three';
import { CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js';

import {load} from './loader.js';
import {animate_chair, onIntersect, create_css3d, create_controls} from './utility.js';

//initialize
const root = new THREE.Group();
const container = document.querySelector("div.container");
var scene = new THREE.Scene();
const raycastingObjects = await load(root);
scene.add(root);

console.log(scene);

const chair = root.getObjectByName('chairbase_raycast');
const screen = root.getObjectByName('monitorscreen');
console.log(screen);


//css3d renderer object
const box = new THREE.Box3().setFromObject(screen);
const size = new THREE.Vector3();

box.getSize(size);

const object = create_css3d('div', size, screen.position);
scene.add(object);
raycastingObjects.push(object.mesh);
  

//camera
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth/container.clientHeight,
  .01,
  200
)
camera.position.z = 5;

//canvas and orbitcontrols
const canvas = document.querySelector('canvas.cnv');
const controls = create_controls(camera, canvas);
// controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(-2, -2);

//renderer
const renderer = new THREE.WebGLRenderer({canvas:canvas, alpha: true, antialias:true})
renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));

renderer.setSize(container.clientWidth, container.clientHeight);


//cssrenderer
const cssrenderer = new CSS3DRenderer();
document.querySelector("#css3d").appendChild(cssrenderer.domElement);
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
  cssrenderer.render(scene,camera);
  renderer.render(scene, camera);
  raycaster.setFromCamera( pointer, camera );
  onIntersect(raycaster,raycastingObjects);
  // console.log(camera.rotation.y);
}
object.css3dObject.element.textContent = "404 Not Found";
animate_chair(chair);
renderer.setAnimationLoop(render);