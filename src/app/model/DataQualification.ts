import { EntityBase } from './EntityBase';
import { Appuser } from 'src/app/module/appuser/model/Appuser';

export class DataQualification extends EntityBase {
    
    name: string;
    variablesNb: number;    
    rowsNb: number;

    valuesChecked: number;
        
    constructor(_json:Object) {
//        console.dir(_json);
        // console.log("in Appuser construtor");
        super(_json);
        this.name = _json['name'];
        this.variablesNb = _json['variablesNb'];
        this.rowsNb = _json['rowsNb'];

        this.valuesChecked = _json['valuesChecked'];
      

        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new Appuser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new Appuser(_json['lastEditor']);                    
        }

    }
    
}


