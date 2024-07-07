import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment.development';
import { AuthData } from '../interface/auth-data.interface';
import { User } from '../interface/user.interface';
import { TranslateService } from '@ngx-translate/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private authSub: BehaviorSubject<AuthData | null> = new BehaviorSubject<AuthData | null>(null);
  public user$: Observable<AuthData | null> = this.authSub.asObservable();
  private timeout!: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) { }

  register(data: { username: string, password: string, email: string, nome: string, cognome: string }) {
    return this.http.post(`${environment.apiBack}auth/register`, data).pipe(catchError(this.errors.bind(this)));
  }

  loginGoogle(token: any) {
    return this.http.post<AuthData>(`${environment.apiBack}auth/login/oauth2/code/google`, token).pipe(
      tap(async (user) => {
        this.authSub.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(user);
        this.loadUserBalance(user.user.idUtente!);
      })
    );
  }

  login(data: { email: string, password: string }) {
    console.log(data);
    return this.http.post<AuthData>(`${environment.apiBack}auth/login`, data).pipe(
      tap(async (user) => {
        this.authSub.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.autoLogout(user);
        this.loadUserBalance(user.user.idUtente!);
      }),
      catchError(this.errors.bind(this))
    );
  }

  updateUser(data: User) {
    const datas = this.authSub.getValue();
    if (datas) {
      datas.user = data;
    }
    this.authSub.next(datas);
    localStorage.setItem('user', JSON.stringify(datas));
  }

  updateUser2(data: number) {
    const datas = this.authSub.getValue();
    if (datas) {
      datas.user.balance = data;
    }
    this.authSub.next(datas);
    localStorage.setItem('user', JSON.stringify(datas));
  }

  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.initializeGoogleLogin();
  }

  private initializeGoogleLogin() {
    window.location.reload();  // Ricarica la pagina per reinizializzare il login di Google
  }

  private autoLogout(data: AuthData) {
    const dataExp = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
    const msExp = dataExp.getTime() - new Date().getTime();
    this.timeout = setTimeout(() => {
      this.logout();
    }, msExp);
  }

  async restore() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user: AuthData = JSON.parse(userJson);
    this.authSub.next(user);
    this.autoLogout(user);
  }

  loadUserBalance(userId: number) {
    this.http.get<User>(`${environment.apiBack}users/${userId}`).subscribe(user => {
      this.updateUser(user);
    });
  }

  private errors(err: any) {
    let errorKey = '';
    console.log(err);
    switch (err.error.message) {
      case 'Email already exists':
        errorKey = 'auth.EMAIL_EXISTS';
        break;
      case 'Incorrect password':
        errorKey = 'auth.INCORRECT_PASSWORD';
        break;
      case 'Cannot find user':
        errorKey = 'auth.USER_NOT_FOUND';
        break;
      case 'Password is too short':
        errorKey = 'auth.PASSWORD_TOO_SHORT';
        break;
      default:
        errorKey = 'auth.DEFAULT_ERROR';
        break;
    }

    const errorMessage = this.translate.instant(errorKey);
    return throwError(errorMessage);
  }

  isAuthenticated(): boolean {
    return this.authSub.value !== null;
  }
}
