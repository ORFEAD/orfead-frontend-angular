import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/service/app-user.service';
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { ProcessingService } from 'src/app/service/processing.service';
import { SelectItem } from 'primeng/api';
import { APPUSER_TYPE } from 'src/app/enum/APPUSER_TYPE';
import { Utils } from 'src/app/util/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  data:any[] = []
  cols: any[];

  pageSize = environment.defaultNumberOfResults;

  appuserTypesSelectItems:SelectItem[] = [];

  constructor(private appuserService:AppUserService,
              private translationService:TranslationService,
              private processingService:ProcessingService) { }

  ngOnInit() {
    this.processingService.clearProcessesList("UserDetailsComponent.route.params.subscribe()");
    this.processingService.blockUI("UsersComponent.ngOnInit()");
    this.getAllUsers();
    this.prepareAppuserTypesSelectItems();

    this.cols = [
      { field: 'appuser_avatar_id', header: this.translationService.getTranslation("avatar") },
      { field: 'appuser_firstname', header: this.translationService.getTranslation("firstname") },
      { field: 'appuser_lastname', header: this.translationService.getTranslation("lastname") },
      { field: 'appuser_companies', header: this.translationService.getTranslation("companies") },
      { field: 'appuser_type', header: this.translationService.getTranslation("appuser_type") },
      // { field: 'appuser_roles', header: this.translationService.getTranslation("appuser_roles") },
      // { field: 'action', header: '' }
    ];

    var rolesNamesSuffixedAttributeName = this.translationService.getSuffixedAttributeName("appuser_roles_names");

    this.cols.push({ field: rolesNamesSuffixedAttributeName, header: this.translationService.getTranslation("appuser_roles") });
    this.cols.push({ field: 'action', header: '' })
  }

  getAllUsers() {
    this.appuserService.getAllUsers().subscribe(res => {
      this.processingService.unblockUI("UsersComponent.getAllUsers()");
      console.log(res);
      this.data = res;
    });
  }

  showfilter(eventvalue, colfield, selector) {
    console.log(eventvalue);
    console.log(colfield);
    console.log(selector);
  }

  prepareAppuserTypesSelectItems(){
    // this.appuserTypesSelectItems.push({label: null, 
    //                                     value: null,                                                       
    //                                     title: null});
    for (let codeName of Utils.getEnumCodeNames(APPUSER_TYPE)) {         
      var label = this.translationService.getTranslation(codeName);
      this.appuserTypesSelectItems.push({label: label, 
                                         value: Number(APPUSER_TYPE[codeName]),                                                       
                                         title: label});
    }
  }


}
