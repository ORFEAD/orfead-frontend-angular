import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utils } from 'src/app/util/utils';
import { Dataset } from 'src/app/model/Dataset';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  private apiURL = environment.apiURL + 'dataset';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getDatasetsAccessibleToUser(datasetType:string): Observable<Dataset[]> {
    var url = this.apiURL + "/all-datasets";
     
    
    return this.http.post<Dataset[]>(url,
                                     JSON.stringify({datasetType:datasetType}))    
    .pipe(map( res =>             
        this.fromJSONArray(res)
        ))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getDatasetsAccessibleToUser()`, null))
    );
  }

  fromJSONArray(array: Array<Object>): Dataset[] {
    return array.map(res => new Dataset(res));
  } 

}
