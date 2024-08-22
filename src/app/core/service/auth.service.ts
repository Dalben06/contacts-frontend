import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { APIService } from "./api.service";
import { UserToken } from "../models/user";
import { AppResponse } from "../models/appResponse";
import { RegisterUser } from "../models/registerUser";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<UserToken>;
    public currentUser: Observable<UserToken>;


    constructor(private _api: APIService) {
        const storedUser = localStorage.getItem("currentUser");
        this.currentUserSubject = new BehaviorSubject<UserToken>(
        storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserToken {
        return this.currentUserSubject.value;
    }

    auth(username: string, password: string) {
        return this._api
            .post<AppResponse<UserToken>>(`Auth/Authenticate`, {
                username: username,
                password: password,
            })
            .pipe(
                map((result) => {
                    if (result.success) {
                        localStorage.setItem('currentUser', JSON.stringify(result.data) );
                        this.currentUserSubject.next(result.data);
                    }
                    return result;
                })
            );
    }


    registerUser(redefinirSenha: RegisterUser): Observable<UserToken>{
        return this._api.post(`Auth/Register`,redefinirSenha).pipe(
			map((result: AppResponse<UserToken>) => {
				return result.data;
			}));
    }
    logout() {
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(new UserToken());
        return of({ success: false });
    }

}
