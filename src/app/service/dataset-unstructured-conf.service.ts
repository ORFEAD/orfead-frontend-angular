import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/service/error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utils } from 'src/app/util/utils';
import { Dataset } from 'src/app/model/Dataset';
import { DatasetUnstructuredConf } from '../model/DatasetUnstructuredConf';

@Injectable({
  providedIn: 'root'
})
export class DatasetUnstructuredConfService {

  private apiURL = environment.apiURL + 'dataset-unstructured-conf';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }

  getDatasetUnstructuredConfFromDatasetId(datasetId:string): Observable<DatasetUnstructuredConf> {
    var url = `${this.apiURL}/dataset-unstructured-conf-from-dataset-id/${datasetId}`;     
    
    return this.http.get<DatasetUnstructuredConf[]>(url)    
    .pipe(map(res => new DatasetUnstructuredConf(res)))     
    .pipe(
      catchError(this.errorHandlerService.handleError(`getDatasetsAccessibleToUser()`, null))
    );
  }


}
