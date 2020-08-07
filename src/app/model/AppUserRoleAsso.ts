import { Role } from "./Role";
import { EntityBase } from './EntityBase';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { AppUser } from './AppUser';

export class AppUserRoleAsso extends EntityBase {
    
    appuser:AppUser;
    role:Role;
    
    constructor(_json:Object) {
    //    console.dir(_json);
        // console.log("in DealDistributionChannelAsso construtor");
        super(_json);

        if (_json['appuser'] != null) {
            this.appuser = new AppUser(_json['appuser']);            
        }
        if (_json['role'] != null) {
            this.role = new Role(_json['role']);            
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


