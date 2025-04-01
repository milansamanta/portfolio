import { WebGLRenderer } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import {Composer} from "./Postprocessing.js"

export class Renderer {
    constructor(container, scene, objects, camera, _object = {}) {
        this.container = container;
        this.scene = scene;
        this.camera = camera;
        this.webglrenderer = new WebGLRenderer(_object);
        this.cssrenderer = new CSS3DRenderer();
        this.document = document;
        this.webglElement = this.webglrenderer.domElement;
        this.cssElement = this.cssrenderer.domElement;
        document.querySelector("#webgl").appendChild(this.webglElement);
        this.webglrenderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
        document.querySelector("#css3d").appendChild(this.cssElement);
        this.composer = new Composer(scene, camera, this.webglrenderer,objects);
        this.update();
    }
    update() {
        this.cssrenderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.webglrenderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.composer.update();
    }
    render(){
        this.cssrenderer.render(this.scene, this.camera);
        this.composer.render();
    }
    setAnimationLoop(func){
        this.webglrenderer.setAnimationLoop(func);
    }
}
