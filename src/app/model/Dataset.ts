import {EntityBase} from "./EntityBase";
import { Appuser } from 'src/app/module/appuser/model/Appuser';

export class Dataset  extends EntityBase {
    
    name:string;
    
    constructor(_json:Object) {
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





