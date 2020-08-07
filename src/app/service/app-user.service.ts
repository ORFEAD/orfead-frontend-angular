import { Injectable } from '@angular/core';
import { AppUser } from '../model/AppUser';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utils } from '../util/utils';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {

  private apiURL = environment.apiURL + 'appuser';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getAppUser(id:string): Observable<AppUser> {
    
    const url = this.apiURL + "/retrieve-user-from-id";
    return this.http.post<AppUser>(url,
                                JSON.stringify({"appuser.id": id}))    
    .pipe(map(res => { 
      console.log(res);
      var appuser =  new AppUser(res);
      return appuser;
    }))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getAppUser(${id})`, null))
    );
  }


  getAllUsers(): Observable<any[]> {
    const url = this.apiURL + "/get-all-users";
    return this.http.get<any[]>(url)    
    .pipe(map( res =>             
      Utils.convertPlainDataframe(res)
      ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getAllUsers()`, null))
    );
  }


  saveAppUser(appUser:AppUser): Observable<AppUser>{

    const url = this.apiURL + "/save";
    return this.http.post<AppUser>(url,
                                JSON.stringify(appUser))    
    .pipe(map(res => {        
      return new AppUser(res);
    }))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`saveAppUser(${appUser.id})`, null))
    );
  }
}
