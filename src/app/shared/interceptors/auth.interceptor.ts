import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { AuthStore } from "../store/auth/auth.store";
import { Observable, take } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor( private authStore: AuthStore) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.authStore.token$.pipe(
            take(1), 
            switchMap((token) => {
                if (!token) {
                    return next.handle(req);
                }
                const headers = req.headers.set('Authorization', `Bearer ${token}`);
                const authReq = req.clone({
                    headers
                });
                return next.handle(authReq)
            })
        )
    }
}


export const authInterceptorProvidcer: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor, 
    multi: true
}