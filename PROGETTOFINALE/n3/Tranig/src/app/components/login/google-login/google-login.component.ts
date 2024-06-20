import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/app/environment/environment.development';
import { AuthService } from 'src/app/service/auth.service';


declare global {
  interface Window {
      google: any;
  }
}
@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {
   
//   @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

//   createFakeGoogleWrapper = () => {
//       const googleLoginWrapper = document.createElement('div');
//       googleLoginWrapper.style.display = 'none';
//       googleLoginWrapper.classList.add('custom-google-button');
//       document.body.appendChild(googleLoginWrapper);
//       window.google.accounts.id.renderButton(googleLoginWrapper, {
//           type: 'icon',
//           width: '200',
//       });

//       const googleLoginWrapperButton = googleLoginWrapper.querySelector(
//           'div[role=button]'
//       ) as HTMLElement;

//       return {
//           click: () => {
//               googleLoginWrapperButton?.click();
//           },
//       };
//   };

//   handleGoogleLogin() {
//       this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
//   }



//  constructor(private authSrv: AuthService){

//     }
// handleGoogleLogin(){
//     this.authSrv.loginGoole().subscribe((user: number) => {
//       console.log(user);
    
//     });
  
// }


constructor(private authSrv:AuthService ) { }

ngOnInit(): void {
  window.onload = () => {
    google.accounts.id.initialize({
      client_id: '800518808424-6uhijj53k3b0qq0butjpjc0m3mcver38.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this)
    });
    const buttonDiv = document.getElementById('buttonDiv');
    if (buttonDiv) {
      google.accounts.id.renderButton(
        buttonDiv,
        { theme: 'outline', size: 'large' }  // personalizza il pulsante come desideri
      );
      google.accounts.id.prompt(); // mostra il dialogo One Tap
    } else {
      console.error('Elemento buttonDiv non trovato');
    }
  }
}


handleCredentialResponse(response: any) {
  if (response && response.credential) {
    console.log('Encoded JWT ID token: ' + response.credential);
    this.sendTokenToBackend(response.credential);
  } else {
    console.error('Credenziali non valide', response);
  }
}

sendTokenToBackend(token: string): void {
  this.authSrv.loginGoole({token}).subscribe();
}
}
//`${environment.apiBack}auth/login/oauth2/code/google`
//800518808424-75801i1han5olaiiut1j985mg4pjcfs0.apps.googleusercontent.com
//800518808424-75801i1han5olaiiut1j985mg4pjcfs0.apps.googleusercontent.com