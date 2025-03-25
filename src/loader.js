import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const textureLoader = new THREE.TextureLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath( '/draco/' );

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const textureMap = {
    books: "/textureset/books.webp",
    chair: "/textureset/chair.webp",
    controlers: "/textureset/controlers.webp",
    table1: "/textureset/desk1.webp",
    desk2: "/textureset/desk2.webp",
    headphones: "/textureset/headphone.webp",
    keyboard: "/textureset/keyboard.webp",
    lamp: "/textureset/lamp.webp",
    monitorbody: "/textureset/monitor.webp",
    monitorscreen: "/textureset/monitorScreen.webp",
    others: "/textureset/others.webp",
    pcCabinet: "/textureset/pc.webp",
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
function load(scene) {

    return new Promise((resolve, reject) =>{

        const loadedTextures = {};
        const raycastobjects = [];

        Object.entries(textureMap).forEach(([key, value]) => {
            const texture = textureLoader.load(value);
            texture.flipY = false;
            texture.colorSpace = THREE.SRGBColorSpace;
            loadedTextures[key] = texture;
          });

        loader.load( '/models/portfolio-v1.glb', function (glb){
            const model = glb.scene;
            model.traverse((child)=>{
              if(child.isMesh){
                Object.keys(textureMap).forEach((key)=>{
                  if(child.name.includes(key)){
                    const material = new THREE.MeshBasicMaterial({
                      map: loadedTextures[key]
                    });
                    child.material = material;
                  }
                });
              }
              if(child.name.includes("raycast")){
                raycastobjects.push(child);
              }
              if(child.material && child.material.map){
                child.material.map.minFilter = THREE.LinearFilter;
              }
            });
          
              scene.add(model);
              // console.log(scene);
              const glassObject = scene.getObjectByName('glass');
              // console.log(glassObject);
              const glassMaterial = new THREE.MeshPhysicalMaterial({
                color: 0x000000,
                transparent: true,
                opacity: 0.3,
                roughness: 0,
                transmission: 0.9, 
                thickness: 0.5,
                clearcoat: 1,
                clearcoatRoughness: 0,
                reflectivity: 0.8
              });
              glassObject.material = glassMaterial;

              resolve(raycastobjects);

            }, undefined, function ( error ) {
	            console.error( error );
            });
    });

}


export {
    load
}
