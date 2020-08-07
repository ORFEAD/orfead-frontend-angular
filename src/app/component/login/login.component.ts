import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ProcessingService } from 'src/app/service/processing.service';
import { ROLE_CODE_NAME } from 'src/app/enum/ROLE_CODE_NAME';
import { SayHelloService } from 'src/app/service/say-hello.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model: any = {username: "", password: ""};
    error = '';    
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private sayHelloService: SayHelloService,
        private processingService:ProcessingService) { }
 
    ngOnInit() {
        // reset login status

        if (environment.prefillLoginForm == true) {
            this.model = {username: "erlher", password: "test5678"};            
        }
        this.authenticationService.logout();
    }
 
    login() {
        this.processingService.blockUI("LoginComponent.login");
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result != null) {    
                    this.processingService.unblockUI("LoginComponent.login");                
                    if (this.authenticationService.hasRole(ROLE_CODE_NAME.basic_licensee_member)){
                        this.router.navigate(['/style-guides']);
                    } else {
                        this.router.navigate(['/']);
                    }
                    
                } 
                else {
                    // login failed
                    // this.error = 'Le login ou mot de passe est incorrect';
                    this.processingService.unblockUI("LoginComponent.login");
                }
            });
    }

    sayHello(){
        this.sayHelloService.sayHello().subscribe(res => {
            console.log(res);
        });
    }
    
    private setSession(authResult) {
    } 

}

