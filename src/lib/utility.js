import {Group, MeshBasicMaterial, NoBlending, DoubleSide, Mesh, PlaneGeometry, Vector3, Box3} from 'three'
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
    const obj = new Group();

    const element = document.createElement( type );
    const aspect = size.x/size.y;
    element.style.width = aspect*1080 +'px';
    element.style.height =  1080+'px';
    element.style.opacity = 1;
    element.classList.add('screen');
    element.innerHTML = '<iframe src="/iframe/index.html" title="OS" class="frame">Not Found</iframe>'

    const css3dObject = new CSS3DObject( element )
    css3dObject.scale.set(size.x/(aspect*1080), size.y/1080);
    obj.css3dObject = css3dObject;
    obj.add(css3dObject);
    
    console.log(css3dObject.element);
    var material = new MeshBasicMaterial({
        opacity	: 0,
        color	: 'black',
        blending: NoBlending,
        side	: DoubleSide,
    });
    const geometry = new PlaneGeometry( size.x, size.y );
    const mesh = new Mesh( geometry, material );
    mesh.name = 'newmonitor_raycast_pointer';
    obj.mesh = mesh;
    obj.position.copy(position);
    obj.add( mesh );

    return obj
}

function create_controls(camera, canvas){
    const controls = new OrbitControls(camera, canvas);
    controls.maxDistance = 7;
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI/2;
    controls.minAzimuthAngle = -Math.PI/9.5;
    controls.maxAzimuthAngle = Math.PI/2 + Math.PI/12;
    return controls;
}

function getSize(object){
    const size = new Vector3();
    const box = new Box3().setFromObject(object);
    box.getSize(size);
    return size;
}


export{
    onIntersect, animate_chair, create_css3d, create_controls, getSize
}