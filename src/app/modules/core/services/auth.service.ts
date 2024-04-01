import { Injectable } from '@angular/core';
import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { USER_KEY } from '../const';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    url_api: String = environment.API_URL+"v1/";
    user!: User;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(USER_KEY)!));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    /**
     * current user
     */
    public get currentUserValue(): User {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(USER_KEY)!));
        return this.currentUserSubject.value;
    }


    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(user_code: string, password: string) {
        return this.http.post(this.url_api + 'auth/login', {
            user_code,
            password
        }, httpOptions);
    }

    veryfycarToken() {
        return this.http.get(this.url_api + 'auth/check-status');
    }

    /**
     * Returns the current user
     */
    // public currentUser(): any {
    //     return getFirebaseBackend()!.getAuthenticatedUser();
    // }

    /**
     * Logout the user
     */
    logout() {
        // logout the user 
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem('token');
        this.currentUserSubject.next(null!);
    }

    /**
     * Reset password
     * @param email email
     */
    // resetPassword(email: string) {
    //     return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
    //         const message = response.data;
    //         return message;
    //     });
    // }

}

