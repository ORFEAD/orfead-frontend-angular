import {EntityBase} from "./EntityBase";
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { ROLE_CODE_NAME } from '../enum/ROLE_CODE_NAME';
import { AppUser } from './AppUser';

export class Role  extends EntityBase {
    
    codeName:ROLE_CODE_NAME;
    name_en:string;
    name_fr:string;    
    description:string;

    composed:boolean;
    restrictedToAppUserType:APPUSER_TYPE;

    without_manager:boolean;

    // TODO: Implement those two if needed
    // # RoleRoleAssos where this role is the handler role
    // roleRoleAssos_as_handler::Union{Missing,Vector{IRoleRoleAsso}}

    // # RoleRoleAssos where this role is the handled role
    // roleRoleAssosAsHandled::Union{Missing,Vector{IRoleRoleAsso}}

    
    constructor(_json:Object) {
        super(_json);
        this.name_en = _json['name_en'];
        this.name_fr = _json['name_fr'];
        this.description = _json['description'];
        this.composed = _json['composed'];
        this.without_manager = _json['without_manager'];
        if (_json['restrictedToAppUserType'] != null) {
            this.restrictedToAppUserType = Number(APPUSER_TYPE[_json['restrictedToAppUserType']]) ;        
        }
        if (_json['codeName'] != null) {
            this.codeName = Number(ROLE_CODE_NAME[_json['codeName']]) ;        
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





