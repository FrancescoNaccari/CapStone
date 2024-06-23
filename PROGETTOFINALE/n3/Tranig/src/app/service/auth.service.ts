import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment.development';
import { AuthData } from '../interface/auth-data.interface';
import { User } from '../interface/user.interface';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//   private jwtHelper = new JwtHelperService();

//   private authSub = new BehaviorSubject<AuthData | null| SocialUser>(null);
//   user$ = this.authSub.asObservable();
//   private timeout!:any;

//   constructor(private http: HttpClient, private router:Router,private authService: SocialAuthService) { 
//     this.authService.authState.subscribe((user) => {
//       this.authSub.next(user);
//       localStorage.setItem('user', JSON.stringify(user));
//       this.router.navigate(['/']);
//   });
//   }

//   register(data: {username: string, password: string, email: string, nome: string, cognome: string}) {
//     return this.http.post(`${environment.apiBack}auth/register`, data).pipe(catchError(this.errors))
//   }

//   login(data: {email: string, password: string}) {
//     console.log(data)
//     return this.http.post<AuthData>(`${environment.apiBack}auth/login`, data).pipe(
//       tap((data) => {
//         console.log('Auth:', data);
//     }),
//       tap(async (user) => {
//         this.authSub.next(user);
//         localStorage.setItem('user', JSON.stringify(user));
//         this.autoLogout(user);
//       }),
//       catchError(this.errors)
//     );
//   }

//   updateUser(data: User) {
//     const datas = this.authSub.getValue();
//     if (datas && 'user' in datas) {
//       datas.user = data;
//     }
//     this.authSub.next(datas);
//     localStorage.setItem('user', JSON.stringify(datas))
//   }

//   logout() {
//     this.authSub.next(null);
//     localStorage.removeItem('user');
//     this.router.navigate(['/'])

//   }

//   private autoLogout(data: AuthData) {
//     const dataExp = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
//     const msExp = dataExp.getTime() - new Date().getTime();
//     this.timeout = setTimeout(() => {
//       this.logout();
//     }, msExp)
//   }

//   async restore() {
//     const userJson = localStorage.getItem('user');
//     if (!userJson) {
//       return
//     }
//     const user:AuthData = JSON.parse(userJson);
//     this.authSub.next(user);
//     // this.router.navigate(['/home'])
//     this.autoLogout(user);
//   }

 
//   private errors(err: any) {
//     console.log(err)
//       let error = "";
//       switch (err.error) {
//           case 'Email already exists':
//               error = "Utente già presente"
//               break;

//           case 'Incorrect password':
//               error = 'Password errata';
//               break;

//           case 'Cannot find user':
//               error = 'Utente non trovato';
//               break;
//           case 'Password is too short':
//             error = 'La password è troppo corta';
//             break
//           default:
//               error = 'Errore nella chiamata';
//               break;
//       }
//       return throwError(error)
//   }
// }
private jwtHelper = new JwtHelperService();

private authSub = new BehaviorSubject<AuthData | null>(null);
user$ = this.authSub.asObservable();
private timeout!:any;


constructor(private http: HttpClient, private router:Router) { }

register(data: {username: string, password: string, email: string, nome: string, cognome: string}) {
  return this.http.post(`${environment.apiBack}auth/register`, data).pipe(catchError(this.errors))
}


loginGoogle(token:any){

  return this.http.post<AuthData>(`${environment.apiBack}auth/login/oauth2/code/google`,token).pipe(
    tap(async (user) => {
      this.authSub.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.autoLogout(user);
    })
  )
}
login(data: {email: string, password: string}) {
  console.log(data)
  return this.http.post<AuthData>(`${environment.apiBack}auth/login`, data).pipe(
    tap(async (user) => {
      this.authSub.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.autoLogout(user);
    })
    
  )
}

updateUser(data: User) {
  const datas = this.authSub.getValue();
  if (datas) {
    datas.user = data;
  }
  this.authSub.next(datas);
  localStorage.setItem('user', JSON.stringify(datas))
}

logout() {
  this.authSub.next(null);
  localStorage.removeItem('user');
  this.router.navigate(['/home'])
  this.initializeGoogleLogin();
}
private initializeGoogleLogin() {
  // Assicurati che il componente GoogleLoginComponent venga reinizializzato
  // ad esempio, ricaricando la pagina o richiamando la funzione di inizializzazione del componente
 
  window.location.reload(); // Questo è un modo semplice ma potrebbe non essere il più elegante
}
private autoLogout(data: AuthData) {
  const dataExp = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
  const msExp = dataExp.getTime() - new Date().getTime();
  this.timeout = setTimeout(() => {
    this.logout();
  }, msExp)
}

async restore() {
  const userJson = localStorage.getItem('user');
  if (!userJson) {
    return
  }
  const user:AuthData = JSON.parse(userJson);
  this.authSub.next(user);
  // this.router.navigate(['/home'])
  this.autoLogout(user);
}


private errors(err: any) {
  console.log(err)
    let error = "";
    switch (err.error) {
        case 'Email already exists':
            error = "Utente già presente"
            break;

        case 'Incorrect password':
            error = 'Password errata';
            break;

        case 'Cannot find user':
            error = 'Utente non trovato';
            break;
        case 'Password is too short':
          error = 'La password è troppo corta';
          break
        default:
            error = 'Errore nella chiamata';
            break;
    }
    return throwError(error)
}
}