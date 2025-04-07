import { Group, Scene } from "three";
import { container, css, webgl } from "./Constants";
import { load } from "./loader";
import { Camera } from "./Camera";
import { Renderer } from "./Renderer";
import { CustomRaycaster } from "./Raycaster";
import { CustomControls } from "./CustomControls";
import { animate_chair, create_css3d } from "./utility";

const root = new Group();
const raycastingObjects = await load(root);
const chair = root.getObjectByName('chairbase_raycast');
const monitor = root.getObjectByName('monitorscreen');
monitor.removeFromParent();
const cssObject = create_css3d('div', monitor);
root.add(cssObject);

export class Experience {
    static instance;
    constructor() {
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.container = container;
        this.webgl = webgl;
        this.css = css;
        this.root = root;
        this.raycastingObjects = raycastingObjects;
        this.camera = new Camera();
        this.scene = new Scene();
        this.scene.add(this.root);
        this.canvas = document.querySelector('canvas');
        this.create_controls();
        this.create_raycaster();
        this.create_renderer();
        window.addEventListener('resize', ()=>{this.update()});
         this.setAnimationLoop(this.animate.bind(this))
    }
    create_raycaster(){
        this.raycasterer = new CustomRaycaster();
    }
    create_renderer(){
        this.renderer = new Renderer({canvas: this.canvas, alpha:true, antialias: false, powerPreference: "high-performance"});
    }
    create_controls(){
        this.controls = new CustomControls(this.camera, this.canvas);
        console.log(this.controls)
    }
    animate(){
        this.controls.update();
        animate_chair(chair);
        this.renderer.render();
    }
    setAnimationLoop(func){
        this.renderer.webglrenderer.setAnimationLoop(func);
    }

    update(){
        this.camera.update();
        this.renderer.update();
    }
}