import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppUserService } from 'src/app/service/app-user.service';
import { AppUser } from 'src/app/model/AppUser';
import { ProcessingService } from 'src/app/service/processing.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  appUser:AppUser;  

  constructor(private route: ActivatedRoute,
              private appUserService: AppUserService,
              private processingService:ProcessingService) {
    
  }

  ngOnInit() {

    // Angular does not recreate the component if the route is the same ('/user/new' and '/user/33434-4234-3242' are the same)
    // We need to oberve the route params
    // References: https://discourse.nativescript.org/t/force-reloading-page-when-navigate-to-same-route-with-different-params/1743/2
    //             https://stackoverflow.com/questions/41678356/router-navigate-does-not-call-ngoninit-when-same-page
    this.route.params.subscribe(val => {
      this.processingService.clearProcessesList("UserDetailsComponent.route.params.subscribe()");
      this.getAppUserFromParam();
    });

    
  }
  
  getAppUserFromParam(): void {    
    const id = this.route.snapshot.paramMap.get('id');   
    this.processingService.blockUI("UserDetailsComponent.getAppUserFromParam");
    // Either create a new user or consult an existing one
    if (id == "new") {
      this.processingService.unblockUI("UserDetailsComponent.getAppUserFromParam()");
      this.appUser = new AppUser({});
    }  else {
      this.appUserService.getAppUser(id).subscribe(res => {            
        this.processingService.unblockUI("UserDetailsComponent.getAppUserFromParam()");
        if (res != null) {
          this.appUser = res;      
          console.log(this.appUser);
        }        
      });
    }    
  }

}
