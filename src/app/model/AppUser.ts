import { Role } from "./Role";
import { EntityBase } from './EntityBase';
import { AppUserRoleAsso } from './AppUserRoleAsso';
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { AppUserCompanyAsso } from './AppUserCompanyAsso';

export class AppUser extends EntityBase {
    
    login: string;
    password: string;    
    jwt: string;

    firstname: string;
    lastname: string;
    phone:string;
    email: string;
    fullname:string; // built in constructor
    
    composedRolesAssos:AppUserRoleAsso[];
    allRoles:Role[];   
    companiesAssos:AppUserCompanyAsso[];

    appuserType:APPUSER_TYPE;

    languageCode:string;
    avatar:File;
    deactivated:boolean;
    
    constructor(_json:Object) {
//        console.dir(_json);
        // console.log("in AppUser construtor");
        super(_json);
        this.login = _json['login'];
        this.password = _json['password'];
        this.jwt = _json['jwt'];

        this.firstname = _json['firstname'];
        this.lastname = _json['lastname'];  
        this.phone = _json['phone'];  
        this.email = _json['email'];

        this.fullname = this.firstname + " " + this.lastname;

        this.composedRolesAssos = [];
        if (_json['composedRolesAssos'] != null) {
            for (let e of _json['composedRolesAssos']) {
                this.composedRolesAssos.push(new AppUserRoleAsso(e));
            }
        }
        this.allRoles = [];
        if (_json['allRoles'] != null) {
            for (let e of _json['allRoles']) {
                this.allRoles.push(new Role(e));
            }
        }
        this.companiesAssos = [];
        if (_json['companiesAssos'] != null) {
            for (let e of _json['companiesAssos']) {
                this.companiesAssos.push(new AppUserCompanyAsso(e));
            }
        }
        this.deactivated = _json['deactivated'];        
        this.languageCode = _json['languageCode'];

        if (_json['appuserType'] != null) {
            // console.log(_json['appuserType']);
            this.appuserType = Number(APPUSER_TYPE[_json['appuserType']]) ;        
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


