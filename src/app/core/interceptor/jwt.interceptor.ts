import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let newReq = this.addAuthenticationToken(request);
        return next.handle(newReq);
    }


    private addAuthenticationToken(req: HttpRequest<any>): HttpRequest<any> {
        let newReq = req.clone();

        if ((!req.url.includes("Auth"))) {
            let currentUser = this.authenticationService.currentUserValue;
            if (currentUser != null && currentUser?.jwtToken) {
                newReq = req.clone({
                    headers: req.headers.set('Authorization', `Bearer ${currentUser.jwtToken}`)
                });
            }

        }

        newReq.headers.append('Content-Type', 'application/json; charset=utf-8');

        return newReq;
    }
}
