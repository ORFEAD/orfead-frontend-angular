import {Injectable, Injector} from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

// https://angular-academy.com/angular-jwt/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 intercept(req: HttpRequest<any>,
     next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem(environment.jwt_name);
    // const idToken = "qqqqqqqqqqqqqqqqqqqq";
    
    // Do not add the usual authentication headers if it's a request to AWS
    //  that would result in a non authorized error
    if (req.url.indexOf("amazonaws") > 0){
        return next.handle(req);
    }

    if (idToken) {
        // console.log(req);
        const cloned = req.clone({
            // The header key must be lower case (authorization not Authorization) 
            //   because haproxy makes everything lower case
            headers: req.headers.set("authorization",
                "Bearer " + idToken)
        });
        // console.log(cloned);
        return next.handle(cloned);
    }
    else {
        return next.handle(req);
    }
}

}