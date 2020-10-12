import {EntityBase} from "./EntityBase";
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { ROLE_CODE_NAME } from '../enum/ROLE_CODE_NAME';
import { AppUser } from './AppUser';
import { Dataset } from "./Dataset";

export class Variable extends EntityBase {
    
    dataset:Dataset;
    name:string;
    
    constructor(_json:Object) {
        super(_json);
        this.name = _json['name'];
        if (_json['dataset'] != null) {
            this.dataset = new Dataset(_json['dataset']);
        }        
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new AppUser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new AppUser(_json['lastEditor']);                    
        }
    }
    
}





