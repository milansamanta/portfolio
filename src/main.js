import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader();

const textureMap = {
  books: "/textureset/books.webp",
  chair: "/textureset/chair.webp",
  controlers: "/textureset/controlers.webp",
  table1: "/textureset/desk1.webp",
  table2: "/textureset/desk2.webp",
  headphones: "/textureset/headphone.webp",
  keyboard: "/textureset/keyboard.webp",
  lamp: "/textureset/lamp.webp",
  monitor: "/textureset/monitor.webp",
  monitorscreen: "/textureset/monitorScreen.webp",
  others: "/textureset/others.webp",
  pc: "/textureset/pc.webp",
  pcInside: "/textureset/pcInside.webp",
  witcher: "/textureset/pictures.webp",
  plant1: "/textureset/plant1.webp",
  plant2: "/textureset/plant2.webp",
  plant3: "/textureset/plant3.webp",
  ps5: "/textureset/playstation.webp",
  projecter: "/textureset/projector.webp",
  sofa1: "/textureset/sofa1.webp",
  sofa2: "/textureset/sofa2.webp",
  walls: "/textureset/wall&floor.webp",
};

const loadedTextures = {};
Object.entries(textureMap).forEach(([key, value]) => {
  const texture = textureLoader.load(value);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  loadedTextures[key] = texture;
});

const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath( '/draco/' );

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load( '/models/portfolio.glb', function (glb){
  const model = glb.scene;
  model.traverse((child)=>{
    if(child.isMesh){
      Object.keys(textureMap).forEach((key)=>{
        if(child.name === key){
          const material = new THREE.MeshBasicMaterial({
            map: loadedTextures[key]
          });
          child.material = material;
        }
      })
    }
    if(child.material && child.material.map){
      child.material.map.minFilter = THREE.LinearFilter;
    }
  });
  model.position.set(0, -2, 0);
	scene.add(model);
}, undefined, function ( error ) {
	console.error( error );
});



const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth/window.innerHeight,
  1,
  200
)
camera.position.z = -5;
camera.position.x = 2;

const canvas = document.querySelector('canvas.cnv')
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix()
});

document.addEventListener('mousemove', event=>{
  pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
})

function render(){
  controls.update()
  renderer.render(scene, camera)
}
renderer.setAnimationLoop(render)