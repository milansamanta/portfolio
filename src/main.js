import {Group, Scene, Raycaster, Vector2} from 'three';
import {Renderer}from './lib/Renderer.js'
import {load} from './lib/loader.js';
import { Camera } from './lib/Camera.js';
import {animate_chair, onIntersect, create_css3d, create_controls, getSize} from './lib/utility.js';

//initialize
const root = new Group();
const container = document.querySelector("div.container");
var scene = new Scene();
const raycastingObjects = await load(root);
scene.add(root);

console.log(scene);

const chair = root.getObjectByName('chairbase_raycast');
const screen = root.getObjectByName('monitorscreen');

//css3d renderer object
const size = getSize(screen);
const object = create_css3d('div', size, screen.position);
scene.add(object);
raycastingObjects.push(object.mesh);
  

//camera
const camera = new Camera(container);

const raycaster = new Raycaster();
const pointer = new Vector2(-2, -2);

//renderer
const renderer = new Renderer(container, {alpha: true, antialias:true})


//resize
window.addEventListener('resize', ()=>{
  renderer.update();
  camera.update();
});

//orbitcontrols
const controls = create_controls(camera.cameraObject, renderer.webglElement);;

//mousemove
document.addEventListener('mousemove', event=>{
  pointer.x = ( event.clientX / container.clientWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
});

//render
function render(){
  controls.update();
  renderer.render(scene, camera.cameraObject);
  
  raycaster.setFromCamera( pointer, camera.cameraObject);
  onIntersect(raycaster, raycastingObjects);
}
animate_chair(chair);
renderer.setAnimationLoop(render);