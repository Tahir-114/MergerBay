import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('usertoken') != null) {
      const idToken = localStorage.getItem('usertoken');
        const cloned = req.clone({
          headers: req.headers.set("Authorization",
            'Bearer ' + idToken)
        });
        return next.handle(cloned).pipe
        (
            tap(
                succ => { },
                err => {
                    if (err.status === 401 || err.status === 403){
                      debugger
                        localStorage.clear();
                       // localStorage.removeItem('User_Token');
                        // this.interConnetedService.TriggerLogOut(GlobalServiceService.User_ID.toString());
                        setTimeout(() => {
                          this.router.navigate(['/login']);
                        }, 100);
                        return empty();
                    }
                }
            )
        );
      
    }
    else {
      // document.location.href = GlobalService.AppBaseURL;
      return next.handle(req);
      // localStorage.removeItem('User_Token');
      // this.router.navigate(['/user/login']);
      // return empty();
    }
  }

}
