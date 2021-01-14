import { Appuser } from "./Appuser";
import { EntityBase } from 'src/app/model/EntityBase';

export class Organization extends EntityBase {
    
    name:string;
    
    constructor(_json:Object) {
//        console.dir(_json);
        // console.log("in Appuser construtor");
        super(_json);
        this.name = _json['name'];
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new Appuser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new Appuser(_json['lastEditor']);                    
        }

    }
    
}


