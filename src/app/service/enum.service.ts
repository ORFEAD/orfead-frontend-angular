import { Injectable } from '@angular/core';
import { AppUser } from '../model/AppUser';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CURRENCY } from '../enum/CURRENCY';
import { APPUSER_TYPE } from '../enum/APPUSER_TYPE';
import { COMPANY_TYPE } from '../enum/COMPANY_TYPE';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

   // // URL to web api
  // NOTE: See ForumStyleGuideComponent for the URL of the API to upload a file for a particular styleGuide
  private apiURL = environment.apiURL + 'enum';  


  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getCurrencies(): Observable<CURRENCY[]> {
    const url = this.apiURL + "/posible-values/CURRENCY";
    // console.log(url);   
    return this.http.get<any[]>(url)    
    .pipe(map( res =>             
        this.currenciesFromJSONArray(res)
        ))     
    .pipe(
      catchError(this.errorHandlerService.handleError(`getCurrencies()`, null))
    );
  }

  getAppUserTypes(): Observable<APPUSER_TYPE[]> {
    const url = this.apiURL + "/posible-values/APPUSER_TYPE";
    // console.log(url);   
    return this.http.get<any[]>(url)    
    .pipe(map( res =>             
        this.appUserTypesFromJSONArray(res)
        ))     
    .pipe(
      catchError(this.errorHandlerService.handleError(`getAppUserTypes()`, null))
    );
  }

  getCompanyTypes(): Observable<COMPANY_TYPE[]> {
    const url = this.apiURL + "/posible-values/COMPANY_TYPE";
    // console.log(url);   
    return this.http.get<any[]>(url)    
    .pipe(map( res =>             
        this.compamyTypesFromJSONArray(res)
        ))     
    .pipe(
      catchError(this.errorHandlerService.handleError(`getCompanyTypes()`, null))
    );
  }


  currenciesFromJSONArray(array: Array<string>): CURRENCY[] {
    return array.map(res => Number(CURRENCY[res]));
  } 
  appUserTypesFromJSONArray(array: Array<string>): APPUSER_TYPE[] {
    return array.map(res => Number(APPUSER_TYPE[res]));
  } 
  compamyTypesFromJSONArray(array: Array<string>): COMPANY_TYPE[] {
    return array.map(res => Number(COMPANY_TYPE[res]));
  } 
  

 

}
