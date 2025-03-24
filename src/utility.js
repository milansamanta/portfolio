import * as THREE from "three";


import html2canvas from "html2canvas";

function updateCanvas(textureDiv, material) {
    html2canvas(textureDiv,{
        scale:window.devicePixelRatio,
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

export{
    updateCanvas,  onIntersect, animate_chair
}