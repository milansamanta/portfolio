import * as THREE from "three";
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { OrbitControls } from "./OrbitControls.js";



async function animate_chair(chair) {
    const frequency = 2 * Math.PI / 10000;
    const amplitude = Math.PI / 4.0;
    const startTime = performance.now();

    function update(){
        chair.rotation.y = amplitude * Math.sin(frequency * (performance.now() - startTime));
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


function create_css3d(type, size, position) {
    const obj = new THREE.Group();

    const element = document.createElement( type );
    element.style.width = size.x*100+'px';
    element.style.height = size.y*100+'px';
    element.style.opacity = 1;
    element.classList.add('screen');

    const css3dObject = new CSS3DObject( element )
    css3dObject.scale.set(.01, .01);
    obj.css3dObject = css3dObject;
    obj.add(css3dObject);
    
    console.log(css3dObject.element);
    var material = new THREE.MeshBasicMaterial({
        opacity	: 0,
        color	: 'black',
        blending: THREE.NoBlending,
        side	: THREE.DoubleSide,
    });
    const geometry = new THREE.PlaneGeometry( size.x, size.y );
    const mesh = new THREE.Mesh( geometry, material );
    mesh.name = 'newmonitor_raycast_pointer';
    obj.mesh = mesh;
    obj.position.copy(position);
    obj.add( mesh );

    return obj
}

function create_controls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);
    controls.maxDistance = 10;
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI/2;
    controls.minAzimuthAngle = -Math.PI/10.5;
    controls.maxAzimuthAngle = Math.PI/2 + Math.PI/12;
    return controls;
}


export{
    onIntersect, animate_chair, create_css3d, create_controls
}