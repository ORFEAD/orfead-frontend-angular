import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { environment } from 'src/environments/environment';
import { VariableValue } from 'src/app/model/VariableValue';
import { Observable } from 'rxjs';
import { Variable } from 'src/app/model/Variable';
import { Utils } from 'src/app/util/utils';

@Injectable({
  providedIn: 'root'
})
export class DataCheckService {

  private apiURL = environment.apiURL + 'value-check';  // URL to web api

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  sayhello() {
    console.log(`DataCheckService.sayhello!!!`);
  }
  
  getOneValueToCheckWithSrcValues(variable:Variable): Observable<VariableValue> {
    const url = this.apiURL + "/get-one-value-to-check-with-src-values";
    return this.http.post<VariableValue>(url,
                                JSON.stringify(variable))    
    .pipe(tap(res =>  {console.log(res);
                       new VariableValue(res);}
              ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getOneValueToCheckWithSrcValues()`, null))
    );
  }

  getDatasetsWithVariablesWithCheckValueInfo(): Observable<any[]> {
    const url = this.apiURL + "/get-datasets-with-variables-with-check-value-info";
    return this.http.get<any[]>(url)    
    .pipe(map(res => { 
        return res.map(x => {
          x["variables"] = Utils.convertPlainDataframe(x["variables"]);
          return x
        });        
      }
     ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getDatasetsWithVariablesWithCheckValueInfo()`, []))
    );
  }

}
