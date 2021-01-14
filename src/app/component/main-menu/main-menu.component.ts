import { Component, OnInit, ViewEncapsulation, LOCALE_ID, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/module/appuser/service/authentication.service';
import xml2js from 'xml2js'; // we needed to install 
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { YoohooService } from 'src/app/service/yoohoo.service';
import { ROLE_CODE_NAME } from 'src/app/module/appuser/enum/ROLE_CODE_NAME';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MainMenuComponent implements OnInit {
    
    items: MenuItem[];
    linkToUserAccount:string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              public translationService: TranslationService,
              private yoohooService:YoohooService) { }


    ngOnInit() {

        this.linkToUserAccount = "/user/" + this.authenticationService.getAppuserIdFromJWT();

        this.items = [
            // {
            //     label: 'filler',
            //     icon: 'main-ip-icon',
            //     routerLink: ['/']
            // },
            {
                label: this.translationService.getTranslation('i18n@@upload'),
                icon: 'fas fa-file-upload',
                routerLink: ['/']
            },
            {
                label: this.translationService.getTranslation('i18n@@data_qualification'),
                icon: 'fas fa-check-circle',
                routerLink: ['/choix-variable-a-verifier']
            }
        ];
      
       
        if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_modify_user)) {
            this.items.push({
                label: this.translationService.getTranslation('i18n@@users'),
                icon: 'fas fa-users',
                routerLink: ['/utilisateurs']
            });
        }        

        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_deals)) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@deals'),
        //         icon: 'fas fa-comments-dollar',
        //         routerLink: ['/deals']
        //     });
        // }
        
        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_sales_reports)
        // && !environment.hideSalesReportsModule) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@sales_reports'),
        //         icon: 'fas fa-money-check-alt',
        //         routerLink: ['/sales-reports']
        //     });
        // }

        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_trademarks)
        // && !environment.hideTrademarksModule) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@trademarks'),
        //         icon: 'fas fa-registered',
        //         routerLink: ['/trademarks']
        //     });
        // }
        
        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_users)) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@users'),
        //         icon: 'fas fa-users',
        //         routerLink: ['/users']
        //     });
        // }
        
        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_companies)) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@companies'),
        //         icon: 'fas fa-building',
        //         routerLink: ['/companies']
        //     });
        // }

        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_make_announcements)) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@announcements'),
        //         icon: 'fas fa-bullhorn',
        //         routerLink: ['/announcements']
        //     });
        // }
        
        // if (this.authenticationService.hasRole(ROLE_CODE_NAME.can_write_app_settings)) {
        //     this.items.push({
        //         label: this.translationService.getTranslation('i18n@@settings'),
        //         icon: 'fas fa-cog',
        //         items:[
        //             {
        //                 label: this.translationService.getTranslation('i18n@@roles'),
        //                 icon: 'fas fa-user-tag',
        //                 routerLink: ['/settings/roles']
        //             },        
        //             {
        //                 label: this.translationService.getTranslation('i18n@@nice_classification'),
        //                 icon: 'fas fa-icons',
        //                 routerLink: ['/settings/nice-classification']
        //             },        
        //             {
        //                 label: this.translationService.getTranslation('i18n@@distribution_channels'),
        //                 icon: 'fas fa-shopping-bag',
        //                 routerLink: ['/settings/distribution-channels']
        //             },        
        //             {
        //                 label: this.translationService.getTranslation('i18n@@royalty_bases'),
        //                 icon: 'fas fa-calculator',
        //                 routerLink: ['/settings/royalty-bases']
        //             },        
        //             {
        //                 label: this.translationService.getTranslation('i18n@@intellectual_properties'),
        //                 icon: 'fas fa-smile',
        //                 routerLink: ['/settings/intellectual-properties']
        //             }   
        //         ]
                
        //     });   
        // }            

        
    }

   
    logout() {
        this.router.navigateByUrl('/login');
    }

    


}
