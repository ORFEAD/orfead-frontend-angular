import { Component, OnInit, Input } from '@angular/core';
import { AppUser } from 'src/app/model/AppUser';
import { SelectItem } from 'primeng/api';
import { RoleService } from 'src/app/service/role.service';
import { TranslationService } from 'src/app/module/translation/service/translation.service';
import { UINotificationService } from 'src/app/service/uinotification.service';
import { AppUserRoleAsso } from 'src/app/model/AppUserRoleAsso';
import { Role } from 'src/app/model/Role';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { AppUserService } from 'src/app/service/app-user.service';
import { Router } from '@angular/router';
import { EnumService } from 'src/app/service/enum.service';
import { APPUSER_TYPE } from 'src/app/enum/APPUSER_TYPE';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { AppUserCompanyAsso } from 'src/app/model/AppUserCompanyAsso';
import { COMPANY_TYPE } from 'src/app/enum/COMPANY_TYPE';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() appUser:AppUser;

  uploadAvatarURL:string;

  waitingForEndOfAction = false;

  rolesSelectItems:SelectItem[] = [];
  selectedRolesIds:String[] = [];
  selectedRolesNames:String[] = [];

  appUserTypesSelectItems:SelectItem[] = [];
  selectedAppUserType:APPUSER_TYPE;

  resourcesLoadedChecker = {
    resourcesAreLoaded: false,
    resourcesLoaded:{
        selectableComposedRoles: false,
        allAppUserTypes:false
    }    
  }

  constructor(private translationService:TranslationService,
              private uinotificationService:UINotificationService,
              private roleService:RoleService,
              private errorHandlerService:ErrorHandlerService,
              private appUserService:AppUserService,
              private router: Router,
              private enumService:EnumService,
              private authenticationService:AuthenticationService) { }

  ngOnInit() {
    // this.uploadAvatarURL = this.fileUploadService.apiURL + "/upload-appuser-avatar/";
    console.log(this.appUser);    
  }

  // The 'My account' link is accessible from anywhere in the menu. Therefore we can be in the 
  //   following situation: user is viewing the page of a given user, he clicks on 'my account'
  //   which will not reload the component. We want to reinitialize the selected roles, which is called
  //   once all resources are loaded. Of course this is not optimal because we force the reloading of
  //   resources just to have the side effect of calling 'initializeSelected';
  ngOnChanges() {
    this.selectedRolesIds = [];
    this.selectedRolesNames = [];    
    this.getComposedRoles();
    this.getAllUserTypes();
  }

  
  onSuccessfulUploadOfAvatar(e) {
    // Retrieve the newly create file id
    console.log(e);
    
  }

  onBeforeUpload(event) {
    console.log("onBeforeUpload");
    console.log(event);
    // const idToken = localStorage.getItem("id_token");
    // event.xhr.setRequestHeader("Authorization", `Bearer ${idToken}`);
    // event.formData.append('DocumentID', 'A123');
  }

  onUploadError(e) {
    this.errorHandlerService.handleErrorCore(e.error,"Upload avatar");
    console.log(e)
  }

  getAllUserTypes() {
    this.enumService.getAppUserTypes().subscribe(res => {

      this.appUserTypesSelectItems = [];

      // Create the SelectItem[] 
      for (let o of res) {
        var label = this.translationService.getTranslation(APPUSER_TYPE[o]);
        var description = label;
                
        this.appUserTypesSelectItems.push({label: label, 
                                            value: o,                                                       
                                            title: description});
        
      }
      
      this.resourcesLoadedChecker.resourcesLoaded.allAppUserTypes = true;
      this.updateResourcesLoaded();
      
    });
  }

  canHaveAvatar() {
    if (this.appUser != null) {
      return this.authenticationService.hasRole("can_have_avatar",this.appUser);
    }
    return false;    
  }

  getComposedRoles(){

    var roles:Role[] = [];
    this.rolesSelectItems = [];

    // Get the composed of the edited user if any
    this.roleService.getAllRoles().subscribe(res1 => { 

      console.log(res1);

      if (res1 != null) {
        roles = res1;

        // Add the roles that the editor can see for this user type
        this.roleService.getAllRoles().subscribe(res2 => {   
          if (res2 != null) {
            
            roles.push(...res2);

            // Create the SelectItem[] using the appropriate translations for the labels
            // The only other supported languagge for Nice types is French
            var languageCode = "en";
            if (this.translationService.getSupportedLanguageCode() == "fr") {
              languageCode = "fr";
            }
            const role_nameAttr = "name_" + languageCode;

            console.log(roles);
            
            for (let o of roles) {      
              
              console.log(o);
              
              var label:string =  o[role_nameAttr];
              
              // Prepare the title 
              // TODO: show the embedded non-composed roles in the title
              var title = label;

              // If the selectItem[] already contains an element for this role, continue
              if (this.rolesSelectItems.filter(x => x.value == o.id).length > 0) {
                continue;
              }

              this.rolesSelectItems.push({label: label, 
                                          value: o.id,                                        
                                          title: title});
              
            }
            this.resourcesLoadedChecker.resourcesLoaded.selectableComposedRoles = true;
            this.updateResourcesLoaded();

          }          
        });
      }
    });
    
  }


  

  handleChangeOnFieldAppUserType(id) {    
    this.appUser.appuserType = id;   
    // Reload the roles and companies because they depends on the user type
    this.getComposedRoles();
  }

  updateResourcesLoaded():void {
    
    for (let k in this.resourcesLoadedChecker) {
      // console.log(this.resourcesLoadedChecker[k]);
      if (this.resourcesLoadedChecker[k] instanceof Object) {
        for (let ksub in this.resourcesLoadedChecker[k]) {
            if (this.resourcesLoadedChecker[k][ksub] == false) {
                this.resourcesLoadedChecker.resourcesAreLoaded = false;
                return;
            }
        }
      }         
    }   
    this.resourcesLoadedChecker.resourcesAreLoaded = true;
    this.initializeSelected();

  }

  save(withNotification:boolean = true) {       
    
    // If deal is new we want to redirect to a different url after the save action 
    var redirect_after_save = false;
    if (this.appUser.id == null) {
       redirect_after_save = true;
    }

    this.waitingForEndOfAction = true;

    this.appUserService.saveAppUser(this.appUser).subscribe(result => {    

      this.waitingForEndOfAction = false;
      
      // If it was the creation of a deal we redirect to the correct url
      if (redirect_after_save) {
        this.uinotificationService.notifySuccess("i18n@@user_saved");
        // See UserDetailsComponent constructor for the workaround on how to force the refresh of the page
        //   even if the route has not change ('/user/new' and '/user/33434-4234-3242' are the same route)
        this.router.navigate(["/user",result.id]);
       } else {
        this.postSaveActions(result,withNotification);         
       }  
      
    })      

  }

  postSaveActions(result:AppUser, withNotification:boolean = true) {

    if (result != null) {            
      this.appUser = result; 
      this.initializeSelected();        
      if (withNotification) {
        this.uinotificationService.notifySuccess("i18n@@appuser_saved");
      }             
    } 

  }

  initializeSelected(): void {

    // 
    // Composed roles
    // 
    if (this.appUser.composedRolesAssos!= null) {
      this.selectedRolesIds = 
        this.appUser.composedRolesAssos.map(x => x.role.id);
    }    
    this.updateSelectedRolesNames();
   

    //
    // AppUser type
    //
    if (this.appUser.appuserType != null) {
      this.selectedAppUserType = this.appUser.appuserType;
    }

  }

  updateSelectedRolesNames() {
    this.selectedRolesNames = 
      this.rolesSelectItems.filter(x => this.selectedRolesIds.includes(x.value)).map(x => x.label);
  }


  handleChangeOnFieldRoles(ids) {
    
    // Get the unchanged assos (without the ones that are removed)
    var unchangedAssos:AppUserRoleAsso[] = 
      this.appUser.composedRolesAssos.filter(x => ids.includes(x.role.id));
      this.appUser.composedRolesAssos = unchangedAssos;
    
    // Add the new IDs
    var sameIDs:string[] = this.appUser.composedRolesAssos.map(x => x.role.id);
    var newIDs = ids.filter(x => !sameIDs.includes(x));
  
    // console.log(unchangedRoleAssos);

    // Loop over the new IDs and add create the corresponding associations
    // NOTE: When creating the association we don't need to set the attribute
    //         that corresponds to the object holding the array
    var newAsso:AppUserRoleAsso;
    for (let id of newIDs) {
      newAsso = new AppUserRoleAsso({});
      newAsso.role = new Role({id:id});
      this.appUser.composedRolesAssos.push(newAsso);
    }

    // Update the recap of selected items
    this.updateSelectedRolesNames();

  }



}
