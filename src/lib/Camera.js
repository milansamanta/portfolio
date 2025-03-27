import { PerspectiveCamera } from "three";

export class Camera{
    constructor(container, fov = 78, near = 0.01, far = 2000){
        this.cameraObject = new PerspectiveCamera(
            fov,
            container.clientWidth/container.clientHeight,
            near,
            far
        );
        this.fov = this.cameraObject.fov;
        this.container = container;
        this.near = this.cameraObject.near;
        this.far = this.cameraObject.far;
        this.cameraObject.position.z = 5;
    }
    update(){
        this.cameraObject.aspect = this.container.clientWidth/this.container.clientHeight;
        this.cameraObject.updateProjectionMatrix();
    }

}