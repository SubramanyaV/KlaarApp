import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheInterceptorService implements HttpInterceptor {

  constructor() { }
  private cache: Map<string, HttpResponse<any>> = new Map()
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== "GET") {
      return next.handle(req)
    }
    const cachedResponse: HttpResponse<any> = this.cache.get(req.url)
    if (cachedResponse) {
      console.log("API-Call: Cached Response");
      return of(cachedResponse.clone())
    } else {
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.cache.set(req.url, event.clone())
            console.log("API-Call: Server Response");
          }
        })
      )
    }
  }
}
