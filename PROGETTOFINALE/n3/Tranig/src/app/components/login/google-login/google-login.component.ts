import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';


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
export class GoogleLoginComponent implements AfterViewInit {
  // @Output() loginWithGoogle: EventEmitter<any> = new EventEmitter<any>();

  // createFakeGoogleWrapper = () => {
  //     const googleLoginWrapper = document.createElement('div');
  //     googleLoginWrapper.style.display = 'none';
  //     googleLoginWrapper.classList.add('custom-google-button');
  //     document.body.appendChild(googleLoginWrapper);
  //     window.google.accounts.id.renderButton(googleLoginWrapper, {
  //         type: 'icon',
  //         width: '200',
  //     });

  //     const googleLoginWrapperButton = googleLoginWrapper.querySelector(
  //         'div[role=button]'
  //     ) as HTMLElement;

  //     return {
  //         click: () => {
  //             googleLoginWrapperButton?.click();
  //         },
  //     };
  // };

  // handleGoogleLogin() {
  //     this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  // }
//}
// @ViewChild('googleButton', { static: true }) googleButton!: ElementRef;
// @Output() loginWithGoogle: EventEmitter<SocialUser> = new EventEmitter<SocialUser>();

// constructor(private authService: SocialAuthService) {}

// ngAfterViewInit(): void {
//   this.renderGoogleButton();
// }

// renderGoogleButton(): void {
//   if (window.google && window.google.accounts) {
//     window.google.accounts.id.initialize({
//       client_id: '800518808424-6uhijj53k3b0qq0butjpjc0m3mcver38.apps.googleusercontent.com', // Sostituisci con il tuo Google Client ID
//       callback: (response: any) => this.handleCredentialResponse(response)
//     });

//     window.google.accounts.id.renderButton(
//       this.googleButton.nativeElement,
//       {
//         type: 'standard',
//         theme: 'outline',
//         size: 'large'
//       }
//     );
//   } else {
//     console.error('Google API script not loaded properly.');
//   }
// }

// handleCredentialResponse(response: any) {
//   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
//     this.loginWithGoogle.emit(user);
//   }).catch(err => {
//     console.error(err);
//   });
// }
// }
@Output() loginWithGoogle: EventEmitter<string> = new EventEmitter<string>();

ngAfterViewInit(): void {
  this.initializeGoogleLogin();
}

initializeGoogleLogin(): void {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.initialize({
      client_id: '800518808424-6uhijj53k3b0qq0butjpjc0m3mcver38.apps.googleusercontent.com', // Sostituisci con il tuo Client ID di Google
      callback: (response: any) => this.handleCredentialResponse(response)
    });
  } else {
    console.error('Lo script API di Google non è stato caricato correttamente.');
  }
}

handleCredentialResponse(response: any) {
  console.log('Credenziali Google:', response.credential);
  this.loginWithGoogle.emit(response.credential);
}

triggerGoogleLogin(): void {
  window.google.accounts.id.prompt();
}
}