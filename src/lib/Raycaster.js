import { Raycaster, Vector2, Vector3 } from "three";
import gsap from "gsap"
import { Experience } from "./Experience";
import { container, css, webgl, button } from "./Constants";
import { detect_click } from "./utility";

export class CustomRaycaster extends Raycaster{
    constructor(){
        super();
        this.enabled = true;
        this.isMouseDown = false;
        this.isdragging = false;
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.intersectedObjects = [];
        this.objects = this.experience.raycastingObjects;
        this.pointer = new Vector2(-2, -2);
        this.controls = this.experience.controls;
        this.prevposition = new Vector3();
        this.prevtarget = new Vector3();

        this.onMouseDownHandler = this.onMouseDown.bind(this);
        this.onMouseUpHandler = this.onMouseUp.bind(this);
        this.onDragHandler = this.cssMouseMove.bind(this);
        
        document.addEventListener('mousemove', event => this.onMouseMove(event));
        detect_click(this.onClick.bind(this));
        button.addEventListener('click', ()=>{
            this.flyback();
        });
    }

    cssMouseMove(event){
        if (this.isMouseDown){
            this.isdragging = true;
            this.ondrag(event);
            this.manualOrbit(event);
        }
    }

    onMouseDown(){
        this.isMouseDown = true;
    }

    onMouseUp(){
        this.isMouseDown = false;
        if(this.isdragging){
            this.isdragging = false;
            this.removeEvents();
        }
    }

    addEvents(){
        document.addEventListener("mousedown", this.onMouseDownHandler);
        document.addEventListener("mouseup", this.onMouseUpHandler);
        document.addEventListener("mousemove", this.onDragHandler);
    }
    removeEvents(){
        document.removeEventListener("mousedown", this.onMouseDownHandler);
        document.removeEventListener("mouseup", this.onMouseUpHandler);
        document.removeEventListener("mousemove", this.onDragHandler);
    }

    manualOrbit(event) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
    
        const ROTATION_SPEED = 0.005;
    
        this.controls.update();
        this.controls._rotateLeft(movementX * ROTATION_SPEED);
        this.controls._rotateUp(movementY * ROTATION_SPEED);
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
        gsap.to(this.camera.position, {
            x: currentintersect.position.x,
            y: currentintersect.position.y-.1,
            z: currentintersect.position.z+.65,
            duration: 2,
            
        });
        gsap.to(this.controls.target,{
            x: currentintersect.position.x,
            y: currentintersect.position.y-.1,
            z: currentintersect.position.z,
            duration: 2,
            onComplete: ()=>{
                this.camera.lookAt(currentintersect.position);
                this.setScreen();
            }
        });
        
    }
    ondrag(event){
        this.controls.enabled = true;
        this.enabled = true;
        this.resetScreen()
    }

    setScreen(){
        css.style.zIndex = 1;
        css.style.pointerEvents = "auto";
        button.style.display = 'flex';
        this.addEvents();
    }
    resetScreen(){
        button.style.display = 'none';
        css.style.zIndex = 0;
        css.style.pointerEvents = "none";
        webgl.style.pointerEvents = 'auto';
        
    }
    
    
}