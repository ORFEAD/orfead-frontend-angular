import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utils } from 'src/app/util/utils';
import { Dataset } from 'src/app/model/Dataset';
import { Variable } from 'src/app/model/Variable';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  private apiURL = environment.apiURL + 'variable';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getVariablesFilledInByUser(datasetId:string): Observable<Variable[]> {
    var url = `${this.apiURL}/${datasetId}/filled-in-ui`;     
    
    return this.http.get<Variable[]>(url)    
    .pipe(map( res =>             
        this.fromJSONArray(res)
        ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getVariablesFilledInByUser()`, null))
    );
  }

  getVariables(datasetId:string): Observable<Variable[]> {
    var url = `${this.apiURL}/${datasetId}`;     
    
    return this.http.get<Variable[]>(url)    
    .pipe(map( res =>             
        this.fromJSONArray(res)
        ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getVariables()`, null))
    );
  }

  fromJSONArray(array: Array<Object>): Variable[] {
    return array.map(res => new Variable(res));
  } 
}
