import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Dataset } from '../model/Dataset';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private apiURL = environment.apiURL + 'export';  // URL to web api


  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }


  getDatasetAsExcel(dataset:Dataset, exportLevel:number): Observable<any> {
    const url = `${this.apiURL}/get-dataset-as-xlsx`;
    return this.http
      // load the image as a blob
      .post(url,
            {datasetId: dataset.id,
             exportLevel:exportLevel}, 
            {responseType: 'blob'})
      .pipe(
        catchError(this.errorHandlerService.handleError(`getDatasetAsExcel()`, []))
      );
  }
}
