import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataQualification } from '../model/DataQualification';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DataQualificationService {

  constructor(private http: HttpClient,
    private errorHandlerService: ErrorHandlerService) { }

  public getDataQualificationForListing():Observable<any[]> {
    return this.http.get<any>('assets/mockup-data/data-qualification-for-listing.json')    
    .pipe(map(
            res=>res["data"]
        )
    )
    .pipe(
        catchError(this.errorHandlerService.handleError(`getDataQualificationForListing()`, null))
    );
  } 

  public getNextValueToCheck(variableId:string):Observable<any> {
    return this.http.get<any>('assets/mockup-data/itt-values-with-sources.json')    
    .pipe(map(
            res=>{
              let resTmp = res["data"];
              return resTmp[0];
            }
        )
    )
    .pipe(
        catchError(this.errorHandlerService.handleError(`getDataQualificationForListing()`, null))
    );
  }

  fromJSONArray(array: Array<Object>): DataQualification[] {
    return array.map(res => new DataQualification(res));
  }

}
