import {EntityBase} from "./EntityBase";
import { Appuser } from 'src/app/module/appuser/model/Appuser';
import { Dataset } from "./Dataset";
import { Variable } from "./Variable";

export class VariableValue extends EntityBase {
    
    dataset:Dataset;
    variable:Variable;
    valueAsStr:string;
    valueAsStrBeforeCheck:string;
    rowNum:number;
    
    constructor(_json:Object) {
        super(_json);
        if (_json['dataset'] != null) {
            this.dataset = new Dataset(_json['dataset']);
        }
        if (_json['variable'] != null) {
            this.variable = new Variable(_json['variable']);
        }        
        this.valueAsStr = _json['valueAsStr'];
        this.valueAsStrBeforeCheck = _json['valueAsStrBeforeCheck'];
        this.rowNum = _json['rowNum'];
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new Appuser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new Appuser(_json['lastEditor']);                    
        }
    }
    
}





