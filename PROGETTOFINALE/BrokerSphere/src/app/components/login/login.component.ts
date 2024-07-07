import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbAlertConfig]  // Configurazione degli alert
})
export class LoginComponent implements OnInit {
  register = false;
  termsAccepted = false;
  passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})';
  alerts: any[] = [];

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private translate: TranslateService,
    private alertConfig: NgbAlertConfig
  ) {
    // Configurazione degli alert
    alertConfig.type = 'success';
    alertConfig.dismissible = true;
  }

  ngOnInit(): void {
    let firstTime = true;
    this.authSrv.user$.subscribe(user => {
      if (user) {
        if (!firstTime) return;
        firstTime = false;
        this.router.navigate(['/']);
      }
    });

    // Add event listeners for toggle password visibility
    this.setupPasswordToggle('togglePasswordLogin', 'password');
    this.setupPasswordToggle('togglePasswordRegister', 'passwordRegister');
  }

  setupPasswordToggle(toggleId: string, inputId: string) {
    const togglePassword = document.querySelector(`#${toggleId}`);
    const passwordInput = document.querySelector(`#${inputId}`) as HTMLInputElement;

    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePassword.querySelector('i') as HTMLElement;
        icon.classList.toggle('bi-eye');
        icon.classList.toggle('bi-eye-slash');
      });
    }
  }

  onSubmit(form: NgForm) {
    try {
      this.authSrv.login(form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmitRegister(form: NgForm) {
    try {
      const value = {
        username: form.value.usernameRegister,
        password: form.value.passwordRegister,
        email: form.value.emailRegister,
        nome: form.value.nomeRegister,
        cognome: form.value.cognomeRegister
      };
      this.authSrv.register(value).subscribe(() => {
        this.addAlert(this.translate.instant('login.REGISTRATION_SUCCESS'), 'success');
        this.signIn(); // Torna al form di login dopo la registrazione
      
      }, (error) => {
        // Check if error is due to email already existing
        if (error.error && error.error.message === 'Email already exists') {
          this.addAlert(this.translate.instant('auth.EMAIL_EXISTS'), 'danger');
        } else {
          this.addAlert(this.translate.instant('auth.EMAIL_EXISTS'), 'danger');
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  signIn() {
    this.register = false;
  }

  signUp() {
    this.register = true;
  }

  addAlert(message: string, type: string) {
    this.alerts.push({
      type: type,
      msg: message,
      timeout: 5000
    });
  }

  onClose(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
