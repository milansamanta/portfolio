import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

export class Renderer {
    constructor(container, _object = {}) {
        this.container = container;
        this.webglrenderer = new WebGLRenderer(_object);
        this.cssrenderer = new CSS3DRenderer();
        this.document = document;
        this.webglElement = this.webglrenderer.domElement;
        this.cssElement = this.cssrenderer.domElement;
        document.querySelector("#webgl").appendChild(this.webglElement);
        this.webglrenderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
        document.querySelector("#css3d").appendChild(this.cssElement);
        this.update();
    }
    update() {
        this.cssrenderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.webglrenderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
    render(scene, camera){
        this.cssrenderer.render(scene, camera);
        this.webglrenderer.render(scene, camera);
    }
    setAnimationLoop(func){
        this.webglrenderer.setAnimationLoop(func);
    }
}
