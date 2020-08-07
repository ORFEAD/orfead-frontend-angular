import {EntityBase} from "../EntityBase";
import { AppUser } from '../AppUser';

export class FrontendVersion  extends EntityBase {
    
    name:string;
    forceReloadIfDifferentVersion:boolean;

    // TODO: Implement those two if needed
    // # RoleRoleAssos where this role is the handler role
    // roleRoleAssos_as_handler::Union{Missing,Vector{IRoleRoleAsso}}

    // # RoleRoleAssos where this role is the handled role
    // roleRoleAssosAsHandled::Union{Missing,Vector{IRoleRoleAsso}}

    
    constructor(_json:Object) {
        super(_json);
        this.name = _json['name'];
        this.forceReloadIfDifferentVersion = _json['forceReloadIfDifferentVersion'];

        // This is here and not in the EntityBase to avoid circular dependencies
        if (_json['creator'] != null) {                
            this.creator = new AppUser(_json['creator']);                    
        }
        if (_json['lastEditor'] != null) {                
            this.lastEditor = new AppUser(_json['lastEditor']);                    
        }
    }
    
}





