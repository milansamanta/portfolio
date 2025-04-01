import { Raycaster, Vector2 } from "three";

export class CustomRaycaster extends Raycaster{
    constructor(objects=[], container = document.querySelector('.container'), camera){
        super();
        this.camera = camera;
        this.intersectedObjects = [];
        this.objects = objects;
        this.pointer = new Vector2(-2, -2);
        this.container = container;
        
        document.addEventListener('mousemove', event => this.onMouseMove(event));
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
    
}