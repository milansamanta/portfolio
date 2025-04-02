import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Vector3 } from 'three';

const minpan = new Vector3(-1, -1, -1)
const maxpan = new Vector3(1, 5, 1)

export class CustomControls extends OrbitControls{
    constructor(camera, canvas = document.querySelector('canvas')){
        super(camera, canvas);
        this.minpan = new Vector3(-1, -1, -1);
        this.maxpan = new Vector3(1, 5, 1);
        
        this.maxDistance = 7;
        this.minDistance = -2;
        this.enableDamping = true;
        this.maxPolarAngle = Math.PI/2;
        this.minAzimuthAngle = -Math.PI/12;
        this.maxAzimuthAngle = Math.PI/2;
    }
    update( deltaTime = null ){
        super.update(deltaTime);
        this.target.clamp(minpan, maxpan);
    }
}