import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CustomException } from "../models/customException";

@Injectable()
export class APIService {

    private pathAPI = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router) { }

    private _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': 'Authorization',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers':
                'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        }),
        withCredentials: true
    };

    public post<T>(url: string, body: T| any = {}): Observable<any | T> {
        return this.http.post<any>(`${this.pathAPI}/${url}`, body, this._httpOptions)
            .pipe(catchError(e => this.handleError(e)));
    }

    public get<T>(url: string, body: T| any = {}): Observable<any| T> {
        return this.http.get<any>(`${this.pathAPI}/${url}`, this._httpOptions)
            .pipe(catchError(e => this.handleError(e)));
    }

    public put<T>(url: string, body: T | any = {} ): Observable<any| T> {
        return this.http.put<any>(`${this.pathAPI}/${url}`, body, this._httpOptions)
            .pipe(catchError(e => this.handleError(e)));
    }

    public delete<T>(url: string, body: T| any = {}): Observable<any| T> {
        let options = {
            headers:  this._httpOptions.headers,
            body: body
        }

        return this.http.delete<any>(`${this.pathAPI}/${url}`,options)
            .pipe(catchError(e => this.handleError(e)));
    }

    public postForm<T>(url: string, body: FormData): Observable<T | CustomException> {

        return this.http.post<any>(`${this.pathAPI}/${url}`, body)
            .pipe(catchError(e => this.handleError(e)));
    }

    public putForm<T>(url: string, body: FormData ): Observable<T | CustomException> {
        return this.http.put<any>(`${this.pathAPI}/${url}`, body)
            .pipe(catchError(e => this.handleError(e)));
    }

    public handleError(ex: HttpErrorResponse | Response | any): Observable<CustomException> {

        // In a real-world app, we might use a remote logging infrastructure
        var exception = new CustomException();
        console.error('ex',ex);
        if (ex instanceof HttpErrorResponse) {
            console.error('Error HttpErrorResponse', ex);

            exception.status = ex.statusText;
            exception.msg = ex.message;
            exception.error = ex.error;

            if (ex.error?.errors) {
                const errors = ex.error?.errors;
                errors.forEach((element: string) => {
                    exception.errors.push(element);
                });
            }

            if (ex.status == 0) {
                exception.errors.push('Serviço indisponível' );
            }
            else if (ex.status == 401 && !ex.headers.has("Token-Expired")) {
                exception.errors.push('Not Authorized' );
                this.router.navigate(['/auth/relogin'], {
                    queryParams: {
                        return: this.router.routerState.snapshot.url
                    }
                });
            }
            else if (ex.status == 500) {
                exception.errors.push(ex.error);
            }
        } else if (ex instanceof Response) {
            console.error('Error Response', ex);
            let body = ex.json() || '';
            let err = body || JSON.stringify(body);

            exception.status = ex.statusText;
            exception.msg = err.toString();
            exception.error = `${ex.status} - ${ex.statusText || ''} ${err}`;
            exception.errors.push( exception.msg);
        } else {
            console.error('Errors ', ex);
            exception.status = "error";
            exception.msg = "any";
            exception.error = ex;
            exception.errors.push(exception.msg );
        }

        console.error("CustomException", exception);
        return throwError(exception);
    }
}