import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera{
    constructor(container, fov = 78, near = 0.01, far = 2000){
        super(
            fov,
            container.clientWidth/container.clientHeight,
            near,
            far
        );
        this.container = container;
        this.position.z = 5;
    }
    update(){
        this.aspect = this.container.clientWidth/this.container.clientHeight;
        this.updateProjectionMatrix();
    }

}