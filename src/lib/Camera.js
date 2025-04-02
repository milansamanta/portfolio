import { PerspectiveCamera } from "three";
import { container } from "./Constants";

export class Camera extends PerspectiveCamera{
    constructor(fov = 78, near = 0.01, far = 2000){
        super(
            fov,
            container.clientWidth/container.clientHeight,
            near,
            far
        );
        this.position.z = 5;
    }
    update(){
        this.aspect = container.clientWidth/container.clientHeight;
        this.updateProjectionMatrix();
    }

}