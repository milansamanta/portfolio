import * as THREE from "three";
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';


import html2canvas from "html2canvas";

function updateCanvas(textureDiv, material) {
    // html2canvas(textureDiv,{
    //     scale:window.devicePixelRatio,
    // }).then(canvas => {
      
    //     const texture = new THREE.CanvasTexture(canvas);
    //     texture.colorSpace = THREE.SRGBColorSpace;
    //     texture.needsUpdate = true;

    //     // Update the material's texture
    //     if (material.map) material.map.dispose();
    //     material.map = texture;
    //     material.map.minFilter = THREE.LinearFilter;
    //     material.needsUpdate = true;
    // });
}


async function animate_chair(chair) {
    const frequency = 2 * Math.PI / 10000;
    const amplitude = Math.PI / 4.0;
    const startTime = performance.now();

    function update() {
        const elapsed = performance.now() - startTime;
        chair.rotation.y = amplitude * Math.sin(frequency * elapsed);
        requestAnimationFrame(update);
    }
    update();
}

function onIntersect(raycaster, objects){
    
    const intersects = raycaster.intersectObjects( objects );

    if (intersects.length > 0){
        const currentintersect = intersects[0].object;
        if(currentintersect.name.includes("pointer")){
                document.body.style.cursor = "pointer";
        }
        else{
            document.body.style.cursor = "default";
        }
    }
    else {
        document.body.style.cursor = "default";  
    }
}


function create_css3d(element, width, height, position, object){
    // const obj = new THREE.Object3D();
    // element.style.opacity = 1;

    // const css3dObject = new CSS3DObject( element );

    // obj.css3dObject = css3dObject;
    // obj.add(css3dObject);
    // const material = new THREE.MeshBasicMaterial({
    //     opacity	: 0,
    //     color	: new THREE.Color( 0x111111 ),
    //     blending: THREE.NoBlending,
    //     side	: THREE.DoubleSide,
    // });
    // const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
    // obj.add(mesh);
    // obj.position.copy(position);
    // return obj;
}


export{
    updateCanvas,  onIntersect, animate_chair, create_css3d
}