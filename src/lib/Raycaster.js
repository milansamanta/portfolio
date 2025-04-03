import { Raycaster, Vector2, Vector3 } from "three";
import gsap from "gsap"
import { Experience } from "./Experience";
import { container, css, webgl, button } from "./Constants";
import { detect_click } from "./utility";

export class CustomRaycaster extends Raycaster{
    constructor(){
        super();
        this.enabled = true;
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.intersectedObjects = [];
        this.objects = this.experience.raycastingObjects;
        this.pointer = new Vector2(-2, -2);
        this.controls = this.experience.controls;
        this.prevposition = new Vector3();
        this.prevtarget = new Vector3();
        
        document.addEventListener('mousemove', event => this.onMouseMove(event));
        detect_click(this.onClick.bind(this));
        button.addEventListener('click', ()=>{
            this.flyback();
        })
    }

    onMouseMove(event){
        
        this.pointer.x = ( event.clientX / container.clientWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
        if (this.enabled){
            this.setFromCamera( this.pointer, this.camera);
            this.onIntersect();
        }
    }
    onIntersect(){
        this.intersectedObjects = this.intersectObjects( this.objects, true);
        if (this.intersectedObjects.length > 0){
            const currentintersect = this.intersectedObjects[0].object;
            if(currentintersect.name.includes("pointer")){
                document.body.style.cursor = "pointer";
            }
            else{
                document.body.style.cursor = "default";
            }
        }
        else {
            document.body.style.cursor = "default";
        }
    }
    
    onClick(event){
        if (this.intersectedObjects.length > 0){
            const currentintersect = this.intersectedObjects[0].object;
            
            if (currentintersect.name.includes('monitor')){
                
                this.flyto(currentintersect)
                
            }
            else if(currentintersect.name.includes('github')){
                window.open('https://github.com/milansamanta', '_blank');
            }
            else if(currentintersect.name.includes('linkedin')){
                window.open('https://www.linkedin.com/in/milan-samanta-b17686290/', '_blank');
            }
        }
    }
    flyback(){
        this.resetScreen();
        console.log(this.prevposition);
        console.log(this.prevtarget);
        gsap.to(this.camera.position, {
            x: this.prevposition.x,
            y: this.prevposition.y,
            z: this.prevposition.z,
            duration: 2,
        });
        gsap.to(this.controls.target, {
            x: this.prevtarget.x,
            y: this.prevtarget.y,
            z: this.prevtarget.z,
            duration: 2,
            onComplete: ()=>{
                this.camera.lookAt(this.prevtarget);
                this.controls.enabled = true;
                this.enabled = true;
            }
        });
    }

    flyto(currentintersect){
        this.controls.enabled = false;
        this.enabled = false;
        this.intersectedObjects = [];
        document.body.style.cursor = 'default';
        this.prevposition.copy(this.camera.position);
        this.prevtarget.copy(this.controls.target);
        console.log(this.prevposition);
        console.log(this.prevtarget);
        gsap.to(this.camera.position, {
            x: currentintersect.position.x,
            y: currentintersect.position.y,
            z: currentintersect.position.z+.7,
            duration: 2,
            
        });
        gsap.to(this.controls.target,{
            x: currentintersect.position.x,
            y: currentintersect.position.y,
            z: currentintersect.position.z,
            duration: 2,
            onComplete: ()=>{
                this.camera.lookAt(currentintersect.position);
                this.setScreen();
            }
        });
        
    }

    setScreen(){
        css.style.zIndex = 99;
        css.style.pointerEvents = "all";
        webgl.style.pointerEvents = 'none';
        button.style.display = 'flex';
    }
    resetScreen(){
        button.style.display = 'none';
        css.style.zIndex = 0;
        css.style.pointerEvents = "none";
        webgl.style.pointerEvents = 'auto';
    }
    
}