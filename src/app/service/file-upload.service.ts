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

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public apiURL = environment.apiURLForFiles + 'file-upload';  // URL to web api

  private thumbnailCache = {};

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService,
              private domSanitizer: DomSanitizer,
              private messageService:MessageService,
              private authenticationService:AuthenticationService) { }

  


  getThumbnailForDisplay(fileId:string): Observable<SafeUrl> {

    console.log("getThumbnailForDisplay");

    var url = this.apiURL + "/get-thumbnail-of-file";  

    if (fileId == "default") {
      return Utils.getDefaultPictureURLAsObservable();
    }
    
    if (this.thumbnailCache[fileId] != null) {
      // console.log("Use cache");
      return this.thumbnailCache[fileId];
    }

    this.thumbnailCache[fileId] = this.http
      // load the image as a blob
      .post(url, 
            {"file.id":fileId},
            {responseType: 'blob'}
           )
      .pipe(shareReplay(1),map(e => 
        { 
          var objectURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e));      
          return objectURL;
        })
      )

    return this.thumbnailCache[fileId];
  }

  getFileContentForDisplay(file:File): Observable<any> {
    var url = this.apiURL + "/get-file-content";  
    console.log(url);
    return this.http
      // load the file as a blob
      .post(url, 
            {"file.id":file.id},
            {responseType: 'blob'})
      // create an object url of that blob that we can use in the src attribute
      .pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))))
  }


  getFileContentForDownload(file:File): Observable<any> {
    var url = this.apiURL + "/get-file-content";  
    return this.http
      // load the image as a blob
      .post(url, 
            {"file.id":file.id},
            {responseType: 'blob'})
      .pipe(
        catchError(this.errorHandlerService.handleError(`getFileContentForDownload()`, null))
      );
  }

  downloadFileFromURL(fileURL:string): Observable<any>{
    return this.http.get(fileURL, {responseType: 'blob'})
            .pipe(
              catchError(this.errorHandlerService.handleError(`downloadFileFromURL()`, null))
            );;
  }


  getPresignedUrlForPutRequestToCloud(file:any,containerId:string, parentContainerType:string) {
    var url = this.apiURL + "/get-presigned-url-for-put-request-to-cloud";  
    var reqBody;
    if (parentContainerType == "forum") {
      reqBody = {"forumId":containerId,
                 "contentType":file.type};
    } else if (parentContainerType == "styleGuide") {
      reqBody = {"styleGuideId":containerId,
                 "contentType":file.type};
    }
    return this.http
      .post(url, 
            reqBody,
            {responseType: 'json'})
      .pipe(
        catchError(this.errorHandlerService.handleError(`getPresignedUrlForPutRequestToCloud()`, null))
      );
  }


  putFile(file,datasetId:string) {

    var url = `${this.apiURL}/upload-unstructured/${datasetId}/${file.name}`;  

    let headers = new HttpHeaders();

     return this.http
              .put(url, file, {headers})
              .pipe(map(res => {        
                return true;
              }))
              .pipe(
                catchError(this.errorHandlerService.handleError(`putFile()`, null))
              );
  }

  getFileTemporaryURL(file:File, prettyName:boolean = false): Observable<any> {
    var url = this.apiURL + "/get-file-temporary-url";  
    return this.http
      .post(url, 
            {"file.id":file.id,
             "prettyName":prettyName},
            {responseType: 'text'})
      .pipe(
        catchError(this.errorHandlerService.handleError(`getFileTemporaryUrl()`, null))
      );
  }

  getFileURLWithAuthInQueryParams(file:File):string {
    var url = this.apiURL + "/get-file-inreqauth";  
    url += "?";
    url += "jwt=" + this.authenticationService.getJWT();
    url += "&file.id=" + file.id;
    console.log(url);
    return url;
  }

  cancelFile(file:File): Observable<boolean>{

    const url = this.apiURL + "/cancel";

    return this.http.post<boolean>(url,
                                   JSON.stringify(file))    
    .pipe(
      catchError(this.errorHandlerService.handleError(`cancelFile(${file.id})`, null))
    );
  }

  saveFile(file:File): Observable<boolean>{

    const url = this.apiURL + "/save";

    return this.http.post<boolean>(url,
                                   JSON.stringify(file))    
    .pipe(map(res => {        
      return new File(res);
    }))
    .pipe(
      catchError(this.errorHandlerService.handleError(`saveFile(${file.id})`, null))
    );
  }

  getFileFromID(file_id:any): Observable<File> {
    const url = this.apiURL + "/retrieve-file-from-id/" + file_id;
    console.log(url)
    return this.http.get<File>(url)    
    .pipe(map( res =>  {
      return(new File(res));
    }))  
    .pipe(
      catchError(this.errorHandlerService.handleError(`getFileFromID(${file_id})`, null))
    );
  }

  fromJSONArray(array: Array<Object>): File[] {
    return array.map(res => new File(res));
  } 


}
