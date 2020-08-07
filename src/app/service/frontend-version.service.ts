import { Injectable } from '@angular/core';
import { AppUser } from '../model/AppUser';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from './authentication.service';
import { FrontendVersion } from '../model/misc/FrontendVersion';

@Injectable({
  providedIn: 'root'
})
export class FrontendVersionService {

  public apiURL = environment.apiURL + 'misc';  // URL to web api

  private thumbnailCache = {};

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private domSanitizer: DomSanitizer,
              private authenticationService:AuthenticationService) { }



  getCurrentFrontendVersion(): Observable<FrontendVersion> {
    const url = this.apiURL + "/get-current-frontend-version";
    // console.log(url);   
    return this.http.get<FrontendVersion>(url)    
    .pipe(map(res => new FrontendVersion(res)))     
    .pipe(
      catchError(this.errorHandlerService.handleError(`getCurrentFrontendVersion()`, null))
    );
  }
 

  fromJSONArray(array: Array<Object>): FrontendVersion[] {
    return array.map(res => new FrontendVersion(res));
  } 
}
