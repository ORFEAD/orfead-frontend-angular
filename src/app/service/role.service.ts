import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Role } from '../model/Role';
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { Utils } from '../util/utils';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiURL = environment.apiURL + 'role';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getAllRoles(appuserType:APPUSER_TYPE = null): Observable<Role[]> {
    var url = this.apiURL + "/all-composed-roles";
    if (appuserType != null) {
      url += "/" + APPUSER_TYPE[appuserType]; // Eg. '/ip_owner_collaborator'
    }

    console.log(`url[${url}]`);
    
    return this.http.post<Role[]>(url,
                                JSON.stringify({}))    
    .pipe(map( res =>             
        this.fromJSONArray(res)
        ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getAllRoles()`, null))
    );
  }

  getRolesForListing(): Observable<any[]> {
    const url = this.apiURL + "/composed-roles-for-listing";
    console.log(url);   
    return this.http.get<any[]>(url)    
    .pipe(map( res =>             
        Utils.convertPlainDataframe(res)
        )) 
    .pipe(
      catchError(this.errorHandlerService.handleError(`getRolesForListing()`, null))
    );
  }

  fromJSONArray(array: Array<Object>): Role[] {
    return array.map(res => new Role(res));
  } 

  
}
