import {EntityBase} from "./EntityBase";
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { ROLE_CODE_NAME } from '../enum/ROLE_CODE_NAME';
import { AppUser } from './AppUser';
import { Dataset } from "./Dataset";
import { Variable } from "./Variable";

export class VariableValue extends EntityBase {
    
    dataset:Dataset;
    variable:Variable;
    valueAsStr:string;
    rowNum:number;
    
    constructor(_json:Object) {
        super(_json);
        if (_json['dataset'] != null) {
            this.dataset = new Dataset(_json['dataset']);
        }
        if (_json['variable'] != null) {
            this.variable = new Variable(_json['variable']);
        }        
        this.valueAsStr = _json['valueAsStr']
        this.rowNum = _json['rowNum']
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new AppUser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new AppUser(_json['lastEditor']);                    
        }
    }
    
}





