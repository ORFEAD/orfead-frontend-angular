import { VALUE_TYPE } from '../enum/VALUE_TYPE';
import { Appuser } from 'src/app/module/appuser/model/Appuser';
import { Dataset } from "./Dataset";
import {EntityBase} from "./EntityBase";


export class Variable extends EntityBase {
    
    dataset:Dataset;
    name:string;
    valueType:VALUE_TYPE;
    possibleValuesAsStrArr:string[];
    required:boolean;
    exportLevel:number;

    constructor(_json:Object) {
        super(_json);
        this.name = _json['name'];
        this.required = _json['required'];
        this.exportLevel = _json['exportLevel'];
        if (_json['dataset'] != null) {
            this.dataset = new Dataset(_json['dataset']);
        }        
        if (_json['valueType'] != null) {
            this.valueType = Number(VALUE_TYPE[_json['valueType']]) ;        
        }
        this.possibleValuesAsStrArr = _json['possibleValuesAsStrArr'];
        
        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new Appuser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new Appuser(_json['lastEditor']);                    
        }
    }
    
}





