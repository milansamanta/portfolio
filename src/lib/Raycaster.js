import { Raycaster, Vector2, Vector3 } from "three";
import gsap from "gsap"

export class CustomRaycaster extends Raycaster{
    constructor(objects=[], container = document.querySelector('.container'), camera, controls){
        super();
        this.camera = camera;
        this.intersectedObjects = [];
        this.objects = objects;
        this.pointer = new Vector2(-2, -2);
        this.container = container;
        this.controls = controls;
        
        document.addEventListener('mousemove', event => this.onMouseMove(event));
        document.addEventListener('click', (event)=> this.onClick(event));
    }

    onMouseMove(event){
        
        this.pointer.x = ( event.clientX / this.container.clientWidth ) * 2 - 1;
	    this.pointer.y = - ( event.clientY / this.container.clientHeight ) * 2 + 1;
        this.setFromCamera( this.pointer, this.camera);
        this.onIntersect();
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
                gsap.to(this.camera.position, {
                    x: 0,
                    y: 0,
                    z: .1,
                    duration: 2,
                    
                });
                gsap.to(this.controls.target,{
                    x: currentintersect.position.x,
                    y: currentintersect.position.y,
                    z: currentintersect.position.z,
                    duration: 2,
                    onComplete: ()=>{
                        this.camera.lookAt(currentintersect.position);
                    }
                });
                
            }
        }
    }
    
}