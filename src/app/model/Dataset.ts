import {EntityBase} from "./EntityBase";
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { ROLE_CODE_NAME } from '../enum/ROLE_CODE_NAME';
import { AppUser } from './AppUser';

export class Dataset  extends EntityBase {
    
    name:string;
    
    constructor(_json:Object) {
        super(_json);
        this.name = _json['name'];
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new AppUser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new AppUser(_json['lastEditor']);                    
        }
    }
    
}





