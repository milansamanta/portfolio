import {TextureLoader, SRGBColorSpace, MeshBasicMaterial, LinearFilter, MeshPhysicalMaterial, CubeTextureLoader, DoubleSide} from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import {getSize} from './utility.js'

const textureLoader = new TextureLoader();
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath( '/draco/' );

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

const textureMap = {
    books: "/textures/books.webp",
    chair: "/textures/chair.webp",
    ps5: "/textures/ps5.webp",
    table: "/textures/table.webp",
    headphone: "/textures/headphone.webp",
    lamp: "/textures/lamp.webp",
    monitorbase: "/textures/monitor.webp",
    monitorscreen: "/textures/monitorScreen.webp",
    pc: "/textures/pc.webp",
    witcher: "/textures/pictures.webp",
    plant1: "/textures/plant1.webp",
    plant2: "/textures/plant2.webp",
    plant3: "/textures/plant3.webp",
    ps5: "/textures/ps5.webp",
    projecter: "/textures/others.webp",
    sofa: "/textures/sofa.webp",
    walls: "/textures/walls.webp",
    back: "/textures/back.webp",
  };

  const envmap = new CubeTextureLoader()
  .setPath( '/textures/envmap' )
	.load([
    'px.webp',
    'nx.webp',
    'py.webp',
    'ny.webp',
    'pz.webp',
    'nz.webp'
  ]);

const glassMaterial = new MeshPhysicalMaterial({
  transparent:true,
  transmission: 1,
  sheenColor: 0xffffff
  });


function load(group) {

    return new Promise((resolve, reject) =>{

        const loadedTextures = {};
        const raycastobjects = [];

        Object.entries(textureMap).forEach(([key, value]) => {
            const texture = textureLoader.load(value);
            texture.flipY = false;
            texture.colorSpace = SRGBColorSpace;
            loadedTextures[key] = texture;
          });

        loader.load( '/models/portfolio.glb', function (glb){
            const model = glb.scene;
            model.traverse((child)=>{
              if(child.isMesh){
                Object.keys(textureMap).forEach((key)=>{
                  if(child.name.includes(key)){
                    const material = new MeshBasicMaterial({
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
                child.material.map.minFilter = LinearFilter;
              }
            });
              console.log(model);
              group.add(model);
              const glassObject = group.getObjectByName('glass');
              const size = getSize(glassObject);
              console.log(size);
              // glassObject.material = glassMaterial;
              
              glassObject.removeFromParent();
              group.getObjectByName('monitorbase_raycast_pointer').material.side = DoubleSide;

              resolve(raycastobjects);

            }, undefined, function ( error ) {
	            console.error( error );
              reject(error);
            });
    });

}


export {
    load
}
