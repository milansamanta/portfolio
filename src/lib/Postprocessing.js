import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader.js";
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { Vector2 } from "three";
import { Experience } from "./Experience";
import { container } from "./Constants";




export class Composer{
    constructor() {
      this.experience = new Experience();
      console.log(this.experience);
      
      this.renderer = this.experience.renderer.webglrenderer;
      this.scene = this.experience.scene;
      this.camera = this.experience.camera;
      this.controls = this.experience.controls;
      this.raycaster = this.experience.raycasterer;
  
      this.composer = new EffectComposer(this.renderer);
  
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);

      const gammaPass = new ShaderPass(GammaCorrectionShader);
      this.composer.addPass(gammaPass);

      // OutlinePass Setup
      this.outlinePass = new OutlinePass(new Vector2(container.clientWidth, container.clientHeight), this.scene, this.camera);
      this.outlinePass.edgeStrength = 4;
      this.outlinePass.edgeGlow = 1.5;
      this.outlinePass.edgeThickness = 2;
      this.outlinePass.pulsePeriod = 0;
      this.outlinePass.visibleEdgeColor.set(0xffffff);
      this.outlinePass.hiddenEdgeColor.set(0xffffff);
      this.composer.addPass(this.outlinePass);
      this.outlinePass.selectedObjects = [];

      // FXAA Shader Pass
      this.fxaaPass = new ShaderPass(FXAAShader);
      this.updateResolution();
      this.fxaaPass.renderToScreen = true; 
      this.composer.addPass(this.fxaaPass);
      document.addEventListener('mousemove',(event)=> this.onMouseMove(event));
  
    }
  
    // 
    updateResolution() {
      const pixelRatio = this.renderer.getPixelRatio();
      this.fxaaPass.uniforms["resolution"].value.set(
        1 / (container.clientWidth * pixelRatio),
        1 / (container.clientHeight * pixelRatio)
      );
    }
  
    // Handle resize event
    update() {
      this.updateResolution();
      this.composer.setSize(container.clientWidth, container.clientHeight);
    }
  
    // Render the scene with FXAA
    render() {
      this.controls.update();
      this.composer.render();
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