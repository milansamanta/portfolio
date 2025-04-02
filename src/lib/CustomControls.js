import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Vector3 } from 'three';


export class CustomControls extends OrbitControls{
    constructor(camera, canvas = document.querySelector('canvas')){
        super(camera, canvas);
        const minpan = new Vector3(-1, -1, -1);
        const maxpan = new Vector3(1, 5, 1);
        this.target.clamp(minpan, maxpan);
        this.maxDistance = 7;
        this.minDistance = -2;
        this.enableDamping = true;
        this.maxPolarAngle = Math.PI/2;
        this.minAzimuthAngle = -Math.PI/12;
        this.maxAzimuthAngle = Math.PI/2;
    }
}