import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SayHelloService {


  private serviceURL = environment.apiURL + 'sayhello/';  // URL to web api
  // private serviceURL = "http://localhost:8081/";  // URL to web api

  constructor(private http: HttpClient) { }
  
  sayHello(): Observable<any> {
    return this.http.get<any>(this.serviceURL);
  }

  

}
