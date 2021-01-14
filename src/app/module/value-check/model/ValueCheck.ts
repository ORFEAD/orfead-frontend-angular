import {EntityBase} from "../../../model/EntityBase";
import { Appuser } from 'src/app/module/appuser/model/Appuser';
import { VariableValue } from 'src/app/model/VariableValue';

export class ValueCheck  extends EntityBase {
    
    valueAsStr:string;
    variableValue:VariableValue;
    
    
    constructor(_json:Object) {
        super(_json);
        this.valueAsStr = _json['valueAsStr'];
        if (_json['variableValue'] != null) {                
            this.variableValue = new VariableValue(_json['variableValue']);                    
        }
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new Appuser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new Appuser(_json['lastEditor']);                    
        }
    }
    
}





