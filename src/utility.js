import * as THREE from "three";

import html2canvas from "html2canvas";

function updateCanvas(textureDiv, material) {
    html2canvas(textureDiv,{
        scale:window.devicePixelRatio,
        useCORS: true
    }).then(canvas => {
      
        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        // Update the material's texture
        if (material.map) material.map.dispose();
        material.map = texture;
        material.map.minFilter = THREE.LinearFilter;
        material.needsUpdate = true;
    });
}

function getObjectarray(scene){
    const array = [];
    array.push(scene.getObjectByName("monitorbody"));
    array.push(scene.getObjectByName("newscreen"));
    array.push(scene.getObjectByName("chairbase"));
    array.push(scene.getObjectByName("pcCabinet"));
    return array;
}

async function animate_chair(chair){
            let factor = 1;
            let dt = 1000.0/144;
            let t = 0.0;
            const frequency = 2.0*Math.PI/4000;
            const amplitude = Math.PI/4.0
    setInterval(()=>{
        if (chair.rotation.y >= amplitude){
            factor = -1;
        }
        else if(chair.rotation.y <= -amplitude){
            factor = 1;
        }
        t += dt*factor;
        chair.rotation.y = (amplitude) *Math.sin(frequency*t);
    }, 1000.0/144);
}

function onIntersect(raycaster, objects){
  const intersects = raycaster.intersectObjects( objects );

for ( let i = 0; i < intersects.length; i ++ ) {
//for later

  console.log(intersects[i].object.name);
  }
}

export{
    updateCanvas,  onIntersect, getObjectarray, animate_chair
}