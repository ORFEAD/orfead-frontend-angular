import { Injectable } from '@angular/core';
import { AppUser } from '../model/AppUser';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Utils } from '../util/utils';
import { EntityBase } from '../model/EntityBase';


@Injectable({
  providedIn: 'root'
})
export class AccessCheckService {

  private apiURL = environment.apiURL + 'access-check';  // URL to web api

  constructor(private http: HttpClient,
              private errorHandlerService: ErrorHandlerService) { }


  isRelated(entity:EntityBase): Observable<boolean> {

    if (entity.className == null) {
      throw `You are calling 'AccessCheckService.isRelated(entity:EntityBase)' on class which does not set the attribute 'className'`;
      
    }
    const url = this.apiURL + "/is-related";
    return this.http.post<boolean>(url,
                                   JSON.stringify({type:entity.className,
                                                   id:entity.id}))         
    .pipe(
      catchError(this.errorHandlerService.handleError(`isRelated()`, false))
    );
  }
}
