import {Group, MeshBasicMaterial, NoBlending, Mesh, PlaneGeometry, Vector3, Box3} from 'three';
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

const frequency = 2 * Math.PI / 20000;
const amplitude = Math.PI / 4.0;
const startTime = performance.now();
async function animate_chair(chair) {
    chair.rotation.y = amplitude * Math.sin(frequency * (performance.now() - startTime));   
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


function create_css3d(type, object) {
    const obj = new Group();
    const size = getSize(object);
    const element = document.createElement( type );
    const aspect = size.x/size.y;
    element.style.width = aspect*1080 +'px';
    element.style.height =  1080+'px';
    element.style.opacity = 1;
    element.classList.add('screen');
    element.innerHTML = '<iframe src="/iframe/index.html" title="OS" class="frame">Not Found</iframe>';
    const css3dObject = new CSS3DObject(element);
    css3dObject.scale.set(size.x/(aspect*1080), size.y/1080);
    obj.css3dObject = css3dObject;
    obj.add(css3dObject);
    
    console.log(css3dObject.element);
    var material = new MeshBasicMaterial({
        opacity	: 0,
        transparent: true,
        color	: 'black',
        blending: NoBlending,
    });
    const geometry = new PlaneGeometry( size.x, size.y);
    const mesh = new Mesh(geometry, material);
    mesh.name = 'newmonitor';
    obj.mesh = mesh;
    obj.position.copy(object.position);
    console.log(obj.css3dObject.rotation);
    obj.add( mesh );
    return obj;
}


function getSize(object){
    const size = new Vector3();
    const box = new Box3().setFromObject(object);
    box.getSize(size);
    return size;
}

var isMouseDown = false;
var clickTimeout;

function detect_click(onclick = function (){}){
    document.addEventListener("mousedown", () => {
        isMouseDown = true;
        
        clickTimeout = setTimeout(() => {
            isMouseDown = false;
        }, 200);
    });
    
    document.addEventListener("mouseup", () => {
        if (isMouseDown) {
            clearTimeout(clickTimeout);
            onclick();
        }
        isMouseDown = false;
    });
}


export{
    onIntersect, animate_chair, create_css3d, getSize, detect_click
}