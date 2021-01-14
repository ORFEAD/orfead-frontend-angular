import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { environment } from 'src/environments/environment';
import { VariableValue } from 'src/app/model/VariableValue';
import { Observable } from 'rxjs';
import { Variable } from 'src/app/model/Variable';
import { Utils } from 'src/app/util/utils';
import { ValueCheck } from '../model/ValueCheck';
import { VariableAst } from '@angular/compiler';

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
  
  getOneValueToCheckWithSrcValues(variable:Variable,finalChecksOnly:boolean): Observable<any> {
    const url = this.apiURL + "/get-one-value-to-check-with-src-values/" + finalChecksOnly;
    return this.http.post<any>(url,
                                JSON.stringify(variable))    
    .pipe(tap(res =>  {
                      if (res.variableValue == null) {
                        return null;
                      }
                      //  console.log(res);
                      //  return new VariableValue(res);
                      res.variableValue = new VariableValue(res.variableValue);
                      return res;
                    }
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
          for (let v of x["variables"]) {

            if (v.confusion_matrix == null) {
              continue;
            }

            v.confusion_matrix = Utils.convertPlainDataframe(v.confusion_matrix);
            v.confusion_matrix_for_display = "<table class='confusion-matrix'>";
            
            // Header of the confusion matrix
            v.confusion_matrix_for_display += "<tr>"; // BEGIN of the headers' row
            v.confusion_matrix_for_display += "<th></th>"; // Add an empty header for the first column
            for (let h of v.confusion_matrix_headers) {
                v.confusion_matrix_for_display += `<th>${h}</th>`;
            }
            v.confusion_matrix_for_display += "</tr>"; // ENDOF of the headers' row
            
            // Rows of the confusion matrix
            let rowCounter = -1;
            for (let r of v.confusion_matrix) {
              rowCounter += 1;
              v.confusion_matrix_for_display += "<tr>"; // BEGIN of row
              let varName = v.confusion_matrix_headers[rowCounter];
              v.confusion_matrix_for_display += `<th>${varName}</th>`;
              for (let h of v.confusion_matrix_headers) {
                v.confusion_matrix_for_display += `<td>${r[h]}</td>`;
              }
              v.confusion_matrix_for_display += "</tr>"; // ENDOF row
            }

            // v.confusion_matrix_for_display += "<tr><td>val1</td><td>val2</td></tr>"
            v.confusion_matrix_for_display += "</table>";
          }
          return x
        });        
      }
     ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getDatasetsWithVariablesWithCheckValueInfo()`, []))
    );
  }

  saveValueCheck(valueCheck:ValueCheck): Observable<ValueCheck> {
    const url = this.apiURL + "/save";
    return this.http.post<VariableValue>(url,
                                JSON.stringify(valueCheck))    
    .pipe(tap(res =>  {console.log(res);
                       new ValueCheck(res);}
              ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`DataCheckService.save()`, null))
    );
  }

}
