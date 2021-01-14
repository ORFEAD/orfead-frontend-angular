import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utils } from 'src/app/util/utils';
import { Organization } from '../model/Organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private apiURL = environment.apiURL + 'organization';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getOrganizationsAccessibleToUser(): Observable<Organization[]> {
    var url = this.apiURL + "/all-organizations";
     
    
    return this.http.post<Organization[]>(url,
                                JSON.stringify({}))    
    .pipe(map( res =>             
        this.fromJSONArray(res)
        ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getOrganizationsAccessibleToUser()`, null))
    );
  }


  fromJSONArray(array: Array<Object>): Organization[] {
    return array.map(res => new Organization(res));
  } 


}
