import {Group, Scene, Raycaster, Vector2} from 'three';
import {Renderer}from './lib/Renderer.js'
import {load} from './lib/loader.js';
import { Camera } from './lib/Camera.js';
import {animate_chair, create_css3d, create_controls} from './lib/utility.js';


//initialize
const root = new Group();
const container = document.querySelector("div.container");
const scene = new Scene();
const raycastingObjects = await load(root);
scene.add(root);

console.log(scene);

const chair = root.getObjectByName('chairbase_raycast');
const screen = root.getObjectByName('monitorscreen');
screen.removeFromParent();

//css3d renderer object
const object = create_css3d('div', screen);
console.log(object);
scene.add(object);
// raycastingObjects.push(object.mesh);
  

//camera
const camera = new Camera(container);

//raycaster
// const raycaster = new CustomRaycaster();
// const pointer = new Vector2(-2, -2);

//renderer
const renderer = new Renderer(container, scene, raycastingObjects, camera.cameraObject, {alpha: true, antialias:false, powerPreference: "high-performance"});


//resize
window.addEventListener('resize', ()=>{
  renderer.update();
  camera.update();
});

//orbitcontrols
const controls = create_controls(camera.cameraObject, renderer.webglElement);

//mousemove
// document.addEventListener('mousemove', event=>{
//   pointer.x = ( event.clientX / container.clientWidth ) * 2 - 1;
// 	pointer.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
//   raycaster.setFromCamera( pointer, camera.cameraObject);
//   onIntersect(raycaster, raycastingObjects);
// });

//render
function render(){
  controls.update();
  animate_chair(chair, renderer);
  renderer.render();
}
renderer.setAnimationLoop(render);