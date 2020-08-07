import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ROLE_CODE_NAME } from '../enum/ROLE_CODE_NAME';

/**
 * http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
 */
@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private authenticationService:AuthenticationService) { }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {        

        console.log(route);
        console.log(state);
        
        
        // Not logged in so redirect to login page
        if (!localStorage.getItem(environment.jwt_name)) {
            console.log("EXIT HERE0");
            this.redirectToLoginPage();
            return false;
        }
        
        // No restriction on '/'
        if (route.url.length == 0) {
            console.log("EXIT HERE1");
            return true;
        }
        
        // Restrict access to page 'designs'
        if (route.url.length == 1 && route.url[0].path == "designs") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_designs)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'style-guides/companies-assos'
        if (route.url.length == 2 && route.url[0].path == "style-guides" && route.url[1].path == "companies-assos") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_grant_access_to_style_guide)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'users'
        if (route.url.length == 1 && route.url[0].path == "users") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_users)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'roles'
        if (route.url.length == 1 && route.url[0].path == "roles") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_roles)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'sales-reports'
        if (route.url.length == 1 && route.url[0].path == "sales-reports") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_sales_reports)) {
                this.redirectToLoginPage();
                return false;
            }
        }
        
        // Restrict access to page 'announcements'
        if (route.url.length == 1 && route.url[0].path == "announcements") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_make_announcements)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'companies'
        if (route.url.length == 1 && route.url[0].path == "companies") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_companies)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'trademarks'
        if (route.url.length == 1 && route.url[0].path == "trademarks") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_trademarks)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'trademark/:id'
        if (route.url.length == 2 && route.url[0].path == "trademark") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_write_trademark)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'deals'
        // NOTE: The serverside only returns the deals that the user is allowed to see
        if (route.url.length == 1 && route.url[0].path == "deals") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_deals)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'deal/:id'
        // NOTE: We check on the server side if the user is allowed to see the deal
        if (route.url.length == 2 && route.url[0].path == "deal") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_search_deals)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'user/:id'
        // NOTE: Any authentified member can access this page at least to edit its own information.
        //       We check on the serverside that the user can access the account
        if (route.url.length == 2 && route.url[0].path == "user") {
            // Nothing
        }

        // Restrict access to page 'company/:id'
        if (route.url.length == 2 && route.url[0].path == "company") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_write_company)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'design-forum/:id'
        if (route.url.length == 2 && route.url[0].path == "design-forum") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_write_design)) {
                this.redirectToLoginPage();
                return false;
            }
        }

        // Restrict access to page 'settings/*'
        if ((route.url.length == 2 || route.url.length == 3) && route.url[0].path == "settings") {
            if (!this.authenticationService.hasRole(ROLE_CODE_NAME.can_write_app_settings)) {
                this.redirectToLoginPage();
                return false;
            }
        }
        
        return true;        

        
    }

    redirectToLoginPage() {
        console.log("!!!redirectToLoginPage");
        this.router.navigate(['/login']);
    }

}

