import { WebGLRenderer, Vector2 } from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { container, css } from "./Constants.js";
import { Experience } from "./Experience.js";

export class Renderer {
    constructor(_options = {}) {
        this.webglrenderer = new WebGLRenderer(_options);
        this.cssrenderer = new CSS3DRenderer();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.raycastingObjects = this.experience.raycastingObjects;
        this.raycaster = this.experience.raycasterer;
        this.webglElement = this.webglrenderer.domElement;
        this.cssElement = this.cssrenderer.domElement;
        this.webglrenderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
        css.appendChild(this.cssElement);
        this.initComposer();
        this.update();
        
    }
   
    initComposer(){
        this.composer = new EffectComposer(this.webglrenderer);
  
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        this.outlinePass = new OutlinePass(new Vector2(container.clientWidth, container.clientHeight), this.scene, this.camera);
        this.outlinePass.edgeStrength = 3;
        this.outlinePass.edgeGlow = 1.5;
        this.outlinePass.edgeThickness = 2;
        this.outlinePass.pulsePeriod = 0;
        this.outlinePass.visibleEdgeColor.set(0xffffff);
        this.outlinePass.hiddenEdgeColor.set(0xffffff);
        this.composer.addPass(this.outlinePass);
        this.outlinePass.selectedObjects = [];
        //gammapass
        this.gammapass = new ShaderPass(GammaCorrectionShader);
        this.composer.addPass(this.gammapass);
        // SMAA Shader Pass
        this.smaapass = new SMAAPass();
        this.composer.addPass(this.smaapass);
        document.addEventListener('mousemove',(event)=> this.onMouseMove(event));
    }

    
      // Handle resize event
      update() {
        this.webglrenderer.setSize(container.clientWidth, container.clientHeight);
        this.cssrenderer.setSize(container.clientWidth, container.clientHeight);
        this.composer.setSize(container.clientWidth, container.clientHeight);
      }
    
      render() {
        this.composer.render();
        this.cssrenderer.render(this.scene, this.camera);
        if(this.outlinePass.selectedObjects.length > 0 && !this.raycaster.enabled){
          this.outlinePass.selectedObjects = [];
        }
      }
      onMouseMove(event){
        if(this.raycaster.intersectedObjects.length > 0 && this.raycaster.intersectedObjects[0].object.name.includes('pointer')){
          this.outlinePass.selectedObjects = [this.raycaster.intersectedObjects[0].object]
        }
        else{
          this.outlinePass.selectedObjects = [];
        }
      }
}

