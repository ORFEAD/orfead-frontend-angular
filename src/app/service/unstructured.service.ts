import { Injectable } from '@angular/core';
import { Appuser } from 'src/app/module/appuser/model/Appuser';
import { File } from '../model/File';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/module/appuser/service/authentication.service';
import { Utils } from '../util/utils';
import { throwError } from 'rxjs/internal/observable/throwError';
import {MessageService} from 'primeng/api';
import { Dataset } from '../model/Dataset';

@Injectable({
  providedIn: 'root'
})
export class UnstructuredService {

  public apiURL = environment.apiURLForFiles + 'unstructured';  // URL to web api

  private thumbnailCache = {};

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private domSanitizer: DomSanitizer,
              private messageService:MessageService,
              private authenticationService:AuthenticationService) { }

  



  processDocFile(file,datasetId:string):Observable<any> {

    var url = `${this.apiURL}/process-doc-file/${datasetId}/${file.name}`;  

    const dataset_password = localStorage.getItem(environment.dataset_password_name);

    if (!dataset_password) {
      this.messageService.add({severity:'warn', 
                                summary: 'Error', 
                                detail:`Missing ${environment.dataset_password_name} in local storage`});

      return of(null);
    }
    

    let headers = new HttpHeaders();
    headers = headers.append("x-dataset-password",dataset_password);

    return this.http
              .post(url, file, {headers})
              .pipe(map(res => {        
                return res;
              }))
              .pipe(
                catchError(this.errorHandlerService.handleError(`processDocFile()`, null))
              );
  }

  processTextElts(textElts:any[], manuallyTaggedElts:any[], 
                  datasetId:string, exitBeforeSerialization:boolean):Observable<any> {

    var url = `${this.apiURL}/process-text-elts/${datasetId}`;  

    const dataset_password = localStorage.getItem(environment.dataset_password_name);

    if (!dataset_password) {
      this.messageService.add({severity:'warn', 
                                summary: 'Error', 
                                detail:`Missing ${environment.dataset_password_name} in local storage`});

      return of(null);
    }
    

    let headers = new HttpHeaders();
    headers = headers.append("x-dataset-password",dataset_password);

    return this.http
              .post(url, 
                   {textElts:textElts,
                    manuallyTaggedElts:manuallyTaggedElts,
                    exitBeforeSerialization:exitBeforeSerialization}, 
                   {headers})
              .pipe(map(res => {        
                return res;
              }))
              .pipe(
                catchError(this.errorHandlerService.handleError(`processTextElts()`, null))
              );
  }

  serializeVariablesValues(tpl:any[],
                           textElts:any[], 
                           datasetId:string):Observable<any> {

    var url = `${this.apiURL}/serialize-variables-values/${datasetId}`;      

    return this.http
    .post(url, 
         {tpl:tpl,
          textElts:textElts})
    .pipe(map(res => {        
      return res;
    }))
    .pipe(
      catchError(this.errorHandlerService.handleError(`serializeVariablesValues()`, null))
    );
  }

  analyzeDocFileForAnonymization(file,datasetId:string):Observable<any> {

    var url = `${this.apiURL}/analyze-doc-file-for-anonymization/${datasetId}/${file.name}`;  

    let headers = new HttpHeaders();

     return this.http
              .post(url, file, {headers})
              .pipe(map(res => {        
                return res;
              }))
              .pipe(
                catchError(this.errorHandlerService.handleError(`analyzeDocFileForAnonymization()`, null))
              );
  }

  analyzeDocFileForVariablesExtraction():Observable<any> {

    var url = `${this.apiURL}/analyze-doc-file-for-variables-extraction`;  

     return this.http
              .post(url, {},)
              .pipe(map(res => {        
                return res;
              }))
              .pipe(
                catchError(this.errorHandlerService.handleError(`analyzeDocFileForVariablesExtraction()`, null))
              );
  }

}
