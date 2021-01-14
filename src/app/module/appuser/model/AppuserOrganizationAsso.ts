import { Role } from "./Role";
import { EntityBase } from 'src/app/model/EntityBase';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Appuser } from './Appuser';
import { Organization } from './Organization';

export class AppuserOrganizationAsso extends EntityBase {
    
    appuser:Appuser;
    organization:Organization;
    
    constructor(_json:Object) {
    
        super(_json);

        if (_json['appuser'] != null) {
            this.appuser = new Appuser(_json['appuser']);            
        }
        if (_json['organization'] != null) {
            this.organization = new Organization(_json['organization']);            
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


