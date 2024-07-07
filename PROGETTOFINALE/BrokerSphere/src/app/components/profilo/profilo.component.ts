import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { CheckoutComponent } from '../stripe/checkout/checkout.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepositaModalComponent } from './deposita-modal/deposita-modal.component';
import { PrelevaModalComponent } from './preleva-modal/preleva-modal.component';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss']
})
export class ProfiloComponent implements OnInit, OnDestroy {

  @Input() userId: number | null = null;

  @ViewChild(CheckoutComponent) checkoutComponent!: CheckoutComponent;
  profilo: User | undefined;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  newUsername: string = '';
  previewUrl: string | ArrayBuffer | null = "assets/img/ominoverde.png";
  passwordError: string | null = null;
  successMessage: string | null = null;
  passwordAlertMessage: string | null = null;
  passwordErrorAlertMessage: string | null = null;
  usernameAlertMessage: string | null = null;
  usernameErrorAlertMessage: string | null = null;
  errorMessage: string | null = null; // Aggiunta della proprietà errorMessage

  rechargeAmount: number = 0; // Importo della ricarica
  withdrawAmount: number = 0; // Importo del prelievo
  balance: number = 0; // Saldo dell'utente
  private intervalId: any;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  constructor(private authSrv: AuthService, private profiloSrv: ProfiloService, private renderer: Renderer2, private translate: TranslateService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      console.log(data);
      if (isAuthData(data)) {
        this.profilo = data.user;
        console.log(this.profilo.balance);
        this.newUsername = this.profilo?.username || '';
        this.previewUrl = this.profilo?.avatar || "";
        this.balance = this.profilo?.balance || 0;
      }
    });
    this.startBalanceUpdateInterval();
  }

 
  togglePasswordVisibility(inputId: string) {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement.type === 'password') {
      inputElement.type = 'text';
      if (inputId === 'currentPassword') {
        this.showCurrentPassword = true;
      } else if (inputId === 'newPassword') {
        this.showNewPassword = true;
      } else if (inputId === 'confirmPassword') {
        this.showConfirmPassword = true;
      }
    } else {
      inputElement.type = 'password';
      if (inputId === 'currentPassword') {
        this.showCurrentPassword = false;
      } else if (inputId === 'newPassword') {
        this.showNewPassword = false;
      } else if (inputId === 'confirmPassword') {
        this.showConfirmPassword = false;
      }
    }
  }
  openDepositModal() {
    const modalRef = this.modalService.open(DepositaModalComponent);
    modalRef.componentInstance.userId = this.profilo?.idUtente;
    modalRef.result.then(() => {
      this.updateBalance();
    }, (reason) => {
      console.log('Deposit modal dismissed:', reason);
    });
  }

  openWithdrawModal() {
    const modalRef = this.modalService.open(PrelevaModalComponent);
    modalRef.componentInstance.userId = this.profilo?.idUtente;
    modalRef.result.then(() => {
      this.updateBalance();
    }, (reason) => {
      console.log('Withdraw modal dismissed:', reason);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const label = input.nextElementSibling as HTMLElement;

    if (input.value) {
      label.classList.add('placeholder-hidden');
    } else {
      label.classList.remove('placeholder-hidden');
    }
  }

  startBalanceUpdateInterval(): void {
    this.intervalId = setInterval(() => {
      this.updateBalance();
    }, 2000); // Aggiorna ogni 2 secondi
  }

  updateBalance(): void {
    if (this.profilo?.idUtente !== undefined) {
      this.profiloSrv.updateBalance(this.profilo.idUtente, 0).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.balance = updatedUser.balance || 0;
        },
        (error) => {
          console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
        }
      );
    }
  }

  handlePaymentSuccess() {
    if (this.rechargeAmount > 0 && this.profilo?.idUtente !== undefined) {
      this.profiloSrv.updateBalance(this.profilo?.idUtente!, this.rechargeAmount).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.balance = updatedUser.balance || 0;
          this.rechargeAmount = 0; // Reset dell'importo della ricarica
        },
        (error) => {
          console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
        }
      );
    }

    if (this.withdrawAmount > 0 && this.profilo?.idUtente !== undefined) {
      this.profiloSrv.updateBalance(this.profilo?.idUtente!, -this.withdrawAmount).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.balance = updatedUser.balance || 0;
          this.withdrawAmount = 0; // Reset dell'importo del prelievo
        },
        (error) => {
          console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onloadend = e => {
        this.previewUrl = reader.result;
        if (e.target && e.target.readyState === FileReader.DONE && this.profilo?.idUtente) {
          if (this.previewUrl) {
            const formData = new FormData();
            if (input.files) {
              formData.set('file', input.files[0], input.files[0].name);
            }
            this.profiloSrv.updateAvatar(this.profilo.idUtente, formData).subscribe((data) => {
              this.authSrv.updateUser(data);
            });
          }
        }
      };

      reader.readAsDataURL(file);
    }
  }

  validatePassword(password: string): string | null {
    if (password.length < 8) {
      return this.translate.instant('profile.PASSWORD_MIN_LENGTH');
    }
    if (!/[A-Z]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_UPPERCASE');
    }
    if (!/[a-z]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_LOWERCASE');
    }
    if (!/[0-9]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_NUMBER');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return this.translate.instant('profile.PASSWORD_SPECIAL_CHAR');
    }
    return null;
  }

  showErrorPopover(message: string): void {
    this.passwordError = message;
    setTimeout(() => {
      this.passwordError = null;
    }, 3000);
  }

  updatePassword() {
    try {
      const passwordError = this.validatePassword(this.newPassword);
      if (passwordError) {
        this.showErrorPopover(passwordError);
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.showErrorPopover(this.translate.instant('profile.PASSWORDS_NOT_MATCH'));
        return;
      }
      this.passwordError = null;
      if (this.profilo?.idUtente && this.currentPassword && this.newPassword) {
        this.profiloSrv.updatePassword(this.profilo.idUtente, this.currentPassword, this.newPassword).subscribe(
          () => {
            this.passwordAlertMessage = this.translate.instant('profile.PASSWORD_UPDATED_SUCCESS');
            this.passwordErrorAlertMessage = null;
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            setTimeout(() => this.passwordAlertMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
          },
          (error) => {
            console.error(this.translate.instant('profile.PASSWORD_ERROR'), error);
            this.passwordErrorAlertMessage = this.translate.instant('profile.PASSWORD_ERROR');
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  updateUsername() {
    try {
      const newUsername = (document.getElementById('newUsername') as HTMLInputElement).value;
      if (!newUsername) {
        this.usernameErrorAlertMessage = this.translate.instant('profile.USERNAME_EMPTY_ERROR');
        setTimeout(() => this.usernameErrorAlertMessage = null, 3000);
        return;
      }
      if (this.profilo?.idUtente && newUsername) {
        this.profiloSrv.updateUser(this.profilo.idUtente, { username: newUsername }).subscribe(
          (updatedUser) => {
            this.authSrv.updateUser(updatedUser);
            this.usernameAlertMessage = this.translate.instant('profile.UPDATE_SUCCESS');
            this.usernameErrorAlertMessage = null;
            setTimeout(() => this.usernameAlertMessage = null, 3000); // Il messaggio scompare dopo 3 secondi
          },
          (error) => {
            console.error(this.translate.instant('profile.UPDATE_ERROR'), error);
            this.usernameErrorAlertMessage = this.translate.instant('profile.UPDATE_ERROR');
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  closePasswordAlert() {
    this.passwordAlertMessage = null;
  }

  closePasswordErrorAlert() {
    this.passwordErrorAlertMessage = null;
  }

  closeUsernameAlert() {
    this.usernameAlertMessage = null;
  }

  closeUsernameErrorAlert() {
    this.usernameErrorAlertMessage = null;
  }

  onNewsletterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (this.profilo) {
      this.profilo.newsletter = input.checked;
      this.updateNewsletter();
    }
  }

  updateNewsletter() {
    if (this.profilo?.idUtente) {
      this.profiloSrv.updateNewsletter(this.profilo.idUtente, this.profilo.newsletter).subscribe(
        (updatedUser) => {
          this.authSrv.updateUser(updatedUser);
          this.successMessage = this.translate.instant('newsletter.SUCCESS_MESSAGE');
          setTimeout(() => this.successMessage = null, 3000);
        },
        (error) => {
          console.error('Errore durante l\'aggiornamento della preferenza newsletter', error);
          this.errorMessage = this.translate.instant('newsletter.ERROR_MESSAGE');
          setTimeout(() => this.errorMessage = null, 3000);
        }
      );
    }
  }
}

function isAuthData(user: any): user is AuthData {
  return user && 'accessToken' in user && 'user' in user;
}
