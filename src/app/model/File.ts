import { EntityBase } from './EntityBase';

export class File extends EntityBase {
    
    pathFromDataDir: string;
    name: string;
    cancelled:boolean;

    safeURL:any; // only on client side

    isImage() {
        if (this.name.toLowerCase().includes(".jpg") 
         || this.name.toLowerCase().includes(".jpeg")
         || this.name.toLowerCase().includes(".png")) {
            return true;
        } else {
            return false;
        }
    }
        
    constructor(_json:Object) {
//        console.dir(_json);
        // console.log("in Country construtor");
        super(_json);
        this.pathFromDataDir = _json['pathFromDataDir']; // path a file (including the )
        this.name = _json['name']; // name of the file when uploaded (just the name, not the path)
        this.cancelled = _json['cancelled'];
    }
    
}


