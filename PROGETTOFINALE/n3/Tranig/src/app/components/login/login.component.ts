// import { SocialUser } from '@abacritt/angularx-social-login';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthData } from 'src/app/interface/auth-data.interface';
// import { User } from 'src/app/interface/user.interface';
// import { AuthService } from 'src/app/service/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   [x: string]: any;
//     register = false;
//     constructor(private authSrv: AuthService, private router: Router) {}
    
//     ngOnInit(): void {
//       let firtTime=true;
//      this.authSrv.user$.subscribe(user => {
//       if (user){
//         if(!firtTime)return;
//         firtTime=false;
//         this.router.navigate(['/home'])
//       }
//      })
       
//     }
//     onSubmit(form:NgForm) {
//       try {
//         this.authSrv.login(form.value).subscribe((data) => {
//           this.router.navigate(['/home'])
//         });
//       } catch (error) {
//         console.log(error)
//       }
//     }
  
//     onSubmitRegister(form:NgForm) {
//       try {
//         let value = {
//           username: form.value.usernameRegister,
//           password: form.value.passwordRegister,
//           email: form.value.emailRegister,
//           nome: form.value.nomeRegister,
//           cognome: form.value.cognomeRegister
//         }
//         this.authSrv.register(value).subscribe((data) => {
//           window.alert("Registrazione effettuata. Effettua il login")
//         })
//       } catch (error) {
//         console.error(error)
//       }
//     }
  
  
  
//     @ViewChild('container') container!: ElementRef;
  
  
//   signIn() {
//     this.container.nativeElement.classList.remove('right-panel-active');
//   }
  
//   signUp() {
//     this.container.nativeElement.classList.add('right-panel-active');
//   }}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  register = false;

  constructor(private authSrv: AuthService, private router: Router, private translate: TranslateService) {}

  ngOnInit(): void {
    let firtTime = true;
    this.authSrv.user$.subscribe(user => {
      if (user) {
        if (!firtTime) return;
        firtTime = false;
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(form: NgForm) {
    try {
      this.authSrv.login(form.value).subscribe((data) => {
        this.router.navigate(['/home']);
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmitRegister(form: NgForm) {
    try {
      let value = {
        username: form.value.usernameRegister,
        password: form.value.passwordRegister,
        email: form.value.emailRegister,
        nome: form.value.nomeRegister,
        cognome: form.value.cognomeRegister
      };
      this.authSrv.register(value).subscribe((data) => {
        window.alert(this.translate.instant('login.REGISTRATION_SUCCESS'));
      });
    } catch (error) {
      console.error(error);
    }
  }

  @ViewChild('container') container!: ElementRef;

  signIn() {
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  signUp() {
    this.container.nativeElement.classList.add('right-panel-active');
  }
}
