import { Role } from "./Role";
import { EntityBase } from './EntityBase';
import { AppUserRoleAsso } from './AppUserRoleAsso';
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { AppUserCompanyAsso } from './AppUserCompanyAsso';
import { AppUser } from "./AppUser";

export class DataQualification extends EntityBase {
    
    name: string;
    variablesNb: number;    
    rowsNb: number;

    valuesChecked: number;
        
    constructor(_json:Object) {
//        console.dir(_json);
        // console.log("in AppUser construtor");
        super(_json);
        this.name = _json['name'];
        this.variablesNb = _json['variablesNb'];
        this.rowsNb = _json['rowsNb'];

        this.valuesChecked = _json['valuesChecked'];
      

        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new AppUser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new AppUser(_json['lastEditor']);                    
        }

    }
    
}


